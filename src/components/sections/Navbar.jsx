import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollY'

const NAV_LINKS = [
  { href: '#sobre',       label: 'La Carrera' },
  { href: '#categorias',  label: 'Categorías' },
  { href: '#ruta',        label: 'Ruta' },
  { href: '#cronograma',  label: 'Cronograma' },
  { href: '#premios',     label: 'Premios' },
  { href: '#faq',         label: 'FAQ' },
]

function scrollTo(href, cb) {
  if (cb) cb()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* Mountain SVG — same geometry as favicon */
function MtnLogo({ size = 28, scrolled }) {
  const bg    = scrolled ? '#1a1208' : 'rgba(240,232,216,0.08)'
  const amber = '#c47818'
  const snow  = scrolled ? '#f0e8d8' : 'rgba(240,232,216,0.85)'
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={bg} />
      <polygon points="32,12 10,46 54,46" fill={amber} />
      <polygon points="32,12 25,26 39,26" fill={snow} />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollY() > 60

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={
        scrolled
          ? { background: '#f2e8d2', borderBottom: '1px solid #d5c4a4' }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          className="flex items-center gap-2 font-title text-xl tracking-widest transition-colors"
          style={{ color: scrolled ? '#170e05' : '#f0e8d8' }}
        >
          <MtnLogo size={28} scrolled={scrolled} />
          CAÍDOS <span style={{ color: '#c47818' }}>DEL ZARZO</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className="text-[13px] font-medium px-3 py-1.5 transition-colors"
                style={{ color: scrolled ? 'rgba(23,14,5,0.7)' : 'rgba(240,232,216,0.75)' }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? '#170e05' : '#f0e8d8'}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? 'rgba(23,14,5,0.7)' : 'rgba(240,232,216,0.75)'}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('#inscripcion')}
              className="ml-3 px-5 py-1.5 text-[13px] font-bold text-white transition-colors"
              style={{ background: '#c47818' }}
              onMouseEnter={e => e.currentTarget.style.background = '#8f5510'}
              onMouseLeave={e => e.currentTarget.style.background = '#c47818'}
            >
              Inscríbete
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2"
          style={{ color: scrolled ? '#170e05' : '#f0e8d8' }}
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
          style={{ background: '#1a1208' }}
        >
          <button className="absolute top-4 right-5 p-2" style={{ color: '#f0e8d8' }} onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>

          {/* Logo in mobile drawer */}
          <div className="flex items-center gap-3 mb-4">
            <MtnLogo size={44} scrolled={true} />
          </div>

          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href, () => setOpen(false))}
              className="font-title text-3xl tracking-widest transition-colors"
              style={{ color: '#f0e8d8' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c47818'}
              onMouseLeave={e => e.currentTarget.style.color = '#f0e8d8'}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#inscripcion', () => setOpen(false))}
            className="mt-4 px-10 py-3 font-bold text-white tracking-widest uppercase"
            style={{ background: '#c47818' }}
          >
            Inscríbete Ahora
          </button>
        </div>
      )}
    </nav>
  )
}
