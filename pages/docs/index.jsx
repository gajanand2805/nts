import React from 'react'
import { useTranslation } from 'react-i18next'
import DocsContentWrapper from '../../components/Docs/DocsContentWrapper'

const crumbs = [{ label: 'Introduction' }]

const DocsPage = () => {
  const { t } = useTranslation()
  return (
    <DocsContentWrapper
      crumbs={crumbs}
      description={t('Docs_Introduction_Description')}>
      <div className="flex flex-col items-start justify-start w-full gap-4">
        <p>{t('Docs_Introduction_Para1')}</p>
        <p>{t('Docs_Introduction_Para2')}</p>
        <p>{t('Docs_Introduction_Para3')}</p>
      </div>
    </DocsContentWrapper>
  )
}

export default DocsPage
