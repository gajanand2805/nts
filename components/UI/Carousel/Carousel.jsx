import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleLeft } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'
import { useGlobalAuthContext } from '../../../AuthContext'

export const Carousel = ({
  children,
  nav = true,
  newStyle = false,
  paginationWrapperClassname = 'items-center',
}) => {
  //? router
  const router = useRouter()
  const { selectedLang } = useGlobalAuthContext()

  //? states
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [count, setCount] = useState(0)

  //? translations
  const { t } = useTranslation()

  //? functions
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = count - 1
    } else if (newIndex >= count) {
      newIndex = 0
    }

    setActiveIndex(newIndex)
  }

  const leftSwipe = () => {
    updateIndex(activeIndex + 1)
  }
  const rightSwipe = () => {
    updateIndex(activeIndex - 1)
  }

  const handlers = useSwipeable({
    onSwipedLeft: leftSwipe,
    onSwipedRight: rightSwipe,
  })

  //? effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1)
      }
    }, 3000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  })

  useEffect(() => {
    setCount(React.Children.count(children))
  }, [children])

  return (
    <div
      {...handlers}
      className="relative z-10 flex flex-col justify-center max-w-full overflow-hidden tabletM:w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      {nav && (
        <>
          <button
            onClick={rightSwipe}
            className="absolute left-0 z-10 hidden p-2 text-2xl text-white transition-all duration-200 ease-in-out rounded-full tabletM:block bg-Blue/10 hover:bg-Blue/30">
            <FaAngleLeft />
          </button>
          <button
            onClick={leftSwipe}
            className="absolute right-0 z-10 hidden p-2 text-2xl text-white transition-all duration-200 ease-in-out rounded-full tabletM:block bg-Blue/10 hover:bg-Blue/30">
            <FaAngleLeft className="rotate-180" />
          </button>
        </>
      )}
      <div
        className="transition-all duration-200 whitespace-nowrap"
        style={{
          transform: `translateX(${selectedLang == 'en' ? '-' : '+'}${
            activeIndex * 100
          }%)`,
        }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' })
        })}
      </div>
      <div
        className={`flex flex-col jusitfy-center m-2 tablet:mt-5 space-y-1 ${paginationWrapperClassname} `}>
        <div className="flex gap-1">
          {Array(count)
            .fill({})
            .map((res, index) => {
              return (
                <div
                  onClick={() => setActiveIndex(index)}
                  key={index}
                  className={`${
                    index === activeIndex
                      ? newStyle
                        ? 'bg-[#5784F7] w-8'
                        : 'bg-white w-8'
                      : newStyle
                        ? 'bg-black w-8'
                        : 'bg-white/10 w-4'
                  } rounded-md duration-200 h-1 cursor-pointer`}></div>
              )
            })}
        </div>

        {router.pathname.includes('/auth') && (
          <p className="text-xl font-bold text-center text-white">
            {t && t('Auth_signup_textonimage_heading')}
          </p>
        )}
      </div>
    </div>
  )
}
