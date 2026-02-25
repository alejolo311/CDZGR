/**
 * Supabase Edge Function — send-confirmation
 * Envía el correo de confirmación de inscripción via Resend.
 *
 * Despliegue:
 *   1. supabase login
 *   2. supabase link --project-ref ipaqhbstcljbrqqhdrbg
 *   3. supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
 *   4. supabase functions deploy send-confirmation
 *
 * La clave RESEND_API_KEY se obtiene en https://resend.com/api-keys
 * El dominio remitente debe estar verificado en Resend.
 * Para pruebas se puede usar: onboarding@resend.dev (solo envía a tu email registrado)
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const RESEND_KEY  = Deno.env.get('RESEND_API_KEY')!
const FROM        = 'Caídos del Zarzo <inscripciones@caidosdelzarzo.co>'
const REPLY_TO    = 'info@caidosdelzarzo.co'

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Payload {
  nombre:       string
  apellido:     string
  email:        string
  categoria:    'gravel' | 'paseo'
  subcategoria?: string
  precio_cop:   number
}

function formatPrice(n: number): string {
  return '$' + n.toLocaleString('es-CO') + ' COP'
}

function buildHtml(d: Payload): string {
  const precio    = formatPrice(d.precio_cop)
  const catLabel  = d.categoria === 'gravel' ? 'Gravel Race 🏆' : 'El Paseo 🌄'
  const horaSalida = d.categoria === 'gravel' ? '6:30 AM' : '8:00 AM'
  const horaBriefing = d.categoria === 'gravel' ? '4:00 PM' : '5:00 PM'

  const subcatRow = d.subcategoria
    ? `<tr>
         <td style="padding:10px 0;color:#888;font-size:13px;width:150px;vertical-align:top">Subcategoría</td>
         <td style="padding:10px 0;color:#1a1208;font-size:14px">${d.subcategoria}</td>
       </tr>`
    : ''

  const steps = [
    ['📦', 'Número de participante', 'Será asignado y enviado por correo próximamente.'],
    ['👕', 'Recogida de kit', '<strong>Sáb 13 Jun · 10:00 AM – 8:00 PM</strong><br>Plaza Central, Sevilla Valle'],
    ['📋', 'Briefing ' + (d.categoria === 'gravel' ? '(obligatorio)' : ''), '<strong>Sáb 13 Jun · ' + horaBriefing + '</strong>'],
    ['🚵', 'Hora de salida', '<strong>Dom 14 Jun · ' + horaSalida + '</strong><br>Plaza Central, Sevilla Valle'],
    ['🏅', 'Premiación', '<strong>Dom 14 Jun · 4:00 PM</strong> · Parque El Zarzo'],
  ]

  const stepsHtml = steps.map(([icon, title, body]) => `
    <tr>
      <td style="padding:10px 0;vertical-align:top;width:38px;font-size:22px;line-height:1">${icon}</td>
      <td style="padding:10px 0;padding-left:10px">
        <p style="margin:0 0 3px;color:#1a1208;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.5px">${title}</p>
        <p style="margin:0;color:#666;font-size:13px;line-height:1.6">${body}</p>
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Inscripción Confirmada · Caídos del Zarzo 2026</title>
</head>
<body style="margin:0;padding:0;background:#f0ebe3;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0ebe3;padding:40px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%">

  <!-- ── Encabezado ─────────────────────────────────────────── -->
  <tr>
    <td style="background:#c47818;padding:40px 48px 36px;text-align:center">
      <p style="margin:0 0 6px;color:rgba(255,255,255,.7);font-size:11px;letter-spacing:4px;text-transform:uppercase">Confirmación de Inscripción</p>
      <h1 style="margin:0 0 6px;color:#fff;font-size:36px;font-weight:900;letter-spacing:5px;text-transform:uppercase;line-height:1">CAÍDOS DEL ZARZO</h1>
      <p style="margin:0;color:rgba(255,255,255,.85);font-size:12px;letter-spacing:3px;text-transform:uppercase">Gravel Race &nbsp;·&nbsp; 2026</p>
    </td>
  </tr>

  <!-- ── Check de confirmación ─────────────────────────────── -->
  <tr>
    <td style="background:#1a1208;padding:32px 48px;text-align:center">
      <div style="display:inline-block;width:68px;height:68px;border-radius:50%;background:#2a7a46;text-align:center;line-height:68px;font-size:34px">✓</div>
      <h2 style="margin:18px 0 8px;color:#f0e8d8;font-size:26px;font-weight:700;letter-spacing:1px">¡Pago Confirmado!</h2>
      <p style="margin:0;color:rgba(240,232,216,.65);font-size:14px;line-height:1.6">
        Hola <strong style="color:#f0e8d8">${d.nombre} ${d.apellido}</strong>,<br>
        tu lugar en Caídos del Zarzo 2026 está asegurado.
      </p>
    </td>
  </tr>

  <!-- ── Detalle de inscripción ─────────────────────────────── -->
  <tr>
    <td style="background:#ffffff;padding:36px 48px">
      <p style="margin:0 0 20px;color:#aaa;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:2px solid #f5f0e8;padding-bottom:14px">
        Detalle de tu inscripción
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="padding:10px 0;color:#999;font-size:13px;width:150px;vertical-align:top">Modalidad</td>
          <td style="padding:10px 0;color:#1a1208;font-weight:700;font-size:15px">${catLabel}</td>
        </tr>
        ${subcatRow}
        <tr>
          <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top">Valor pagado</td>
          <td style="padding:10px 0;color:#c47818;font-weight:900;font-size:24px;line-height:1">${precio}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top">Fecha del evento</td>
          <td style="padding:10px 0;color:#1a1208;font-weight:600;font-size:14px">Domingo 20 de Septiembre, 2026</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top">Lugar de salida</td>
          <td style="padding:10px 0;color:#555;font-size:14px">Plaza Central, Sevilla Valle del Cauca</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── Próximos pasos ─────────────────────────────────────── -->
  <tr>
    <td style="background:#faf7f2;padding:32px 48px">
      <p style="margin:0 0 20px;color:#aaa;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase">
        Próximos pasos
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${stepsHtml}
      </table>
    </td>
  </tr>

  <!-- ── CTA contacto ───────────────────────────────────────── -->
  <tr>
    <td style="background:#fff;padding:28px 48px;text-align:center;border-top:2px solid #f5f0e8">
      <p style="margin:0 0 16px;color:#888;font-size:14px">¿Tienes preguntas? Escríbenos.</p>
      <a href="mailto:info@caidosdelzarzo.co"
         style="display:inline-block;background:#c47818;color:#fff;text-decoration:none;padding:13px 36px;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase">
        info@caidosdelzarzo.co
      </a>
    </td>
  </tr>

  <!-- ── Footer ─────────────────────────────────────────────── -->
  <tr>
    <td style="background:#1a1208;padding:24px 48px;text-align:center">
      <p style="margin:0 0 6px;color:rgba(240,232,216,.35);font-size:11px">
        © 2026 Caídos del Zarzo SAS &nbsp;·&nbsp; Sevilla, Valle del Cauca, Colombia
      </p>
      <p style="margin:0;color:rgba(240,232,216,.2);font-size:11px">
        Recibiste este correo porque realizaste una inscripción en nuestro evento.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors })
  }

  try {
    const payload: Payload = await req.json()
    const { nombre, apellido, email, categoria, subcategoria, precio_cop } = payload

    if (!email || !nombre || !apellido || !categoria || !precio_cop) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos: email, nombre, apellido, categoria, precio_cop' }),
        { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } },
      )
    }

    const html      = buildHtml(payload)
    const catLabel  = categoria === 'gravel' ? 'Gravel Race' : 'El Paseo'

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:     FROM,
        reply_to: REPLY_TO,
        to:       email,
        subject:  `¡Inscripción confirmada! Caídos del Zarzo 2026 – ${catLabel}`,
        html,
      }),
    })

    if (!resendRes.ok) {
      const err = await resendRes.json().catch(() => ({}))
      throw new Error((err as { message?: string }).message ?? `Resend ${resendRes.status}`)
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('[send-confirmation]', err)
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } },
    )
  }
})
