import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/useCountdown'
import { EVENT, STATS } from '@/lib/constants'

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[52px]">
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
          radial-gradient(ellipse at 15% 55%, rgba(84,165,49,.2) 0%, transparent 52%),
          radial-gradient(ellipse at 85% 15%, rgba(46,140,200,.16) 0%, transparent 48%),
          radial-gradient(ellipse at 50% 100%, rgba(84,165,49,.12) 0%, transparent 38%),
          linear-gradient(160deg, #060d06 0%, #0a150a 40%, #07101a 100%)
        `,
      }}
    >
      {/* Diagonal terrain contour lines */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Radial depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,9,5,.80) 100%)' }}
      />

      {/* Mountain silhouette layers — far to near */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2 }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full" style={{ height: '320px', display: 'block' }}>
          {/* Far ridge — blue-dark atmosphere haze */}
          <path
            d="M0,320 L0,215 L55,188 L120,202 L195,160 L265,178 L335,135 L405,158 L475,112 L548,140 L620,96 L692,122 L762,80 L835,108 L908,68 L975,98 L1042,78 L1112,108 L1182,88 L1252,115 L1322,93 L1382,110 L1440,98 L1440,320 Z"
            fill="rgba(8,14,24,0.52)"
          />
          {/* Mid mountains — deep forest */}
          <path
            d="M0,320 L0,250 L85,218 L175,235 L258,195 L345,215 L428,172 L512,198 L594,155 L675,182 L752,150 L832,175 L912,140 L992,165 L1072,185 L1152,160 L1232,182 L1312,162 L1392,196 L1440,178 L1440,320 Z"
            fill="rgba(7,14,7,0.74)"
          />
          {/* Near dark slope with mist at base */}
          <path
            d="M0,320 L0,278 L175,262 L355,270 L478,252 L598,267 L718,256 L848,272 L1002,258 L1162,268 L1305,256 L1440,266 L1440,320 Z"
            fill="rgba(5,9,5,0.90)"
          />
          {/* Mist / ground fog layer */}
          <path
            d="M0,320 L0,305 L360,298 L720,302 L1080,298 L1440,303 L1440,320 Z"
            fill="rgba(84,165,49,0.04)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-28 pb-52 max-w-4xl mx-auto">

        {/* Label: horizontal rule style, not a tech pill */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-primary/70" />
          <p className="text-primary text-[10px] font-bold tracking-[.32em] uppercase whitespace-nowrap">
            Edición {EVENT.year} · Gravel Race
          </p>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-primary/70" />
        </div>

        <h1
          className="font-title leading-none text-white mb-6 animate-fade-up"
          style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', animationDelay: '100ms' }}
        >
          CAÍDOS<br />
          <span className="text-primary">DEL ZARZO</span>
        </h1>

        <p
          className="text-white/60 mb-10 animate-fade-up"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', animationDelay: '200ms' }}
        >
          Polvo, adrenalina y gloria entre montañas.
        </p>

        {/* Meta info — organic flow, no "app box" */}
        <div
          className="flex flex-wrap items-center justify-center mb-10 animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          {[
            { icon: '📅', label: EVENT.dateLabel,    sub: 'Fecha del evento'   },
            { icon: '📍', label: 'Punto de Partida', sub: EVENT.location        },
            { icon: '🚵', label: '2 Categorías',     sub: 'Gravel Race & Paseo' },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <span className="text-primary/30 px-4 hidden sm:block text-xl select-none">·</span>
              )}
              <div className="flex items-center gap-2.5 px-4 py-2">
                <span className="text-xl">{item.icon}</span>
                <div className="text-left">
                  <strong className="text-sm text-white block leading-snug">{item.label}</strong>
                  <small className="text-[11px] text-muted-foreground block leading-snug">{item.sub}</small>
                </div>
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
      <div className="absolute bottom-0 left-0 right-0 bg-[#05090505] backdrop-blur-md border-t border-primary/20 py-4 px-6 flex flex-wrap items-center justify-center gap-6 z-10">
        <p className="text-muted-foreground text-xs tracking-widest uppercase">Faltan para el arranque</p>
        <div className="flex items-center gap-2">
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

/* StatsRibbon: carved stone, not a flat green LED bar */
export function StatsRibbon() {
  return (
    <div
      className="flex flex-wrap justify-center border-y border-primary/18"
      style={{ background: 'linear-gradient(135deg, #060e06 0%, #07120a 50%, #060e06 100%)' }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center flex-1 min-w-[140px] py-7 px-4 border-r border-primary/12 last:border-r-0 gap-1.5"
        >
          <strong className="font-title text-3xl text-primary tracking-wide">{s.value}</strong>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[.22em]">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
