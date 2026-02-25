import { Separator } from '@/components/ui/separator'

const FOOTER_LINKS = [
  {
    title: 'Evento',
    links: [
      { label: 'La Carrera',  href: '#sobre' },
      { label: 'Categorías',  href: '#categorias' },
      { label: 'Ruta',        href: '#ruta' },
      { label: 'Cronograma',  href: '#cronograma' },
      { label: 'Premios',     href: '#premios' },
    ],
  },
  {
    title: 'Participantes',
    links: [
      { label: 'Inscríbete',  href: '#inscripcion' },
      { label: 'FAQ',         href: '#faq' },
      { label: 'Reglamento',  href: '#' },
      { label: 'Términos',    href: '#' },
      { label: 'Privacidad',  href: '#' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'info@caidosdelzarzo.co', href: 'mailto:info@caidosdelzarzo.co' },
      { label: 'WhatsApp',               href: 'https://wa.me/573001234567' },
      { label: 'Patrocinios',            href: '#sponsors' },
      { label: 'Formulario',             href: '#contacto' },
    ],
  },
]

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer style={{ background: '#16100a', color: '#f0e8d8' }}>
      {/* Amber top border — simple, not decorative SVG */}
      <div className="h-1 w-full" style={{ background: '#c47818' }} />

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div
            className="font-title text-2xl tracking-widest mb-4"
            style={{ color: '#f0e8d8' }}
          >
            CAÍDOS{' '}
            <span style={{ color: '#c47818' }}>DEL ZARZO</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,232,216,0.55)' }}>
            Polvo, adrenalina y gloria.<br />Edición 2026.
          </p>
        </div>

        {/* Links */}
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-4" style={{ color: '#f0e8d8' }}>{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => { if (l.href.startsWith('#')) { e.preventDefault(); scrollTo(l.href) } }}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(240,232,216,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c47818'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,232,216,0.5)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3"
        style={{ borderTop: '1px solid rgba(240,232,216,0.1)' }}
      >
        <p className="text-xs" style={{ color: 'rgba(240,232,216,0.4)' }}>
          © 2026 Caídos del Zarzo Gravel Race. Todos los derechos reservados.
        </p>
        <p className="text-xs" style={{ color: 'rgba(240,232,216,0.4)' }}>
          Organizado por <strong style={{ color: 'rgba(240,232,216,0.7)' }}>Organización Zarzo SAS</strong>
        </p>
      </div>
    </footer>
  )
}
