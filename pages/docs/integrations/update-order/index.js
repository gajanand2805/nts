import React from 'react'
import { useTranslation } from 'react-i18next'
import DocsContentWrapper from '../../../../components/Docs/DocsContentWrapper'
import UpdateOrderCode from '../../../../components/Docs/Integrations/UpdateOrder/UpdateOrderCode'

const crumbs = [
  { path: '/docs', label: 'Introduction' },
  { path: '/docs/integrations', label: 'Integrations' },
  { label: 'Update Order' },
]

const DocsUpdateOrderPage = () => {
  const { t } = useTranslation()
  return (
    <DocsContentWrapper
      crumbs={crumbs}
      heading={t('Docs_Integration_update_Heading')}
      description={t('Docs_Integration_update_Descriotion')}>
      <UpdateOrderCode />
    </DocsContentWrapper>
  )
}

export default DocsUpdateOrderPage
