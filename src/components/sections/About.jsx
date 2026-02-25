import { FEATURES, ABOUT_CARDS } from '@/lib/constants'

/* ─── SectionHeader — exported and used by all sections ─────────────────────
   dark=false → light section (cream bg)
   dark=true  → dark section (#1a1208 bg)
──────────────────────────────────────────────────────────────────────────── */
const A = '#c47818'

export function SectionHeader({ tag, title, desc, dark = false, center = false }) {
  const textColor   = dark ? '#f0e8d8'               : '#170e05'
  const mutedColor  = dark ? 'rgba(240,232,216,.52)'  : '#7a6545'

  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      <p
        className="text-[10px] font-bold tracking-[.45em] uppercase mb-3"
        style={{ color: A }}
      >
        {tag}
      </p>
      <h2
        className="font-title leading-none"
        style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', color: textColor, letterSpacing: '0.02em' }}
      >
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-[15px] leading-relaxed max-w-xl" style={{ color: mutedColor }}>
          {desc}
        </p>
      )}
    </div>
  )
}

/* ─── About section (CREAM) ──────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="La Experiencia"
          title="¿Qué es Caídos del Zarzo?"
          desc="Una aventura en bicicleta para quienes buscan superarse. Sin importar tu nivel, aquí encontrarás tu reto."
        />

        {/* Top grid: text + feature list */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 mb-16">
          {/* Left: paragraphs */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
              Caídos del Zarzo nació de un grupo de ciclistas apasionados que querían crear algo más que una carrera:{' '}
              <strong className="text-foreground">una experiencia que conecte personas, naturaleza y adrenalina</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
              Los senderos del Zarzo son conocidos por su belleza agreste, sus caminos de tierra batida y sus vistas
              que quitan el aliento. Durante un día completo, los participantes atraviesan bosques, laderas y valles.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              Ya sea en la <strong className="text-foreground">Gravel Race</strong> o en el{' '}
              <strong className="text-foreground">Paseo</strong>, garantizamos una experiencia que recordarás toda la vida.
            </p>
          </div>

          {/* Right: feature list */}
          <div>
            <p className="text-[10px] font-bold tracking-[.35em] uppercase mb-4 text-foreground">
              Incluye en tu inscripción
            </p>
            <ul className="space-y-2">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-muted-foreground border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="font-title text-lg leading-none" style={{ color: A }}>{String(i + 1).padStart(2, '0')}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: 4 cards as a horizontal strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
          {ABOUT_CARDS.map((c, i) => (
            <div
              key={i}
              className="p-6 bg-card border-r border-border last:border-r-0"
            >
              <span className="text-3xl block mb-3">{c.icon}</span>
              <h3 className="font-bold text-foreground text-sm mb-1.5">{c.title}</h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
