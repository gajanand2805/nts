import React from 'react'
import { useTranslation } from 'react-i18next'

const StatsSection = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 px-8 py-10 text-white tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 bg-Blue">
      <div className="grid grid-cols-1 gap-6 mobileL:grid-cols-2 tablet:grid-cols-4 tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 px-5 w-full max-w-[1800px]">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-5xl font-bold">480k+</p>
          <p className="text-center">
            {t('about_stats_messages_sent_campaign')}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-5xl font-bold">600k+</p>
          <p className="text-center">{t('about_stats_invoice_sent')}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-5xl font-bold">8M+</p>
          <p className="text-center">{t('about_stats_revenue_generated')}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-5xl font-bold">600k+</p>
          <p className="text-center">{t('about_stats_served_numbers')}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsSection
