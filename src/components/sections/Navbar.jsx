import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollY'

const NAV_LINKS = [
  { href: '#concepto',     label: 'El Evento' },
  { href: '#modalidades',  label: 'Modalidades' },
  { href: '#programa',     label: 'Programa' },
  { href: '#kit',          label: 'Kit' },
  { href: '#precios',      label: 'Precios' },
  { href: '#sevilla',      label: 'Sevilla' },
]

function scrollTo(href, cb) {
  if (cb) cb()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollY() > 60

  const cream = '#F2EAD8'
  const dark  = '#2C1E12'
  const red   = '#8B3A2A'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: '#F5EFE0', borderBottom: '1px solid #D4C5A9', boxShadow: '0 1px 8px rgba(26,18,11,0.06)' }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          className="flex items-center gap-2 transition-colors"
        >
          <span
            className="font-display text-lg tracking-wide"
            style={{ color: scrolled ? dark : cream }}
          >
            Caídos{' '}
            <span style={{ color: red }}>del Zarzo</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="text-[13px] font-medium px-3 py-1.5 transition-colors"
                style={{ color: scrolled ? 'rgba(44,30,18,0.65)' : 'rgba(242,234,216,0.7)' }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? dark : cream}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? 'rgba(44,30,18,0.65)' : 'rgba(242,234,216,0.7)'}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('#inscripcion')}
              className="ml-3 px-5 py-1.5 text-[13px] font-semibold text-white transition-colors"
              style={{ background: red }}
              onMouseEnter={e => e.currentTarget.style.background = '#6E2D20'}
              onMouseLeave={e => e.currentTarget.style.background = red}
            >
              Inscríbete
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2"
          style={{ color: scrolled ? dark : cream }}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 flex flex-col items-center justify-center gap-6 z-40"
          style={{ background: '#1A120B' }}
        >
          <button
            className="absolute top-4 right-5 p-2"
            style={{ color: cream }}
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <span className="font-display text-2xl tracking-wide mb-6" style={{ color: cream }}>
            Caídos <span style={{ color: red }}>del Zarzo</span>
          </span>

          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href, () => setOpen(false))}
              className="font-display text-2xl tracking-wide transition-colors"
              style={{ color: cream }}
              onMouseEnter={e => e.currentTarget.style.color = red}
              onMouseLeave={e => e.currentTarget.style.color = cream}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#inscripcion', () => setOpen(false))}
            className="mt-4 px-10 py-3 font-semibold text-white tracking-wide"
            style={{ background: red }}
          >
            Inscríbete
          </button>
        </div>
      )}
    </nav>
  )
}
