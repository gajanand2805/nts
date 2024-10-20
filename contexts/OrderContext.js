import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'

const OrderContext = React.createContext()
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

const OrderProvider = ({ children }) => {
  const {
    isAccessToken,
    getCookie,
    isLoading,
    setIsLoading,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()

  const { t } = useTranslation()
  const d = new Date()
  const [month, setMonth] = useState(d.getMonth() + 1)
  const [year, setYear] = useState(d.getFullYear())
  // function handleChange(e) {
  //     const { value } = e.target
  //     const arr = value.split('-')
  //     setYear(parseInt(arr[0]))
  //     setMonth(parseInt(arr[1]))
  // }
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [orders, setOrders] = useState()
  const [orderID, setOrderID] = useState('')
  const [phone, setPhone] = useState('')
  const [orderIdSearch, setOrderIdSearch] = useState(null)
  const [phoneSearch, setPhoneSearch] = useState(null)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [currentOrderIdPage, setCurrentOrderIdPage] = useState(1)
  const [totalOrderIdPage, setTotalOrderIdPage] = useState()
  const [currentPhonePage, setCurrentPhonePage] = useState(1)
  const [totalPhonePage, setTotalPhonePage] = useState()
  const [isOrderDetails, setIsOrderDetails] = useState(false)
  const [orderDetail, setOrderDetails] = useState()
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [filterActive, setFilterActive] = useState()
  const [orderResendStatus, setOrderResendStatus] = useState({
    error: '',
    success: '',
  })
  const router = useRouter()
  const [alert, setAlert] = useState(null)

  const clearFilter = () => {
    setOrderID('')
    setPhone('')
    setOrderIdSearch(null)
    setPhoneSearch(null)
    setFilterActive(false)
  }

  function handleMonthChange(e) {
    const { value } = e.target
    const arr = value.split('-')
    setYear(parseInt(arr[0]))
    setMonth(parseInt(arr[1]))
    // console.log(value)
  }

  useEffect(() => {
    if (isAccessToken) {
      if (router.pathname === '/orders') {
        const getOrderData = async () => {
          setIsApiLoading(true)
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
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Orders?month=${month}&year=${year}&page=${currentPage}`,
                config
              )
              .catch((err) => wrapper(err.response))
            console.log('order data', res.data)
            setOrders(res.data?.Orders)
            setCurrentPage(res.data?.Current_Page)
            setTotalPages(res.data?.Total_Pages)
            clearFilter()
          } catch (err) {
            console.log(err)
          } finally {
            setIsLoading(false)
            setIsApiLoading(false)
          }
        }
        getOrderData()
      }
    }
  }, [month, year, currentPage, router.pathname, isAccessToken])

  // setCurrentOrderIdPage(1);
  const getSearchByID = async () => {
    setIsApiLoading(true)
    setPhoneSearch(null)
    setIsLoading(true)
    setCurrentPhonePage(1)
    setPhone('')
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }

    try {
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN
          }/Dashboard/Merchant/v1.0/section/Orders/OrderID?order_id=${orderID.trim()}&page=${currentOrderIdPage}`,
          config
        )
        .catch((err) => wrapper(err.response))
      console.log(res.data)
      setOrderIdSearch(res.data?.Orders)
      setCurrentOrderIdPage(res.data?.Current_Page)
      setTotalOrderIdPage(res.data?.Total_Pages)
      setFilterActive(false)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    } finally {
      setIsApiLoading(false)
    }
  }
  useEffect(() => {
    if (orderIdSearch != null) {
      getSearchByID()
    }
  }, [currentOrderIdPage])

  const getSearchByPhone = async () => {
    setIsApiLoading(true)
    setOrderIdSearch(null)
    setIsLoading(true)
    setCurrentOrderIdPage(1)
    setOrderID('')
    console.log()
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }

    try {
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN
          }/Dashboard/Merchant/v1.0/section/Orders/Phone?Phone=${phone.trim()}&page=${currentPhonePage}`,
          config
        )
        .catch((err) => wrapper(err.response))
      console.log(res.data)
      setPhoneSearch(res.data?.Orders)
      setCurrentPhonePage(res.data?.Current_Page)
      setTotalPhonePage(res.data?.Total_Pages)
      setFilterActive(false)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    } finally {
      setIsApiLoading(false)
    }
  }

  useEffect(() => {
    if (phoneSearch != null) {
      getSearchByPhone()
    }
  }, [currentPhonePage])

  const getOrderDetails = async (id) => {
    setIsDetailLoading(true)
    setIsOrderDetails(true)
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }

    try {
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Orders/Details?order_id=${id}`,
          config
        )
        .catch((err) => wrapper(err.response))
      console.log(res.data)
      setOrderDetails(res.data)
    } catch (err) {
      console.log(err)
      setIsOrderDetails(false)
    } finally {
      setIsDetailLoading(false)
    }
  }

  return (
    <OrderContext.Provider
      value={{
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
        month,
        setMonth,
        year,
        setYear,
        //
        alert,
        setAlert,
        getSearchByPhone,
        getSearchByID,
        filterActive,
        setFilterActive,
        clearFilter,
        handleMonthChange,
        MONTH,
        orderResendStatus,
        setOrderResendStatus,
      }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useGlobalOrderContext = () => {
  return useContext(OrderContext)
}

export { OrderContext, OrderProvider }
