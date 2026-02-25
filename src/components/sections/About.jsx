import { Card, CardContent } from '@/components/ui/card'
import { FEATURES, ABOUT_CARDS } from '@/lib/constants'

function SectionHeader({ tag, title, desc, light = false }) {
  return (
    <div className="text-center mb-16">
      <span className="inline-block bg-primary/15 text-primary px-3.5 py-1 rounded-full text-xs font-bold tracking-[.12em] uppercase mb-3">
        {tag}
      </span>
      <h2 className={`font-title text-5xl lg:text-6xl tracking-wide mb-4 ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
      {desc && (
        <p className="text-muted-foreground max-w-lg mx-auto text-base">{desc}</p>
      )}
    </div>
  )
}

export { SectionHeader }

export default function About() {
  return (
    <section id="sobre" className="py-24">
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
              <strong className="text-white">una experiencia que conecte personas, naturaleza y adrenalina</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
              Los senderos del Zarzo son conocidos por su belleza agreste, sus caminos de tierra batida y sus vistas
              que quitan el aliento. Durante un día completo, los participantes atraviesan bosques, laderas y valles
              que normalmente solo conocen los lugareños.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              Ya sea que compitas por la gloria en la <strong className="text-white">Gravel Race</strong> o que disfrutes del
              paisaje en el <strong className="text-white">Paseo</strong>, garantizamos una experiencia que recordarás toda la vida.
            </p>

            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                    ✓
                  </span>
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
                className="bg-card border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{c.icon}</div>
                  <h3 className="text-white font-bold mb-2">{c.title}</h3>
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
