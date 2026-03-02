const RED   = '#8B3A2A'
const CREAM = '#F2EAD8'
const MUTED = 'rgba(242,234,216,0.4)'
const BR    = 'rgba(255,255,255,0.07)'
const BG    = '#1A120B'

const FOOTER_LINKS = [
  {
    title: 'Evento',
    links: [
      { label: 'El Concepto',  href: '#concepto'    },
      { label: 'Modalidades',  href: '#modalidades' },
      { label: 'Programa',     href: '#programa'    },
      { label: 'El Kit',       href: '#kit'         },
      { label: 'Precios',      href: '#precios'     },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'Sevilla',      href: '#sevilla'     },
      { label: 'Inscríbete',   href: '#inscripcion' },
      { label: 'La Doble',     href: '#manzanillo'  },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'info@caidosdelzarzo.co', href: 'mailto:info@caidosdelzarzo.co' },
      { label: 'WhatsApp',               href: 'https://wa.me/573001234567'     },
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
    <footer style={{ background: BG, borderTop: `3px solid ${RED}` }}>
      <div
        className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10"
        style={{ borderBottom: `1px solid ${BR}` }}
      >
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl tracking-wide mb-3" style={{ color: CREAM }}>
            Caídos <span style={{ color: RED }}>del Zarzo</span>
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Un pueblo cafetero con carrera de gravel incluida.
          </p>
          <p className="text-[13px] mt-2" style={{ color: MUTED }}>
            Sevilla, Valle del Cauca<br />
            19–20 septiembre 2026
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(col => (
          <div key={col.title}>
            <p className="text-[10px] font-bold tracking-[.4em] uppercase mb-4" style={{ color: RED }}>
              {col.title}
            </p>
            <ul className="space-y-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={e => { if (l.href.startsWith('#')) { e.preventDefault(); scrollTo(l.href) } }}
                    className="text-[13px] transition-colors"
                    style={{ color: MUTED }}
                    onMouseEnter={e => e.currentTarget.style.color = RED}
                    onMouseLeave={e => e.currentTarget.style.color = MUTED}
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
        <p className="text-xs" style={{ color: MUTED }}>
          © 2026 Caídos del Zarzo Gravel Race
        </p>
        <p className="text-xs" style={{ color: MUTED }}>
          Sevilla, Valle del Cauca, Colombia
        </p>
      </div>
    </footer>
  )
}
