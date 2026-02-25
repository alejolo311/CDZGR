import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from './About'
import { WAYPOINTS, ROUTE_RULES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const DOT_STYLE = {
  start: 'bg-emerald-race border-emerald-race',
  end:   'bg-primary border-primary',
  climb: 'bg-primary/40 border-primary',
  feed:  'bg-muted border-border',
}

function Waypoint({ wp, isLast }) {
  return (
    <div className="flex gap-5 pb-7 relative">
      {/* connector line */}
      {!isLast && (
        <div className="absolute left-[9px] top-5 bottom-0 w-px bg-border" />
      )}
      <div className={cn('w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 relative z-10', DOT_STYLE[wp.type])} />
      <div>
        <strong className="text-white text-sm block mb-1">{wp.label}</strong>
        <span className="text-primary text-[11px] block mb-1">{wp.km}</span>
        <p className="text-muted-foreground text-xs leading-relaxed">{wp.desc}</p>
      </div>
    </div>
  )
}

function ElevationSVG({ isGravel }) {
  if (isGravel) {
    return (
      <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-[100px]">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c47818" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c47818" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path d="M0,180 L50,160 L100,140 L160,80 L200,60 L240,40 L280,60 L320,100 L360,120 L400,90 L440,140 L480,160 L520,130 L560,110 L600,90 L640,110 L680,140 L720,160 L800,165 L800,200 L0,200 Z"
          fill="url(#g1)" stroke="#c47818" strokeWidth="1.5" />
        <text x="225" y="30" fill="#c47818" fontSize="10" fontFamily="Inter">Alto del Zarzo 3 050m</text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-[100px]">
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a7aaa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4a7aaa" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path d="M0,160 L80,140 L180,100 L280,75 L360,90 L450,120 L560,140 L680,155 L800,160 L800,200 L0,200 Z"
        fill="url(#g2)" stroke="#4a7aaa" strokeWidth="1.5" />
      <text x="255" y="62" fill="#4a7aaa" fontSize="10" fontFamily="Inter">Loma Verde 2 200m</text>
    </svg>
  )
}

export default function Route() {
  return (
    <section id="ruta" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="El Recorrido"
          title="Conoce la Ruta"
          desc="Cada kilómetro es una historia. Cada subida, un logro."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start mb-16">
          {/* Map placeholder */}
          <Card className="bg-card border-border lg:sticky lg:top-24">
            <CardContent className="p-10 text-center">
              <div className="text-6xl mb-5">🗺️</div>
              <h3 className="text-white font-bold text-xl mb-3">Mapa Interactivo</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                El mapa GPX completo estará disponible 4 semanas antes del evento para todos los inscritos.
              </p>
              <div className="flex flex-col gap-3 mb-4">
                {['📥 Descarga GPX Gravel', '📥 Descarga GPX Paseo'].map((t) => (
                  <button key={t} className="w-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold py-2.5 px-4 rounded-sm hover:bg-primary/20 transition-colors">
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground text-xs italic">Vista previa en Komoot y Strava disponible para inscritos.</p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="gravel">
            <TabsList className="w-full mb-2">
              <TabsTrigger value="gravel" className="flex-1">Gravel Race 120 km</TabsTrigger>
              <TabsTrigger value="paseo"  className="flex-1">El Paseo 45 km</TabsTrigger>
            </TabsList>

            {['gravel', 'paseo'].map((key) => (
              <TabsContent key={key} value={key}>
                <div className="mb-6">
                  {WAYPOINTS[key].map((wp, i, arr) => (
                    <Waypoint key={wp.label} wp={wp} isLast={i === arr.length - 1} />
                  ))}
                </div>
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold mb-3">
                      Perfil de Elevación – {key === 'gravel' ? 'Gravel Race' : 'El Paseo'}
                    </p>
                    <ElevationSVG isGravel={key === 'gravel'} />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Route rules */}
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <h3 className="font-title text-3xl text-white tracking-wide mb-8">Reglamento de Ruta</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ROUTE_RULES.map((r) => (
                <div key={r.icon} className="flex gap-4 border border-border rounded-sm bg-muted/40 p-4">
                  <span className="text-2xl flex-shrink-0">{r.icon}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed"
                     dangerouslySetInnerHTML={{ __html: r.text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
