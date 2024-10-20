import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeading from '../common/SectionHeading'
// SVGs
import AbandonedCartIcon from './Assets/AbandonedCartIcon.svg'
import AddCampaignIcon from './Assets/AddCampaignIcon.svg'
import ChatbotIcon from './Assets/ChatbotIcon.svg'
import FeatuersIcon from './Assets/FeatuersIcon.svg'
import FeedbackIcon from './Assets/FeedbackIcon.svg'
import InvoiceIcon from './Assets/InvoiceIcon.svg'
import StoreAnalyticsIcon from './Assets/StoreAnalyticsIcon.svg'
import SurveyFormIcon from './Assets/SurveyFormIcon.svg'
// Animation

// Automated CRM Pipeline

export const Features = () => {
  const { t } = useTranslation()
  const features = [
    {
      id: 1,
      title: t('landing_our_features_card1_heading'),
      description: t('landing_our_features_card1_text'),
      icon: InvoiceIcon,
    },
    {
      id: 2,
      title: t('landing_our_features_card2_heading'),
      description: t('landing_our_features_card2_text'),
      icon: FeatuersIcon,
    },
    {
      id: 3,
      title: t('landing_our_features_card3_heading'),
      description: t('landing_our_features_card3_text'),
      icon: StoreAnalyticsIcon,
    },
    {
      id: 4,
      title: t('landing_our_features_card4_heading'),
      description: t('landing_our_features_card4_text'),
      icon: FeedbackIcon,
    },
    {
      id: 5,
      title: t('landing_our_features_card5_heading'),
      description: t('landing_our_features_card5_text'),
      icon: SurveyFormIcon,
    },
    {
      id: 6,
      title: t('landing_our_features_card6_heading'),
      description: t('landing_our_features_card6_text'),
      icon: AbandonedCartIcon,
    },
    {
      id: 7,
      title: t('landing_our_features_card7_heading'),
      description: t('landing_our_features_card7_text'),
      icon: AddCampaignIcon,
    },
    {
      id: 8,
      title: t('landing_our_features_card8_heading'),
      description: t('landing_our_features_card8_text'),
      icon: ChatbotIcon,
    },
    {
      id: 9,
      title: t('landing_our_features_card9_heading'),
      description: t('landing_our_features_card9_text'),
      icon: FeatuersIcon,
    },
  ]

  return (
    <div
      id="features"
      className="flex flex-col items-center justify-center gap-10  tablet:py-20 tablet:gap-20 px-5 tablet:px-12 laptop:px-12 laptopL:px-20 py-10   w-full max-w-[1800px]">
      <SectionHeading
        supHeading={t('landing_our_features_heading')}
        heading={t('landing_our_features_heading_text')}
        subHeading={t('landing_our_features_heading_description')}
      />

      <div className="grid w-full grid-cols-1 gap-5 tablet:grid-cols-2 laptop:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center justify-start gap-2 tablet:gap-4 px-2 tablet:px-4 py-4 tablet:py-6 bg-white border-[1px] border-gray-300 rounded-2xl">
            <Image
              priority
              src={feature.icon}
              alt="Feature Icon"
            />
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">
              {feature.title}
            </h3>
            <p className="text-sm text-center text-customGray dark:text-[#353535]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
