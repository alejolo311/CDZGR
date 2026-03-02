/* ─── SectionHeader — exported and reused by other sections ───────────────── */
const RED = '#8B3A2A'

export function SectionHeader({ tag, title, desc, dark = false, center = false }) {
  const textColor  = dark ? '#F2EAD8'              : '#2C1E12'
  const mutedColor = dark ? 'rgba(242,234,216,0.55)' : '#6B5744'

  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <p
        className="text-[10px] font-semibold tracking-[.4em] uppercase mb-3"
        style={{ color: RED }}
      >
        {tag}
      </p>
      <h2
        className="font-display leading-[1.05]"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: textColor }}
      >
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-[15px] leading-relaxed max-w-xl" style={{ color: mutedColor }}>
          {desc}
        </p>
      )}
    </div>
  )
}

/* ─── El Concepto (section #2 — cream bg) ─────────────────────────────────── */
export default function About() {
  return (
    <section id="concepto" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="El Evento"
          title="¿Por qué Caídos del Zarzo?"
        />

        <div className="space-y-5 text-[15px] leading-[1.75] text-muted-foreground">
          <p>
            <strong className="text-foreground">Sevilla es la Capital Cafetera de Colombia.</strong>{' '}
            Patrimonio Cultural de la Humanidad. Un pueblo donde el café no es un negocio — es la vida.
            Y sus destapados cafeteros son el terreno perfecto para una carrera de gravel que no se parece
            a ninguna otra.
          </p>

          <p>
            El nombre viene del <strong className="text-foreground">zarzo</strong> — la estructura
            elevada de madera y guadua donde se seca el café en las fincas. "Caerse del zarzo" es lo que
            le pasa al que se mete donde no debía.
          </p>

          <p>
            Eso es exactamente lo que va a sentir cada participante en los caminos de tierra,
            las subidas del 12 al 18%, y los destapados que conectan las veredas cafeteras de Sevilla.
            El terreno cafetero tiene muchas subidas de 3 a 8 km que nunca te dejan descansar — es más
            demoledor que una sola subida grande.
          </p>

          <div
            className="border-l-2 pl-6 py-2 mt-8"
            style={{ borderColor: RED }}
          >
            <p className="font-display italic text-foreground" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
              No pretendemos ser otra carrera de gravel. Esto es un pueblo cafetero con carrera de gravel incluida.
            </p>
          </div>

          <p className="mt-6">
            <strong className="text-foreground">19 y 20 de septiembre de 2026.</strong>{' '}
            280 cupos. Dos modalidades. Un fin de semana completo en el que Sevilla abre sus caminos,
            sus fincas y su cultura para que los recorras en bicicleta.
          </p>
        </div>
      </div>
    </section>
  )
}
