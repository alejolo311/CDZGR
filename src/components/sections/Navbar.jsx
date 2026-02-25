import { useState } from 'react'
import { Menu, X } from 'lucide-react'
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
        scrolled
          ? 'py-3 border-b shadow-md'
          : 'py-5'
      )}
      style={scrolled
        ? { background: 'rgba(242,234,216,0.97)', borderColor: 'hsl(34 20% 78%)' }
        : { background: 'transparent' }
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          className={cn(
            'font-title text-2xl tracking-widest transition-colors',
            scrolled ? 'text-foreground' : 'text-white'
          )}
        >
          CAÍDOS{' '}
          <span style={{ color: '#c47818' }}>DEL ZARZO</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className={cn(
                  'text-sm font-medium px-3 py-2 transition-colors rounded-sm hover:bg-black/6',
                  scrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'
                )}
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
          className={cn('lg:hidden p-2', scrolled ? 'text-foreground' : 'text-white')}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 flex flex-col items-center justify-center gap-4 z-40"
          style={{ background: 'rgba(242,234,216,0.98)' }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-foreground text-2xl font-semibold py-3 hover:text-primary transition-colors"
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
