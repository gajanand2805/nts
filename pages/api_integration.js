import React from 'react'

import Loader from '../components/Loader'

import { useGlobalAuthContext } from '../AuthContext'

import { useTranslation } from 'react-i18next'
import AbandonedCartSection from '../components/ApiIntegration/AbandonedCartSection'
import CreateOrderSection from '../components/ApiIntegration/CreateOrderSection'
import Platform from '../components/ApiIntegration/Platform'
import TopSectionApiIntegration from '../components/ApiIntegration/TopSectionApiIntegration'
import UpdateOrderSection from '../components/ApiIntegration/UpdateOrderSection'
import MainScreenWrapper from '../components/MainScreenWrapper'

const Api_integration = () => {
  const {
    isAccessToken,

    isLoading,
  } = useGlobalAuthContext()
  const { t } = useTranslation()

  return (
    <MainScreenWrapper screenHeader={t('Integration_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col items-start justify-start w-full gap-4 p-4 bg-white tabletM:p-8 rounded-standard dark:bg-bgBlack">
            <Platform />
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-4 p-4 bg-white tabletM:p-8 rounded-standard dark:bg-bgBlack">
            <TopSectionApiIntegration />
            <CreateOrderSection />
            <UpdateOrderSection />
            <AbandonedCartSection />
          </div>
        </div>
      )}
    </MainScreenWrapper>
  )
}

export default Api_integration
