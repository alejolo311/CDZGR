import { Hexagon } from 'lucide-react'
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
    <footer className="bg-[#050505] border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 font-title text-2xl tracking-widest text-white mb-4">
            <Hexagon className="text-primary w-7 h-7 fill-primary/20" />
            CAÍDOS <span className="text-primary">DEL ZARZO</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Polvo, adrenalina y gloria.<br />Edición 2026.
          </p>
        </div>

        {/* Links */}
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => { if (l.href.startsWith('#')) { e.preventDefault(); scrollTo(l.href) } }}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="bg-border" />

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-muted-foreground text-xs">© 2026 Caídos del Zarzo Gravel Race. Todos los derechos reservados.</p>
        <p className="text-muted-foreground text-xs">Organizado por <strong className="text-white">Organización Zarzo SAS</strong></p>
      </div>
    </footer>
  )
}
