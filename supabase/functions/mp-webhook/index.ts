/**
 * Supabase Edge Function — mp-webhook
 * Recibe las notificaciones IPN de MercadoPago, consulta el pago real,
 * actualiza el estado en Supabase y envía el correo de confirmación.
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
  date_approved:      string | null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Mapea el status de MercadoPago a nuestro estado interno.
 * Referencia: https://www.mercadopago.com.co/developers/es/reference/payments/_payments_id/get
 */
function mapStatus(s: string): EstadoPago {
  if (s === 'approved')                       return 'completado'
  if (s === 'pending' || s === 'in_process')  return 'pendiente'
  return 'fallido'  // rejected | cancelled | refunded | charged_back
}

/**
 * Verifica la firma HMAC-SHA256 que MP incluye en cada notificación.
 * Documentación: https://www.mercadopago.com.co/developers/es/docs/your-integrations/notifications/webhooks
 *
 * La cadena firmada es: "id:<data.id>;request-id:<x-request-id>;ts:<ts>"
 * La firma viene en el header x-signature: "ts=<ts>,v1=<hex>"
 */
async function verifySignature(req: Request, dataId: string): Promise<boolean> {
  const xSignature = req.headers.get('x-signature')  ?? ''
  const xRequestId = req.headers.get('x-request-id') ?? ''

  const parts: Record<string, string> = {}
  for (const part of xSignature.split(',')) {
    const idx = part.indexOf('=')
    if (idx > 0) parts[part.slice(0, idx)] = part.slice(idx + 1)
  }

  const ts = parts['ts']
  const v1 = parts['v1']
  if (!ts || !v1) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts}`

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(MP_WEBHOOK_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
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

// ── Handler ───────────────────────────────────────────────────────────────────

serve(async (req) => {
  // MercadoPago hace un GET de verificación al registrar el webhook
  if (req.method === 'GET') {
    return new Response('OK', { status: 200 })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // ── 1. Parsear body ──────────────────────────────────────────────────────

  let bodyText: string
  let event: { type?: string; action?: string; data?: { id: string | number } }

  try {
    bodyText = await req.text()
    event    = JSON.parse(bodyText)
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  // MP envía `type` en notificaciones IPN y `action` en webhooks configurados
  const eventType = event.type ?? event.action ?? ''
  const dataId    = String(event.data?.id ?? '')

  console.log('[mp-webhook] Event received', { eventType, dataId })

  // Solo procesamos eventos de pago
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

  // ── 3. Obtener detalles del pago desde la API de MP ─────────────────────

  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
    headers: { Authorization: `Bearer ${MP_TOKEN}` },
  })

  if (!mpRes.ok) {
    const errText = await mpRes.text().catch(() => '')
    console.error('[mp-webhook] Error MP API', mpRes.status, errText)
    return json({ error: 'MP API error', mpStatus: mpRes.status }, 502)
  }

  const payment: MpPayment = await mpRes.json()
  const { status: mpStatus, external_reference } = payment

  console.log('[mp-webhook] Payment details', {
    paymentId:  payment.id,
    mpStatus,
    external_reference,
    statusDetail: payment.status_detail,
  })

  // external_reference = UUID de la inscripción en Supabase
  if (!external_reference) {
    console.warn('[mp-webhook] Pago sin external_reference, ignorado', dataId)
    return json({ skipped: true, reason: 'no external_reference' })
  }

  const estado = mapStatus(mpStatus)

  // ── 4. Actualizar estado en Supabase ─────────────────────────────────────

  const sb = createClient(SUPABASE_URL, SB_SERVICE_KEY)

  // Usamos .neq() para dos propósitos:
  // a) Idempotencia: si el estado ya es el mismo, no hacemos nada
  // b) Detectar si es la PRIMERA transición a 'completado' (para el email)
  const { data: updated, error: dbErr } = await sb
    .from('inscripciones')
    .update({ estado_pago: estado })
    .eq('id', external_reference)
    .neq('estado_pago', estado)
    .select('nombre, apellido, email, categoria, subcategoria, precio_cop')
    .maybeSingle()

  if (dbErr) {
    console.error('[mp-webhook] DB update error', dbErr.message)
    return json({ error: dbErr.message }, 500)
  }

  if (!updated) {
    // La fila no existía o el estado ya era el mismo → nada que hacer
    console.log('[mp-webhook] Estado sin cambios o inscripción no encontrada', {
      external_reference,
      estado,
    })
    return json({ ok: true, noChange: true, estado })
  }

  console.log('[mp-webhook] Estado actualizado', { external_reference, estado })

  // ── 5. Enviar correo de confirmación (solo en primera transición a completado) ──

  if (estado === 'completado') {
    const emailPayload = {
      nombre:       updated.nombre,
      apellido:     updated.apellido,
      email:        updated.email,
      categoria:    updated.categoria,
      subcategoria: updated.subcategoria ?? undefined,
      precio_cop:   updated.precio_cop,
    }

    const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-confirmation`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(emailPayload),
    })

    if (!emailRes.ok) {
      // No fallamos el webhook por esto — el pago ya está registrado
      console.error('[mp-webhook] Error enviando email', await emailRes.text().catch(() => ''))
    } else {
      console.log('[mp-webhook] Email de confirmación enviado a', updated.email)
    }
  }

  return json({ ok: true, estado, externalRef: external_reference })
})
