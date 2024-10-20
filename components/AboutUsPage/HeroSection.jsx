import React from 'react'
import { useTranslation } from 'react-i18next'

export const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center w-full pt-[76px] bg-gradient-to-b tablet:bg-gradient-to-r from-white to-[#5EC4FF]/30 ">
      <div className="flex flex-row items-center  overflow-hidden laptopL:overflow-visible  h-[400px] gap-6 relative space-y-3 pb-10 pt-10 tablet:py-10 tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 px-5 w-full max-w-[1800px]">
        <div className="z-10 flex flex-col items-center justify-center w-full gap-6">
          <h2 className="text-3xl tabletM:text-4xl font-bold text-black font-josefinSans">
            {t('about_hero_heading')}
          </h2>
          <p className="max-w-3xl text-lg tabletM:text-2xl text-center font-mPlus text-[#070707]">
            {t('about_hero_text')}
          </p>
        </div>
      </div>
    </div>
  )
}
