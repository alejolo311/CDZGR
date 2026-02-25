import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT, STATS } from '@/lib/constants'

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[52px]">
      <span
        className="font-title text-4xl leading-none"
        style={{ color: '#c47818' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <small className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'rgba(240,232,216,0.55)' }}>
        {label}
      </small>
    </div>
  )
}

function Sep() {
  return (
    <span className="font-title text-2xl pb-1 animate-blink" style={{ color: 'rgba(196,120,24,0.5)' }}>
      :
    </span>
  )
}

export default function Hero() {
  const { days, hours, mins, secs } = useCountdown(EVENT.date)

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grain"
      style={{ background: 'linear-gradient(175deg, #1a1208 0%, #16100a 55%, #1c1510 100%)' }}
    >
      {/* Faint warm vignette — depth without glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,6,2,0.65) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-28 pb-52 max-w-4xl mx-auto">

        {/* Edition label */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up">
          <div className="h-px w-16" style={{ background: 'rgba(196,120,24,0.5)' }} />
          <p
            className="text-[10px] font-bold tracking-[.35em] uppercase whitespace-nowrap"
            style={{ color: '#c47818' }}
          >
            Edición {EVENT.year} · Gravel Race
          </p>
          <div className="h-px w-16" style={{ background: 'rgba(196,120,24,0.5)' }} />
        </div>

        {/* Main title */}
        <h1
          className="font-title leading-none mb-6 animate-fade-up"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 11rem)',
            color: '#f0e8d8',
            animationDelay: '80ms',
            letterSpacing: '0.02em',
          }}
        >
          CAÍDOS<br />
          <span style={{ color: '#c47818' }}>DEL ZARZO</span>
        </h1>

        {/* Tagline */}
        <p
          className="mb-10 animate-fade-up"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: 'rgba(240,232,216,0.6)',
            animationDelay: '160ms',
          }}
        >
          Polvo, adrenalina y gloria entre montañas.
        </p>

        {/* Meta info — no boxes, just text */}
        <div
          className="flex flex-wrap items-start justify-center gap-x-8 gap-y-4 mb-12 animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          {[
            { label: EVENT.dateLabel,    sub: 'Fecha del evento'   },
            { label: 'Punto de Partida', sub: EVENT.location        },
            { label: '2 Categorías',     sub: 'Gravel Race & Paseo' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <strong className="block text-sm font-bold" style={{ color: '#f0e8d8' }}>
                {item.label}
              </strong>
              <small className="block text-[11px]" style={{ color: 'rgba(240,232,216,0.45)' }}>
                {item.sub}
              </small>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '320ms' }}
        >
          <Button size="lg" onClick={() => scrollTo('#inscripcion')}>
            Inscríbete Ahora
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo('#sobre')}>
            Conoce la Ruta
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-44 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase z-10"
        style={{ color: 'rgba(240,232,216,0.35)' }}
      >
        <span>Desplaza</span>
        <div
          className="w-px h-10 animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, #c47818, transparent)' }}
        />
      </div>

      {/* Countdown — simple bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-6 flex flex-wrap items-center justify-center gap-6 z-10 border-t"
        style={{
          background: 'rgba(22,16,10,0.92)',
          borderColor: 'rgba(196,120,24,0.18)',
        }}
      >
        <p
          className="text-[10px] tracking-widest uppercase"
          style={{ color: 'rgba(240,232,216,0.45)' }}
        >
          Faltan para el arranque
        </p>
        <div className="flex items-center gap-3">
          <CountdownBlock value={days}  label="Días"  />
          <Sep />
          <CountdownBlock value={hours} label="Horas" />
          <Sep />
          <CountdownBlock value={mins}  label="Min"   />
          <Sep />
          <CountdownBlock value={secs}  label="Seg"   />
        </div>
      </div>
    </section>
  )
}

/* Stats ribbon — warm amber stripe, like a race highlight */
export function StatsRibbon() {
  return (
    <div
      className="flex flex-wrap justify-center border-y"
      style={{
        background: '#c47818',
        borderColor: '#8f5510',
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center flex-1 min-w-[140px] py-6 px-4 gap-0.5"
          style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(143,85,16,0.4)' : 'none' }}
        >
          <strong className="font-title text-3xl tracking-wide text-white">{s.value}</strong>
          <span
            className="text-[10px] font-semibold uppercase tracking-[.2em]"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}
