import { SectionHeader } from './About'

const RED = '#8B3A2A'

const KIT_ITEMS = [
  {
    title: 'Jersey de Ciclismo',
    desc: 'Diseño exclusivo del evento. Colores tierra y cafeteros. No es el típico jersey de carrera — es algo que te vas a querer poner después.',
  },
  {
    title: 'Pocillo Cafetero Esmaltado',
    desc: 'Con la marca del evento. El mismo tipo de pocillo que se usa en las fincas cafeteras de Sevilla desde hace décadas.',
  },
  {
    title: 'Mapa-Póster de la Ruta',
    desc: 'Funcional el domingo para orientarte. Decorativo después para recordar cada camino. Ilustrado a mano con los puntos clave de la ruta.',
  },
  {
    title: 'Número de Participante',
    desc: 'Tu número para el evento. Con chip de cronometraje para La Trocha.',
  },
]

const NUTRITION_ITEMS = [
  { name: 'Barras energéticas de mucílago de café', origin: 'Hechas por niños de una vereda cercana a Sevilla con el mucílago del grano — la parte que normalmente se bota.' },
  { name: 'Panela artesanal', origin: 'Del trapiche de la vereda. Energía pura para la ruta.' },
  { name: 'Bocadillo', origin: 'Dulce de guayaba tradicional. Combustible de toda la vida del ciclista colombiano.' },
  { name: 'Frutas locales', origin: 'Lo que esté de cosecha: lulo, maracuyá, guayaba, tomate de árbol.' },
]

export default function Kit() {
  return (
    <section id="kit" className="py-20 md:py-28" style={{ background: '#FAF7F0' }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Tu Kit"
          title="Lo que incluye la inscripción"
          desc="Nada de bolsas plásticas con folletos genéricos. Cada pieza del kit tiene un propósito y una historia."
        />

        {/* Main kit items */}
        <div className="grid sm:grid-cols-2 gap-0 border mb-12" style={{ borderColor: '#D4C5A9' }}>
          {KIT_ITEMS.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-card"
              style={{
                borderRight: i % 2 === 0 ? '1px solid #D4C5A9' : 'none',
                borderBottom: i < 2 ? '1px solid #D4C5A9' : 'none',
              }}
            >
              <span className="font-display text-lg leading-none" style={{ color: RED }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-semibold text-foreground text-sm mt-3 mb-2">{item.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Nutrition bag — special callout */}
        <div
          className="border p-6 md:p-8"
          style={{ borderColor: RED, background: 'rgba(139,58,42,0.03)' }}
        >
          <div className="flex items-start gap-3 mb-5">
            <span className="font-display text-lg" style={{ color: RED }}>05</span>
            <div>
              <h3 className="font-display text-xl text-foreground">Nutrition Bag de Yute</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Una bolsa de yute con productos locales y tarjetas en cartón kraft que cuentan la historia
                de cada producto y su productor. No es sponsoreo — es territorio.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {NUTRITION_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                  style={{ background: RED }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">{item.origin}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-muted-foreground mt-6 italic">
            Cada producto viene con una tarjetica en cartón kraft contando de dónde viene y quién lo hizo.
          </p>
        </div>

        {/* Coffee bonus */}
        <div className="mt-6 text-center py-4 border-t border-b" style={{ borderColor: '#D4C5A9' }}>
          <p className="text-sm text-muted-foreground">
            Al terminar, cada participante recibe{' '}
            <strong className="text-foreground">un cuarto de libra de café de Sevilla</strong>{' '}
            con la marca del evento.
          </p>
        </div>
      </div>
    </section>
  )
}
