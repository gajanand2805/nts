import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiChevronLeft } from 'react-icons/bi'
import { useGlobalAuthContext } from '../AuthContext'
import PrimaryButton from './UI/Button/PrimaryButton'

const MainScreenWrapper = ({
  children,
  screenHeader = 'Header',
  backLink = '',
  backText = '',
  primaryText = '',
  primaryHandleClick,
  primaryIsLoading,
  primaryDisabled,
  headerItem,
}) => {
  //? contexts
  const { selectedLang } = useGlobalAuthContext()
  //?translator
  const { t } = useTranslation()
  //? states
  return (
    <div
      className={`justify-start relative w-full flex  pl-[20px] pr-[20px] pt-[98px] h-full pb-[20px] ${selectedLang == 'en'
        ? 'tablet:pl-[300px] tablet:pr-[15px]'
        : 'tablet:pr-[300px] tablet:pl-[15px]'
        } h-full items-start flex-col bg-bgWhiteSec min-h-screen gap-1 text-Black dark:bg-dBlack dark:text-White`}>
      <div className="flex items-center items-end justify-between w-full ">
        <div className="flex flex-col items-start justify-start gap-1">
          {backLink && backText && (
            <Link
              href={backLink}
              className="flex items-center ">
              <p className="flex items-center gap-2 font-bold cursor-pointer text-Blue group">
                <span className="transition-all duration-200 group-hover:-translate-x-1">
                  <BiChevronLeft />
                </span>
                {backText}
              </p>
            </Link>
          )}
          <p className="text-2xl font-bold ">{screenHeader}</p>
        </div>
        <div className="mt-5 scale-90">
          {primaryText && (
            <PrimaryButton
              text={primaryText}
              handleClick={primaryHandleClick}
              isLoading={primaryIsLoading}
              disabled={primaryDisabled}
              width="fit"
            />
          )}
        </div>
        {headerItem}
      </div>

      <div className="w-full h-full pt-2">{children}</div>
    </div>
  )
}

export default MainScreenWrapper
