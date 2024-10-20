import React, { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import { useGlobalOrderContext } from '../../contexts/OrderContext'
import { useTranslation } from 'react-i18next'

import Input from '../UI/Input'

const MONTH = {
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
  10: '10',
  11: '11',
  12: '12',
}

const OrderFilterPopup = ({ onClose }) => {
  const { filter, setFilter } = useGlobalAgentContext()
  const {
    month,
    setMonth,
    year,
    setYear,
    orderID,
    setOrderID,
    phone,
    setPhone,

    getSearchByID,
    getSearchByPhone,
    isApiLoading,
    clearFilter,
  } = useGlobalOrderContext()

  function handleMonthChange(e) {
    const { value } = e.target
    const arr = value.split('-')
    setYear(parseInt(arr[0]))
    setMonth(parseInt(arr[1]))
  }
  const handleApplyFilter = async () => {
    if (orderID) {
      getSearchByID()
    }
    if (phone) {
      getSearchByPhone()
    }
  }
  const { t } = useTranslation()
  return (
    <div className=" flex flex-col mx-5 items-center justify-center gap-8  py-8  w-[350px] bg-white drop-shadow rounded-standard dark:bg-bgBlack">
      <div className="flex items-start justify-between w-full px-8">
        <p className="text-lg font-bold tracking-wide">
          {' '}
          {t('Orders_filter')}{' '}
        </p>

        <button
          onClick={clearFilter}
          className="outline-0 text-Blue border-b-[1px] border-Blue text-sm font-medium">
          {t('Orders_filter_clearall')}
        </button>
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-4">
        <div className="flex items-center justify-between w-full px-8">
          <p> {t('Orders_filter_byorderid')} </p>
          <button className="text-2xl">
            <BiChevronDown />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center w-full bg-bgWhiteSec dark:bg-dBlack px-6 py-5 gap-4">
          <Input
            placeholder={t('Orders_filter_byorderid_box')}
            value={orderID}
            onChange={(e) => {
              setOrderID(e.target.value)
              setPhone('')
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-4">
        <div className="flex items-center justify-between w-full px-8">
          <p> {t('Orders_filter_byphoneno')} </p>
          <button className="text-2xl">
            <BiChevronDown />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center w-full bg-bgWhiteSec dark:bg-dBlack px-6 py-5 gap-4">
          <Input
            placeholder={t('Orders_filter_byphoneno_box')}
            value={phone}
            onChange={(e) => {
              if (!isNaN(e.target.value.trim())) {
                setPhone(e.target.value.trim())
                setOrderID('')
              }
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-4 px-8">
        <SecondaryButton
          handleClick={onClose}
          text={t('cancel')}
        />
        <PrimaryButton
          isLoading={isApiLoading}
          disabled={isApiLoading}
          handleClick={handleApplyFilter}
          text={t('apply')}
        />
      </div>
    </div>
  )
}

export default OrderFilterPopup
