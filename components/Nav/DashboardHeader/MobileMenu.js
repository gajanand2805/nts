import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiSupport } from 'react-icons/bi'
import { useGlobalNavContext } from '../../../contexts/NavContext'
import DarkModeSwitch from '../../DarkModeSwitch'
import LanguageChange from '../../LanguageChange'
const MobileMenu = ({ active, routes }) => {
  const { mobileMenuActive, setMobileMenuActive } = useGlobalNavContext()
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div className="absolute touch-none overflow-hidden -top-3 left-0 right-0 bottom-0 r z-50 flex flex-col items-center justify-start gap-4 px-3 py-2 bg-white dark:bg-bgBlack dark:text-white rounded-b-[10px]">
      <ul className="flex flex-col items-center justify-start w-[90%] h-full gap-2 rounded-standard">
        <li className="flex items-center justify-around w-full px-6 py-2 text-lg font-bold border rounded-md shadow-sm border-bgWhiteSec dark:border-Black ">
          <Link href="/support">
            <button
              className={`flex items-center justify-center w-10 h-10 p-2 text-xl  rounded-full ${
                active === 'support'
                  ? 'bg-Blue text-white'
                  : 'bg-bgWhiteSec text-black dark:bg-dBlack dark:text-white'
              } `}>
              <BiSupport />
            </button>
          </Link>
          <DarkModeSwitch />
          <LanguageChange Dark={true} />
        </li>
        {routes.map((item, i) => {
          return (
            <li
              onClick={() => {
                setMobileMenuActive(false)
                router.push(item.route)
              }}
              key={i}
              className={`flex items-center text-lg font-bold  py-1 px-6 w-full justify-start gap-5 rounded-[10px] hover:bg-Blue/20 cursor-pointer ${
                active == i ? 'bg-Blue text-white' : 'text-BlackSec'
              }`}>
              <p className="text-2xl"> {item.icon}</p>
              <p className=""> {item.name}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MobileMenu
