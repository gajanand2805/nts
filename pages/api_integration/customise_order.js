import React, { useState, useEffect } from 'react'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import Loader from '../../components/Loader'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import TopSection from '../../components/ApiIntegration/CustomiseOrder/TopSection'
import BillShippAddress from '../../components/ApiIntegration/CustomiseOrder/BillShippAddress'
import AddItems from '../../components/ApiIntegration/CustomiseOrder/AddItems'
import Finance from '../../components/ApiIntegration/CustomiseOrder/Finance'
import { useRouter } from 'next/router'
import PrimaryButton from '../../components/UI/Button/PrimaryButton'
import SecondaryButton from '../../components/UI/Button/SecondaryButton'

const CustomiseOrder = () => {
  const { t } = useTranslation()
  const { isLoading, setIsLoading, isAccessToken, selectedLang } =
    useGlobalAuthContext()
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(0)
  setIsLoading(false)

  const customiseOrderHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    if (name === 'Billing_Address_Line1') {
      setOrder((obj) => {
        return {
          ...obj,
          Billing_Address: {
            ...obj.Billing_Address,
            Address_line1: e.target.value,
          },
        }
      })
    } else if (name === 'Billing_Address_Line2') {
      setOrder((obj) => {
        return {
          ...obj,
          Billing_Address: {
            ...obj.Billing_Address,
            Address_line2: e.target.value,
          },
        }
      })
    } else if (name === 'Billing_Address_Line3') {
      setOrder((obj) => {
        return {
          ...obj,
          Billing_Address: {
            ...obj.Billing_Address,
            Address_line3: e.target.value,
          },
        }
      })
    } else if (name === 'Shipping_Address_Line1') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping_Address: {
            ...obj.Shipping_Address,
            Address_line1: e.target.value,
          },
        }
      })
    } else if (name === 'Shipping_Address_Line2') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping_Address: {
            ...obj.Shipping_Address,
            Address_line2: e.target.value,
          },
        }
      })
    } else if (name === 'Shipping_Address_Line3') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping_Address: {
            ...obj.Shipping_Address,
            Address_line3: e.target.value,
          },
        }
      })
    } else if (name === 'Currency') {
      setOrder((obj) => {
        return {
          ...obj,
          Currency: e.target.value,
        }
      })
    } else if (name === 'Total') {
      setOrder((obj) => {
        return {
          ...obj,
          Total: e.target.value,
        }
      })
    } else if (name === 'Subtotal') {
      setOrder((obj) => {
        return {
          ...obj,
          Subtotal: e.target.value,
        }
      })
    } else if (name === 'Discount') {
      setOrder((obj) => {
        return {
          ...obj,
          Discount: e.target.value,
        }
      })
    } else if (name === 'Tax') {
      setOrder((obj) => {
        return {
          ...obj,
          Tax: e.target.value,
        }
      })
    } else if (name === 'Shipping') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping: e.target.value,
        }
      })
    }
  }

  return (
    <MainScreenWrapper
      screenHeader={t('Customise_order_header')}
      backLink="/api_integration"
      backText={t('Integration_heading')}
      primaryText={t('Customise_order_update')}
      primaryHandleClick={() => router.push('/api_integration')}
      primaryIsLoading={false}
      primaryDisabled={false}>
      {!isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col items-start justify-start w-full gap-5">
          <TopSection
            currentTab={currentTab}
            setCurrentTab={(tab) => setCurrentTab(tab)}
          />
          {currentTab == 0 && <BillShippAddress />}
          {currentTab == 1 && <AddItems />}
          {currentTab == 2 && <Finance />}

          <div
            className={`flex flex-row rounded-lg bg-white px-3 tabletM:px-5 py-3 dark:bg-bgBlack items-center justify-between w-full gap-3 ${selectedLang == 'ar' && 'flex-row-reverse'}`}>
            <div className="scale-90">
              <SecondaryButton
                disabled={false}
                isLoading={false}
                handleClick={() => {
                  if (currentTab != 0) {
                    setCurrentTab(currentTab - 1)
                  }
                }}
                text={t && t('pagination_previous')}
                size="small"
                width="24"
              />
            </div>

            <div className="scale-90">
              <PrimaryButton
                disabled={false}
                isLoading={false}
                handleClick={() => {
                  if (currentTab != 2) {
                    setCurrentTab(currentTab + 1)
                  }
                }}
                text={t && t('pagination_next')}
                size="small"
                width="24"
              />
            </div>
          </div>
        </div>
      )}
    </MainScreenWrapper>
  )
}

export default CustomiseOrder
