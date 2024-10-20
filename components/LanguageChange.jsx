import i18n from 'i18next'
import { useRouter } from 'next/router'
import React from 'react'
import { useGlobalAuthContext } from '../AuthContext'

export default function LanguageChange({ Dark, flag = true, isWhiteMode }) {
  //? router
  const router = useRouter()

  //? contexts
  const { setSelectedLang, selectedLang } = useGlobalAuthContext()

  //? functions
  const handleLangSwitch = () => {
    if (selectedLang === 'en') {
      i18n.changeLanguage('ar')
      setSelectedLang('ar')
      router.replace(router.asPath)
    } else {
      i18n.changeLanguage('en')
      setSelectedLang('en')
      router.replace(router.asPath)
    }
  }
  if (flag) {
    return (
      <button
        onClick={handleLangSwitch}
        className={`text-sm font-bold w-10 h-10 p-2 bg-bgWhiteSec ${Dark ? 'dark:bg-dBlack dark:text-white' : ''
          } flex items-center justify-center rounded-full text-black `}>
        {selectedLang === 'en' ? 'AR' : 'EN'}
      </button>
    )
  } else {
    return (
      <button
        onClick={handleLangSwitch}
        className={`text-xs p-2 font-semibold rounded-md border-[1px] bg-transparent duration-150 transition-all cursor-pointer hover:border-transparent hover:text-Blue ${isWhiteMode
            ? 'hover:bg-White border-Blue text-Blue '
            : 'hover:bg-White border-White text-White'
          }`}>
        {selectedLang === 'en' ? 'AR' : 'EN'}
      </button>
    )
  }
}
