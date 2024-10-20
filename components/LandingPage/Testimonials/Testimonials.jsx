import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Rating from '../../UI/Rating/Rating'
import SectionHeading from '../common/SectionHeading'
// SVGs
import { GoChevronRight } from 'react-icons/go'

// Animation
import a1 from './assets/1.jpg'
import a2 from './assets/dcLogo.jpeg'
// import a2 from './assets/2.jpg'
import { Carousel } from '../../UI/Carousel/Carousel'
import { CarouselItem } from '../../UI/Carousel/CarouselItem'
import a3 from './assets/3.png'
// Automated CRM Pipeline

export const Testimonials = () => {
  const { t } = useTranslation()
  const TESTIMONIALS = [
    {
      testimonial: t('landing_testimonials_1'),
      name: 'PharmaClouds',
      rating: 4,
      image: a1,
    },
    {
      testimonial: t('landing_testimonials_2'),
      name: 'Digital Creativity',
      rating: 4.5,
      image: a2,
    },
    {
      testimonial: t('landing_testimonials_3'),
      name: 'Mahara Karting',
      rating: 5,
      image: a3,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsLength = TESTIMONIALS.length

  const nextHandler = () => {
    if (currentIndex === TESTIMONIALS.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex((currentIndex) => currentIndex + 1)
    }
  }

  const prevHandler = () => {
    if (currentIndex === 0) {
      setCurrentIndex(TESTIMONIALS.length - 1)
    } else {
      setCurrentIndex((currentIndex) => currentIndex - 1)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextHandler()
    }, 3000)

    return () => clearInterval(intervalId)
  }, [currentIndex])

  const renderBtn = () => {
    return (
      <>
        <button
          onClick={nextHandler}
          className="absolute right-0 p-2 text-2xl text-blue-600 transition-all duration-300 ease-out rounded-full bg-Blue/20 hover:bg-Blue hover:text-white">
          <GoChevronRight />
        </button>
        <button
          onClick={prevHandler}
          className="absolute left-0 p-2 text-2xl text-blue-600 transition-all duration-300 ease-out rounded-full bg-Blue/20 hover:bg-Blue hover:text-white">
          <GoChevronRight className="rotate-180" />
        </button>
      </>
    )
  }

  return (
    <div className="relative flex flex-col items-center w-full gap-5 px-5 py-10 bg-white tablet:py-20 tablet:gap-10 tablet:px-12 laptop:px-12 laptopL:px-20 ">
      <SectionHeading
        // supHeading={t('')}
        heading={t('landing_testimonials_heading')}
      />
      <p className="text-3xl font-bold text-Blue">
        <svg
          width="55"
          height="35"
          viewBox="0 0 55 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M43.0156 34.5938C41.2344 34.5938 39.6094 34.3281 38.1406 33.7969C36.6719 33.2344 35.4219 32.4688 34.3906 31.5C33.3594 30.5 32.5469 29.2969 31.9531 27.8906C31.3906 26.4844 31.1094 24.9219 31.1094 23.2031C31.1094 21.4219 31.4219 19.5625 32.0469 17.625C32.7031 15.6875 33.6406 13.7344 34.8594 11.7656C36.0781 9.79688 37.5469 7.85938 39.2656 5.95312C41.0156 4.01562 43 2.15625 45.2188 0.375L50.6094 4.59375C49.5781 5.65625 48.6406 6.67187 47.7969 7.64062C46.9844 8.60938 46.2344 9.57812 45.5469 10.5469C44.8594 11.5156 44.2188 12.5156 43.625 13.5469C43.0625 14.5781 42.5469 15.6719 42.0781 16.8281L54.8281 23.2031C54.8281 24.8906 54.5 26.4375 53.8438 27.8438C53.2188 29.25 52.375 30.4531 51.3125 31.4531C50.25 32.4531 49 33.2344 47.5625 33.7969C46.125 34.3281 44.6094 34.5938 43.0156 34.5938ZM12.4062 34.5938C10.625 34.5938 9 34.3281 7.53125 33.7969C6.0625 33.2344 4.8125 32.4688 3.78125 31.5C2.75 30.5 1.9375 29.2969 1.34375 27.8906C0.78125 26.4844 0.5 24.9219 0.5 23.2031C0.5 21.4219 0.8125 19.5625 1.4375 17.625C2.09375 15.6875 3.03125 13.7344 4.25 11.7656C5.46875 9.79688 6.9375 7.85938 8.65625 5.95312C10.4062 4.01562 12.3906 2.15625 14.6094 0.375L20 4.59375C18.9688 5.65625 18.0312 6.67187 17.1875 7.64062C16.375 8.60938 15.625 9.57812 14.9375 10.5469C14.25 11.5156 13.6094 12.5156 13.0156 13.5469C12.4531 14.5781 11.9375 15.6719 11.4688 16.8281L24.2188 23.2031C24.2188 24.8906 23.8906 26.4375 23.2344 27.8438C22.6094 29.25 21.7656 30.4531 20.7031 31.4531C19.6406 32.4531 18.3906 33.2344 16.9531 33.7969C15.5156 34.3281 14 34.5938 12.4062 34.5938Z"
            fill="#5784F7"
          />
        </svg>
      </p>
      <Carousel
        nav={false}
        newStyle={true}>
        {TESTIMONIALS.map((item, index) => {
          return (
            <CarouselItem key={`cds${index}`}>
              <div className="flex flex-col items-center w-full gap-5 font-josefinSans">
                <p className="whitespace-normal w-full max-w-[600px]  text-center text-[#969696] dark:text-[#353535] ">
                  {item.testimonial}
                </p>
                <Rating rating={item.rating} />
                <h3 className="font-semibold">{item.name}</h3>
                <div className="relative w-20 h-20 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt="Feature Icon"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </Carousel>
    </div>
  )
}

export default Testimonials

const SingleTestimonial = ({ testimonial, inFocus }) => {
  return (
    <div
      key={testimonial.testimonial}
      className={`flex relative flex-col items-center justify-start gap-3 px-4 py-6 pt-14 border-[1px] border-gray-300 w-full rounded-2xl ${
        !inFocus ? 'scale-75 opacity-60 bg-white' : 'bg-gray-100'
      }`}>
      <div className="absolute -top-10">
        <div className="relative w-20 h-20 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt="Feature Icon"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">
        {testimonial.name}
      </h3>
      <Rating rating={testimonial.rating} />
      <p className="text-center text-customGray dark:text-[#353535]">
        {testimonial.testimonial}
      </p>
    </div>
  )
}
