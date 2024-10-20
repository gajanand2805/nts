import React from 'react'
import { useTranslation } from 'react-i18next'
// SVGs

// Animation

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from '../common/SectionHeading'

// Mockups
import ArrowImageLeft from './ArrowImageLeft.svg'
import ArrowImageRight from './ArrowImageRight.svg'

import mockup1 from '../../../public/hasi/1.png'
import mockup5 from '../../../public/hasi/2.png'
import mockup6 from '../../../public/hasi/3.png'
import mockup4 from '../../../public/hasi/4.png'
import mockup2 from '../../../public/hasi/5.png'
import mockup3 from '../../../public/hasi/6.png'

export const MockupFeatures = () => {
  const { t, i18n } = useTranslation()
  // console.log(i18n.dir())
  const featuresData = [
    {
      title: t && t('landing_works_orderupdates_heading'),
      description: t && t('landing_works_orderupdates_text'),
      mockup: mockup1,
    },
    {
      title: t && t('landing_works_chatbotSupport_heading'),
      description: t && t('landing_works_chatbotSupport_text'),
      mockup: mockup2,
    },
    {
      title: t && t('landing_works_feedbackPipeline_heading'),
      description: t && t('landing_works_feedbackPipeline_text'),
      mockup: mockup3,
    },
    {
      title: t && t('landing_works_surveyPipeline_heading'),
      description: t && t('landing_works_surveyPipeline_text'),
      mockup: mockup4,
    },
    {
      title: t && t('landing_works_trackOrder_heading'),
      description: t && t('landing_works_trackOrder_text'),
      mockup: mockup5,
    },
    {
      title: t && t('landing_works_humanHandover_heading'),
      description: t && t('landing_works_humanHandover_text'),
      mockup: mockup6,
    },
  ]

  return (
    <div
      id="services"
      className="relative flex flex-col items-center w-full gap-10 px-5 py-10 pb-10 bg-white tablet:py-20 tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 font-josefinSans">
      <SectionHeading
        heading={t('landing_works_heading')}
        subHeading={t('landing_works_heading_text')}
        headingColor={'#000'}
      />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full gap-8 tablet:gap-8 laptopS:gap-0">
          {featuresData.map((feat, i) => (
            <div
              key={feat.title}
              className={`flex flex-col items-center justify-center w-full tablet:gap-8 laptopS:gap-32 gap-6 relative rounded-xl tablet:border-transparent border-[1px]  shadow-sm tablet:shadow-none py-4 laptopS:py-0 px-5 ${i % 2 === 0
                  ? 'laptopS:flex-row bg-gradient-to-bl'
                  : 'laptopS:flex-row-reverse bg-gradient-to-br'
                }`}>
              <div className="flex flex-col items-center max-w-md gap-3 tabletM:items-start tabletM:rtl:items-end">
                <p className="flex flex-col items-start justify-start w-full gap-1 text-2xl font-medium text-center tabletM:text-left tabletM:text-4xl">
                  <span className="w-full text-center tablet:text-5xl tablet:text-left tablet:rtl:text-right">
                    {feat.title}
                  </span>
                  <span className="hidden w-20 h-1 rounded-xl bg-Blue tablet:block "></span>
                </p>
                <p className="text-base text-center text-[#959595] tablet:text-left tablet:rtl:text-right">
                  {feat.description}
                </p>
              </div>

              <motion.div className="z-10  tablet:w-[250px] w-[200px] tablet:h-[500px] h-[400px] relative">
                <Image
                  priority
                  //   src="https://res.cloudinary.com/nine-ai/image/upload/f_auto,q_auto/v1/InvobotAssets/hasi/byjfn5khxyezjgdn5uwm"
                  src={feat.mockup}
                  layout="fill"
                  alt="mockup"
                />
                {i !== featuresData.length - 1 && (
                  <div
                    className={`absolute z-20 laptopS:block hidden ${i % 2 === 0
                        ? '-bottom-[200px] ltr:-left-[320px] rtl:-right-[320px]  '
                        : '-bottom-[200px] ltr:-right-[320px] rtl:-left-[320px]'
                      }`}>
                    {/* <div className="absolute top-0 left-0 w-2 h-2 bg-red-500"></div> */}
                    <Image
                      priority
                      src={
                        i % 2 === 0
                          ? i18n.dir() === 'ltr'
                            ? ArrowImageLeft
                            : ArrowImageRight
                          : i18n.dir() === 'ltr'
                            ? ArrowImageRight
                            : ArrowImageLeft
                      }
                      alt="Shoponcell Mockup Arrow Image"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// export default MockupFeatures
