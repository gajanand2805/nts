import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

import { useGlobalAuthContext } from '../AuthContext'

const DashboardContext = React.createContext()
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

const DashboardProvider = ({ children }) => {
  //? contexts
  const { isAccessToken, getCookie, wrapper } = useGlobalAuthContext()

  //? variables
  const d = new Date()

  //? states
  const [conversation, setconversation] = useState({})
  const [feedback, setfeedback] = useState({})
  const [message_data, setmessage_data] = useState({})
  const [convo_count, setconvo_count] = useState({})
  const [order_graph_data, setorder_graph_data] = useState({})
  const [feedback_graph_data, setfeedback_graph_data] = useState({})
  const [month, setMonth] = useState(d.getMonth() + 1)
  const [year, setYear] = useState(d.getFullYear())
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloadLoading, setIsDownloadLoading] = useState(false)
  const [isDownloadLoading1, setIsDownloadLoading1] = useState(false)
  const [isDownloadLoading2, setIsDownloadLoading2] = useState(false)
  const [abandonCartData, setAbandonCartData] = useState({})
  const [dataExport, setDataExport] = useState()
  const [broadcast_analytics, setbroadcast_analytics] = useState({})

  //? router
  const router = useRouter()

  //? functions
  async function fetchData(fun) {
    if (router.pathname === '/dashboard') {
      let Header = {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
      }
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Home`
      )
      let params = { month: month, year: year }
      url.search = new URLSearchParams(params).toString()
      await fetch(url, { method: 'GET', headers: Header })
        .then((res) => wrapper(res))
        .then(async function handle(data) {
          setconversation(data.conversation)
          setfeedback(data.feedback)
          setmessage_data(data.message_data)
          setconvo_count(data.convo_count)
          setorder_graph_data(data.order_graph_data)
          setfeedback_graph_data(data.feedback_graph_data)
          setAbandonCartData(data.abandone_cart_messages)
          setDataExport(data.data_export)
          setbroadcast_analytics(data.broadcast_analytics)
          fun()
        })
        .catch((e) => { })
    }
  }

  //? effects
  useEffect(() => {
    if (isAccessToken) {
      if (router.pathname === '/dashboard') {
        ; (async () => {
          setIsLoading(true)
          let Header = {
            Authorization: getCookie('access-token'),
            'Content-type': 'application/json',
          }

          let url = new URL(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Home`
          )
          let params = { month: month, year: year }
          url.search = new URLSearchParams(params).toString()
          await fetch(url, { method: 'GET', headers: Header })
            .then((res) => wrapper(res))
            .then(async function handle(data) {
              setconversation(data.conversation)
              setfeedback(data.feedback)
              setmessage_data(data.message_data)
              setconvo_count(data.convo_count)
              setorder_graph_data(data.order_graph_data)
              setfeedback_graph_data(data.feedback_graph_data)
              setAbandonCartData(data.abandone_cart_messages)
              setDataExport(data.data_export)
              setbroadcast_analytics(data.broadcast_analytics)
              setIsLoading(false)
            })
            .catch((e) => console.log(e))
        })()
      }
    }
  }, [month, year, router.pathname, isAccessToken])

  async function getClientsCSV() {
    setIsDownloadLoading2(true)
    let Header = {
      Authorization: getCookie('access-token'),
      'Content-type': 'application/json',
    }
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Home/csv/clients`
    )
    let params = { month: month, year: year }
    url.search = new URLSearchParams(params).toString()
    await fetch(url, { method: 'GET', headers: Header })
      .then((res) => {
        return res.blob()
      })
      .then(async (data) => {
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(data)
        a.download = 'clients'
        a.click()
        await new Promise((r) => setTimeout(r, 1))
        setIsDownloadLoading2(false)
      })
  }

  async function getConversationCSV() {
    setIsDownloadLoading1(true)
    let Header = {
      Authorization: getCookie('access-token'),
      'Content-type': 'application/json',
    }
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Home/csv/conversations`
    )
    let params = { month: month, year: year }
    url.search = new URLSearchParams(params).toString()
    await fetch(url, { method: 'GET', headers: Header })
      .then((res) => {
        return res.blob()
      })
      .then(async (data) => {
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(data)
        a.download = 'conversations'
        a.click()
        await new Promise((r) => setTimeout(r, 1))
        setIsDownloadLoading1(false)
      })
  }

  async function getFeedbackCSV() {
    setIsDownloadLoading(true)
    let Header = {
      Authorization: getCookie('access-token'),
      'Content-type': 'application/json',
    }
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Home/csv/feedbacks`
    )
    let params = { month: month, year: year }
    url.search = new URLSearchParams(params).toString()
    await fetch(url, { method: 'GET', headers: Header })
      .then((res) => {
        return res.blob()
      })
      .then(async (data) => {
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(data)
        a.download = 'feedbacks'
        a.click()
        await new Promise((r) => setTimeout(r, 1))
        setIsDownloadLoading(false)
      })
  }

  function handleChange(e) {
    const { value } = e.target
    const arr = value.split('-')
    setYear(parseInt(arr[0]))
    setMonth(parseInt(arr[1]))
  }

  return (
    <DashboardContext.Provider
      value={{
        month,
        setMonth,
        year,
        setYear,
        isLoading,
        setIsLoading,
        isDownloadLoading,
        isDownloadLoading1,
        isDownloadLoading2,
        setIsDownloadLoading,
        fetchData,
        getConversationCSV,
        getClientsCSV,
        getFeedbackCSV,
        handleChange,
        conversation,
        feedback,
        message_data,
        convo_count,
        order_graph_data,
        feedback_graph_data,
        abandonCartData,
        dataExport,
        setDataExport,
        broadcast_analytics,
        setbroadcast_analytics
      }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useGlobalDashboardContext = () => {
  return useContext(DashboardContext)
}

export { DashboardContext, DashboardProvider }

