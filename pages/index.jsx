import React from 'react'
import { useGlobalAuthContext } from '../AuthContext'
import ClientSection from '../components/LandingPage/ClientSection/ClientSection'
import { Contact } from '../components/LandingPage/Contact'
import FAQ from '../components/LandingPage/FAQ'
import Features from '../components/LandingPage/Features/Features'
import { HeroSection } from '../components/LandingPage/HeroSection'
import IntegrationSection from '../components/LandingPage/IntegrationsSection/IntegrationSection'
import { MockupFeatures } from '../components/LandingPage/MockupFeatures/MockupFeatures'
import { ProductSuit } from '../components/LandingPage/ProductSuit'
import Services from '../components/LandingPage/Services'
import Testimonials from '../components/LandingPage/Testimonials/Testimonials'
import Loader from '../components/Loader'
import FreeServicesSection from '../components/PricingPage/FreeServicesSection'

// import {Jose}
export default function Home() {
  const { alpha } = useGlobalAuthContext()

  return (
    <div className="flex flex-col items-center w-full bg-white">
      {alpha && <Loader></Loader>}
      {!alpha && (
        <div className="flex flex-col items-center w-full ">
          <HeroSection />
          <ClientSection />
          <Services />
          <MockupFeatures />
          <ProductSuit />
          <Features />
          <div className="wave-1 tablet:pt-48 laptopL:pt-[200px] fourK:pt-[400px] flex flex-col items-center w-full ">
            <FreeServicesSection />
          </div>
          {/* <OurSolutions /> */}
          <IntegrationSection />
          <Testimonials />
          <FAQ />
          <Contact />
        </div>
      )}
    </div>
  )
}
