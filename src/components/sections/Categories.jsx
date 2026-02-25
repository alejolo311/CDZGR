import { SectionHeader } from './About'
import { CATEGORIES } from '@/lib/constants'

const A = '#c47818'
const B = '#4a7aaa'   /* paseo accent */
const D = '#f0e8d8'
const M = 'rgba(240,232,216,.55)'

function SpecRow({ label, value, accent }) {
  return (
    <div className="flex justify-between items-baseline py-2" style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <span className="text-[11px] uppercase tracking-[.2em]" style={{ color: M }}>{label}</span>
      <strong className="text-sm font-bold" style={{ color: accent }}>{value}</strong>
    </div>
  )
}

function CategoryBlock({ cat, accent, isLast }) {
  return (
    <div
      className="flex flex-col p-8 lg:p-12"
      style={{ borderRight: !isLast ? '1px solid rgba(255,255,255,.07)' : 'none' }}
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[.4em] uppercase mb-2" style={{ color: accent }}>
          {cat.badge}
        </p>
        <h3 className="font-title leading-none mb-1" style={{ fontSize: 'clamp(2.8rem,5vw,4rem)', color: D }}>
          {cat.name}
        </h3>
        <p className="text-sm" style={{ color: M }}>{cat.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <span className="font-title text-5xl" style={{ color: accent }}>{cat.price}</span>
        <p className="text-[11px] uppercase tracking-widest mt-1" style={{ color: M }}>Inscripción</p>
      </div>

      {/* Specs */}
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[.35em] uppercase mb-3" style={{ color: D }}>
          Especificaciones
        </p>
        {cat.specs.map(s => <SpecRow key={s.label} label={s.label} value={s.value} accent={accent} />)}
      </div>

      {/* Kit */}
      <div className="mb-8 flex-1">
        <p className="text-[10px] font-bold tracking-[.35em] uppercase mb-3" style={{ color: D }}>
          Kit Incluye
        </p>
        <ul className="space-y-1.5">
          {cat.kit.map(k => (
            <li key={k} className="text-[13px] flex gap-2" style={{ color: M }}>
              <span style={{ color: accent }}>→</span>
              {k}
            </li>
          ))}
        </ul>
      </div>

      {/* Subcats */}
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[.35em] uppercase mb-3" style={{ color: D }}>
          {cat.id === 'gravel' ? 'Subcategorías por Edad' : 'Abierto a'}
        </p>
        <div className="flex flex-wrap gap-2">
          {cat.subcats.map(s => (
            <span
              key={s}
              className="text-[11px] font-semibold px-3 py-1 border"
              style={{ color: accent, borderColor: `${accent}50` }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {cat.note && (
        <p className="text-[11px] italic mb-6" style={{ color: M }}>{cat.note}</p>
      )}

      {/* CTA */}
      <button
        className="w-full py-3 font-bold text-sm text-white uppercase tracking-widest transition-colors"
        style={{ background: accent }}
        onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        onClick={() => document.querySelector('#inscripcion')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Inscribirse · {cat.name}
      </button>
    </div>
  )
}

export default function Categories() {
  return (
    <section id="categorias" style={{ background: '#1a1208' }}>
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-0">
        <SectionHeader
          tag="Modalidades"
          title="Elige tu Aventura"
          desc="Dos caminos, una sola misión: llegar al final con una sonrisa."
          dark
        />
      </div>

      {/* Two-column category blocks — edge to edge */}
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="grid lg:grid-cols-2 border"
          style={{ borderColor: 'rgba(255,255,255,.09)' }}
        >
          <CategoryBlock cat={CATEGORIES.gravel} accent={A} />
          <CategoryBlock cat={CATEGORIES.paseo}  accent={B} isLast />
        </div>
      </div>

      {/* Bike recommendations */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-[10px] font-bold tracking-[.4em] uppercase mb-8" style={{ color: A }}>
          Bicicleta Recomendada
        </p>
        <div className="grid md:grid-cols-2 gap-0 border" style={{ borderColor: 'rgba(255,255,255,.09)' }}>
          {[
            {
              label: 'Gravel Race', accent: A,
              items: ['Bicicleta de Gravel o MTB', 'Neumáticos 35mm+ (recomendado 40–47mm)', 'Frenos de disco obligatorios', 'Luces delantera y trasera', 'Al menos 1 bidón o sistema de hidratación'],
            },
            {
              label: 'El Paseo', accent: B,
              items: ['Cualquier bicicleta de terreno variado', 'MTB, Gravel, Cicloturista, Híbrida', 'Neumáticos 35mm+ recomendado', 'Luces recomendadas', 'Al menos 1 bidón'],
            },
          ].map((b, i) => (
            <div
              key={b.label}
              className="p-8"
              style={{ borderRight: i === 0 ? '1px solid rgba(255,255,255,.09)' : 'none' }}
            >
              <p className="font-bold text-sm mb-4" style={{ color: b.accent }}>{b.label}</p>
              <ul className="space-y-2">
                {b.items.map(item => (
                  <li key={item} className="text-[13px] flex gap-2" style={{ color: M }}>
                    <span style={{ color: b.accent }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
