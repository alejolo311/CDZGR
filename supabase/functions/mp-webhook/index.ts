/**
 * Supabase Edge Function — mp-webhook
 * Recibe las notificaciones IPN de MercadoPago, consulta el pago real,
 * actualiza el estado en Supabase y envía el correo de confirmación.
 *
 * Maneja tanto inscripciones individuales (tabla: inscripciones)
 * como inscripciones grupales (tabla: grupos).
 *
 * Despliegue:
 *   supabase secrets set MP_ACCESS_TOKEN=APP_USR-xxxxx
 *   supabase secrets set MP_WEBHOOK_SECRET=<clave-secreta-del-panel-mp>
 *   supabase functions deploy mp-webhook
 *
 * URL del webhook (registrar en https://www.mercadopago.com.co/developers/panel/app):
 *   https://ipaqhbstcljbrqqhdrbg.supabase.co/functions/v1/mp-webhook
 *   Eventos a suscribir: Pagos (payment)
 *
 * Variables auto-inyectadas por Supabase (no requieren secrets set):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { serve }        from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ── Env ───────────────────────────────────────────────────────────────────────

const MP_TOKEN       = Deno.env.get('MP_ACCESS_TOKEN')!
const MP_WEBHOOK_KEY = Deno.env.get('MP_WEBHOOK_SECRET') ?? ''
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!
const SB_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// ── Tipos ─────────────────────────────────────────────────────────────────────

type EstadoPago = 'completado' | 'pendiente' | 'fallido'

interface MpPayment {
  id:                 number
  status:             string
  status_detail:      string
  external_reference: string | null
  transaction_amount: number
  payer:              { email: string }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function mapStatus(s: string): EstadoPago {
  if (s === 'approved')                       return 'completado'
  if (s === 'pending' || s === 'in_process')  return 'pendiente'
  return 'fallido'
}

async function verifySignature(req: Request, dataId: string): Promise<boolean> {
  const xSignature = req.headers.get('x-signature')  ?? ''
  const xRequestId = req.headers.get('x-request-id') ?? ''

  const parts: Record<string, string> = {}
  for (const part of xSignature.split(',')) {
    const idx = part.indexOf('=')
    if (idx > 0) parts[part.slice(0, idx)] = part.slice(idx + 1)
  }
  const ts = parts['ts'], v1 = parts['v1']
  if (!ts || !v1) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts}`
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(MP_WEBHOOK_KEY),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  const sigBuf  = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(manifest))
  const computed = Array.from(new Uint8Array(sigBuf))
    .map(b => b.toString(16).padStart(2, '0')).join('')
  return computed === v1
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function sendConfirmationEmail(payload: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/send-confirmation`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
  if (!res.ok) {
    console.error('[mp-webhook] Error enviando email', await res.text().catch(() => ''))
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'GET')  return new Response('OK', { status: 200 })
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  // ── 1. Parsear body ──────────────────────────────────────────────────────

  let bodyText: string
  let event: { type?: string; action?: string; data?: { id: string | number } }

  try {
    bodyText = await req.text()
    event    = JSON.parse(bodyText)
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const eventType = event.type ?? event.action ?? ''
  const dataId    = String(event.data?.id ?? '')

  console.log('[mp-webhook] Event received', { eventType, dataId })

  if (!eventType.includes('payment') || !dataId) {
    return json({ skipped: true, reason: 'not a payment event' })
  }

  // ── 2. Verificar firma HMAC ──────────────────────────────────────────────

  if (MP_WEBHOOK_KEY) {
    const valid = await verifySignature(req, dataId)
    if (!valid) {
      console.warn('[mp-webhook] Firma inválida para payment', dataId)
      return json({ error: 'Invalid signature' }, 401)
    }
  } else {
    console.warn('[mp-webhook] MP_WEBHOOK_SECRET no configurado, saltando verificación')
  }

  // ── 3. Obtener detalles del pago desde MP ────────────────────────────────

  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
    headers: { Authorization: `Bearer ${MP_TOKEN}` },
  })
  if (!mpRes.ok) {
    console.error('[mp-webhook] Error MP API', mpRes.status)
    return json({ error: 'MP API error', mpStatus: mpRes.status }, 502)
  }

  const payment: MpPayment = await mpRes.json()
  const { status: mpStatus, external_reference } = payment

  console.log('[mp-webhook] Payment details', {
    paymentId: payment.id, mpStatus, external_reference,
    detail:    payment.status_detail,
  })

  if (!external_reference) {
    return json({ skipped: true, reason: 'no external_reference' })
  }

  const estado = mapStatus(mpStatus)
  const sb     = createClient(SUPABASE_URL, SB_SERVICE_KEY)

  // ── 4a. Intentar actualizar como inscripción INDIVIDUAL ──────────────────

  const { data: updIns, error: insErr } = await sb
    .from('inscripciones')
    .update({ estado_pago: estado })
    .eq('id', external_reference)
    .neq('estado_pago', estado)            // idempotencia
    .select('nombre, apellido, email, categoria, subcategoria, precio_cop')
    .maybeSingle()

  if (insErr) {
    console.error('[mp-webhook] DB error (inscripciones)', insErr.message)
    return json({ error: insErr.message }, 500)
  }

  if (updIns) {
    console.log('[mp-webhook] Inscripción individual actualizada', { external_reference, estado })
    if (estado === 'completado') {
      await sendConfirmationEmail({
        nombre:       updIns.nombre,
        apellido:     updIns.apellido,
        email:        updIns.email,
        categoria:    updIns.categoria,
        subcategoria: updIns.subcategoria ?? undefined,
        precio_cop:   updIns.precio_cop,
      })
      console.log('[mp-webhook] Email enviado a', updIns.email)
    }
    return json({ ok: true, tipo: 'inscripcion', estado, externalRef: external_reference })
  }

  // ── 4b. Intentar actualizar como inscripción GRUPAL ──────────────────────

  const { data: updGrp, error: grpErr } = await sb
    .from('grupos')
    .update({ estado_pago: estado })
    .eq('id', external_reference)
    .neq('estado_pago', estado)
    .select('lider_nombre, lider_apellido, lider_email, nombre_grupo, categoria, num_participantes, precio_unitario')
    .maybeSingle()

  if (grpErr) {
    console.error('[mp-webhook] DB error (grupos)', grpErr.message)
    return json({ error: grpErr.message }, 500)
  }

  if (updGrp) {
    console.log('[mp-webhook] Grupo actualizado', { external_reference, estado })

    if (estado === 'completado') {
      // Propagar estado a los participantes ya registrados en este grupo
      const { error: partErr } = await sb
        .from('inscripciones')
        .update({ estado_pago: 'completado' })
        .eq('grupo_id', external_reference)
        .neq('estado_pago', 'completado')

      if (partErr) {
        console.error('[mp-webhook] Error actualizando participantes del grupo', partErr.message)
      }

      // Enviar email de confirmación al líder
      await sendConfirmationEmail({
        nombre:     updGrp.lider_nombre,
        apellido:   updGrp.lider_apellido,
        email:      updGrp.lider_email,
        categoria:  updGrp.categoria,
        precio_cop: updGrp.precio_unitario,
        // El send-confirmation puede adaptar el mensaje si se le pasan estos extras:
        grupo_nombre:       updGrp.nombre_grupo,
        grupo_participantes: updGrp.num_participantes,
      })
      console.log('[mp-webhook] Email grupal enviado a', updGrp.lider_email)
    }

    return json({ ok: true, tipo: 'grupo', estado, externalRef: external_reference })
  }

  // Ninguna tabla tuvo un cambio de estado
  console.log('[mp-webhook] Sin cambios (estado ya igual o ID no encontrado)', { external_reference, estado })
  return json({ ok: true, noChange: true, estado })
})
