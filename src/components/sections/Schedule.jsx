import { useState } from 'react'
import { SectionHeader } from './About'
import { SCHEDULE } from '@/lib/constants'

const A = '#c47818'
const D = '#f0e8d8'
const M = 'rgba(240,232,216,.55)'
const BORDER = 'rgba(255,255,255,.08)'

function TimelineItem({ item }) {
  return (
    <div
      className="grid grid-cols-[100px_1fr] gap-6 py-5"
      style={{
        borderBottom: `1px solid ${BORDER}`,
        borderLeft: item.highlight ? `3px solid ${A}` : '3px solid transparent',
        paddingLeft: item.highlight ? '16px' : '16px',
      }}
    >
      <span className="font-title text-lg tracking-wide" style={{ color: A }}>{item.time}</span>
      <div>
        <h4 className="text-sm font-bold mb-1" style={{ color: D }}>{item.title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: M }}>{item.desc}</p>
      </div>
    </div>
  )
}

export default function Schedule() {
  const [day, setDay] = useState('sabado')

  return (
    <section id="cronograma" style={{ background: '#1a1208' }} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="Agenda"
          title="Cronograma del Evento"
          desc="Organiza tu fin de semana con todos los detalles del día de la carrera."
          dark
        />

        {/* Day selector */}
        <div className="flex border w-fit mb-8" style={{ borderColor: BORDER }}>
          {[
            { k: 'sabado',  label: 'Sáb 13 Jun — Pre-Carrera' },
            { k: 'domingo', label: 'Dom 14 Jun — Día de Carrera' },
          ].map(({ k, label }) => (
            <button
              key={k}
              onClick={() => setDay(k)}
              className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-colors"
              style={
                day === k
                  ? { background: A, color: '#fff' }
                  : { background: 'transparent', color: M }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ borderTop: `1px solid ${BORDER}` }}>
          {SCHEDULE[day].map(item => (
            <TimelineItem key={item.time} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
