import React from 'react'
import { Contact } from '../../components/LandingPage/Contact'
import FAQ from '../../components/LandingPage/FAQ'
import IntegrationSection from '../../components/LandingPage/IntegrationsSection/IntegrationSection'
import { Pricing } from '../../components/LandingPage/Pricing'
import Testimonials from '../../components/LandingPage/Testimonials/Testimonials'
import Addons from '../../components/PricingPage/Addons'
import FreeServicesSection from '../../components/PricingPage/FreeServicesSection'
const PricingPage = () => {
  
  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen bg-white">
      <div className="flex flex-col w-full py-10 tablet:py-20 tablet:gap-10 h-full font-['Poppins'] items-center ">
        <FreeServicesSection />
        <Pricing />
        <Addons />
        <IntegrationSection />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
    </div>
  )
}

export default PricingPage
