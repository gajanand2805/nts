import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../../AuthContext'

const DocsSideHeader = () => {
  const router = useRouter()
  const pathname = router.pathname
  const { t } = useTranslation()
  const { selectedLang } = useGlobalAuthContext()
  return (
    <div
      className={`absolute hidden top-20 bottom-2  p-4 px-5 rounded-xl pt-5 tablet:flex flex-col items-center justify-start w-full max-w-[180px] gap-4 ${selectedLang === 'en' ? 'pl-0' : 'pr-0'}`}>
      <div className="flex flex-col items-start justify-start w-full">
        <h3 className="font-bold">{t('Docs_Side_header_Documentation')}</h3>
        <ul className="flex flex-col items-start justify-start w-full"></ul>
        <Link href="/docs">
          <li
            className={`w-full px-2 py-1  list-none rounded-lg cursor-pointer ${pathname === '/docs'
                ? 'text-Blue'
                : 'text-black/60 hover:text-black'
              }`}>
            {t('Docs_Side_header_Introduction')}
          </li>
        </Link>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <h3 className="font-bold">{t('Docs_Side_header_Integrations')}</h3>
        <ul className="flex flex-col items-start justify-start w-full"></ul>
        <Link href="/docs/integrations/create-order">
          <li
            className={`w-full px-2 py-1  list-none rounded-lg cursor-pointer ${pathname === '/docs/integrations/create-order'
                ? 'text-Blue'
                : 'text-black/60 hover:text-black'
              }`}>
            {t('Docs_Side_header_Create_order')}
          </li>
        </Link>

        <Link href="/docs/integrations/update-order">
          <li
            className={`w-full px-2 py-1  list-none rounded-lg cursor-pointer ${pathname === '/docs/integrations/update-order'
                ? 'text-Blue'
                : 'text-black/60 hover:text-black'
              }`}>
            {t('Docs_Side_header_Update_order')}
          </li>
        </Link>

        <Link href="/docs/integrations/abandoned-cart">
          <li
            className={`w-full px-2 py-1  list-none rounded-lg cursor-pointer ${pathname === '/docs/integrations/abandoned-cart'
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
            className={`w-full px-2 py-1  list-none rounded-lg cursor-pointer ${pathname === '/docs/webhooks/salla'
                ? 'text-Blue'
                : 'text-black/60 hover:text-black'
              }`}>
            Salla
          </li>
        </Link>

        <Link href="/docs/webhooks/shopify">
          <li
            className={`w-full px-2 py-1  list-none rounded-lg cursor-pointer ${pathname === '/docs/webhooks/shopify'
                ? 'text-Blue'
                : 'text-black/60 hover:text-black'
              }`}>
            Shopify
          </li>
        </Link>
      </div>
    </div>
  )
}

export default DocsSideHeader
