/**
 * MercadoPago Checkout Pro — preference creator.
 *
 * This function calls the MP Preferences API to generate a hosted
 * checkout URL and returns it so the browser can redirect.
 *
 * ⚠️  VITE_MP_ACCESS_TOKEN is bundled into the JS bundle (it's a
 *     VITE_ env var). For a higher-security setup, move this call
 *     to a serverless function (Netlify/Vercel) and expose only
 *     the public key to the frontend.
 */

const ACCESS_TOKEN = import.meta.env.VITE_MP_ACCESS_TOKEN

const PRICES = {
  gravel: 899000,
  paseo:  600000,
}

const TITLES = {
  gravel: 'Gravel Race – Caídos del Zarzo 2026',
  paseo:  'El Paseo – Caídos del Zarzo 2026',
}

export async function createMPPreference({ categoria, nombre, apellido, email, telefono }) {
  if (!ACCESS_TOKEN) {
    throw new Error('Credenciales de pago no configuradas. Contacta al organizador.')
  }

  const base = `${window.location.origin}${window.location.pathname}`

  const preference = {
    items: [{
      id:          categoria,
      title:       TITLES[categoria],
      quantity:    1,
      unit_price:  PRICES[categoria],
      currency_id: 'COP',
    }],
    payer: {
      name:    nombre,
      surname: apellido,
      email,
      phone: { number: String(telefono).replace(/\D/g, '') },
    },
    back_urls: {
      success: `${base}?inscripcion=ok`,
      failure: `${base}?inscripcion=error`,
      pending: `${base}?inscripcion=pendiente`,
    },
    auto_return:          'approved',
    statement_descriptor: 'CAIDOS DEL ZARZO',
    external_reference:   `${categoria}-${Date.now()}`,
  }

  const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization:       `Bearer ${ACCESS_TOKEN}`,
      'Content-Type':      'application/json',
      'X-Idempotency-Key': `cdzgr-${categoria}-${Date.now()}`,
    },
    body: JSON.stringify(preference),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status} al iniciar el pago`)
  }

  const data = await res.json()
  // In dev mode use the sandbox URL; in production use the real one
  return import.meta.env.DEV ? data.sandbox_init_point : data.init_point
}

export { PRICES as MP_PRICES }
