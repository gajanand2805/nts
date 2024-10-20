import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineArrowNarrowRight, HiOutlineDocumentDownload } from 'react-icons/hi'
import { useGlobalAuthContext } from '../../AuthContext'
const SingleOrder = ({ getOrderDetails, item }) => {
  const { selectedLang, getCookie } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [csv, setcsv] = useState(false)

  async function getInvoice(id) {
    setcsv(true)
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
        setcsv(false)
      })
  }

  return (
    <div className="grid grid-cols-2 tabletS:grid-cols-3 gap-2 my-2 rounded-lg bg-white dark:bg-bgBlack group  border-[2px] ease-in py-3 px-3 dark:border-bgBlack/20 border-white  hover:dark:border-BlackSec hover:border-black/70  cursor-pointer transition-all duration-300  w-full justify-between">
      <div>
        <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
          {t && t('OrderID')}
        </p>
        <p className="overflow-auto font-bold">{item.Order_ID}</p>
      </div>
      <div>
        <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
          {t && t('OrderDate')}
        </p>
        <p className="overflow-auto font-bold">{item.Order_Date}</p>
      </div>
      <div className={`flex flex-col items-start`}>
        <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
          {t && t('OrderContact')}
        </p>
        <p className="overflow-auto font-bold ltr">+{item.Contact}</p>
      </div>
      <div>
        <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
          {t && t('OrderTotal')}
        </p>
        <p className="overflow-auto font-bold">
          {item.Total} {item.Currency}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
          {t && t('OrderState')}
        </p>
        <p className="overflow-auto font-bold">
          {selectedLang === 'ar' ? item.State_ar : item.State}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
          {t && t('OrderLastUpdate')}
        </p>
        <p className="overflow-auto font-bold">{item.Date}</p>
        <p className="overflow-auto font-bold">{item.Time}</p>
      </div>

      <div className="flex items-center justify-start w-full mt-4">
        <button
          onClick={() => getInvoice(item.Order_ID)}
          className="px-4 py-1  border-[1px] flex items-center opacity-70 group-hover:opacity-100 font-semibold text-sm gap-2 whitespace-nowrap dark:border-white/20 group  hover:dark:border-white/30 border-black/20 hover:border-black/30">
          {t && t('Invoice')}
          {csv ? (
            <div
              className={`w-4 h-4 border-2 border-b-0 border-r-0 rounded-full animate-spin border-black dark:border-white`}
            />
          ) : (
            <HiOutlineDocumentDownload className="transition-all duration-300" />
          )}
        </button>
      </div>

      <div className="hidden tabletS:block"></div>

      <div className="flex items-center justify-end w-full mt-4">
        <button
          onClick={() => getOrderDetails(item.Order_ID)}
          className="px-4 py-1  border-[1px] flex items-center opacity-70 group-hover:opacity-100 font-semibold text-sm gap-2 whitespace-nowrap dark:border-White/20 group  hover:dark:border-white/30 border-black/20 hover:border-black/30">
          {t && t('ViewOrderDetails')}
          <HiOutlineArrowNarrowRight className="transition-all duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

export default SingleOrder
