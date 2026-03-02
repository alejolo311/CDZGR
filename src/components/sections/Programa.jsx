import { useState } from 'react'
import { SectionHeader } from './About'
import { SCHEDULE } from '@/lib/constants'

const RED    = '#8B3A2A'
const CREAM  = '#F2EAD8'
const MUTED  = 'rgba(242,234,216,0.5)'
const BORDER = 'rgba(255,255,255,0.07)'

function TimelineItem({ item }) {
  return (
    <div
      className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] gap-4 sm:gap-6 py-5"
      style={{
        borderBottom: `1px solid ${BORDER}`,
        borderLeft: item.highlight ? `3px solid ${RED}` : '3px solid transparent',
        paddingLeft: '16px',
      }}
    >
      <span
        className="font-display text-base sm:text-lg"
        style={{ color: item.highlight ? RED : 'rgba(242,234,216,0.65)' }}
      >
        {item.time}
      </span>
      <div>
        <h4 className="text-sm font-semibold mb-1" style={{ color: CREAM }}>{item.title}</h4>
        <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{item.desc}</p>
      </div>
    </div>
  )
}

export default function Programa() {
  const [day, setDay] = useState('sabado')

  return (
    <section id="programa" style={{ background: '#1A120B' }} className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="Programa"
          title="El Fin de Semana"
          desc="Esto no es solo un domingo de carrera. Es un fin de semana completo en Sevilla."
          dark
        />

        {/* Day selector */}
        <div className="flex border w-fit mb-8" style={{ borderColor: BORDER }}>
          {[
            { k: 'sabado',  label: 'Sábado 19 — Llegada' },
            { k: 'domingo', label: 'Domingo 20 — Ruta' },
          ].map(({ k, label }) => (
            <button
              key={k}
              onClick={() => setDay(k)}
              className="px-5 sm:px-6 py-2.5 text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide transition-colors"
              style={
                day === k
                  ? { background: RED, color: '#fff' }
                  : { background: 'transparent', color: MUTED }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ borderTop: `1px solid ${BORDER}` }}>
          {SCHEDULE[day].map((item, i) => (
            <TimelineItem key={`${day}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
