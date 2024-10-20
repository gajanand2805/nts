import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import a1 from '../../components/LandingPage/assets/landing_page/product_suite/1.png'
import a5 from '../../components/LandingPage/assets/landing_page/product_suite/new/6.svg'

import { Carousel } from '../UI/Carousel/Carousel'
import { CarouselItem } from '../UI/Carousel/CarouselItem'

export const HeroSection = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { selectedLang } = useGlobalAuthContext()

  return (
    <div className="flex items-center justify-center w-full mx-auto bg-white ">
      <div className="flex laptop:flex-row flex-col items-center justify-center pt-[76px] px-5 laptop:px-12 laptopL:px-20  w-full max-w-[1800px] overflow-hidden laptopL:overflow-visible h-screen max-h-[650px] tabletS:max-h-[800px] tablet:max-h-[1000px]  gap-6 relative space-y-3 rounded-[0px_0px_0px_0px]  text-Black dark:text-White">
        <div className="z-20 flex flex-col items-center justify-center w-full max-w-xl space-y-4 laptop:items-start laptop:space-y-7">
          <motion.p
            className={`text-2xl  font-normal text-center ${selectedLang === 'en' ? 'laptop:text-left' : 'laptop:text-right'} font-josefinSans  text-black laptop:text-4xl`}>
            <Trans i18nKey="landing_heading">
              Conquer <strong>Customer Service</strong> & Boost Sales with
              Shoponcell, <strong>Whatsapp CRM</strong> for{' '}
              <strong>E-Commerce</strong>
            </Trans>
          </motion.p>
          <motion.p
            className={`w-[90%] text-xs text-center font-josefinSans ${selectedLang === 'en' ? 'laptop:text-left' : 'laptop:text-right'} text-[#6F6F6F] laptop:max-w-4xl tabletS:text-lg opacity-80`}>
            {t('landing_heading_text')}
          </motion.p>
          <motion.div className="flex flex-row gap-3 laptop:flex-row">
            <button
              onClick={() => {
                router.push('/auth?tab=signup')
              }}
              className="px-6 py-3 text-base font-['Poppins'] font-semibold text-white rounded-md laptop:text-base bg-Blue shadow-deep hover:bg-[#275de6]">
              {t && t('landing_heading_button_getstarted')}
            </button>
            <button
              onClick={() => {
                router.push('/demo')
              }}
              className="px-6 py-3 text-base font-['Poppins'] font-semibold border-2 rounded-md laptop:text-base bg-[#14317A] shadow-deep text-White border-White hover:bg-[#14317A]/90">
              {t && t('landing_heading_button_getdemo')}
            </button>
          </motion.div>
        </div>

        <motion.div className="relative z-10 flex flex-col items-center w-full py-4 tablet:py-8 laptop:pt-16 laptop:pb-8">
          <Carousel
            nav={false}
            newStyle={true}
            paginationWrapperClassname="px-4 items-center tablet:px-8 laptop:px-16 laptop:items-end">
            <CarouselItem
              index="adfkds-1"
              width={'100%'}>
              <div className="flex flex-col items-center w-full pr-2 laptop:pr-12 tabletM:gap-5 tabletM:flex-row">
                <div className="flex justify-center w-full border border-gray-200 rounded-md ">
                  <Image
                    src={a1}
                    priority
                    objectFit="contain"
                    alt="AnalyticsDashboard"
                    style={{
                      borderRadius: '6px', // You can adjust the radius as needed
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the shadow properties as needed
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem
              index="adfkds-1"
              width={'100%'}>
              <div className="flex flex-col items-center w-full pr-2 laptop:pr-12 tabletM:gap-5 tabletM:flex-row">
                <div className="flex justify-center w-full border border-gray-200 rounded-md ">
                  <Image
                    src={a5}
                    priority
                    objectFit="contain"
                    alt="AnalyticsDashboard"
                    style={{
                      borderRadius: '6px', // You can adjust the radius as needed
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the shadow properties as needed
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          </Carousel>
          <div className="absolute -z-10 top-0 bottom-0 right-0 left-48 tablet:bg-gradient-to-r from-white to-[#5EC4FF]/30 rounded-3xl"></div>
        </motion.div>
      </div>
    </div>
  )
}
