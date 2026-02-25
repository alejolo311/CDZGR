import { SectionHeader } from './About'

const A = '#c47818'

const TIERS = [
  { label: 'Oro',    count: 2, h: 64, w: 160 },
  { label: 'Plata',  count: 3, h: 52, w: 130 },
  { label: 'Bronce', count: 4, h: 44, w: 110 },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Aliados"
          title="Patrocinadores & Aliados"
          desc="Empresas que hacen posible esta carrera."
        />

        <div className="space-y-12">
          {TIERS.map(tier => (
            <div key={tier.label}>
              <p className="text-[10px] font-bold tracking-[.4em] uppercase mb-5 text-muted-foreground">
                {tier.label}
              </p>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: tier.count }).map((_, i) => (
                  <div
                    key={i}
                    className="border-2 border-dashed border-border flex items-center justify-center text-muted-foreground font-bold text-xs tracking-widest uppercase"
                    style={{ width: tier.w, height: tier.h }}
                  >
                    SPONSOR
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            ¿Quieres ser patrocinador?{' '}
            <a href="mailto:patrocinios@caidosdelzarzo.co" className="font-bold hover:underline" style={{ color: A }}>
              Contáctanos aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
