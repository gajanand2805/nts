import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDown } from 'react-icons/ai'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../../components/UI/Button/PrimaryButton'
import SecondaryButton from '../../components/UI/Button/SecondaryButton'
import { useGlobalOrderContext } from '../../contexts/OrderContext'

const ResendOrderStatusModal = ({ onClose, orderId }) => {
  const { getCookie } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [resendLang, setResendLang] = useState('Default')
  const [showDropdown, setShowDropdown] = useState(false)
  const [isResendOrderLoading, setIsResendOrderLoading] = useState(false)

  const { orderResendStatus, setOrderResendStatus } = useGlobalOrderContext()
  const resendOrder = async () => {
    setOrderResendStatus({
      error: '',
      success: '',
    })
    setIsResendOrderLoading(true)
    try {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
        },
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Orders/Reminder?order_id=${orderId}&lang=${resendLang}`,
        '',
        config
      )
      console.log('ORDER RESEND', res)
      setOrderResendStatus({
        error: '',
        success: 'Order_resent_success',
      })
      onClose()
    } catch (err) {
      console.log('ERROR IN RESEND ORDER', err)
      setOrderResendStatus({
        error: 'Order_resent_error',
        success: '',
      })
    } finally {
      setIsResendOrderLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full mx-2  max-w-[350px] items-start text-bgBlack dark:text-white justify-start gap-2 py-8 mobileL:px-8 px-4  bg-white rounded-[10px] dark:bg-bgBlack">
      <p className="text-lg font-semibold ">{t('Order_resent_header')}</p>
      <p className="text-base">{t('Order_resent_prompt')}</p>
      <div className="relative flex flex-col items-start justify-center w-full">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-between w-full gap-5 px-4 py-2  font-semibold  bg-gray-300 rounded-[6px] dark:bg-[#1B2431]">
          {resendLang} <AiOutlineDown className="text" />
        </button>
        {showDropdown && (
          <div className="absolute top-0 w-full bg-gray-300 rounded-[6px] dark:bg-[#1B2431]">
            <button
              onClick={() => {
                setResendLang('en')
                setShowDropdown(false)
              }}
              className="flex items-center justify-between w-full rounded-t-[6px] gap-5 px-4 py-2 font-semibold hover:bg-gray-400 dark:hover:bg-gray-900">
              {'English'}
            </button>
            <button
              onClick={() => {
                setResendLang('ar')
                setShowDropdown(false)
              }}
              className="flex items-center justify-between w-full gap-5 px-4 py-2 rounded-b-[6px] font-semibold hover:bg-gray-400 dark:hover:bg-gray-900">
              {'Arabic'}
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full gap-4 mt-8">
        <SecondaryButton
          handleClick={onClose}
          text={t('Order_resent_cancel')}
        />

        <PrimaryButton
          text={t('Order_resent_button')}
          handleClick={resendOrder}
          isLoading={isResendOrderLoading}
          disabled={isResendOrderLoading}
        />
      </div>
    </div>
  )
}

export default ResendOrderStatusModal
