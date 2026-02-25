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

/* Subtle mountain ridgeline — visual rhythm between sections */
function RidgeDivider() {
  return (
    <div className="w-full overflow-hidden pointer-events-none" style={{ height: '48px' }}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,48 L0,22 L105,5 L225,28 L345,3 L475,24 L605,1 L725,18 L858,0 L985,16 L1105,3 L1245,26 L1365,7 L1440,18 L1440,48 Z"
          fill="rgba(84,165,49,.055)"
        />
        <path
          d="M0,48 L0,36 L185,17 L370,40 L545,13 L725,38 L905,11 L1085,34 L1265,14 L1440,33 L1440,48 Z"
          fill="rgba(84,165,49,.032)"
        />
      </svg>
    </div>
  )
}

function BackToTop() {
  const scrollY = useScrollY()
  if (scrollY < 400) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-7 right-7 z-50 w-12 h-12 bg-primary rounded-full text-white font-bold shadow-[0_4px_20px_rgba(84,165,49,.5)] hover:bg-orange-dark hover:-translate-y-1 transition-all flex items-center justify-center"
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
        <RidgeDivider />
        <About />
        <Categories />
        <RidgeDivider />
        <Route />
        <Schedule />
        <RidgeDivider />
        <Prizes />
        <Registration />
        <FAQ />
        <RidgeDivider />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
