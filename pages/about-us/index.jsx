import { HeroSection } from '../../components/AboutUsPage/HeroSection'
import StatsSection from '../../components/AboutUsPage/StatsSection'
import ValuesSection from '../../components/AboutUsPage/ValuesSection'
import ClientSection from '../../components/LandingPage/ClientSection/ClientSection'
import { Contact } from '../../components/LandingPage/Contact'
import { ProductSuit } from '../../components/LandingPage/ProductSuit'
import Testimonials from '../../components/LandingPage/Testimonials/Testimonials'
export default function AboutUsPage() {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="flex flex-col justify-center font-['Poppins'] items-center w-full ">
        <HeroSection />
        <ValuesSection />
        <StatsSection />
        {/* <Features /> */}
        <ProductSuit />
        <ClientSection />
        <Testimonials />
        <Contact />
      </div>
    </div>
  )
}
