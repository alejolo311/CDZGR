import { useState } from 'react'
import { Menu, X, Hexagon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollY } from '@/hooks/useScrollY'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#sobre',       label: 'La Carrera' },
  { href: '#categorias',  label: 'Categorías' },
  { href: '#ruta',        label: 'Ruta' },
  { href: '#cronograma',  label: 'Cronograma' },
  { href: '#premios',     label: 'Premios' },
  { href: '#faq',         label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrollY = useScrollY()
  const scrolled = scrollY > 50

  const scrollTo = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-black/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,.5)] py-3' : 'py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          className="flex items-center gap-2.5 font-title text-2xl tracking-widest text-white hover:text-primary transition-colors"
        >
          <Hexagon className="text-primary w-7 h-7 fill-primary/20" />
          CAÍDOS <span className="text-primary">DEL ZARZO</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="text-white/80 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 hover:text-white transition-all"
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <Button size="sm" onClick={() => scrollTo('#inscripcion')} className="ml-2">
              Inscríbete
            </Button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/98 backdrop-blur-lg flex flex-col items-center justify-center gap-4 z-40">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-white text-2xl font-semibold py-3 hover:text-primary transition-colors"
            >
              {label}
            </button>
          ))}
          <Button size="lg" onClick={() => scrollTo('#inscripcion')} className="mt-4">
            Inscríbete Ahora
          </Button>
        </div>
      )}
    </nav>
  )
}
