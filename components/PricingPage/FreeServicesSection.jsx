import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeading from '../LandingPage/common/SectionHeading'
import comprehensiveReport from './assets/comprehensiveReport.svg'
import employeeTraining from './assets/employeeTraining.svg'
import freeUpdatesSVG from './assets/freeUpdates.svg'
import technicalSupport from './assets/technicalSupport.svg'
const FreeServicesSection = ({ showContact }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const FREE_SERVICES = [
    { title: t('pricing_free_service_free_updates'), image: freeUpdatesSVG },
    {
      title: t('pricing_free_service_comprehensive_report'),
      image: comprehensiveReport,
    },
    {
      title: t('pricing_free_service_employee_training'),
      image: employeeTraining,
    },
    {
      title: t('pricing_free_service_technical_support'),
      image: technicalSupport,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-start gap-8 py-10 tablet:py-12 tablet:gap-12  px-5 tablet:px-12 laptop:px-12 laptopL:px-20 w-full max-w-[1800px]">
      <SectionHeading
        heading={t('pricing_free_service_header')}
        // headingColor="#454545"
      />
      <div className="  grid grid-cols-4 gap-6  w-fit">
        {FREE_SERVICES.map((service) => (
          <div
            key={service.title}
            className="w-full flex flex-col items-center col-span-4 tablet:col-span-2 laptop:col-span-1">
            <div className="flex flex-col  items-center shadow-lg   gap-4 w-56 h-52 laptopL:w-64 laptopL:h-60 justify-center bg-white border-[1px] border-gray-300 rounded-2xl">
              <Image
                src={service.image}
                alt="Feature Icon"
              />
              <h3 className="text-lg font-josefinSans font-semibold text-center text-gray-800 dark:text-gray-100">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          router.push('/auth?tab=signup')
        }}
        className={`px-12 font-['Poppins'] py-4 text-base font-semibold text-white rounded-md tablet:text-base bg-Blue shadow-deep hover:bg-[#275de6] ${showContact ? 'block' : 'hidden'}`}>
        {t('landing_services_contact')}
      </button>
    </div>
  )
}

export default FreeServicesSection
