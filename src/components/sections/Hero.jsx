import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT, STATS } from '@/lib/constants'

const D = '#f0e8d8'           /* warm cream text  */
const M = 'rgba(240,232,216,.52)' /* muted           */
const A = '#c47818'           /* amber accent     */
const BG = '#1a1208'          /* warm dark bg     */

function Num({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[48px]">
      <span className="font-title text-[2.6rem] leading-none" style={{ color: A }}>
        {String(value).padStart(2, '0')}
      </span>
      <small className="text-[9px] tracking-[.3em] uppercase mt-0.5" style={{ color: M }}>
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
      {/* Subtle warm vignette — no glow, just depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(10,7,2,.5) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-24 pb-48 max-w-5xl mx-auto w-full">

        {/* Kicker */}
        <p
          className="text-[10px] font-bold tracking-[.5em] uppercase mb-6 animate-fade-up"
          style={{ color: A }}
        >
          Edición {EVENT.year} · Gravel Race
        </p>

        {/* Main title */}
        <h1
          className="font-title leading-[0.92] animate-fade-up"
          style={{
            fontSize: 'clamp(5rem, 18vw, 13rem)',
            color: D,
            letterSpacing: '0.015em',
            animationDelay: '60ms',
          }}
        >
          CAÍDOS<br />
          <span style={{ color: A }}>DEL ZARZO</span>
        </h1>

        {/* Rule */}
        <div className="my-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="h-px mx-auto max-w-xs" style={{ background: `rgba(196,120,24,.35)` }} />
        </div>

        {/* Event meta — clean row, no boxes */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10 animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          <span className="text-sm" style={{ color: D }}>
            📅 <strong>{EVENT.dateLabel}</strong>
          </span>
          <span style={{ color: M }}>·</span>
          <span className="text-sm" style={{ color: D }}>
            📍 {EVENT.location}
          </span>
          <span style={{ color: M }}>·</span>
          <span className="text-sm" style={{ color: D }}>
            🚵 2 Categorías
          </span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          <button
            onClick={() => go('#inscripcion')}
            className="px-9 py-3 font-bold text-sm text-white tracking-wide uppercase transition-colors"
            style={{ background: A }}
            onMouseEnter={e => e.currentTarget.style.background = '#8f5510'}
            onMouseLeave={e => e.currentTarget.style.background = A}
          >
            Inscríbete Ahora
          </button>
          <button
            onClick={() => go('#sobre')}
            className="px-9 py-3 font-bold text-sm tracking-wide uppercase border transition-colors"
            style={{ color: D, borderColor: 'rgba(240,232,216,.3)', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = D }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,232,216,.3)' }}
          >
            Conoce la Ruta
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-40 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: M }}
      >
        <div className="w-px h-10 animate-scroll-pulse" style={{ background: `linear-gradient(to bottom, ${A}, transparent)` }} />
      </div>

      {/* Countdown strip */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-6 flex flex-wrap items-center justify-center gap-8 z-10"
        style={{ borderTop: `1px solid rgba(196,120,24,.2)`, background: 'rgba(16,9,2,.85)' }}
      >
        <span className="text-[10px] tracking-[.3em] uppercase" style={{ color: M }}>
          Faltan para el arranque
        </span>
        <div className="flex items-end gap-3">
          <Num value={days}  label="Días"  />
          <span className="font-title text-2xl pb-1 animate-blink" style={{ color: `rgba(196,120,24,.45)` }}>:</span>
          <Num value={hours} label="Horas" />
          <span className="font-title text-2xl pb-1 animate-blink" style={{ color: `rgba(196,120,24,.45)` }}>:</span>
          <Num value={mins}  label="Min"   />
          <span className="font-title text-2xl pb-1 animate-blink" style={{ color: `rgba(196,120,24,.45)` }}>:</span>
          <Num value={secs}  label="Seg"   />
        </div>
      </div>
    </section>
  )
}

/* ─── Stats Ribbon ──────────────────────────────────────────────────────────── */
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
