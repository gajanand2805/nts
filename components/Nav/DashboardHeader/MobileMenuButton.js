import React from 'react'
import { useGlobalNavContext } from '../../../contexts/NavContext'

const MobileMenuButton = () => {
  const { setMobileMenuActive, mobileMenuActive } = useGlobalNavContext()

  return (
    <button
      onClick={() => setMobileMenuActive(!mobileMenuActive)}
      className="flex flex-col items-center justify-center gap-1 tablet:hidden">
      <div
        className={`w-8 h-1 bg-black rounded-full dark:bg-white transition-all duration-300 ${
          mobileMenuActive && 'rotate-45 translate-y-2'
        }`}></div>
      <div
        className={`w-8 h-1 bg-black rounded-full dark:bg-white transition-all duration-300 ${
          mobileMenuActive && 'translate-x-4 opacity-0'
        }`}></div>
      <div
        className={`w-8 h-1 bg-black rounded-full dark:bg-white transition-all duration-300 ${
          mobileMenuActive && '-rotate-45 -translate-y-2'
        }`}></div>
    </button>
  )
}

export default MobileMenuButton
