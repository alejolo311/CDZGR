import { useScrollY } from '@/hooks/useScrollY'
import Navbar from '@/components/sections/Navbar'
import Hero, { StatsRibbon } from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Categories from '@/components/sections/Categories'
import Route from '@/components/sections/Route'
import Schedule from '@/components/sections/Schedule'
import Prizes from '@/components/sections/Prizes'
import Registration from '@/components/sections/Registration'
import FAQ from '@/components/sections/FAQ'
import Sponsors from '@/components/sections/Sponsors'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

function BackToTop() {
  const scrollY = useScrollY()
  if (scrollY < 400) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-7 right-7 z-50 w-12 h-12 bg-primary rounded-full text-white font-bold shadow-[0_4px_20px_rgba(249,115,22,.5)] hover:bg-orange-dark hover:-translate-y-1 transition-all flex items-center justify-center"
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
