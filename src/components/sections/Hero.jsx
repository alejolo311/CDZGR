import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT, STATS } from '@/lib/constants'

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[56px]">
      <span className="font-title text-4xl text-primary leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <small className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</small>
    </div>
  )
}

function Sep() {
  return <span className="font-title text-3xl text-primary/50 animate-blink pb-1">:</span>
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(249,115,22,.18) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(34,197,94,.10) 0%, transparent 50%),
          linear-gradient(160deg, #0a0a0a 0%, #111 50%, #0f1a0f 100%)
        `,
      }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      {/* Radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,.7) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-28 pb-52 max-w-4xl mx-auto">
        <p className="text-primary text-xs font-bold tracking-[.2em] uppercase mb-4 animate-fade-up">
          Edición {EVENT.year} &nbsp;·&nbsp; Gravel Race
        </p>

        <h1
          className="font-title leading-none text-white mb-6 animate-fade-up"
          style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', animationDelay: '100ms' }}
        >
          CAÍDOS<br />
          <span className="text-primary">DEL ZARZO</span>
        </h1>

        <p
          className="text-white/65 mb-10 animate-fade-up"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', animationDelay: '200ms' }}
        >
          Polvo, adrenalina y gloria entre montañas.
        </p>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center justify-center gap-0 mb-10 bg-white/4 border border-border rounded-2xl px-8 py-5 animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          {[
            { icon: '📅', label: EVENT.dateLabel,   sub: 'Fecha del evento' },
            { icon: '📍', label: 'Punto de Partida', sub: EVENT.location },
            { icon: '🚵', label: '2 Categorías',     sub: 'Gravel Race & Paseo' },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className="w-px h-12 bg-border mx-6 hidden sm:block" />}
              <div className="flex flex-col items-center gap-1 px-4 py-2">
                <span className="text-2xl">{item.icon}</span>
                <strong className="text-sm text-white">{item.label}</strong>
                <small className="text-[11px] text-muted-foreground">{item.sub}</small>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: '400ms' }}>
          <Button size="lg" onClick={() => scrollTo('#inscripcion')}>Inscríbete Ahora</Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo('#sobre')}>Conoce la Ruta</Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-44 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-[11px] tracking-widest uppercase z-10">
        <span>Desplaza</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent animate-scroll-pulse" />
      </div>

      {/* Countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/12 backdrop-blur-md border-t border-primary/30 py-4 px-6 flex flex-wrap items-center justify-center gap-6 z-10">
        <p className="text-muted-foreground text-xs tracking-widest uppercase">Faltan para el arranque</p>
        <div className="flex items-center gap-2">
          <CountdownBlock value={days}  label="Días" />
          <Sep />
          <CountdownBlock value={hours} label="Horas" />
          <Sep />
          <CountdownBlock value={mins}  label="Min" />
          <Sep />
          <CountdownBlock value={secs}  label="Seg" />
        </div>
      </div>
    </section>
  )
}

export function StatsRibbon() {
  return (
    <div className="flex flex-wrap justify-center bg-primary">
      {STATS.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center flex-1 min-w-[140px] py-6 px-4 border-r border-white/20 last:border-r-0 gap-1"
        >
          <strong className="font-title text-3xl text-white tracking-wide">{s.value}</strong>
          <span className="text-xs text-white/80 font-medium">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
