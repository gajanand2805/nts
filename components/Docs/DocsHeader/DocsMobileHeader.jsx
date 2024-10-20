import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LuChevronRight } from 'react-icons/lu'

const DocsMobileHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const router = useRouter()
  const pathname = router.pathname
  const { t } = useTranslation()

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="w-full flex tablet:hidden items-center justify-start border-b-[1px] border-Blue py-2 ">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex items-center justify-center gap-1">
        <LuChevronRight
          className={`${
            isMobileMenuOpen && 'rotate-90'
          } transition-all duration-200 ease-out`}
        />
        Menu
      </button>
      {isMobileMenuOpen && (
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-start w-full bg-white border-t-[1px] border-Blue top-[120px]">
          <div className="flex flex-col items-start justify-start w-full gap-1 p-4">
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold">Documentation</h3>
              <ul className="flex flex-col items-start justify-start w-full"></ul>
              <Link href="/docs">
                <li
                  onClick={closeMobileMenu}
                  className={`w-full px-2 py-1 list-none rounded-lg cursor-pointer ${
                    pathname === '/docs'
                      ? 'text-Blue'
                      : 'text-black/60 hover:text-black'
                  }`}>
                  {t('Docs_Side_header_Introduction')}
                </li>
              </Link>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold">
                {t('Docs_Side_header_Integrations')}
              </h3>
              <ul className="flex flex-col items-start justify-start w-full"></ul>
              <Link href="/docs/integrations/create-order">
                <li
                  onClick={closeMobileMenu}
                  className={`w-full px-2 py-1 list-none rounded-lg cursor-pointer ${
                    pathname === '/docs/integrations/create-order'
                      ? 'text-Blue'
                      : 'text-black/60 hover:text-black'
                  }`}>
                  {t('Docs_Side_header_Create_order')}
                </li>
              </Link>

              <Link href="/docs/integrations/update-order">
                <li
                  onClick={closeMobileMenu}
                  className={`w-full px-2 py-1 list-none rounded-lg cursor-pointer ${
                    pathname === '/docs/integrations/update-order'
                      ? 'text-Blue'
                      : 'text-black/60 hover:text-black'
                  }`}>
                  {t('Docs_Side_header_Update_order')}
                </li>
              </Link>

              <Link href="/docs/integrations/abandoned-cart">
                <li
                  onClick={closeMobileMenu}
                  className={`w-full px-2 py-1 list-none rounded-lg cursor-pointer ${
                    pathname === '/docs/integrations/abandoned-cart'
                      ? 'text-Blue'
                      : 'text-black/60 hover:text-black'
                  }`}>
                  {t('Docs_Side_header_Abandoned_cart')}
                </li>
              </Link>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <h3 className="font-bold">{t('Docs_Side_header_Webhooks')}</h3>
              <ul className="flex flex-col items-start justify-start w-full"></ul>
              <Link href="/docs/webhooks/salla">
                <li
                  onClick={closeMobileMenu}
                  className={`w-full px-2 py-1 list-none rounded-lg cursor-pointer ${
                    pathname === '/docs/webhooks/salla'
                      ? 'text-Blue'
                      : 'text-black/60 hover:text-black'
                  }`}>
                  Salla
                </li>
              </Link>

              <Link href="/docs/webhooks/shopify">
                <li
                  onClick={closeMobileMenu}
                  className={`w-full px-2 py-1 list-none rounded-lg cursor-pointer ${
                    pathname === '/docs/webhooks/shopify'
                      ? 'text-Blue'
                      : 'text-black/60 hover:text-black'
                  }`}>
                  Shopify
                </li>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocsMobileHeader
