import Image from 'next/image'
import React from 'react'
import Sala from './assets/Group.png'
import Shopify from './assets/Shopify.png'
import WooCommerce from './assets/WooCommerce.png'
import Zid from './assets/Zid.png'

// Import Swiper styles
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SectionHeading from '../common/SectionHeading'
const IntegrationSection = () => {
  const images = [Shopify, WooCommerce, Zid, Sala]
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center gap-10 tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 py-10 px-5 w-full max-w-[1800px]">
      <div className="w-[90%] relative tabletM:w-full flex items-center justify-between px-5 laptop:px-32 py-10 flex-col gap-10">
        <SectionHeading subHeading={t('landing_integration_heading')} />
        <div className="grid w-full grid-cols-2 gap-4 place-items-center tabletS:grid-cols-4">
          {images.map((image, i) => (
            <div
              key={i}
              className="relative flex items-center justify-center w-24 h-16">
              <Image
                src={image}
                alt={'apps'}
                priority
                layout="fill"
                objectFit="contain"
                className="object-cover w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntegrationSection
