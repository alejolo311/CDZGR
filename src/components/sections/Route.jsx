import { useState } from 'react'
import { SectionHeader } from './About'
import { WAYPOINTS, ROUTE_RULES } from '@/lib/constants'

const A = '#c47818'
const B = '#4a7aaa'

const WP_DOT = {
  start: { bg: B,            border: B            },
  end:   { bg: A,            border: A            },
  climb: { bg: 'transparent', border: A           },
  feed:  { bg: 'transparent', border: '#d5c4a4'   },
}

function Waypoint({ wp, isLast }) {
  const dot = WP_DOT[wp.type] || WP_DOT.feed
  return (
    <div className="flex gap-5 pb-6 relative">
      {!isLast && (
        <div className="absolute left-[7px] top-5 bottom-0 w-px" style={{ background: '#d5c4a4' }} />
      )}
      <div
        className="w-[15px] h-[15px] rounded-full flex-shrink-0 mt-1 border-2 relative z-10"
        style={{ background: dot.bg, borderColor: dot.border }}
      />
      <div>
        <strong className="text-foreground text-sm block mb-0.5">{wp.label}</strong>
        <span className="text-xs font-bold block mb-1" style={{ color: A }}>{wp.km}</span>
        <p className="text-muted-foreground text-xs leading-relaxed">{wp.desc}</p>
      </div>
    </div>
  )
}

function ElevationSVG({ isGravel }) {
  const color = isGravel ? A : B
  const fill  = isGravel ? 'rgba(196,120,24,.1)' : 'rgba(74,122,170,.1)'
  const path  = isGravel
    ? 'M0,180 L50,160 L100,140 L160,80 L200,60 L240,40 L280,60 L320,100 L360,120 L400,90 L440,140 L480,160 L520,130 L560,110 L600,90 L640,110 L680,140 L720,160 L800,165 L800,200 L0,200 Z'
    : 'M0,160 L80,140 L180,100 L280,75 L360,90 L450,120 L560,140 L680,155 L800,160 L800,200 L0,200 Z'
  const label = isGravel ? 'Alto del Zarzo 3 050 m' : 'Loma Verde 2 200 m'
  const lx    = isGravel ? 220 : 250
  const ly    = isGravel ? 30  : 60

  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100%', height: 90, display: 'block' }}>
      <path d={path} fill={fill} stroke={color} strokeWidth="1.5" />
      <text x={lx} y={ly} fill={color} fontSize="10" fontFamily="Inter" fontWeight="600">{label}</text>
    </svg>
  )
}

export default function Route() {
  const [tab, setTab] = useState('gravel')
  const isGravel = tab === 'gravel'

  return (
    <section id="ruta" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="El Recorrido"
          title="Conoce la Ruta"
          desc="Cada kilómetro es una historia. Cada subida, un logro."
        />

        {/* Tab toggle */}
        <div className="flex border border-border w-fit mb-6">
          {[
            { k: 'gravel', label: 'Gravel Race 120 km' },
            { k: 'paseo',  label: 'El Paseo 45 km'     },
          ].map(({ k, label }) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className="px-6 py-2 text-[12px] font-bold uppercase tracking-wide transition-colors"
              style={
                tab === k
                  ? { background: k === 'gravel' ? A : B, color: '#fff' }
                  : { background: 'transparent', color: 'hsl(27 20% 42%)' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Elevation chart */}
        <div className="border border-border bg-card p-5 mb-10">
          <p className="text-[10px] font-bold tracking-[.3em] uppercase mb-3 text-muted-foreground">
            Perfil de Elevación
          </p>
          <ElevationSVG isGravel={isGravel} />
        </div>

        {/* Grid: waypoints | map + rules */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          {/* Waypoints */}
          <div>
            <p className="text-[10px] font-bold tracking-[.35em] uppercase mb-5 text-foreground">
              Puntos de Control
            </p>
            {WAYPOINTS[tab].map((wp, i, arr) => (
              <Waypoint key={wp.label} wp={wp} isLast={i === arr.length - 1} />
            ))}
          </div>

          {/* Right: map + rules */}
          <div className="space-y-5">
            <div className="border border-border bg-card p-6 text-center">
              <p className="text-3xl mb-2">🗺️</p>
              <h3 className="font-bold text-foreground text-sm mb-1.5">Mapa GPX</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                Disponible 4 semanas antes del evento para todos los inscritos.
              </p>
              {['↓ GPX Gravel Race', '↓ GPX El Paseo'].map(t => (
                <button
                  key={t}
                  className="w-full border border-border text-muted-foreground text-xs font-semibold py-2 mb-2 hover:text-foreground hover:border-foreground transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="border border-border bg-card overflow-hidden">
              <p className="text-[10px] font-bold tracking-[.35em] uppercase px-5 py-3 text-foreground border-b border-border">
                Reglamento
              </p>
              {ROUTE_RULES.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-5 py-3 text-xs text-muted-foreground"
                  style={{ borderBottom: i < ROUTE_RULES.length - 1 ? '1px solid hsl(35 26% 77%)' : 'none' }}
                >
                  <span>{r.icon}</span>
                  <span dangerouslySetInnerHTML={{
                    __html: r.text.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#170e05">$1</strong>')
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
