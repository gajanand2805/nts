import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCheck } from 'react-icons/bi'
import { BsArrowRightSquare } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import Modal from '../../components/Modal'
import PrimaryButton from '../UI/Button/PrimaryButton'
const BottomSection = ({ subsPackages, Subscriptions, level, open, set }) => {
  const [Buy, setBuy] = useState(false)
  const [Wallet, setWallet] = useState(0)
  const [Trail, setTrail] = useState(true)
  const [BotToggle, setBotToggle] = useState(false)
  const [language, setLanguage] = useState('')
  const [Level, setLevel] = useState(0)
  const [Subscriptionss, setSubscriptionss] = useState([])
  const [Addons, setAddons] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [Transactions, setTransactions] = useState([])
  const [Free, setFree] = useState(0)
  const { getCookie, setIsLoading, wrapper } = useGlobalAuthContext()
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
                const fetchSubscription = () => {
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
                      setSubscriptionss(data.Has_Subscriptions)
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
                fetchSubscription()
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
  const handleBoxClick = (index) => {
    setActiveBox(index)
  }
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
  const [currentPage, setCurrentPage] = useState(1)
  const currentDate = new Date()
  const [isPlanSelected, setIsPlanSelected] = useState(true)
  const [selectPlanName, setSelectedPlanName] = useState('Monthly')
  const [selectPlanDuration, setSelectedPlanDuration] = useState(1)
  const nextMonthDate = new Date()
  const [selectedPrice, setSelectedPrice] = useState(699)
  nextMonthDate.setMonth(currentDate.getMonth() + 1)
  const [isModalcurrentplan, setIsModalCurrentPlan] = useState(false)
  const opencurrentplanModal = () => setIsModalCurrentPlan(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [Packages, setPackages] = useState([])
  const [activeBox, setActiveBox] = useState(0)
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0') // Ensures two digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-based
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const [selectedRenewalDate, setSelectedRenewalDate] = useState(
    formatDate(nextMonthDate)
  )
  const closecurrentplanModal = () => {
    setIsModalCurrentPlan(false)
    setIsPlanSelected(false)
    router.push({
      pathname: '/subscription',
      query: {},
    })
  }

  let active = Subscriptions.length > 0
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div className="flex flex-col w-full gap-4">
      {active && level == 2 ? (
        Subscriptions.map((item, i) => {
          console.log(item.Features, 'item1111')
          const getCurrentDate = () => {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
          }
          return i == 0 ? (
            <div
              key={i}
              className="flex flex-col items-center justify-between w-full gap-2 bg-white dark:bg-bgBlack p-7 rounded-standard">
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-lg font-bold text-BlackSec">
                    {t('Subscription_subscription_currentplan')}
                  </p>
                  <p className="text-xl font-bold ">{item.Package}</p>
                </div>
                <div className="hidden mobileL:block">
                  <div className="laptop:flex hidden flex-col items-start min-w-[200px] gap-4">
                    <PrimaryButton
                      text={t('Subscription_subscription_renew_plan')}
                      size="small"
                      disabled={item.ExpireAt > getCurrentDate()}
                      handleClick={() => {
                        opencurrentplanModal()
                      }}
                    />
                  </div>
                  <div className="laptop:hidden flex flex-col items-start min-w-[200px] gap-4">
                    <PrimaryButton
                      text={t('Subscription_subscription_renew_plan')}
                      size="small"
                      handleClick={() => {
                        opencurrentplanModal()
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-start w-full gap-2 mt-4 laptop:mt-4">
                <p className="text-lg font-bold text-BlackSec">
                  {t('Subscription_subscription_plandetails')}
                </p>

                <div className="grid grid-cols-1 tabletM:grid-cols-3 gap-2 w-full justify-between">
                  <div className="flex items-start gap-3">
                    <p
                      className={`p-0 text-2xl text-white rounded ${item.Features.Invoice_Website ? 'bg-Blue' : 'bg-Red/40'
                        }`}>
                      {item.Features.Invoice_Website ? (
                        <BiCheck />
                      ) : (
                        <MdClose />
                      )}
                    </p>
                    <p className="text-lg font-bold">
                      {' '}
                      {t('Subscription_subscription_invoicewebsite')}{' '}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <p
                      className={`p-0 text-2xl text-white rounded ${item.Features.Invoice_Social_Media
                          ? 'bg-Blue'
                          : 'bg-Red/40'
                        }`}>
                      {item.Features.Invoice_Social_Media ? (
                        <BiCheck />
                      ) : (
                        <MdClose />
                      )}
                    </p>
                    <p className="text-lg font-bold">
                      {' '}
                      {t('Subscription_subscription_invoicesocialmedia')}{' '}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <p
                      className={`p-0 text-2xl text-white rounded ${item.Features.Quick_Message ? 'bg-Blue' : 'bg-Red/40'
                        }`}>
                      {item.Features.Quick_Message ? <BiCheck /> : <MdClose />}
                    </p>
                    <p className="text-lg font-bold">
                      {' '}
                      {t('Subscription_subscription_quickmessage')}{' '}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <p
                      className={`p-0 text-2xl text-white rounded ${item.Features.Agent_Feedback ? 'bg-Blue' : 'bg-Red/40'
                        }`}>
                      {item.Features.Agent_Feedback ? <BiCheck /> : <MdClose />}
                    </p>
                    <p className="text-lg font-bold">
                      {' '}
                      {t('Subscription_subscription_agentfeedback')}{' '}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <p
                      className={`p-0 text-2xl text-white rounded ${item.Features.Agents > 0 ? 'bg-Blue' : 'bg-Red/40'
                        }`}>
                      {item.Features.Agents > 0 ? <BiCheck /> : <MdClose />}
                    </p>
                    <p className="text-lg font-bold">
                      {' '}
                      {item.Features.Agents}{' '}
                      {t('Subscription_subscription_agents')}{' '}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <p
                      className={`p-0 text-2xl text-white rounded ${item.Features.Survey ? 'bg-Blue' : 'bg-Red/40'
                        }`}>
                      {item.Features.Survey ? <BiCheck /> : <MdClose />}
                    </p>
                    <p className="text-lg font-bold">
                      {' '}
                      {t('Subscription_subscription_surveyform')}{' '}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between w-full gap-8 mt-8 tabletM:flex-row">
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-lg font-bold text-BlackSec">
                    {' '}
                    {t('Subscription_subscription_validity')}{' '}
                  </p>
                  <p className="text-md font-bold">
                    {item.Left_Validity.days > 0
                      ? `${item.Left_Validity.days} days ${item.Left_Validity.hours} hours ${item.Left_Validity.minutes} minutes`
                      : 'Expired'}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-lg font-bold text-BlackSec">
                    {t('Subscription_subscription_subscriptionsince')}
                  </p>
                  <p className="text-md font-bold">{item.StartAt}</p>
                </div>

                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-lg font-bold text-BlackSec">
                    {t('Subscription_subscription_subscriptionexpiry')}
                  </p>
                  <p className="text-md font-bold">{item.ExpireAt}</p>
                </div>
              </div>

              <div className="flex flex-col items-start w-full gap-4 mt-8 mb-4 mobileL:hidden">
                <PrimaryButton
                  text={t('Subscription_subscription_upgrade_plan')}
                  size="large"
                  handleClick={() => {
                    z
                    set(item.Reference_ID)
                    open(item.Upgrades)
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="flex flex-col items-center justify-between w-full gap-0 bg-white dark:bg-bgBlack py-4 px-7 rounded-standard">
              <div className="grid grid-cols-2 tabletM:grid-cols-4 gap-2 w-full justify-between">
                <div>
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t('Subscription_subscription_upcomingplan')}
                  </p>
                  <p className="font-bold">{item.Package}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t('Subscription_subscription_start')}
                  </p>
                  <p className="font-bold">{item.StartAt}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                    {t('Subscription_subscription_expiry')}
                  </p>
                  <p className="font-bold">{item.ExpireAt}</p>
                </div>

                <PrimaryButton
                  text={t('Subscription_subscription_upgrade_plan')}
                  size="small"
                  handleClick={() => {
                    set(item.Reference_ID)
                    open(item.Upgrades)
                  }}
                />
              </div>
            </div>
          )
        })
      ) : (
        <div className="flex flex-col items-center justify-between w-full gap-0 bg-white dark:bg-bgBlack py-4 px-7 rounded-standard">
          <div className="flex flex-col items-start justify-between w-full">
            <div className="flex flex-row justify-between items-center gap-2">
              <p className="text-xl font-bold text-BlackSec">
                {' '}
                {t('Subscription_subscription_heading')}{' '}
              </p>
              <div className="flex flex-row gap-2 items-center text-xl font-bold ">
                {t('Subscription_subscription_inactive')} <RiCloseCircleFill />
              </div>
            </div>

            {level != 2 && (
              <div className="flex flex-row justify-between items-center gap-2">
                <p className="text-lg font-bold text-BlackSec">
                  {t('Subscription_subscription_free_trial')}
                </p>
                <div
                  onClick={() => router.push('/contacts')}
                  className="cursor-pointer flex flex-row gap-2 items-center text-Blue text-lg font-bold ">
                  {t('Subscription_subscription_custom_contact')}{' '}
                  <BsArrowRightSquare />
                </div>
              </div>
            )}
          </div>
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
                    {subsPackages.map((item, index) => {
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
    </div>
  )
}

export default BottomSection
