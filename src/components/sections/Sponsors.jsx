import { SectionHeader } from './About'

const TIERS = [
  { label: '🥇 Oro',    count: 2, size: 'py-6 px-12 text-sm' },
  { label: '🥈 Plata',  count: 3, size: 'py-5 px-9 text-xs' },
  { label: '🥉 Bronce', count: 4, size: 'py-4 px-7 text-xs' },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader tag="Aliados" title="Patrocinadores & Aliados" />

        <div className="space-y-10">
          {TIERS.map((tier) => (
            <div key={tier.label} className="text-center">
              <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase mb-5">{tier.label}</p>
              <div className="flex flex-wrap justify-center gap-5">
                {Array.from({ length: tier.count }).map((_, i) => (
                  <div key={i}
                    className={`bg-white/5 border border-dashed border-border rounded-xl ${tier.size} text-muted-foreground font-bold tracking-widest uppercase`}>
                    SPONSOR
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-muted-foreground text-sm">
          ¿Quieres ser patrocinador?{' '}
          <a href="mailto:patrocinios@caidosdelzarzo.co" className="text-primary font-bold hover:underline">
            Contáctanos aquí
          </a>
        </p>
      </div>
    </section>
  )
}
