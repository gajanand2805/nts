import React from 'react'
import { useTranslation } from 'react-i18next'
import DocsContentWrapper from '../../../../components/Docs/DocsContentWrapper'
import AbandonedCartCode from '../../../../components/Docs/Integrations/AbandonCart/AbandonCartCode'

const crumbs = [
  { path: '/docs', label: 'Introduction' },
  { path: '/docs/integrations', label: 'Integrations' },
  { label: 'Abandoned Cart' },
]

const DocsAbandonedCartPage = () => {
  const { t } = useTranslation()
  return (
    <DocsContentWrapper
      crumbs={crumbs}
      heading={t('Docs_Integration_abandon_Heading')}
      description={t('Docs_Integration_abandon_Descriotion')}>
      <AbandonedCartCode />
    </DocsContentWrapper>
  )
}

export default DocsAbandonedCartPage
