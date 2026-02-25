import { useState } from 'react'
import { SectionHeader } from './About'
import { FAQ_ITEMS } from '@/lib/constants'

const A   = '#c47818'
const D   = '#f0e8d8'
const M   = 'rgba(240,232,216,.55)'
const BR  = 'rgba(255,255,255,.08)'

function FAQItem({ item, num }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${BR}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 py-5 text-left"
      >
        <span className="font-title text-base leading-none mt-0.5 flex-shrink-0 w-6 text-right" style={{ color: A }}>
          {String(num).padStart(2, '0')}
        </span>
        <span className="text-sm font-semibold flex-1 leading-snug" style={{ color: D }}>
          {item.q}
        </span>
        <span className="flex-shrink-0 ml-4 text-base" style={{ color: A }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="text-[13px] leading-relaxed pb-5 pl-10 pr-4" style={{ color: M }}>
          {item.a}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  const half  = Math.ceil(FAQ_ITEMS.length / 2)
  const left  = FAQ_ITEMS.slice(0, half)
  const right = FAQ_ITEMS.slice(half)

  return (
    <section id="faq" style={{ background: '#1a1208' }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="Preguntas Frecuentes"
          title="Tienes Dudas, Las Resolvemos"
          desc="Todo lo que necesitas saber antes de inscribirte."
          dark
        />

        <div className="grid lg:grid-cols-2 gap-x-16" style={{ borderTop: `1px solid ${BR}` }}>
          <div>
            {left.map((item, i) => (
              <FAQItem key={i} item={item} num={i + 1} />
            ))}
          </div>
          <div style={{ borderLeft: `1px solid ${BR}`, paddingLeft: '4rem' }}>
            {right.map((item, i) => (
              <FAQItem key={i} item={item} num={i + half + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
