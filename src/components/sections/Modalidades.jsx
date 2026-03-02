import { SectionHeader } from './About'

const RED   = '#8B3A2A'
const GREEN = '#3A5A3C'

const TROCHA = {
  name: 'La Trocha',
  tag: 'Competitiva',
  cupos: '240 cupos',
  price: '$499.000',
  earlyBird: '$419.000',
  earlyNote: 'primeros 50 inscritos',
  color: RED,
  details: [
    { label: 'Distancia', value: '90–110 km' },
    { label: 'Desnivel +', value: '2.000–2.500 m' },
    { label: 'Cronometrada', value: 'Sí' },
    { label: 'Tiempo estimado', value: '7–10 horas' },
    { label: 'Salida', value: '7:00 AM — masiva' },
  ],
  description: 'Destapados técnicos, subidas cafeteras con porcentajes del 12 al 18%, caminos de finca. El terreno cafetero tiene muchas subidas de 3 a 8 km que nunca te dejan descansar — es más demoledor que una sola subida grande.',
  includes: [
    '3 puntos de hidratación y alimentación en ruta',
    'Mecánico volante en moto',
    'Cronometraje oficial',
  ],
}

const VISITA = {
  name: 'La Visita',
  tag: 'Experiencia',
  cupos: '40 cupos',
  price: '$399.000',
  earlyBird: '$339.000',
  earlyNote: 'primeros 50 inscritos',
  color: GREEN,
  details: [
    { label: 'Distancia', value: '45–60 km' },
    { label: 'Desnivel +', value: '800–1.200 m' },
    { label: 'Cronometrada', value: 'No' },
    { label: 'Tiempo estimado', value: '4–5 horas' },
    { label: 'Salida', value: '7:00 AM — conjunta' },
  ],
  description: 'La ruta pasa por los caminos más lindos, no los más duros. Diseñada como experiencia territorial con paradas en miradores, fincas cafeteras y puntos de cultura local.',
  includes: [
    'Mirador con café recién hecho',
    'Finca cafetera — proceso del grano y el zarzo',
    'Punto con frutas y agua de panela',
    'Solo 40 cupos — íntima y exclusiva',
  ],
}

function ModalityCard({ data }) {
  return (
    <div
      className="border bg-card p-6 md:p-8 flex flex-col"
      style={{ borderColor: '#D4C5A9' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <span
            className="inline-block text-[10px] font-bold tracking-[.3em] uppercase px-2.5 py-1 mb-3"
            style={{ background: data.color, color: '#fff' }}
          >
            {data.tag}
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-foreground">{data.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{data.cupos}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-foreground">{data.price}</p>
          <p className="text-[11px] text-muted-foreground">COP</p>
        </div>
      </div>

      {/* Early bird */}
      <div
        className="text-sm px-4 py-2.5 mb-6"
        style={{ background: 'rgba(139,58,42,0.06)', border: '1px dashed rgba(139,58,42,0.2)' }}
      >
        <span className="font-semibold" style={{ color: RED }}>Early Bird: {data.earlyBird}</span>
        <span className="text-muted-foreground"> — {data.earlyNote}</span>
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
        {data.details.map(d => (
          <div key={d.label}>
            <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-muted-foreground">{d.label}</p>
            <p className="text-sm font-medium text-foreground">{d.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-6">
        {data.description}
      </p>

      {/* Includes */}
      <div className="mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-foreground mb-3">En ruta</p>
        <ul className="space-y-2">
          {data.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: data.color }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Modalidades() {
  return (
    <section id="modalidades" className="py-20 md:py-28" style={{ background: '#FAF7F0' }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Modalidades"
          title="Dos formas de vivir el territorio"
          desc="La Trocha es para competir. La Visita es para sentir. Las dos salen juntas a las 7 de la mañana."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <ModalityCard data={TROCHA} />
          <ModalityCard data={VISITA} />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Ambas modalidades incluyen jersey exclusivo, kit completo y almuerzo del domingo.
        </p>
      </div>
    </section>
  )
}
