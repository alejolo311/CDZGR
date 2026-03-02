import { SectionHeader } from './About'

const RED   = '#8B3A2A'
const CREAM = '#F2EAD8'
const MUTED = 'rgba(242,234,216,0.5)'

const PLANS = [
  {
    name: 'La Trocha',
    tag: 'Competitiva',
    cupos: '240 cupos',
    price: '$499.000',
    earlyBird: '$419.000',
    features: [
      '90–110 km · 2.000–2.500 m D+',
      'Cronometrada',
      'Kit completo (jersey, pocillo, mapa, nutrition bag)',
      '3 puntos de hidratación y alimentación',
      'Mecánico volante en moto',
      'Desayuno campesino + Fiesta del Zarzo',
      'Cuarto de libra de café de Sevilla',
    ],
  },
  {
    name: 'La Visita',
    tag: 'Experiencia',
    cupos: '40 cupos',
    price: '$399.000',
    earlyBird: '$339.000',
    features: [
      '45–60 km · 800–1.200 m D+',
      'Sin cronómetro',
      'Kit completo (jersey, pocillo, mapa, nutrition bag)',
      '3–4 paradas experienciales con café y frutas',
      'Visita a finca cafetera en ruta',
      'Desayuno campesino + Fiesta del Zarzo',
      'Cuarto de libra de café de Sevilla',
    ],
  },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Precios() {
  return (
    <section id="precios" style={{ background: '#1A120B' }} className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Inscripción"
          title="Precios"
          desc="Early bird para los primeros 50 inscritos en cada modalidad. Después vuelve al precio regular."
          dark
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="border p-6 md:p-8 flex flex-col"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#2C1E12' }}
            >
              {/* Header */}
              <span
                className="text-[10px] font-bold tracking-[.3em] uppercase mb-2"
                style={{ color: RED }}
              >
                {plan.tag}
              </span>
              <h3 className="font-display text-2xl mb-1" style={{ color: CREAM }}>
                {plan.name}
              </h3>
              <p className="text-[13px] mb-5" style={{ color: MUTED }}>{plan.cupos}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl" style={{ color: CREAM }}>{plan.earlyBird}</span>
                  <span className="text-sm line-through" style={{ color: MUTED }}>{plan.price}</span>
                </div>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(139,58,42,0.8)' }}>
                  Early bird · COP
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(242,234,216,0.65)' }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: RED }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => scrollTo('#inscripcion')}
                className="w-full py-3 text-sm font-semibold text-white transition-colors tracking-wide"
                style={{ background: RED }}
                onMouseEnter={e => e.currentTarget.style.background = '#6E2D20'}
                onMouseLeave={e => e.currentTarget.style.background = RED}
              >
                Inscríbete — {plan.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm" style={{ color: MUTED }}>
          El pago se realiza por MercadoPago. Aceptamos tarjetas, PSE y otros medios.
        </p>
      </div>
    </section>
  )
}
