import { useCountdown } from '@/hooks/useCountdown'
import { EVENT, STATS } from '@/lib/constants'

const D  = '#f0e8d8'
const M  = 'rgba(240,232,216,.52)'
const A  = '#c47818'
const BG = '#1a1208'

function Num({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[44px]">
      <span className="font-title text-[2.2rem] leading-none" style={{ color: A }}>
        {String(value).padStart(2, '0')}
      </span>
      <small className="text-[9px] tracking-[.28em] uppercase mt-0.5" style={{ color: M }}>
        {label}
      </small>
    </div>
  )
}

export default function Hero() {
  const { days, hours, mins, secs } = useCountdown(EVENT.date)

  const go = href => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{ background: BG }}
    >
      {/* Subtle depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 45%, rgba(10,7,2,.55) 100%)' }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 pt-20 pb-44 max-w-3xl mx-auto w-full">

        {/* Kicker line */}
        <div className="flex items-center justify-center gap-4 mb-7 animate-fade-up">
          <div className="h-px w-10" style={{ background: `rgba(196,120,24,.4)` }} />
          <p className="text-[10px] font-bold tracking-[.45em] uppercase" style={{ color: A }}>
            Edición {EVENT.year} · Gravel Race
          </p>
          <div className="h-px w-10" style={{ background: `rgba(196,120,24,.4)` }} />
        </div>

        {/* Title — scaled down, proportionate */}
        <h1
          className="font-title leading-[0.9] animate-fade-up"
          style={{
            fontSize: 'clamp(3.8rem, 11vw, 8rem)',
            color: D,
            letterSpacing: '0.015em',
            animationDelay: '60ms',
          }}
        >
          CAÍDOS<br />
          <span style={{ color: A }}>DEL ZARZO</span>
        </h1>

        {/* Tagline */}
        <p
          className="mt-5 mb-8 animate-fade-up"
          style={{ color: M, fontSize: '0.95rem', animationDelay: '120ms' }}
        >
          Polvo, adrenalina y gloria entre montañas.
        </p>

        {/* Event meta */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-9 text-sm animate-fade-up"
          style={{ animationDelay: '170ms' }}
        >
          <span style={{ color: D }}>📅 <strong>{EVENT.dateLabel}</strong></span>
          <span style={{ color: M }}>·</span>
          <span style={{ color: D }}>📍 {EVENT.location}</span>
          <span style={{ color: M }}>·</span>
          <span style={{ color: D }}>🚵 2 Categorías</span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3 justify-center animate-fade-up"
          style={{ animationDelay: '220ms' }}
        >
          <button
            onClick={() => go('#inscripcion')}
            className="px-8 py-2.5 font-bold text-sm text-white uppercase tracking-wide transition-colors"
            style={{ background: A }}
            onMouseEnter={e => e.currentTarget.style.background = '#8f5510'}
            onMouseLeave={e => e.currentTarget.style.background = A}
          >
            Inscríbete Ahora
          </button>
          <button
            onClick={() => go('#sobre')}
            className="px-8 py-2.5 font-bold text-sm uppercase tracking-wide border transition-colors"
            style={{ color: D, borderColor: 'rgba(240,232,216,.3)', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = D}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(240,232,216,.3)'}
          >
            Conoce la Ruta
          </button>
        </div>
      </div>

      {/* ── Countdown strip ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-6 flex flex-wrap items-center justify-center gap-8 z-10"
        style={{ borderTop: `1px solid rgba(196,120,24,.18)`, background: 'rgba(14,8,2,.88)' }}
      >
        <span className="text-[10px] tracking-[.3em] uppercase" style={{ color: M }}>
          Faltan para el arranque
        </span>
        <div className="flex items-end gap-3">
          <Num value={days}  label="Días"  />
          <span className="font-title text-xl pb-1 animate-blink" style={{ color: 'rgba(196,120,24,.4)' }}>:</span>
          <Num value={hours} label="Horas" />
          <span className="font-title text-xl pb-1 animate-blink" style={{ color: 'rgba(196,120,24,.4)' }}>:</span>
          <Num value={mins}  label="Min"   />
          <span className="font-title text-xl pb-1 animate-blink" style={{ color: 'rgba(196,120,24,.4)' }}>:</span>
          <Num value={secs}  label="Seg"   />
        </div>
      </div>
    </section>
  )
}

/* ─── Stats Ribbon ───────────────────────────────────────────────────────── */
export function StatsRibbon() {
  return (
    <div style={{ background: A, borderTop: '3px solid #8f5510', borderBottom: '3px solid #8f5510' }}>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex-1 min-w-[130px] py-5 px-4 text-center"
            style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(143,85,16,.45)' : 'none' }}
          >
            <p className="font-title text-3xl text-white leading-none tracking-wide">{s.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] mt-1" style={{ color: 'rgba(255,255,255,.72)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
