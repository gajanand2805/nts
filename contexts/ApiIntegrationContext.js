import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useGlobalAuthContext } from '../AuthContext'
const ApiIntegrationContext = React.createContext()

const ApiIntegrationProvider = ({ children }) => {
  // OLDER

  const { getCookie, isAccessToken, selectedLang, wrapper, setIsLoading } =
    useGlobalAuthContext()

  const [api, setApi] = useState([])
  const [date, setDate] = useState('')
  const [init, setInit] = useState('')
  const [update, setUpdate] = useState('')
  const [abandonedCart, setAbandonedCart] = useState('')
  const [haveAbandonedCartFeature, setHaveAbandonedCartFeature] =
    useState(false)
  const [id, setid] = useState('')
  const [codeLangSelection, setCodeLangSelection] = useState('NodeJS - Axios')
  // const [inputTokken, setInputTokken] = useState('')

  const [statusInput, setStatusInput] = useState('Shipped')
  const [templateLang, setTemplateLang] = useState('en')
  const [redirectLink, setRedirectLink] = useState('')

  const router = useRouter()
  const [countryCode, setCountryCode] = useState('966')
  const [phoneNumber, setPhoneNumber] = useState('')

  // NEW

  const [orderId, setOrderId] = useState('')
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    setOrder((obj) => {
      return {
        ...obj,
        Contact: countryCode + phoneNumber,
      }
    })
  }, [countryCode, phoneNumber])

  const [Order, setOrder] = useState({
    Contact: '',
    Billing_Address: {
      Address_line1: 'House 30, Maathar street',
      Address_line2: 'Buraydah',
      Address_line3: 'Al Qasim Province',
    },
    Currency: 'SAR',
    Items: [
      {
        Description: 'LRD diode',
        Unit_Price: 200,
        Quantity: 2,
        Discount: 40,
        Tax: 20,
        Total: 392,
      },
      {
        Description: 'arduino pro mini',
        Unit_Price: 100,
        Quantity: 1,
        Discount: 40,
        Tax: 20,
        Total: 2460,
      },
    ],
    Order_ID: orderId,
    Order_Date: date,
    Shipping_Address: {
      Address_line1: 'House 16, Maathar street',
      Address_line2: 'Buraydah',
      Address_line3: 'Al Qasim Province',
    },
    // "Currency": "INR",
    Total: 620,
    Subtotal: 520,
    Shipping: 22,
    Discount: 20,
    Tax: 50,
    lang: selectedLang == 'en' ? 'en' : 'hi',
    Payment_Method: 'Prepaid',
  })

  useEffect(() => {
    selectedLang == 'en'
      ? setOrder((obj) => {
        setTemplateLang('en')
        return { ...obj, lang: 'en' }
      })
      : setOrder((obj) => {
        setTemplateLang('hi')
        return { ...obj, lang: 'hi' }
      })
  }, [selectedLang])

  useEffect(() => {
    if (isAccessToken && (router.pathname == '/api_integration' || router.pathname == '/zid/callback')) {
      setIsLoading(true)
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/API`
      )
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
        },
      })
        .then((res) => wrapper(res))
        .then((data) => {
          setApi(data)
          setInit(data[0]['EndPoint'])
          setUpdate(data[1]['EndPoint'])
          setAbandonedCart(data[2]['EndPoint'])
          setHaveAbandonedCartFeature(data[2]['has_feature'])
          setDate(data[0]['Body']['Order_Date'])
          setid(data[3]['Merchant_ID'])
          setOrder((obj) => {
            return {
              ...obj,
              Order_Date: data[0]['Body']['Order_Date'],
            }
          })
          setIsLoading(false)
        })
        .catch((r) => { })
    }
  }, [router.pathname, isAccessToken])

  return (
    <ApiIntegrationContext.Provider
      value={{
        orderId,
        setOrderId,
        apiKey,
        setApiKey,
        countryCode,
        setCountryCode,
        phoneNumber,
        setPhoneNumber,
        Order,
        setOrder,
        api,
        setApi,
        date,
        setDate,
        init,
        setInit,
        codeLangSelection,
        setCodeLangSelection,
        statusInput,
        setStatusInput,
        redirectLink,
        setRedirectLink,
        templateLang,
        setTemplateLang,
        update,
        abandonedCart,
        setAbandonedCart,
        haveAbandonedCartFeature,
        setUpdate,
        id,
      }}>
      {children}
    </ApiIntegrationContext.Provider>
  )
}

export const useGlobalApiIntegrationContext = () => {
  return useContext(ApiIntegrationContext)
}

export { ApiIntegrationContext, ApiIntegrationProvider }

