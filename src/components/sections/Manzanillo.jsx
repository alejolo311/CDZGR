import { SectionHeader } from './About'

const RED = '#8B3A2A'

const PRENDAS = [
  { parada: 'Parada 1', prenda: 'El pañuelo rojo', desc: 'Símbolo del arriero cafetero. Se lleva al cuello.' },
  { parada: 'Parada 2', prenda: 'El sombrero aguadeño', desc: 'Tejido a mano en Aguadas, Caldas. El sombrero del campo colombiano.' },
  { parada: 'Parada 3', prenda: 'La ruana', desc: 'Para el frío de la mañana en la montaña. Lana pura.' },
  { parada: 'Parada 4', prenda: 'El carriel', desc: 'El morral del arriero. Donde se carga lo esencial.' },
]

export default function Manzanillo() {
  return (
    <section id="manzanillo" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="Tradición"
          title="La Doble al Manzanillo"
          desc="Una tradición ciclista de Sevilla, revivida para Caídos del Zarzo."
        />

        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16">
          {/* Story */}
          <div className="space-y-4 text-[15px] leading-[1.75] text-muted-foreground">
            <p>
              La Doble al Manzanillo es una vieja tradición de Sevilla. Originalmente era una rodada
              en grupo hasta la vereda de Manzanillo — con shots de aguardiente en cada punto del camino.
              Una mezcla de ciclismo, fiesta y arraigo al territorio que solo existía en la memoria
              de los ciclistas más viejos del pueblo.
            </p>
            <p>
              La versión Caídos del Zarzo la revive. El sábado por la tarde, un grupo seleccionado
              de ciclistas sale rumbo a Manzanillo.{' '}
              <strong className="text-foreground">
                En cada parada, en vez de un shot, reciben una pieza de indumentaria campesina.
              </strong>
            </p>
            <p>
              Al regreso, brindis colectivo con aguardiente en el parque principal.
            </p>

            <div
              className="border-l-2 pl-5 py-2 mt-4"
              style={{ borderColor: RED }}
            >
              <p className="font-display italic text-foreground text-lg">
                No cualquiera corre la Doble — se es invitado o seleccionado.
              </p>
            </div>
          </div>

          {/* Prendas */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-foreground mb-5">
              Las paradas y sus prendas
            </p>
            <div className="space-y-0">
              {PRENDAS.map((p, i) => (
                <div
                  key={i}
                  className="py-4 flex gap-4"
                  style={{ borderBottom: '1px solid #D4C5A9' }}
                >
                  <span
                    className="font-display text-lg leading-none w-8 flex-shrink-0 mt-0.5"
                    style={{ color: RED }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{p.prenda}</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-5 italic">
              Al final de la ruta, cada ciclista vuelve vestido de arriero cafetero — sobre una gravel.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
