import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import { useGlobalAuthContext } from '../../AuthContext'

const OrderDetailModal = ({ orderId, onClose }) => {
  const { getCookie } = useGlobalAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState()
  const [showDetails, setShowDetails] = useState(true)
  const [showItems, setShowItems] = useState(true)
  const [showAddress, setShowAddress] = useState(true)
  const [showStatus, setShowStatus] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const getOrderDetails = async () => {
      console.log('ISLoading', orderId)
      setIsLoading(true)
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
        },
      }

      try {
        const res = await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Orders/Details?order_id=${orderId}`,
            config
          )
          .catch((err) => wrapper(err.response))
        console.log(res.data)
        setOrderDetails(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        console.log('ISLoadingComplete')
        setIsLoading(false)
      }
    }
    getOrderDetails()
  }, [getCookie])

  const tConvert = (time) => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

    if (time.length > 1) {
      time = time.slice(1)
      time[5] = +time[0] < 12 ? ' AM' : ' PM'
      time[0] = +time[0] % 12 || 12
    }
    return time.join('')
  }

  return (
    <div className="flex flex-col w-full mx-5 mt-10 max-w-[400px] h-[85vh] overflow-auto items-start text-bgBlack dark:text-white justify-start gap-8  py-8 bg-white rounded-[10px] dark:bg-bgBlack">
      {/* <div className="flex flex-col items-start justify-center"> */}
      <div className="flex flex-row w-full items-center justify-between px-5">
        <p className="text-xl font-bold dark:text-white text-dBlack">
          {t('Order_modal_heading')} #{orderId}
        </p>
        <AiOutlineCloseCircle
          onClick={onClose}
          className="text-xl cursor-pointer"
        />
      </div>
      {/* <p>on {orderDetails?.Order_Date}</p> */}
      {/* </div> */}
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-Blue border-8 h-16 w-16"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex items-center justify-between w-full text-white">
            <div className="flex flex-col items-start justify-start w-full h-full px-8 py-2 bg-Blue">
              <p className="font-bold ">{t('Order_modal_total')}</p>
              <p className="text-md font-bold">
                {orderDetails?.Total} {orderDetails?.Currency}
              </p>
            </div>
            <div className="flex flex-col items-end justify-start w-full h-full px-8 py-2 bg-Green/60">
              <p className="font-bold ">{t('Order_modal_status')}</p>
              <p className="text-md font-bold">
                {
                  // orderDetails?.reverse()[0]?.State
                  orderDetails?.States[orderDetails?.States?.length - 1]?.State
                }
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center justify-between w-full px-8">
              <p className="text-lg font-bold text-bgBlack dark:text-white">
                {t('Order_modal_details')}
              </p>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-lg ">
                <FiChevronDown
                  className={`${showDetails && 'rotate-180 transition-all duration-200'
                    }`}
                />
              </button>
            </div>
            {showDetails && (
              <div className="flex flex-col w-full gap-3 px-8 py-4 bg-White/50 dark:bg-dBlack/30">
                <div className="flex items-start justify-between w-full">
                  <div>
                    <p className="font-bold text-BlackSec dark:text-White">
                      {t('Order_modal_placedon')}
                    </p>
                    <p>{orderDetails?.Order_Date}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-bold text-BlackSec dark:text-White">
                      {t('Order_modal_contact')}
                    </p>
                    <p>{orderDetails?.Contact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Items */}
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center justify-between w-full px-8">
              <p className="text-lg font-bold text-bgBlack dark:text-white">
                {t('Order_modal_items')}
              </p>
              <button
                onClick={() => setShowItems(!showItems)}
                className="text-lg ">
                <FiChevronDown
                  className={`${showItems && 'rotate-180 transition-all duration-200'
                    }`}
                />
              </button>
            </div>
            {showItems && (
              <div className="flex flex-col w-full gap-3 px-8 py-4 bg-White/50 dark:bg-dBlack/30">
                {orderDetails?.Items?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-start justify-between w-full">
                      <div>
                        <p className="font-bold text-BlackSec dark:text-White">
                          {t('Order_modal_sku')}
                        </p>
                        <p>
                          {item.Description} ({item.Quantity})
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-bold text-BlackSec dark:text-White">
                          {t('Order_modal_total')}
                        </p>
                        <p>{item.Total}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center justify-between w-full px-8">
              <p className="text-lg font-bold text-bgBlack dark:text-white">
                {t('Order_modal_address')}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-lg ">
                <FiChevronDown
                  className={`${showAddress && 'rotate-180 transition-all duration-200'
                    }`}
                />
              </button>
            </div>
            {showAddress && (
              <div className="flex flex-col w-full gap-3 px-8 py-4 bg-White/50 dark:bg-dBlack/30">
                <div className="flex flex-col items-start justify-start w-full">
                  <p className="font-bold text-BlackSec dark:text-White">
                    {t('Order_modal_billing')}
                  </p>
                  <p>{orderDetails?.Billing_Address?.Address_line1}</p>
                  <p>{orderDetails?.Billing_Address?.Address_line2}</p>
                  <p>{orderDetails?.Billing_Address?.Address_line3}</p>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                  <p className="font-bold text-BlackSec dark:text-White">
                    {t('Order_modal_shipping')}
                  </p>
                  <p>{orderDetails?.Shipping_Address?.Address_line1}</p>
                  <p>{orderDetails?.Shipping_Address?.Address_line2}</p>
                  <p>{orderDetails?.Shipping_Address?.Address_line3}</p>
                </div>
              </div>
            )}
          </div>
          {/* Order State */}
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center justify-between w-full px-8">
              <p className="text-lg font-bold text-bgBlack dark:text-white">
                {t('Order_modal_status')}
              </p>
              <button
                onClick={() => setShowStatus(!showStatus)}
                className="text-lg ">
                <FiChevronDown
                  className={`${showStatus && 'rotate-180 transition-all duration-200'
                    }`}
                />
              </button>
            </div>
            {showStatus && (
              <div className="flex flex-col w-full gap-4 px-8 py-4 bg-White/50 dark:bg-dBlack/30">
                {orderDetails?.States?.map((state, i) => {
                  return (
                    <div
                      className="flex flex-col items-start justify-start w-full "
                      key={i}>
                      <div className="flex items-center gap-2">
                        <p className="font-bold opacity-80">{state.State}</p>
                        <p className="opacity-50">{tConvert(state.Time)}</p>
                      </div>
                      <p className="opacity-70">on {state.Date}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetailModal
