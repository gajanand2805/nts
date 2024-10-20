import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiFilter } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { useGlobalOrderContext } from '../../contexts/OrderContext'
import Modal from '../Modal'
import DateSelect from '../UI/DateSelect'
import Pagination from '../UI/Pagination'
import OrderFilterPopup from './OrderFilterPopup'
import SingleOrderRow from './SingleOrderRow'

const MainOrderScreen = () => {
  const { t } = useTranslation()
  // const [showAgent, setShowAgent] = useState(agents)
  const [showOptions, setShowOptions] = useState(false)
  const [filterText, setFilterText] = useState('')
  //   const [filterActive, setFilterActive] = useState(false)
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    orders,
    setOrders,
    orderID,
    setOrderID,
    phone,
    setPhone,
    orderIdSearch,
    setOrderIdSearch,
    phoneSearch,
    setPhoneSearch,
    isApiLoading,
    setIsApiLoading,
    currentOrderIdPage,
    setCurrentOrderIdPage,
    totalOrderIdPage,
    setTotalOrderIdPage,
    currentPhonePage,
    setCurrentPhonePage,
    totalPhonePage,
    setTotalPhonePage,
    isOrderDetails,
    setIsOrderDetails,
    orderDetail,
    setOrderDetails,
    isDetailLoading,
    setIsDetailLoading,
    alert,
    setAlert,
    filterActive,
    setFilterActive,
    year,
    month,
    setMonth,
    setYear,
    MONTH,
    handleMonthChange,
    orderResendStatus,
    setOrderResendStatus,
  } = useGlobalOrderContext()
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        {/* TOP SECTION */}
        <div className="flex justify-between w-full items-between">
          <div className="flex justify-between w-full gap-2">
            {/* <div className="w-full max-w-xs">
              <Input
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search here"
                name="Search"
                id="Search"
              />
            </div>
            <div className="relative"> */}
            <button
              onClick={() => setFilterActive(!filterActive)}
              className="border-2 py-2 rounded-[10px] shadow-sm border-BlackTer dark:border-White/20 dark:bg-bgBlackSec bg-white flex items-center gap-1 px-5 text-Blue font-bold">
              <BiFilter /> {t('Orders_filter')}
            </button>


            <DateSelect year={year} month={month} setmonth={setMonth} setyear={setYear} />

            {/* </div> */}
          </div>
        </div>
        {/* Alert */}
        {alert?.success && (
          <div className="relative flex items-center w-full">
            <p className="w-full px-4 py-2 rounded-[10px] bg-Green text-white text-lg font-semibold">
              {t(alert?.success)}
            </p>

            <button
              onClick={() => setAlert(null)}
              className="absolute p-1 rounded-[5px] text-2xl bg-black/50  text-white right-2">
              <IoClose />
            </button>
          </div>
        )}
        {alert?.error && (
          <div className="relative z-10 flex items-center w-full">
            <p className="w-full px-4 py-2 rounded-[10px] bg-Red text-white text-lg font-semibold">
              {t(alert?.error)}
            </p>

            <button
              onClick={() => setAlert(null)}
              className="absolute p-1 rounded-[5px] text-2xl bg-black/50  text-white right-2">
              <IoClose />
            </button>
          </div>
        )}
        {/*  */}

        <div className="relative w-full h-full overflow-x-auto rounded-lg shadow-sm">
          {/*  */}
          {orderResendStatus?.error && (
            <p className="w-full text-sm text-Red  bg-gray-50 dark:bg-[#1B2431] px-4 py-2 font-bold">
              {t(orderResendStatus?.error)}
            </p>
          )}
          {orderResendStatus?.success && (
            <p className="w-full text-sm text-Green  bg-gray-50 dark:bg-[#1B2431] px-4 py-2 font-bold">
              {t(orderResendStatus?.success)}
            </p>
          )}
          {orderIdSearch != null ? (
            <p className="w-full text-xs text-gray-700  bg-gray-50 dark:bg-[#1B2431] dark:text-gray-400 px-4 py-2 font-semibold">
              {t('Orders_filter_orderid_text')}:{' '}
              <span className="font-bold">{orderID}</span>
            </p>
          ) : phoneSearch != null ? (
            <p className="w-full text-xs text-gray-700  bg-gray-50 dark:bg-[#1B2431] dark:text-gray-400 px-4 py-2 font-semibold">
              Showing orders with phone:{' '}
              <span className="font-bold">{phone}</span>
            </p>
          ) : (
            <></>
          )}
          {/*  */}
          <table className="w-full min-w-[1000px] h-full tabletM:min-w-[600px]  text-sm text-left text-gray-500 dark:text-gray-400 border-spacing-2">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-bgBlack dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bgBlack dark:focus:ring-offset-bgBlack focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-all-search"
                      className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_orderid')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_contact')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_orderdate')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_lastupdated')}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_total')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_status')}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 uppercase">
                  {t('Orders_action')}
                </th>
              </tr>
            </thead>
            <tbody className="">
              {orderIdSearch != null
                ? orderIdSearch?.map((order, i) => {
                  return (
                    <SingleOrderRow
                      key={i}
                      order={order}
                    />
                  )
                })
                : phoneSearch != null
                  ? phoneSearch?.map((order, i) => {
                    return (
                      <SingleOrderRow
                        key={i}
                        order={order}
                      />
                    )
                  })
                  : orders?.map((order, i) => {
                    return (
                      <SingleOrderRow
                        order={order}
                        key={i}
                      />
                    )
                  })}
            </tbody>
          </table>
        </div>
        {orderIdSearch != null ? (
          <Pagination
            currentPage={currentOrderIdPage}
            totalPages={totalOrderIdPage}
            setCurrentPage={setCurrentOrderIdPage}></Pagination>
        ) : phoneSearch != null ? (
          <Pagination
            currentPage={currentPhonePage}
            totalPages={totalPhonePage}
            setCurrentPage={setCurrentPhonePage}></Pagination>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}></Pagination>
        )}
      </div>
      <Modal
        isVisible={filterActive}
        onClose={() => setFilterActive(false)}>
        <OrderFilterPopup onClose={() => setFilterActive(false)} />
      </Modal>
    </>
  )
}

export default MainOrderScreen
