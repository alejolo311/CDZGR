import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from './About'
import { PODIUM, SPECIAL_PRIZES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const TIER_STYLES = {
  gold:   { border: 'border-yellow-500/40', bg: 'from-yellow-950/60 to-yellow-900/20', bar: 'from-yellow-400 to-orange-400' },
  silver: { border: 'border-slate-400/30',  bg: 'from-slate-900 to-slate-800/30',      bar: 'from-slate-400 to-slate-500' },
  bronze: { border: 'border-orange-900/50', bg: 'from-orange-950/60 to-amber-900/20',  bar: 'from-amber-700 to-yellow-800' },
}

export default function Prizes() {
  return (
    <section id="premios" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Reconocimientos" title="Premios & Trofeos" desc="La gloria tiene recompensa. Aquí está el botín." />

        {/* Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PODIUM.map((p) => {
            const s = TIER_STYLES[p.tier]
            return (
              <Card key={p.tier} className={cn('border relative overflow-hidden text-center hover:-translate-y-1.5 transition-all duration-300', s.border)}>
                {/* top accent bar */}
                <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', s.bar)} />
                <CardContent className={cn('p-8 pt-10 bg-gradient-to-b', s.bg)}>
                  <p className="text-muted-foreground font-bold text-base mb-3">{p.pos}</p>
                  <p className="font-title text-4xl text-white tracking-wide mb-4">{p.amount}</p>
                  <p className="text-muted-foreground text-sm leading-loose mb-3 whitespace-pre-line">{p.desc}</p>
                  <small className="text-muted-foreground text-xs italic">{p.note}</small>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Special prizes */}
        <h3 className="font-title text-4xl text-white tracking-wide mb-8">Premios Especiales</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECIAL_PRIZES.map((sp) => (
            <Card key={sp.title} className="bg-card border-border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <span className="text-3xl block mb-3">{sp.icon}</span>
                <h4 className="text-white font-bold mb-2">{sp.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{sp.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
