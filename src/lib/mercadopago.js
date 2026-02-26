/**
 * MercadoPago Checkout Pro — preference creator.
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

export const GRUPO_DESCUENTO  = 0.10  // 10 % de descuento para grupos
export const GRUPO_MIN        = 10    // mínimo de participantes

function getBase() {
  const PROD_URL = 'https://gravel.caidosdelzarzo.com'
  return import.meta.env.DEV
    ? `${window.location.origin}${window.location.pathname}`
    : PROD_URL
}

async function postPreference(preference) {
  if (!ACCESS_TOKEN) {
    throw new Error('Credenciales de pago no configuradas. Contacta al organizador.')
  }
  const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization:       `Bearer ${ACCESS_TOKEN}`,
      'Content-Type':      'application/json',
      'X-Idempotency-Key': `cdzgr-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    },
    body: JSON.stringify(preference),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status} al iniciar el pago`)
  }
  const data = await res.json()
  return import.meta.env.DEV ? data.sandbox_init_point : data.init_point
}

/** Crea preferencia para inscripción individual. */
export async function createMPPreference({ categoria, nombre, apellido, email, telefono, externalRef }) {
  const base = getBase()
  return postPreference({
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
    external_reference:   externalRef || `${categoria}-${Date.now()}`,
  })
}

/**
 * Crea preferencia para inscripción grupal.
 * El precio unitario ya incluye el 10 % de descuento.
 * MP cobra: precioUnitario × numParticipantes = total del grupo.
 */
export async function createMPGroupPreference({ categoria, nombre, apellido, email, telefono, numParticipantes, grupoId }) {
  const base          = getBase()
  const precioUnitario = Math.round(PRICES[categoria] * (1 - GRUPO_DESCUENTO))

  return postPreference({
    items: [{
      id:          `grupo-${categoria}`,
      title:       `${TITLES[categoria]} – Grupo (${numParticipantes} participantes)`,
      quantity:    numParticipantes,
      unit_price:  precioUnitario,
      currency_id: 'COP',
    }],
    payer: {
      name:    nombre,
      surname: apellido,
      email,
      phone: { number: String(telefono).replace(/\D/g, '') },
    },
    back_urls: {
      success: `${base}?inscripcion=ok&tipo=grupo`,
      failure: `${base}?inscripcion=error&tipo=grupo`,
      pending: `${base}?inscripcion=pendiente&tipo=grupo`,
    },
    auto_return:          'approved',
    statement_descriptor: 'CAIDOS DEL ZARZO GRUPO',
    external_reference:   grupoId,
  })
}

export { PRICES as MP_PRICES }
