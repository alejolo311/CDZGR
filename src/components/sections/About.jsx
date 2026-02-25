import { Card, CardContent } from '@/components/ui/card'
import { FEATURES, ABOUT_CARDS } from '@/lib/constants'

function SectionHeader({ tag, title, desc, dark = false }) {
  return (
    <div className="text-center mb-16">
      {/* Trail-marker style label */}
      <div className="section-label mb-5">
        <span
          className="text-[10px] font-bold tracking-[.38em] uppercase"
          style={{ color: '#c47818' }}
        >
          {tag}
        </span>
      </div>
      <h2
        className="font-title tracking-wide mb-4"
        style={{
          fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
          color: dark ? '#f0e8d8' : 'hsl(var(--foreground))',
        }}
      >
        {title}
      </h2>
      {desc && (
        <p
          className="max-w-lg mx-auto text-base leading-relaxed"
          style={{ color: dark ? 'rgba(240,232,216,0.6)' : 'hsl(var(--muted-foreground))' }}
        >
          {desc}
        </p>
      )}
    </div>
  )
}

export { SectionHeader }

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="La Experiencia"
          title="¿Qué es Caídos del Zarzo?"
          desc="Una aventura en bicicleta diseñada para quienes buscan superarse. Sin importar tu nivel, aquí encontrarás tu reto."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
              Caídos del Zarzo nació de un grupo de ciclistas apasionados que querían crear algo más que una carrera:{' '}
              <strong className="text-foreground">una experiencia que conecte personas, naturaleza y adrenalina</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
              Los senderos del Zarzo son conocidos por su belleza agreste, sus caminos de tierra batida y sus vistas
              que quitan el aliento. Durante un día completo, los participantes atraviesan bosques, laderas y valles
              que normalmente solo conocen los lugareños.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              Ya sea que compitas por la gloria en la <strong className="text-foreground">Gravel Race</strong> o que disfrutes del
              paisaje en el <strong className="text-foreground">Paseo</strong>, garantizamos una experiencia que recordarás toda la vida.
            </p>

            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span
                    className="flex-shrink-0 mt-1.5"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderBottom: '8px solid #c47818',
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_CARDS.map((c) => (
              <Card
                key={c.title}
                className="border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{c.icon}</div>
                  <h3 className="text-foreground font-bold mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
