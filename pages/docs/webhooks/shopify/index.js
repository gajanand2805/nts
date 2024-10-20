import React from 'react'
import { useTranslation } from 'react-i18next'
import DocsContentWrapper from '../../../../components/Docs/DocsContentWrapper'

const crumbs = [
  { path: '/docs', label: 'Introduction' },
  { path: '/docs/webhooks', label: 'Webhooks' },
  { label: 'Shopify' },
]

const DocsShopifyPage = () => {
  const { t } = useTranslation()
  return (
    <DocsContentWrapper
      crumbs={crumbs}
      heading="Shopify"
      description={t('Docs_Webhooks_shopify_Description')}>
      <div className="flex flex-col items-start justify-start w-full gap-8">
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <p className="font-bold">{t('Docs_Webhooks_shopify_Step1')}</p>
          <p>{t('Docs_Webhooks_shopify_Step1_text')}</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <p className="font-bold">{t('Docs_Webhooks_shopify_Step2')}</p>
          <p>{t('Docs_Webhooks_shopify_Step2_text')}</p>

          <ul className="flex flex-col items-start justify-start w-full">
            <li className="flex justify-start gap-4 break-all">
              <span className="font-medium">1.</span>
              Link: https://api.invobot.net/Webhook/v1.0/shopify/(Merchant_ID)
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span className="font-medium">2.</span>Name: Order_Init
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span className="font-medium">3.</span>Event Type: Request has
              been created
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span className="font-medium">4.</span>Version: v2
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span className="font-medium">5.</span>HTTP Method: POST
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span className="font-medium">6.</span>
              Header: token: (the actual token value will be provided in the
              webhook setup)
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <p className="font-bold">{t('Docs_Webhooks_shopify_Step3')}</p>
          <p>{t('Docs_Webhooks_shopify_Step3_text')}</p>

          <ul>
            <li className="flex justify-start gap-4 break-all">
              <span>1.</span>
              Link: https://api.invobot.net/Webhook/v1.0/shopify/(Merchant_ID)
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span>2.</span>
              Name: Order_Update
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span>3.</span>
              Event Type: Request information has been updated
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span>4.</span>
              Version: v2
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span>5.</span>
              HTTP Method: POST
            </li>
            <li className="flex justify-start gap-4 break-all">
              <span>6.</span>
              Header: token: (the actual token value will be provided in the
              webhook setup)
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <p className="font-bold">{t('Docs_Webhooks_shopify_Step4')}</p>
          <p>{t('Docs_Webhooks_shopify_Step4_text')}</p>
        </div>
      </div>
    </DocsContentWrapper>
  )
}

export default DocsShopifyPage
