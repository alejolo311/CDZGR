import { SectionHeader } from './About'
import { PODIUM, SPECIAL_PRIZES } from '@/lib/constants'

const A = '#c47818'

const TIER = {
  gold:   { accent: '#e0b040', label: '1er Lugar' },
  silver: { accent: '#9eaab4', label: '2do Lugar' },
  bronze: { accent: '#a86c3a', label: '3er Lugar' },
}

export default function Prizes() {
  return (
    <section id="premios" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Reconocimientos"
          title="Premios & Trofeos"
          desc="La gloria tiene recompensa. Aquí está el botín."
        />

        {/* Podium — three clean columns with big amounts */}
        <div className="grid md:grid-cols-3 gap-0 border border-border mb-16">
          {PODIUM.map((p, i) => {
            const t = TIER[p.tier]
            return (
              <div
                key={p.tier}
                className="p-8 text-center"
                style={{
                  borderRight: i < 2 ? '1px solid hsl(35 26% 77%)' : 'none',
                  borderTop: `3px solid ${t.accent}`,
                }}
              >
                <p className="text-[11px] font-bold tracking-[.3em] uppercase mb-3 text-muted-foreground">{p.pos}</p>
                <p className="font-title leading-none mb-4" style={{ fontSize: 'clamp(2.4rem,5vw,3.5rem)', color: t.accent }}>
                  {p.amount}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2 whitespace-pre-line">{p.desc}</p>
                <p className="text-xs italic text-muted-foreground">{p.note}</p>
              </div>
            )
          })}
        </div>

        {/* Special prizes */}
        <p className="text-[10px] font-bold tracking-[.4em] uppercase mb-6 text-foreground">
          Premios Especiales
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {SPECIAL_PRIZES.map((sp, i) => (
            <div
              key={sp.title}
              className="p-6 bg-card"
              style={{
                borderRight:  (i + 1) % 3 !== 0 && i < SPECIAL_PRIZES.length - 1 ? '1px solid hsl(35 26% 77%)' : 'none',
                borderBottom: i < SPECIAL_PRIZES.length - 3 ? '1px solid hsl(35 26% 77%)' : 'none',
              }}
            >
              <span className="text-2xl block mb-2">{sp.icon}</span>
              <h4 className="font-bold text-foreground text-sm mb-1.5">{sp.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{sp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
