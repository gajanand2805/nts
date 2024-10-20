import Image from 'next/image'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Carousel } from '../UI/Carousel/Carousel'
import { CarouselItem } from '../UI/Carousel/CarouselItem'
// Icons
import a1 from '../../components/LandingPage/assets/landing_page/product_suite/1.png'
import agent from '../../components/LandingPage/assets/landing_page/product_suite/agent.png'
import api_int from '../../components/LandingPage/assets/landing_page/product_suite/api_int.png'
import campaign from '../../components/LandingPage/assets/landing_page/product_suite/campaign.png'
import chatbotBuilder from '../../components/LandingPage/assets/landing_page/product_suite/chatbot_builder.png'
import health from '../../components/LandingPage/assets/landing_page/product_suite/health.png'
import a5 from '../../components/LandingPage/assets/landing_page/product_suite/new/6.svg'
import template from '../../components/LandingPage/assets/landing_page/product_suite/template.png'

import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from './common/SectionHeading'

const header1Varient = {
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),

  // visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: -10, opacity: 0 },
}

export const ProductSuit = () => {
  const { t } = useTranslation()
  const carouselData = [
    {
      img: a1,
      title: t('landing_product_suit_carousel1_title'),
      text: t('landing_product_suit_carousel1_text'),
    },
    {
      img: chatbotBuilder,
      title: t('landing_product_suit_carousel2_title'),
      text: t('landing_product_suit_carousel2_text'),
    },
    {
      img: a5,
      title: t('landing_product_suit_carousel3_title'),
      text: t('landing_product_suit_carousel3_text'),
    },
    {
      img: agent,
      title: t('landing_product_suit_carousel4_title'),
      text: t('landing_product_suit_carousel4_text'),
    },
    {
      img: api_int,
      title: t('landing_product_suit_carousel5_title'),
      text: t('landing_product_suit_carousel5_text'),
    },
    {
      img: campaign,
      title: t('landing_product_suit_carousel6_title'),
      text: t('landing_product_suit_carousel6_text'),
    },
    {
      img: health,
      title: t('landing_product_suit_carousel7_title'),
      text: t('landing_product_suit_carousel7_text'),
    },
    {
      img: template,
      title: t('landing_product_suit_carousel8_title'),
      text: t('landing_product_suit_carousel8_text'),
    },
  ]

  const controls = useAnimation()
  const [ref, inView] = useInView()
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
    // else controls.start('hidden')
  }, [controls, inView])

  return (
    <div
      id="features"
      className="flex items-center justify-center w-full">
      <div className="relative flex flex-col px-5 tablet:px-12 laptop:px-12 laptopL:px-20 w-full max-w-[1800px]  items-center gap-5  py-10 tablet:py-16 tablet:gap-10">
        <svg
          style={{ visibility: 'hidden', position: 'absolute' }}
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1">
          <defs>
            <filter id="round">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite
                in="SourceGraphic"
                in2="goo"
                operator="atop"
              />
            </filter>
          </defs>
        </svg>

        {/* Heading */}
        <div className="flex flex-col items-center justify-center gap-3">
          <SectionHeading
            subHeading={t('landing_product_suit_subheading')}
            heading={t('landing_product_suit_heading_text')}
            supHeading={t('landing_product_suit_heading')}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center max-w-full pt-12 py-9 laptop:pl-14">
          <Carousel
            nav={false}
            newStyle={true}
            paginationWrapperClassname="pt-2 items-center">
            {carouselData.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center w-full gap-2 tabletM:gap-5 laptop:flex-row">
                  <div className="w-full laptop:w-3/5 ">
                    <Image
                      src={item.img}
                      priority
                      objectFit="cover"
                      alt="AnalyticsDashboard"
                      style={{
                        borderRadius: '10px', // You can adjust the radius as needed
                        // border: '2px',
                      }}
                      // className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 whitespace-pre-wrap font-josefinSans laptop:px-5 laptop:items-start laptop:w-2/5">
                    <p className=" text-lg font-semibold text-center text-[#353535] tablet:text-xl laptopL:text-3xl laptop:text-start">
                      {item.title}
                    </p>
                    <span className="w-16 h-0.5 bg-[#F3BBF13B]"></span>
                    <p className="text-sm text-center laptop:text-lg max-w-lg text-[#353535] laptop:text-start">
                      {item.text}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
          <div className="absolute -z-10 top-0 bottom-0 left-0 right-0 tabletM:right-[55%]  laptop:bg-gradient-to-l from-white to-[#5EC4FF]/30 rounded-3xl"></div>
        </div>
      </div>
    </div>
  )
}
