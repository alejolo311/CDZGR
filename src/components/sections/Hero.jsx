import { useCountdown } from '@/hooks/useCountdown'
import { EVENT, STATS } from '@/lib/constants'

const CREAM  = '#F2EAD8'
const MUTED  = 'rgba(242,234,216,0.55)'
const RED    = '#8B3A2A'
const BG     = '#1A120B'

const YT_SRC =
  'https://www.youtube.com/embed/YB4uTprpz7g' +
  '?autoplay=1&mute=1&loop=1&playlist=YB4uTprpz7g' +
  '&controls=0&showinfo=0&rel=0&modestbranding=1' +
  '&playsinline=1&iv_load_policy=3&disablekb=1'

function Num({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[44px]">
      <span className="font-display text-[2rem] leading-none" style={{ color: RED }}>
        {String(value).padStart(2, '0')}
      </span>
      <small className="text-[9px] tracking-[.28em] uppercase mt-0.5" style={{ color: MUTED }}>
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* YouTube background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <iframe
            src={YT_SRC}
            title="Background video"
            allow="autoplay; fullscreen"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
      </div>

      {/* Overlay 1: warm base darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'rgba(8, 3, 0, 0.48)' }}
      />

      {/* Overlay 2: radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: [
            'radial-gradient(ellipse 90% 65% at 50% 42%, transparent 30%, rgba(6,2,0,.62) 100%)',
            'linear-gradient(to bottom, rgba(6,2,0,.18) 0%, transparent 25%, transparent 55%, rgba(6,2,0,.72) 100%)',
          ].join(', '),
        }}
      />

      {/* Content */}
      <div className="relative text-center px-6 pt-24 pb-36 max-w-3xl mx-auto w-full" style={{ zIndex: 10 }}>

        {/* Kicker */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up">
          <div className="h-px w-12" style={{ background: 'rgba(139,58,42,0.4)' }} />
          <p className="text-[10px] font-semibold tracking-[.45em] uppercase" style={{ color: RED }}>
            Gravel Race · {EVENT.dateLabel}
          </p>
          <div className="h-px w-12" style={{ background: 'rgba(139,58,42,0.4)' }} />
        </div>

        {/* Title */}
        <h1
          className="font-display leading-[0.92] animate-fade-up"
          style={{
            fontSize: 'clamp(3.2rem, 10vw, 7rem)',
            color: CREAM,
            letterSpacing: '0.01em',
            animationDelay: '60ms',
          }}
        >
          Caídos<br />
          <span style={{ color: RED }}>del Zarzo</span>
        </h1>

        {/* Tagline */}
        <p
          className="mt-7 mb-3 animate-fade-up font-display italic leading-relaxed"
          style={{
            color: 'rgba(242,234,216,0.75)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            animationDelay: '120ms',
            maxWidth: '520px',
            margin: '1.75rem auto 0.75rem',
          }}
        >
          Esto no es una carrera de gravel con pueblo de fondo.
        </p>
        <p
          className="mb-8 animate-fade-up font-display italic leading-relaxed"
          style={{
            color: CREAM,
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            animationDelay: '150ms',
            maxWidth: '520px',
            margin: '0 auto 2rem',
          }}
        >
          Es un pueblo cafetero con carrera de gravel incluida.
        </p>

        {/* Location */}
        <p
          className="text-sm mb-10 animate-fade-up"
          style={{ color: MUTED, animationDelay: '180ms' }}
        >
          Sevilla, Valle del Cauca, Colombia · 280 cupos
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '220ms' }}
        >
          <button
            onClick={() => go('#inscripcion')}
            className="px-8 py-3 font-semibold text-sm text-white tracking-wide transition-colors"
            style={{ background: RED }}
            onMouseEnter={e => e.currentTarget.style.background = '#6E2D20'}
            onMouseLeave={e => e.currentTarget.style.background = RED}
          >
            Inscríbete
          </button>
          <button
            onClick={() => go('#modalidades')}
            className="px-8 py-3 font-semibold text-sm tracking-wide border transition-colors"
            style={{ color: CREAM, borderColor: 'rgba(242,234,216,0.25)', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = CREAM}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(242,234,216,0.25)'}
          >
            Conocé las rutas
          </button>
        </div>
      </div>

      {/* Countdown strip */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-6 flex flex-wrap items-center justify-center gap-8"
        style={{
          zIndex: 10,
          borderTop: '1px solid rgba(139,58,42,0.2)',
          background: 'rgba(10,4,0,0.85)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <span className="text-[10px] tracking-[.3em] uppercase" style={{ color: MUTED }}>
          Faltan
        </span>
        <div className="flex items-end gap-3">
          <Num value={days}  label="Días"  />
          <span className="font-display text-xl pb-1 animate-blink" style={{ color: 'rgba(139,58,42,0.4)' }}>:</span>
          <Num value={hours} label="Horas" />
          <span className="font-display text-xl pb-1 animate-blink" style={{ color: 'rgba(139,58,42,0.4)' }}>:</span>
          <Num value={mins}  label="Min"   />
          <span className="font-display text-xl pb-1 animate-blink" style={{ color: 'rgba(139,58,42,0.4)' }}>:</span>
          <Num value={secs}  label="Seg"   />
        </div>
      </div>
    </section>
  )
}

/* ─── Stats Ribbon ───────────────────────────────────────────────────────── */
export function StatsRibbon() {
  return (
    <div style={{ background: RED, borderTop: '3px solid #6E2D20', borderBottom: '3px solid #6E2D20' }}>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex-1 min-w-[110px] py-4 px-3 text-center"
            style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(110,45,32,0.5)' : 'none' }}
          >
            <p className="font-display text-2xl text-white leading-none">{s.value}</p>
            <p className="text-[9px] font-semibold uppercase tracking-[.2em] mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
