import { useScrollY } from '@/hooks/useScrollY'
import Navbar       from '@/components/sections/Navbar'
import Hero, { StatsRibbon } from '@/components/sections/Hero'
import About        from '@/components/sections/About'
import Categories   from '@/components/sections/Categories'
import Route        from '@/components/sections/Route'
import Schedule     from '@/components/sections/Schedule'
import Prizes       from '@/components/sections/Prizes'
import Registration from '@/components/sections/Registration'
import FAQ          from '@/components/sections/FAQ'
import Sponsors     from '@/components/sections/Sponsors'
import Contact      from '@/components/sections/Contact'
import Footer       from '@/components/sections/Footer'

function BackToTop() {
  const scrollY = useScrollY()
  if (scrollY < 500) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 font-bold text-white flex items-center justify-center transition-colors"
      style={{ background: '#c47818' }}
      onMouseEnter={e => e.currentTarget.style.background = '#8f5510'}
      onMouseLeave={e => e.currentTarget.style.background = '#c47818'}
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
        <Categories />
        <Route />
        <Schedule />
        <Prizes />
        <Registration />
        <FAQ />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
