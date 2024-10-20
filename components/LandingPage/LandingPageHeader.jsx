import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import LanguageChange from '../LanguageChange'

import Link from 'next/link'
import logoDark from '../../Logo/logo_landscape_dark.svg'
import logoLight from '../../Logo/logo_landscape_light.svg'

import { MdClose } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'

export const LandingPageHeader = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = router.pathname

  const isWhiteMode = [
    '/',
    '/demo',
    '/privacy',
    '/about-us',
    '/docs',
    '/pricing',
    '/docs',
    '/docs/integrations/create-order',
    '/docs/integrations/update-order',
    '/docs/integrations/abandoned-cart',
    '/docs/webhooks/salla',
    '/docs/webhooks/woo-commerce',
    '/docs/webhooks/shopify',
    '/docs/webhooks/wix',
  ].includes(pathname)

  const NAVBAR_ITEMS = [
    {
      title: t('navbar_home'),
      route: '/',
    },
    {
      title: t('navbar_pricing'),
      route: '/pricing',
    },
    { title: t('navbar_about'), route: '/about-us' },
    { title: t('navbar_docs'), route: '/docs' },
  ]

  return (
    <nav
      className={`absolute z-40 flex flex-wrap items-center justify-center w-full mx-auto`}>
      <div
        className={`${isWhiteMode ? 'bg-white text-black' : 'bg-[#0D223F] text-white'
          } flex items-center justify-between tablet:px-12 laptop:px-12 laptopL:px-20 py-3 px-5 w-full max-w-[1800px] relative`}>
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <div className="flex items-center text-sm font-bold leading-relaxed text-white uppercase cursor-pointer hover:animate-pulse whitespace-nowrap">
              <Image
                src={isWhiteMode ? logoLight : logoDark}
                alt=""
                width={140}
                height={50}
              />
            </div>
          </Link>
        </div>

        {/* Not Mobile */}
        <div className="items-center justify-end hidden h-auto space-x-3 list-none tabletS:flex">
          {NAVBAR_ITEMS.map(({ title, route }) => (
            <button
              key={title}
              className={`flex font-semibold leading-snug text-center transition-all duration-150 hover:text-Blue`}
              onClick={() => router.push(route)}>
              <span className="ml-2">{title}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* <div className="hidden tabletS:block">
            <LanguageChange
              isWhiteMode={isWhiteMode}
              flag={false}
            />
          </div> */}
          <button
            onClick={() => {
              router.push('/auth')
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-white text-Blue hover:bg-[#275de6]  hover:text-white border-Blue border
            `}>
            {t && t('navbar_login')}
          </button>
          <button
            onClick={() => {
              router.push('/demo')
            }}
            className="bg-Blue hover:bg-[#275de6] hidden tablet:block shadow-md text-white px-5 py-2 text-xs mobileL:text-sm font-semibold rounded-md">
            {t && t('landing_heading_button_getdemo')}
          </button>
          <button
            className={`block text-xl tabletS:hidden ${isWhiteMode ? 'text-black' : 'text-white'}`}
            onClick={() => setNavbarOpen(true)}>
            <RxHamburgerMenu />
          </button>
        </div>

        {navbarOpen && (
          <div
            className={`absolute left-0 right-0 flex flex-col items-center justify-start h-full top-0 tabletS:hidden`}>
            <MobileMenu
              NAVBAR_ITEMS={NAVBAR_ITEMS}
              setNavbarOpen={setNavbarOpen}
            />
          </div>
        )}
      </div>
    </nav>
  )
}

const MobileMenu = ({ NAVBAR_ITEMS, setNavbarOpen }) => {
  const { push } = useRouter()
  return (
    <div
      className={`flex flex-col items-center justify-start px-5 tablet:px-12 laptop:px-12 laptopL:px-20 py-3 w-full max-w-[1800px] relative bg-white text-black rounded-b-xl`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <div className="flex items-center text-sm font-bold leading-relaxed text-white uppercase cursor-pointer hover:animate-pulse whitespace-nowrap">
              <Image
                src={logoLight}
                alt=""
                width={140}
                height={50}
              />
            </div>
          </Link>
        </div>

        <div className="flex justify-center gap-4">
          <LanguageChange
            isWhiteMode={true}
            flag={false}
          />
          <button
            className="text-xl"
            onClick={() => setNavbarOpen(false)}>
            <MdClose />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-8 pt-10 pb-5">
        {NAVBAR_ITEMS.map(({ title, route }) => (
          <button
            key={title}
            className={`flex font-semibold leading-snug text-center transition-all duration-150 hover:text-Blue text-xl`}
            onClick={() => {
              push(route)
              setNavbarOpen(false)
            }}>
            <span className="ml-2">{title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
