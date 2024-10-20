import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeading from '../common/SectionHeading'
import image1 from './assets/new_1.png'
import image2 from './assets/new_2.png'
import image3 from './assets/new_3.png'
import image4 from './assets/new_4.png'
import image5 from './assets/new_5.png'
import image6 from './assets/new_6.png'
//hjk
import 'swiper/css'
import 'swiper/css/autoplay'

const images = [image1, image2, image3, image4, image5, image6]
const ClientSection = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center gap-12 tablet:px-12 laptop:px-12 laptopL:px-20 py-3 px-5 w-full max-w-[1800px]">
      <div className="relative flex flex-col items-center justify-center gap-2 mt-5  tabletM:w-full">
        <SectionHeading subHeading={t('landing_client_header')} />
        <div className="flex tablet:gap-12 justify-between w-full  max-w-[1800px]">
          {images.map((img, index) => {
            return (
              <Image
                key={index}
                src={img}
                priority
                alt={`client${index}`}
                height={200}
                width={350}
                className="object-contain opacity-55"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ClientSection
