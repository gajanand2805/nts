import React from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import { BsFillCaretRightFill } from 'react-icons/bs'
import SecondaryButton from '../UI/Button/SecondaryButton'
import { useTranslation } from 'react-i18next'
const SingleOrderDetail = ({ orderDetail, clickHandler, isDetailLoading }) => {
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div
      className={`fixed px-10 top-0 left-0 right-0 bottom-0 w-full z-[100] bg-white/80 dark:bg-dBlack/80  flex-col justify-center items-center flex ease-linear transition-all `}>
      <div
        className="fixed inset-0 "
        onClick={clickHandler}></div>
      <div
        className={`relative z-[200] h-[80vh] min-h-[400px] max-w-[600px] flex gap-6 flex-col rounded-lg bg-white dark:bg-bgBlack group  border-[2px] ease-in pt-3 pb-3 px-3 dark:border-WhiteSec border-BlackSec   animate-popUp transition-all duration-100  w-full justify-between`}>
        <div className="flex items-center justify-end">
          <SecondaryButton
            handleClick={() => clickHandler()}
            text={t && t('Close')}
            size="small"
          />
        </div>

        <div className="h-full overflow-auto">
          {isDetailLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-500"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="grid justify-between grid-cols-2 gap-3 tabletS:grid-cols-4">
                <div>
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t && t('OrderID')}
                  </p>
                  <p className="overflow-auto font-bold">
                    {orderDetail.Order_ID}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t && t('OrderDate')}
                  </p>
                  <p className="overflow-auto font-bold">
                    {orderDetail.Order_Date}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t && t('OrderContact')}
                  </p>
                  <p className="overflow-auto font-bold">
                    {orderDetail.Contact}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t && t('OrderTotal')}
                  </p>
                  <p className="overflow-auto font-bold">
                    {orderDetail.Total} {orderDetail.Currency}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-3 tabletS:flex-row">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t && t('OrderItems')}
                    </p>
                    <div className="flex flex-col gap-1">
                      {orderDetail.Items.map((order, i) => {
                        return (
                          <p
                            key={i}
                            className="overflow-auto font-bold">
                            - {order.Description} ({order.Quantity})
                          </p>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t && t('OrderState')}
                    </p>

                    <div className="flex flex-col items-start w-full gap-2">
                      {orderDetail.States.map((state, i) => {
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-start justify-between w-full">
                            <div className="flex">
                              <div className="flex items-center justify-center">
                                <p className="dark:text-White text-Black">
                                  <BsFillCaretRightFill />
                                </p>
                              </div>
                              <p className="overflow-auto font-bold">
                                {selectedLang === 'ar'
                                  ? state.State_ar
                                  : state.State}
                              </p>
                            </div>

                            <div className="flex flex-col items-start pl-4 font-bold">
                              <p className="overflow-auto text-sm font-bold">
                                {state.Date}
                              </p>
                              <p className="overflow-auto text-xs italic font-bold">
                                {state.Time}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t && t('BillingAddress')}
                    </p>
                    <div className="flex flex-col ">
                      <p className="overflow-auto font-bold">
                        {orderDetail?.Billing_Address?.Address_line1}
                      </p>
                      <p className="overflow-auto font-bold">
                        {orderDetail?.Billing_Address?.Address_line2}
                      </p>
                      <p className="overflow-auto font-bold">
                        {orderDetail?.Billing_Address?.Address_line3}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t && t('ShippingAddress')}
                    </p>
                    <div className="flex flex-col ">
                      <p className="overflow-auto font-bold">
                        {orderDetail?.Shipping_Address?.Address_line1}
                      </p>
                      <p className="overflow-auto font-bold">
                        {orderDetail?.Shipping_Address?.Address_line2}
                      </p>
                      <p className="overflow-auto font-bold">
                        {orderDetail?.Shipping_Address?.Address_line3}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleOrderDetail
