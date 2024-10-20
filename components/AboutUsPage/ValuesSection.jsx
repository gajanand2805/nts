import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeading from '../LandingPage/common/SectionHeading'

const ValuesSection = () => {
  const { t } = useTranslation()

  const VALUES = [
    {
      title: t('about_values_our_value_title'),
      description: t('about_values_our_value_text'),
    },
    {
      title: t('about_values_our_vision_title'),
      description: t('about_values_our_vision_text'),
    },
    {
      title: t('about_values_our_mission_title'),
      description: t('about_values_our_mission_text'),
    },
  ]
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10 tablet:py-20 tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 px-5 w-full max-w-[1800px]">
      <SectionHeading
        heading={t('about_values_heading')}
        subHeading={t('about_values_subheading')}
      />
      <div className="grid w-full grid-cols-1 gap-6 pt-6 mobileL:grid-cols-2 tablet:grid-cols-3">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="flex flex-col w-full items-center shadow-xl justify-start gap-4 p-6 bg-white border-[1px] border-gray-300 rounded-2xl">
            <h4 className="w-full text-xl font-semibold">{value.title}</h4>
            <p className="w-full text-customGray">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValuesSection
