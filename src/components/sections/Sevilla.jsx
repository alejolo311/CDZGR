import { SectionHeader } from './About'

const RED = '#8B3A2A'

const INFO_BLOCKS = [
  {
    title: 'Cómo llegar',
    items: [
      'Desde Cali: ~3 horas por vía pavimentada (Cali → Buga → Tuluá → Sevilla)',
      'Desde Bogotá: vuelo a Cali + ruta terrestre, o vuelo a Pereira + ruta por Caicedonia',
      'Desde Pereira/Armenia: ~2 horas por la vía del Quindío',
      'Terminal de buses: Sevilla tiene conexión directa con Cali, Tuluá y Pereira',
    ],
  },
  {
    title: 'Dónde dormir',
    items: [
      'Hoteles en el casco urbano — sencillos pero cómodos y a buen precio',
      'Fincas cafeteras con hospedaje — la opción con más carácter',
      'Hostales y casas de familia — si querés la experiencia local completa',
      'Recomendaciones específicas: escríbenos y te armamos opciones según tu presupuesto',
    ],
  },
  {
    title: 'El clima en septiembre',
    items: [
      'Temperatura promedio: 18–24°C — fresco en la mañana, agradable al mediodía',
      'Posibilidad de lluvias por la tarde — septiembre es transición',
      'En las subidas altas puede bajar a 12–14°C',
      'Recomendación: llevar rompevientos liviano y prepararse para barro',
    ],
  },
]

export default function Sevilla() {
  return (
    <section id="sevilla" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="El Territorio"
          title="Sevilla, Valle del Cauca"
        />

        <div className="space-y-5 text-[15px] leading-[1.75] text-muted-foreground mb-14">
          <p>
            <strong className="text-foreground">La Capital Cafetera de Colombia.</strong>{' '}
            Patrimonio Cultural de la Humanidad por la UNESCO como parte del Paisaje Cultural Cafetero.
            Un municipio de montaña en el norte del Valle del Cauca, entre los 1.500 y los 2.800 metros
            de altitud.
          </p>
          <p>
            Sevilla no es un pueblo que se puso de moda. Es un pueblo que lleva más de cien años
            produciendo café, criando gente terca y manteniendo sus caminos de tierra entre las veredas.
            Es exactamente lo que querés encontrar cuando te montás en una gravel y te vas a rodar
            fuera de la ciudad.
          </p>
          <p>
            El parque principal, la iglesia, las fondas, los jeeps Willis subiendo cargados de café —
            todo sigue ahí. Y los caminos que vas a rodar el domingo son los mismos que recorren
            los caficultores todos los días para llegar a sus fincas.
          </p>
        </div>

        {/* Info blocks */}
        <div className="grid md:grid-cols-3 gap-8">
          {INFO_BLOCKS.map((block) => (
            <div key={block.title}>
              <h3
                className="text-[10px] font-bold uppercase tracking-[.3em] mb-4"
                style={{ color: RED }}
              >
                {block.title}
              </h3>
              <ul className="space-y-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                      style={{ background: '#D4C5A9' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-6" style={{ borderColor: '#D4C5A9' }}>
          <p className="text-sm text-muted-foreground">
            ¿Necesitás ayuda con logística, hospedaje o transporte?{' '}
            <a
              href="https://wa.me/573001234567"
              className="font-medium transition-colors"
              style={{ color: RED }}
              onMouseEnter={e => e.currentTarget.style.color = '#6E2D20'}
              onMouseLeave={e => e.currentTarget.style.color = RED}
            >
              Escríbenos por WhatsApp
            </a>{' '}
            y te ayudamos a armar tu plan.
          </p>
        </div>
      </div>
    </section>
  )
}
