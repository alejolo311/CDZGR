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
          radial-gradient(ellipse at 15% 55%, rgba(84,165,49,.22) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(46,140,200,.18) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(84,165,49,.10) 0%, transparent 40%),
          linear-gradient(160deg, #060d06 0%, #0a150a 40%, #07101a 100%)
        `,
      }}
    >
      {/* Diagonal terrain lines (topo-map feel) */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      {/* Depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(6,11,6,.75) 100%)' }}
      />
      {/* Mountain silhouette layers */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2 }}>
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full" style={{ height: '300px', display: 'block' }}>
          {/* Far ridge — blue-dark haze */}
          <path
            d="M0,300 L0,210 L60,182 L130,195 L200,155 L270,172 L340,130 L410,152 L480,108 L550,138 L620,92 L690,118 L760,78 L830,105 L900,65 L970,95 L1040,75 L1110,105 L1180,85 L1250,112 L1320,90 L1380,108 L1440,95 L1440,300 Z"
            fill="rgba(10,18,28,0.55)"
          />
          {/* Mid mountains — forest dark */}
          <path
            d="M0,300 L0,245 L90,215 L180,230 L260,190 L350,210 L430,168 L510,192 L590,152 L670,178 L750,148 L830,172 L910,138 L990,162 L1070,182 L1150,158 L1230,178 L1310,160 L1390,192 L1440,175 L1440,300 Z"
            fill="rgba(8,16,8,0.72)"
          />
          {/* Foreground dark slope */}
          <path
            d="M0,300 L0,272 L180,258 L360,265 L480,248 L600,262 L720,252 L850,268 L1000,255 L1160,265 L1300,252 L1440,262 L1440,300 Z"
            fill="rgba(6,10,6,0.88)"
          />
        </svg>
      </div>

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
      <div className="absolute bottom-0 left-0 right-0 bg-primary/10 backdrop-blur-md border-t border-primary/25 py-4 px-6 flex flex-wrap items-center justify-center gap-6 z-10">
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
