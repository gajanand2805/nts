import React from 'react'
import { useTranslation } from 'react-i18next'
import DocsContentWrapper from '../../../../components/Docs/DocsContentWrapper'
import CreateOrderCode from '../../../../components/Docs/Integrations/CreateOrder/CreateOrderCode'

const crumbs = [
  { path: '/docs', label: 'Introduction' },
  { path: '/docs/integrations', label: 'Integrations' },
  { label: 'Create Order' },
]

const DocsCreateOrderPage = () => {
  const { t } = useTranslation()
  return (
    <DocsContentWrapper
      crumbs={crumbs}
      heading={t('Docs_Integration_create_Heading')}
      description={t('Docs_Integration_create_Descriotion')}>
      <CreateOrderCode />
    </DocsContentWrapper>
  )
}

export default DocsCreateOrderPage
