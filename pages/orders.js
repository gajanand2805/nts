import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useGlobalAuthContext } from '../AuthContext'
import { useTranslation } from 'react-i18next'
import MainScreenWrapper from '../components/MainScreenWrapper'
import MainOrderScreen from '../components/Orders/MainOrderScreen'

const Order = () => {
  const { isAccessToken, isLoading } = useGlobalAuthContext()
  const { t } = useTranslation()

  return (
    <MainScreenWrapper screenHeader={t('Orders_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <MainOrderScreen />
      )}
    </MainScreenWrapper>
  )
}

export default Order
