import { useScrollY } from '@/hooks/useScrollY'
import Navbar        from '@/components/sections/Navbar'
import Hero, { StatsRibbon } from '@/components/sections/Hero'
import About         from '@/components/sections/About'
import Modalidades   from '@/components/sections/Modalidades'
import Programa      from '@/components/sections/Programa'
import Manzanillo    from '@/components/sections/Manzanillo'
import Kit           from '@/components/sections/Kit'
import Precios       from '@/components/sections/Precios'
import Registration  from '@/components/sections/Registration'
import Sevilla       from '@/components/sections/Sevilla'
import Footer        from '@/components/sections/Footer'

function BackToTop() {
  const scrollY = useScrollY()
  if (scrollY < 500) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 font-semibold text-white flex items-center justify-center transition-colors"
      style={{ background: '#8B3A2A' }}
      onMouseEnter={e => e.currentTarget.style.background = '#6E2D20'}
      onMouseLeave={e => e.currentTarget.style.background = '#8B3A2A'}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsRibbon />
        <About />
        <Modalidades />
        <Programa />
        <Manzanillo />
        <Kit />
        <Precios />
        <Registration />
        <Sevilla />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
