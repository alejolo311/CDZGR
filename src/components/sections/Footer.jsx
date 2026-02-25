const A   = '#c47818'
const D   = '#f0e8d8'
const M   = 'rgba(240,232,216,.45)'
const BR  = 'rgba(255,255,255,.08)'
const BG  = '#1a1208'

const FOOTER_LINKS = [
  {
    title: 'Evento',
    links: [
      { label: 'La Carrera',  href: '#sobre'      },
      { label: 'Categorías',  href: '#categorias' },
      { label: 'Ruta',        href: '#ruta'        },
      { label: 'Cronograma',  href: '#cronograma'  },
      { label: 'Premios',     href: '#premios'     },
    ],
  },
  {
    title: 'Participantes',
    links: [
      { label: 'Inscríbete',  href: '#inscripcion' },
      { label: 'FAQ',         href: '#faq'          },
      { label: 'Reglamento',  href: '#'             },
      { label: 'Términos',    href: '#'             },
      { label: 'Privacidad',  href: '#'             },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'info@caidosdelzarzo.co', href: 'mailto:info@caidosdelzarzo.co' },
      { label: 'WhatsApp',               href: 'https://wa.me/573001234567'     },
      { label: 'Patrocinios',            href: '#sponsors'                      },
      { label: 'Formulario',             href: '#contacto'                      },
    ],
  },
]

export default function Footer() {
  const scrollTo = href => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer style={{ background: BG, borderTop: `3px solid ${A}` }}>
      <div
        className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10"
        style={{ borderBottom: `1px solid ${BR}` }}
      >
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-title text-2xl tracking-widest mb-4" style={{ color: D }}>
            CAÍDOS <span style={{ color: A }}>DEL ZARZO</span>
          </p>
          <p className="text-sm leading-relaxed" style={{ color: M }}>
            Polvo, adrenalina y gloria.<br />Edición 2026 · Villa del Zarzo, Colombia.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(col => (
          <div key={col.title}>
            <p className="text-[10px] font-bold tracking-[.4em] uppercase mb-4" style={{ color: A }}>
              {col.title}
            </p>
            <ul className="space-y-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={e => { if (l.href.startsWith('#')) { e.preventDefault(); scrollTo(l.href) } }}
                    className="text-[13px] transition-colors"
                    style={{ color: M }}
                    onMouseEnter={e => e.currentTarget.style.color = A}
                    onMouseLeave={e => e.currentTarget.style.color = M}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs" style={{ color: M }}>
          © 2026 Caídos del Zarzo Gravel Race. Todos los derechos reservados.
        </p>
        <p className="text-xs" style={{ color: M }}>
          Organizado por <strong style={{ color: 'rgba(240,232,216,.7)' }}>Organización Zarzo SAS</strong>
        </p>
      </div>
    </footer>
  )
}
