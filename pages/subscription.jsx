import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCheck } from 'react-icons/bi'
import { MdAutorenew, MdClose, MdShoppingCart } from 'react-icons/md'
import { useGlobalAuthContext } from '../AuthContext'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import Modal from '../components/Modal'
import BottomSection from '../components/Subscription/BottomSection'
import CartModal from '../components/Subscription/CartModal'
import PaymentModal from '../components/Subscription/PaymentModal'
import TopSection from '../components/Subscription/TopSection'
import PrimaryButton from '../components/UI/Button/PrimaryButton'
import SecondaryButton from '../components/UI/Button/SecondaryButton'
import Pagination from '../components/UI/Pagination'
const Razorpay = require('razorpay')
const Subscription = () => {
  const {
    isLoading,
    setIsLoading,
    getCookie,
    isAccessToken,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()
  const router = useRouter()
  const { success } = router.query
  const { locale, locales, asPath } = useRouter()
  const { t } = useTranslation()
  const [Buy, setBuy] = useState(false)
  const [Wallet, setWallet] = useState(0)
  const [Free, setFree] = useState(0)
  const [Trail, setTrail] = useState(true)
  const [BotToggle, setBotToggle] = useState(false)
  const [language, setLanguage] = useState('')
  const [Level, setLevel] = useState(0)
  const [Subscriptions, setSubscriptions] = useState([])
  const [Packages, setPackages] = useState([])
  const [Addons, setAddons] = useState([])
  const [Transactions, setTransactions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [BotToggleLoader, setBotToggleLoader] = useState(false)
  const [LangToggleLoader, setLangToggleLoader] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [inventory, setinventory] = useState([])
  const [id, setref] = useState('')
  const [slug, setslug] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  function open(data) {
    setShowPayment(false)
    setinventory(data)
    setShowCart(true)
  }
  function payment(type) {
    setShowCart(false)
    setShowPayment(true)
    setslug(type)
  }
  useEffect(() => {
    setShowStatus(success != undefined)
  }, [success])
  useEffect(() => {
    if (isAccessToken) {
      setIsLoading(true)
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Subscription?page=${currentPage}`
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
          console.log(data, '6data')
          setBuy(data.Can_Buy)
          setWallet(data.Wallet)
          setTrail(data.Trial)
          setBotToggle(data.Bot)
          setLanguage(data.Language)
          setLevel(data.Level)
          setSubscriptions(data.Has_Subscriptions)
          setPackages(data.Subscriptions)
          setAddons(data.Addons)
          setCurrentPage(data.Current_Page)
          setTotalPages(data.Total_Pages)
          setTransactions(data.Transactions)
          setFree(data.Sessions_Left)
          setIsLoading(false)
        })
        .catch((r) => {
          console.log(r)
        })
    }
  }, [isAccessToken, currentPage])

  // Toggle Bot
  const toggle_bot = () => {
    setBotToggleLoader(true)
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Subscription/bot`
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
        setBotToggle(data.Status)
        setBotToggleLoader(false)
      })
      .catch((r) => { })
  }

  // Toggle Language
  const toggle_language = (lang) => {
    setLangToggleLoader(true)
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Subscription/language`
    )
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
        language: lang,
      },
    })
      .then((res) => wrapper(res))
      .then((data) => {
        setLanguage(data.Language)
        // setLangToggle(data.Status)
        setLangToggleLoader(false)
      })
      .catch((r) => { })
  }
  const [isPlanSelected, setIsPlanSelected] = useState(true)
  const [activeBox, setActiveBox] = useState(0)

  const handleBoxClick = (index) => {
    setActiveBox(index)
  }
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isModalcurrentplan, setIsModalCurrentPlan] = useState(false)
  const opencurrentplanModal = () => setIsModalCurrentPlan(true)
  const [isModalEditBilling, setisModalEditBilling] = useState(false)
  const openModalEditBilling = () => setisModalEditBilling(true)
  const closecurrentplanModal = () => {
    setIsModalCurrentPlan(false)
    setIsPlanSelected(false)
    router.push({
      pathname: '/subscription',
      query: {},
    })
  }

  useEffect(() => {
    if (router.query.openModal) {
      opencurrentplanModal()
    }
  }, [router.query.openModal])
  const currentDate = new Date()
  const nextMonthDate = new Date()
  nextMonthDate.setMonth(currentDate.getMonth() + 1)
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0') // Ensures two digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-based
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const [selectedRenewalDate, setSelectedRenewalDate] = useState(
    formatDate(nextMonthDate)
  )
  const [selectPlanDuration, setSelectedPlanDuration] = useState(1)
  const [selectPlanName, setSelectedPlanName] = useState('Monthly')
  const [selectedPrice, setSelectedPrice] = useState(699)
  const addMonthsToDate = (date, months) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  }
  const handleSelectPlan = (price, currentDate, duration, planName) => {
    const nextQuarterDate = addMonthsToDate(currentDate, duration)
    setSelectedRenewalDate(formatDate(nextQuarterDate))
    setSelectedPlanDuration(duration)
    setSelectedPlanName(planName)
    setSelectedPrice(price)
    setIsPlanSelected(true)
  }
  const [isSubscribed, setIsSubscribed] = useState(false)
  useEffect(() => {
    const checkSubscription = async () => {
      const token = getCookie('access-token')
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: `${token}`,
        },
      }

      const url = `https://api.shoponcell.com/Dashboard/Subscription/v1.0/checksubscription`

      try {
        const response = await axios.post(url, {}, config)
        console.log('response.data.length', response.data)
        if (response.data.length === 0) {
          setIsSubscribed(false)
        } else {
          setIsSubscribed(true)
        }
      } catch (error) { }
    }
    checkSubscription()

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Pay Now Razorpay
  const handleCheckout = async () => {
    const token = getCookie('access-token')
    if (!token) {
      console.log('No access token found')
      return
    }
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `${token}`,
        refrence: crypto.randomUUID(),
      },
    }
    const url = `https://api.shoponcell.com/Dashboard/Subscription/v1.0/create-order`
    const body = {
      amount: selectedPrice * selectPlanDuration * 100,
      planName: selectPlanName,
    }
    await axios.post(url, body, config).then((res) => {
      const options = {
        key: 'rzp_test_ZL1wkQfxNIacl5',
        amount: selectedPrice * selectPlanDuration * 100,
        currency: 'INR',
        order_id: res.data.id,
        name: 'Shoponcell',
        image:
          'https://shoponcell.com/_next/static/media/logo_landscape_light.de3c5c18.svg',
        description: 'Test Payment',
        handler: async function (response) {
          if (
            response.razorpay_order_id &&
            response.razorpay_signature &&
            response.razorpay_payment_id
          ) {
            const verifyUrl = `https://api.shoponcell.com/Dashboard/Subscription/v1.0/verify-payment`
            const razorpay_orders = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              razorpay_payment_id: response.razorpay_payment_id,
            }
            await axios
              .post(verifyUrl, razorpay_orders, config)
              .then((res) => {
                console.log('successfully payment', res.data)
                setIsModalCurrentPlan(false)
                setIsPlanSelected(false)
                const checkSubscription = async () => {
                  const token = getCookie('access-token')
                  const config = {
                    headers: {
                      accept: 'application/json',
                      Authorization: `${token}`,
                    },
                  }

                  const url = `https://api.shoponcell.com/Dashboard/Subscription/v1.0/checksubscription`

                  try {
                    const response = await axios.post(url, {}, config)
                    console.log('response.data.length', response.data)
                    if (response.data.length === 0) {
                      setIsSubscribed(false)
                    } else {
                      setIsSubscribed(true)
                    }
                  } catch (error) { }
                }
                checkSubscription()
                const fetchSubscripton = () => {
                  setIsLoading(true)
                  let url = new URL(
                    `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Subscription?page=${currentPage}`
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
                      console.log(data, '5data')
                      setBuy(data.Can_Buy)
                      setWallet(data.Wallet)
                      setTrail(data.Trial)
                      setBotToggle(data.Bot)
                      setLanguage(data.Language)
                      setLevel(data.Level)
                      setSubscriptions(data.Has_Subscriptions)
                      setPackages(data.Subscriptions)
                      setAddons(data.Addons)
                      setCurrentPage(data.Current_Page)
                      setTotalPages(data.Total_Pages)
                      setTransactions(data.Transactions)
                      setFree(data.Sessions_Left)
                      setIsLoading(false)
                    })
                    .catch((r) => {
                      console.log(r)
                    })
                }
                fetchSubscripton()
              })
              .catch((err) => console.log('--------------------', err))
          } else {
            rzp1.on('payment.failed', function (response) {
              console.error('Payment failed', response)
              navigate('/subscription', { replace: true })
            })
          }
        },
        prefill: {
          name: 'shoponcell',
          email: 'john@example.com',
        },
      }
      const rzp1 = new window.Razorpay(options)
      rzp1.on('payment.failed', function (response) {
        console.error('Payment failed', response)
        navigate('/subscription', { replace: true })
      })
      rzp1.open()
    })
  }

  return (
    <MainScreenWrapper screenHeader={t('Subscription_subscription_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col items-start justify-start w-full gap-5 pt-5">
          <TopSection
            wallet={Wallet}
            toggle_bot={toggle_bot}
            toggle_language={toggle_language}
            bot_toggle={BotToggle}
            language={language}
            setLanguage={setLanguage}
            bot_loader={BotToggleLoader}
            lang_loader={LangToggleLoader}
            free={Free}
          />

          {!isSubscribed && (
            <div className="flex flex-row items-center justify-between w-full gap-2 px-6 py-4 bg-white dark:bg-bgBlack rounded-standard">
              <p className="text-lg font-bold">
                <MdShoppingCart className="w-8 h-8" />
              </p>

              <div className="flex flex-col gap-2 tabletM:flex-row">
                <PrimaryButton
                  handleClick={() => {
                    if (Buy) {
                      opencurrentplanModal()
                    }
                  }}
                  text={
                    <div className="flex items-center gap-2">
                      {t('Subscription_subscription_buysubscription')}
                      <MdAutorenew />
                    </div>
                  }
                  size="small"
                  width="fit"
                />
              </div>
            </div>
          )}

          <BottomSection
            subsPackages={Packages}
            Subscriptions={Subscriptions}
            level={Level}
            open={open}
            set={setref}
          />

          <p className="text-2xl font-bold">
            {' '}
            {t('Subscription_transaction_heading')}{' '}
          </p>
          {Transactions.map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-col relative rounded-lg group border-[2px] ease-in gap-1 p-3 tabletM:px-5 dark:border-bgBlack border-WhiteSec bg-white cursor-pointer transition-all duration-300 dark:bg-bgBlack  w-full justify-between">
                <div className="flex justify-start w-full">
                  <div>
                    <p className="text-sm font-bold opacity-40">
                      {item.Reference_ID}
                    </p>
                  </div>
                </div>

                <div className="grid justify-between w-full grid-cols-3 gap-2 tabletM:grid-cols-6">
                  <div>
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t('Subscription_transaction_package')}
                    </p>
                    <p className="font-bold">{item.Package}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t('Subscription_transaction_packagetype')}
                    </p>
                    <p className="font-bold">{item.Package_Type}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t('Subscription_transaction_date')}
                    </p>
                    <p className="font-bold">
                      {item.Date + '/' + item['Month/Year']}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t('Subscription_transaction_time')}
                    </p>
                    <p className="font-bold">{item.Time}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t('Subscription_transaction_cost')}
                    </p>
                    <p className="font-bold">
                      {item.TotalCost + ' ' + item.Currency}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                      {t('Subscription_transaction_status')}
                    </p>
                    <p className="font-bold">{item.Status}</p>
                  </div>
                </div>
              </div>
            )
          })}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}></Pagination>
        </div>
      )}

      <Modal
        isVisible={isModalcurrentplan}
        onClose={closecurrentplanModal}>
        <div className="bg-white rounded shadow-lg max-w-full md:max-w-screen-md lg:max-w-screen-lg h-full overflow-y-scroll absolute right-0 top-2 transform translate-x-0">
          <div className=" items-center justify-between rounded-md border border-stroke bg-white px-4 py-3 flex item-center">
            <h3 className="text-md">Change Plan</h3>
            <button onClick={closecurrentplanModal}>
              <svg
                className="w-[20px] h-[20px]"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <line
                  x1="1"
                  y1="11"
                  x2="11"
                  y2="1"
                  stroke="black"
                  strokeWidth="2"></line>
                <line
                  x1="1"
                  y1="1"
                  x2="11"
                  y2="11"
                  stroke="black"
                  strokeWidth="2"></line>
              </svg>
            </button>
          </div>
          <div
            className="bg-white px-4 py-3 h-full mb-8"
            style={{ backgroundColor: '#f9f8f873' }}>
            <div id="default-tab-content">
              <div
                className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? 'block' : 'hidden'}`}
                id="dashboard"
                role="tabpanel"
                aria-labelledby="dashboard-tab">
                <div>
                  <div className="w-full flex justify-between gap-2">
                    {Packages.map((item, index) => {
                      return (
                        <div
                          key={item.id || index}
                          className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === index ? 'border-[#600e7d]' : 'border-transparent'}`}
                          style={{ minHeight: '430px' }}
                          onClick={() => handleBoxClick(index)}>
                          <h3 className="text-lg font-bold text-center mb-2">
                            {item.Name}
                          </h3>
                          <h4
                            className="text-lg text-center font-bold mb-4"
                            style={{ color: '#600e7d' }}>
                            ₹ <span>{item.Cost}/month</span>
                          </h4>
                          <ul className="text-xs text-black text-base">
                            {item.Features.Agent_Feedback && (
                              <li className="mt-1">
                                <span className="mr-1">•</span>Agent Feedback
                              </li>
                            )}
                            {item.Features.Agents > 0 && (
                              <li className="mt-1">
                                <span className="mr-1">•</span>
                                {`Agents: ${item.Features.Agents}`}
                              </li>
                            )}
                            {item.Features.Invoice_Social_Media && (
                              <li className="mt-1">
                                <span className="mr-1">•</span>Invoice Social
                                Media
                              </li>
                            )}
                            {item.Features.Invoice_Website && (
                              <li className="mt-1">
                                <span className="mr-1">•</span>Invoice Website
                              </li>
                            )}
                            {item.Features.Quick_Message && (
                              <li className="mt-1">
                                <span className="mr-1">•</span>Quick Message
                              </li>
                            )}
                            {item.Features.Survey && (
                              <li className="mt-1">
                                <span className="mr-1">•</span>Survey
                              </li>
                            )}
                          </ul>

                          <button
                            className="px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300"
                            style={{ color: '#600e7d' }}
                            onClick={() => {
                              let planDuration = 1
                              if (item.Name === 'Monthly') {
                                planDuration = 1
                              } else if (item.Name === 'Quarterly') {
                                planDuration = 3
                              } else {
                                planDuration = 12
                              }
                              handleSelectPlan(
                                item.Cost,
                                currentDate.getMonth() +
                                1 +
                                '-' +
                                currentDate.getDate() +
                                '-' +
                                currentDate.getFullYear(),
                                planDuration,
                                item.Name
                              )
                            }}>
                            Select Plan{' '}
                            <span
                              className="inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900"
                              style={{ width: '18px', height: '18px' }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-right-short"
                                viewBox="0 0 16 16">
                                <path
                                  fillRule="evenodd"
                                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  {/* <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                    <div>
                      <h3 className='text-black text-md'>
                        Billing Address
                      </h3>
                      <span className='text-xs text-black'>FIRST FLOOR AND SECOND FLOOR, A-3, MAL ROAD,, VIDHYADHAR NAGAR, SECTOR-1, JAIPUR, Jaipur, 302023,
                        Rajasthan, IN</span>

                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-samibold text-bg-teal-1000 text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                      style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openModalEditBilling}
                    >
                      Edit
                    </button>

                  </div> */}
                  {/* <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                    <div>
                      <h3 className='text-black text-md'>
                        Payment Method
                      </h3>
                      <span className='text-xs' style={{ color: 'red' }}>Add billing address to enable payment method</span>
                      <span className='text-xs block' style={{ color: 'red' }}>Add your credit card for future purchases.</span>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-samibold text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                      style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openmodaladdcard}
                    >
                      Add Card
                    </button>
                  </div> */}
                  {/* <h6 className='text-black text-xs pt-2 px-5 '>This plan is already active.</h6> */}
                  <div className="flex items-start justify-between w-full rounded-[10px]  px-5 pt-2">
                    <div>
                      <h3 className="text-black text-md pt-5 leading-3">
                        Total
                      </h3>
                      <span className="text-xs text-black">
                        Next renewal on {selectedRenewalDate}
                      </span>
                    </div>
                    <div className="text-right">
                      <h3
                        className="text-black text-md pt-5 leading-3 font-bold"
                        style={{ color: 'rgb(96, 14, 125)' }}>
                        ₹ {selectedPrice * selectPlanDuration}/{selectPlanName}
                      </h3>
                      <span className="text-xs text-black font-samibold text-right">
                        (Tax Excl.)
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pb-5">
                    <button
                      className=" px-4 py-3 font-semibold rounded-md w-full"
                      // style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgb(54, 81, 90)' }}
                      style={{
                        backgroundColor: isPlanSelected
                          ? 'green'
                          : 'rgba(0, 0, 0, 0.12)',
                        color: isPlanSelected ? 'white' : 'rgb(54, 81, 90)',
                      }}
                      onClick={handleCheckout}
                      disabled={!isPlanSelected} // Disable until plan is selected
                    // onClick={handleCheckout}
                    >
                      <span className=" text-sm">Pay Via Razorpay</span>
                      <span className="block text-xs">
                        Only Indian Customers
                      </span>
                    </button>
                    {/* <button className=" px-4 py-3 font-semibold rounded-md mt-3 w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgb(54, 81, 90)' }}>
                      <span className=' text-sm'>
                        Proceed To Pay
                      </span>
                      <span className='block text-xs'>
                        Via International Cards
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
              {/* ------------------ */}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isVisible={showCart}
        onClose={() => setShowCart(false)}>
        <CartModal
          res={inventory}
          open={setShowCart}
          buy={payment}
        />
      </Modal>

      <Modal
        isVisible={showPayment}
        onClose={() => setShowPayment(false)}>
        <PaymentModal
          id={id}
          tag={slug}
          open={setShowPayment}
        />
      </Modal>

      <Modal
        isVisible={showStatus}
        onClose={() => setShowStatus(false)}>
        <div className="flex justify-center items-center w-[50vh] h-[50vh] bg-white dark:bg-bgBlack rounded-xl">
          <div className="flex flex-col items-center justify-between w-full h-full gap-5 p-5">
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold opacity-60 ">
                {' '}
                {t('Subscription_transaction_purchase')}{' '}
              </p>
              <p className="text-2xl font-bold ">
                {' '}
                {success == 'true'
                  ? t('Subscription_transaction_success')
                  : t('Subscription_transaction_failed')}{' '}
              </p>
            </div>

            <p
              className={`p-0 text-4xl scale-150 text-white rounded ${success == 'true' ? 'bg-Green' : 'bg-Red/60'
                }`}>
              {success == 'true' ? <BiCheck /> : <MdClose />}
            </p>

            <SecondaryButton
              handleClick={() => {
                setShowStatus(false)
              }}
              text={<div className="flex items-center gap-2">x</div>}
              size="small"
              height="fit"
              width="full"
            />
          </div>
        </div>
      </Modal>
    </MainScreenWrapper>
  )
}

export default Subscription
