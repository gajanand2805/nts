import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdLocalGroceryStore } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../UI/Button/PrimaryButton'

const PaymentModal = ({ id, tag, open }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [load, setload] = useState(true)
  const [load2, setload2] = useState(false)
  const [init, setinit] = useState('')
  const [methods, setmethods] = useState([])
  const { getCookie, isAccessToken, wrapper, selectedLang } =
    useGlobalAuthContext()

  // Trigger Payment Method
  function payment(transaction_id, payment_id) {
    if (isAccessToken) {
      setload2(true)
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Subscription/buy/execute`
      )
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
          PaymentMethodID: payment_id,
          'Init-ID': transaction_id,
          Language: selectedLang == 'en' ? 'EN' : 'AR',
        },
      })
        .then((res) => wrapper(res))
        .then((data) => {
          setload2(false)
          window.location = data.PaymentURL
        })
        .catch((r) => {
          setload2(false)
          open(false)
        })
    }
  }

  //Load Dashboard
  useEffect(() => {
    setload(true)
    if (isAccessToken) {
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN
        }/Dashboard/Merchant/v1.0/section/Subscription/${id == '' ? 'buy' : 'upgrade'
        }/init`
      )

      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
          package: tag,
          refrence: id,
        },
      })
        .then((res) => wrapper(res))
        .then((data) => {
          console.log(data)
          setinit(data.Init_ID)
          setmethods(data.PaymentMethods)
          setload(false)
        })
        .catch((r) => {
          open(false)
        })
    }
  }, [])

  return (
    <div className="flex flex-col w-[90%] mt-2 gap-0  max-w-[800px] items-center justify-center shadow-xl border-0 border-Blue rounded-xl z-10">
      <div className="flex items-center justify-between w-full gap-4 px-4 py-4 text-white rounded-t-lg bg-Blue ">
        <p className="flex items-center gap-4 font-bold">
          <MdLocalGroceryStore className="text-2xl " />{' '}
          {t('Subscription_Payment_heading')}
        </p>
        <div
          onClick={() => open(false)}
          className="flex items-center justify-between h-full cursor-pointer">
          <RiCloseCircleFill className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col w-full text-[15px]">
        <div className="w-full h-[80vh] flex flex-col justify-center items-center tabletM:flex-row gap-5 p-5 overflow-y-auto rounded-b-xl  bg-bgWhiteSec dark:bg-bgBlack">
          {load ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-16 h-16 border-8 border-solid rounded-full border-t-transparent animate-spin border-Blue"></div>
            </div>
          ) : (
            <div className="flex flex-col items-start w-full h-full gap-3 mb-5">
              <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                {init}
              </p>
              {methods.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="grid items-center justify-between w-full grid-cols-2 gap-2 p-3 bg-white border-2 rounded-lg shadow-md tabletM:grid-cols-5 border-Blue h-fit dark:bg-dBlack">
                    <div className="flex items-center w-full">
                      <Image
                        src={item.ImageUrl}
                        width={67}
                        height={45}
                      />
                    </div>

                    <div className="w-full">
                      <p className="text-xs font-semibold dark:text-White/70 text-Black/70 ">
                        {t('Subscription_Payment_Method')}
                      </p>
                      <p className="text-sm font-bold">
                        {selectedLang == 'en'
                          ? item.PaymentMethodEn
                          : item.PaymentMethodAr}
                      </p>
                    </div>

                    <div className="w-full">
                      <p className="text-xs font-semibold dark:text-White/70 text-Black/70 ">
                        {t('Subscription_Payment_Service')}
                      </p>
                      <p className="text-sm font-bold">
                        {selectedLang == 'en'
                          ? item.ServiceCharge + ' ' + item.CurrencyIso
                          : item.CurrencyIso + ' ' + item.ServiceCharge}
                      </p>
                    </div>

                    <div className="w-full">
                      <p className="text-xs font-semibold dark:text-White/70 text-Black/70 ">
                        {t('Subscription_Payment_Amount')}
                      </p>
                      <p className="text-sm font-bold">
                        {selectedLang == 'en'
                          ? item.TotalAmount + ' ' + item.CurrencyIso
                          : item.CurrencyIso + ' ' + item.TotalAmount}
                      </p>
                    </div>

                    <PrimaryButton
                      handleClick={() => {
                        payment(init, item.PaymentMethodId)
                      }}
                      text={t('Subscription_Payment_select')}
                      size="small"
                      disabled={load2}
                      isLoading={load2}
                      width="full"
                      height="fit"
                    />
                  </div>
                )
              })}
              <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
                {init}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
