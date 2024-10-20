import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import analytics from './assets/landing_page/services/analytics.svg'
import answering from './assets/landing_page/services/answering.svg'
import automated from './assets/landing_page/services/automated.svg'
import SectionHeading from './common/SectionHeading'

const Services = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const data = [
    {
      img: automated,
      heading: t('landing_services_crm_heading'),
      desc: t('landing_services_crm_body'),
    },
    {
      img: answering,
      heading: t('landing_services_customer_heading'),
      desc: t('landing_services_customer_body'),
    },
    {
      img: analytics,
      heading: t('landing_services_analytics_heading'),
      desc: t('landing_services_analytics_body'),
    },
  ]
  return (
    <>
      <div className="wave-0 w-full tablet:pt-48 laptopL:pt-[200px] fourK:pt-[400px] flex flex-col items-center">
        <div className="relative bg-transparent max-w-[1800px] w-full px-5 tablet:px-12 laptop:px-12 laptopL:px-20 pb-10 tablet:pb-20">
          <div className="relative z-10 flex flex-col items-center gap-8 pt-12 opacity-100 tablet:gap-14">
            <SectionHeading
              supHeading={t('landing_services_heading')}
              heading={t('landing_services_heading_text')}
            />
            <div className="flex flex-col items-center w-full gap-8 laptopS:flex-row laptopS:items-stretch laptopS:justify-center laptop:gap-10 ">
              {data.map((item, index) => {
                return (
                  <div
                    className="flex flex-col shadow-[0_0_10px_8px_rgba(87,132,247,0.12)] max-w-sm items-start p-5 gap-2.5 rounded-[43px] bg-white font-josefinSans laptop:px-7 laptop:max-w-[22.5rem] laptop:py-9 laptop:shadow-none"
                    key={index}>
                    <div className="rounded-full bg-gradient-to-r from-[#5785F817]/[0.09] to-[#F3BBF13B]/[0.23] px-4 py-3">
                      <Image
                        src={item.img}
                        className="w-6 h-6 tablet:h-12 tablet:w-12"
                        alt={item.heading}
                        priority
                      />
                    </div>
                    <h2 className="font-semibold text-[22px] leading-8 max-w-64">
                      {item.heading}
                    </h2>
                    <p className="text-[#A0A0A0] text-base ">{item.desc}</p>
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => {
                router.push('/demo')
              }}
              className="px-12 font-['Poppins'] py-4 text-base font-semibold text-white rounded-md tablet:text-base bg-Blue shadow-deep hover:bg-[#275de6]">
              {t('landing_services_contact')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
