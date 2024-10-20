import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../../AuthContext'

const LeftDashboardHeader = ({ active, routes, setActive }) => {
  //? contexts
  const { selectedLang } = useGlobalAuthContext()

  //? translations
  const { t } = useTranslation()

  //? router
  const router = useRouter()

  //? offset
  const [offset, setOffset] = useState(0)

  //? effects
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{ top: `${100 - offset > 10 ? 100 - offset : 10}px` }}
      className={`fixed w-full max-w-[240px] rounded-standard py-4 overflow-hidden ${selectedLang == 'en' ? 'left-[40px]' : 'right-[40px]'
        }   bottom-[10px] max-h-[600px] px-4 z-10 flex-col items-center justify-between hidden duration-200 bg-white gap-1 tablet:flex dark:bg-bgBlack`}>
      <ul className="flex flex-col items-center justify-between w-full h-full rounded-standard">
        {routes.map((item, i) => {
          return (
            <Link
              href={item.route}
              key={i}>
              <div
                onClick={() => setActive(i)}
                className={`flex items-center text-lg font-bold  py-2 px-4 w-full justify-start gap-5 rounded-[10px] hover:bg-Blue/20 cursor-pointer ${active == i ? 'bg-Blue text-white' : 'text-BlackSec'
                  }`}>
                <p className="text-2xl"> {item.icon}</p>
                <p className=""> {item.name}</p>
              </div>
            </Link>
          )
        })}
      </ul>
    </header>
  )
}

export default LeftDashboardHeader
