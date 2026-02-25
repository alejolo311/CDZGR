import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SectionHeader } from './About'
import { CATEGORIES } from '@/lib/constants'

function CategoryCard({ cat, isGravel }) {
  const borderColor = isGravel ? 'border-orange/30' : 'border-emerald-race/30'
  const bg = isGravel
    ? 'linear-gradient(135deg, #06130a 0%, #0b2010 100%)'
    : 'linear-gradient(135deg, #060a14 0%, #0a1020 100%)'
  const accentColor = isGravel ? 'text-primary' : 'text-emerald-race'
  const badgeVariant = isGravel ? 'default' : 'success'
  const btnVariant = isGravel ? 'default' : 'success'
  const tagClass = isGravel
    ? 'bg-primary/15 text-primary'
    : 'bg-emerald-race/15 text-emerald-race'

  return (
    <Card className={`border ${borderColor} relative overflow-hidden flex flex-col`} style={{ background: bg }}>
      <CardContent className="p-8 flex flex-col gap-6 flex-1">
        {/* Badge */}
        <Badge variant={badgeVariant} className="w-fit">{cat.badge}</Badge>

        {/* Icon + name */}
        <div className="text-center">
          <div className="text-6xl mb-3">{cat.icon}</div>
          <h3 className="font-title text-4xl text-white tracking-wide">{cat.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{cat.subtitle}</p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-3">
          {cat.specs.map((s) => (
            <div key={s.label} className="bg-muted/60 rounded-sm px-4 py-3 flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
              <strong className={`text-sm ${accentColor}`}>{s.value}</strong>
            </div>
          ))}
        </div>

        <Separator className="bg-border/60" />

        {/* Kit */}
        <div>
          <h4 className="text-white text-sm font-bold mb-3">¿Qué incluye?</h4>
          <ul className="space-y-2">
            {cat.kit.map((k) => (
              <li key={k} className={`text-xs text-muted-foreground before:content-['→_'] ${accentColor} before:mr-1`}>
                {k}
              </li>
            ))}
          </ul>
        </div>

        {/* Subcats */}
        <div>
          <h4 className="text-white text-sm font-bold mb-3">
            {isGravel ? 'Subcategorías por edad' : 'Abierto a todos'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {cat.subcats.map((s) => (
              <span key={s} className={`text-[11px] font-semibold px-3 py-1 rounded-full ${tagClass}`}>{s}</span>
            ))}
          </div>
        </div>

        {cat.note && <p className="text-[11px] text-muted-foreground italic">{cat.note}</p>}

        {/* CTA */}
        <Button variant={btnVariant} className="w-full mt-auto" onClick={() => document.querySelector('#inscripcion')?.scrollIntoView({ behavior: 'smooth' })}>
          Inscribirse – {cat.name}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Categories() {
  return (
    <section id="categorias" className="py-24 bg-accent">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Modalidades"
          title="Elige tu Aventura"
          desc="Dos caminos, una sola misión: llegar al final con una sonrisa."
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <CategoryCard cat={CATEGORIES.gravel} isGravel={true} />
          <CategoryCard cat={CATEGORIES.paseo}  isGravel={false} />
        </div>

        {/* Bike recommendations */}
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <h3 className="font-title text-3xl text-white tracking-wide text-center mb-8">
              Bicicleta Recomendada
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  label: 'Gravel Race', color: 'text-primary', bg: 'bg-primary/15',
                  items: ['Bicicleta de Gravel o MTB', 'Neumáticos 35mm+ (recomendado 40–47mm)', 'Frenos de disco obligatorios', 'Luces delantera y trasera', 'Al menos 1 bidón o sistema de hidratación'],
                },
                {
                  label: 'El Paseo', color: 'text-emerald-race', bg: 'bg-emerald-race/15',
                  items: ['Cualquier bicicleta de terreno variado', 'MTB, Gravel, Cicloturista, Híbrida', 'Neumáticos 35mm+ recomendado', 'Luces recomendadas', 'Al menos 1 bidón'],
                },
              ].map((b) => (
                <div key={b.label}>
                  <span className={`inline-block ${b.bg} ${b.color} text-sm font-bold px-4 py-1.5 rounded-full mb-4`}>
                    {b.label}
                  </span>
                  <ul className="space-y-2">
                    {b.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex gap-2">
                        <span className={`${b.color} mt-0.5`}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
