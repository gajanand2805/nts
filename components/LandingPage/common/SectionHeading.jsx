import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

const header1Varient = {
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),

  // visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: -10, opacity: 0 },
}
// gap-5 px-8 py-10 tablet:py-20 tablet:gap-10 tablet:px-12 laptop:px-12 laptopL:px-20
const SectionHeading = ({ supHeading, heading, subHeading, headingColor }) => {
  const controls = useAnimation()
  const { t } = useTranslation()

  const [ref, inView] = useInView({ threshold: 0 })
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
    // else controls.start('hidden')
  }, [controls, inView])

  return (
    <div className="flex flex-col items-center font-josefinSans justify-center gap-3 laptop:gap-6">
      {supHeading && (
        <motion.p
          ref={ref}
          animate={controls}
          initial="hidden"
          custom={0}
          variants={header1Varient}
          className=" text-Blue laptop:text-[27px] laptop:leading-[27px]">
          {supHeading}
        </motion.p>
      )}
      {heading && (
        <motion.p
          ref={ref}
          animate={controls}
          initial="hidden"
          custom={1}
          variants={header1Varient}
          className={`w-full max-w-3xl text-2xl font-bold text-center ${headingColor ? `text-[${headingColor}]` : 'text-[#454545]'} tablet:text-5xl`}>
          {heading}
        </motion.p>
      )}
      {subHeading && (
        <motion.p
          ref={ref}
          animate={controls}
          initial="hidden"
          custom={3}
          variants={header1Varient}
          className="max-w-3xl text-sm text-center tablet:text-base text-customGray">
          {subHeading}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeading
