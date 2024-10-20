import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPackage } from 'react-icons/fi'
import { MdOutlineFileDownload } from 'react-icons/md'
import { RiSendPlaneLine } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalOrderContext } from '../../contexts/OrderContext'
import Modal from '../Modal'
import OrderDetailModal from './OrderDetailModal'
import ResendOrderStatusModal from './ResendOrderStatusModal'
const SingleOrderRow = ({ order }) => {
  const { selectedLang, getCookie } = useGlobalAuthContext()
  const { orderResendStatus, setOrderResendStatus } = useGlobalOrderContext()
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [isInvoiceDownloadLoading, setIsInvoiceDownloadLoading] =
    useState(false)
  const [isResendOrderLoading, setIsResendOrderLoading] = useState(false)
  const [showResendOrderModal, setShowResendOrderModal] = useState(false)
  const { t } = useTranslation()
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
  async function getInvoice(id) {
    setIsInvoiceDownloadLoading(true)
    let Header = {
      Authorization: getCookie('access-token'),
      'Content-type': 'application/json',
    }
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Orders/Invoice`
    )
    let params = { order_id: id }
    url.search = new URLSearchParams(params).toString()
    await fetch(url, { method: 'GET', headers: Header })
      .then((res) => {
        return res.blob()
      })
      .then(async (data) => {
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(data)
        a.download = id + '_invoice'
        a.click()
        await new Promise((r) => setTimeout(r, 1))
        setIsInvoiceDownloadLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsInvoiceDownloadLoading(false)
      })
  }
  // const resendOrder = async () => {
  //   setOrderResendStatus({
  //     error: '',
  //     success: '',
  //   })
  //   setIsResendOrderLoading(true)
  //   try {
  //     const config = {
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: getCookie('access-token'),
  //       },
  //     }
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Orders/Reminder?order_id=${order?.Order_ID}`,
  //       '',
  //       config
  //     )
  //     console.log('ORDER RESEND', res)
  //     setOrderResendStatus({
  //       error: '',
  //       success: 'Order status has been successfully resent',
  //     })
  //   } catch (err) {
  //     console.log('ERROR IN RESEND ORDER', err)
  //     setOrderResendStatus({
  //       error: 'Something went wrong while resending order status',
  //       success: '',
  //     })
  //   } finally {
  //     setIsResendOrderLoading(false)
  //   }
  // }

  return (
    <>
      <tr className="bg-white border-b rounded-md dark:bg-bgBlack/40 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-bgBlack">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bgBlack dark:focus:ring-offset-bgBlack focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checkbox-table-search-1"
              className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          {order?.Order_ID}
        </th>
        <td className="px-6 py-4">{order?.Contact}</td>
        <td className="px-6 py-4">{order?.Order_Date}</td>
        <td className="px-6">
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-medium">{order?.Date}</p>
            <p className="text-sm font-medium">{tConvert(order?.Time)}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          {order?.Total} {order?.Currency}
        </td>
        <td className="px-6 py-4 text-sm">
          {selectedLang == 'en' ? order?.State : order?.State_ar}
        </td>

        <td className="px-6 py-4">
          <div className="flex flex-col items-start justify-center gap-2">
            <button
              onClick={() => getInvoice(order?.Order_ID)}
              className="flex items-center  gap-2 px-4 py-2 font-bold shadow bg-Blue rounded-[10px] text-white">
              {t('Orders_invoice')}
              {isInvoiceDownloadLoading ? (
                <div
                  className={`w-4 h-4 border-2 border-b-0 border-r-0 rounded-full animate-spin border-white`}
                />
              ) : (
                <MdOutlineFileDownload className="text-lg" />
              )}
            </button>
            <button
              onClick={() => setShowOrderDetail(true)}
              className="flex items-center  gap-2 px-4 py-2 font-bold shadow dark:bg-Green/60 bg-Green rounded-[10px] text-white">
              {t('Orders_details')}
              <FiPackage className="text-lg" />
            </button>

            <button
              onClick={() => setShowResendOrderModal(true)}
              // onClick={resendOrder}
              className="flex items-center  gap-2 px-4 py-2 font-bold shadow dark:bg-yellow-600 bg-yellow-500 rounded-[10px] text-white">
              {t('Order_resend')}
              {isResendOrderLoading ? (
                <div
                  className={`w-4 h-4 border-2 border-b-0 border-r-0 rounded-full animate-spin border-white`}
                />
              ) : (
                <RiSendPlaneLine className="text-lg" />
              )}
            </button>
          </div>
        </td>
      </tr>
      <Modal
        isVisible={showResendOrderModal}
        onClose={() => setShowResendOrderModal(false)}>
        <ResendOrderStatusModal
          orderId={order?.Order_ID}
          onClose={() => setShowResendOrderModal(false)}
        />
      </Modal>
      <Modal
        onClose={() => setShowOrderDetail(false)}
        isVisible={showOrderDetail}>
        <OrderDetailModal
          orderId={order?.Order_ID}
          onClose={() => setShowOrderDetail(false)}
        />
      </Modal>
    </>
  )
}

export default SingleOrderRow
