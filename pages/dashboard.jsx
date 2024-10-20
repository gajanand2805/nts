import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { useGlobalAuthContext } from '../AuthContext'
import CampaignAnalytics from '../components/Dashboard/CampaignAnalytics'
import FeedbackAnalytics from '../components/Dashboard/FeedbackAnalytics'
import MessageAnalytics from '../components/Dashboard/MessageAnalytics'
// import StoreAnalytics from '../components/Dashboard/StoreAnalytics'
import Subscription from '../components/Dashboard/Subscription'
import WhatsappAnalytics from '../components/Dashboard/WhatsappAnalytics'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import CsvButton from '../components/UI/Button/CsvButton'
import DateSelect from '../components/UI/DateSelect'
import { useGlobalDashboardContext } from '../contexts/DashboardContext'
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

export default function Dashboard() {
  //? variables
  let bDetails = 1

  //? states

  //? contexts
  const { isAccessToken, selectedLang, buisnessDetails } =
    useGlobalAuthContext()

  const {
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
    getFeedbackCSV,
    getClientsCSV,
    handleChange,
    conversation,
    feedback,
    message_data,
    convo_count,
    order_graph_data,
    feedback_graph_data,
    abandonCartData,
    dataExport,
    broadcast_analytics,
  } = useGlobalDashboardContext()
  const [showTooltip, setShowTooltip] = useState(false)
  //? router
  const router = useRouter()
  const { query } = useRouter()

  //? translation
  const { t } = useTranslation()
  // console.log("message_data", message_data)

  // console.log("broadcast_analytics", broadcast_analytics)
  //? effects

  return (
    <MainScreenWrapper screenHeader={t('Dashboard_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className={`flex flex-col w-full gap-4 pb-9`}>
          <WhatsappAnalytics
            conversation={conversation}
            order_graph_data={order_graph_data}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          />

          <Subscription
            conversation={conversation}
            order_graph_data={order_graph_data}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          />

          {/* <StoreAnalytics
            conversation={conversation}
            order_graph_data={order_graph_data}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          /> */}
          <CampaignAnalytics
            convo_count={convo_count}
            conversation={conversation}
            message_data={broadcast_analytics}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          />
          <FeedbackAnalytics
            feedback={feedback}
            feedback_graph_data={feedback_graph_data}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          />
          <MessageAnalytics
            convo_count={convo_count}
            conversation={conversation}
            message_data={message_data}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          />
          {/* <CartAbandonedAnalytics
            abandonData={abandonCartData}
            setMonth={setMonth}
            setYear={setYear}
            month={month}
            year={year}
          /> */}

          <div className="flex flex-col justify-between w-full gap-8 p-4 bg-white dark:bg-bgBlack rounded-standard tabletM:p-7">
            <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
              <div className="flex gap-2 items-center">
                <p className="text-xl font-bold">
                  {t('Dashboard_data_analytics_heading')}
                </p>
                {!dataExport && (
                  <div className="relative inline-block">
                    <button
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}>
                      <FaLock />
                    </button>
                    {showTooltip && (
                      <div className="absolute dark:bg-bgBlackSec bg-bgWhiteSec p-2  min-w-[320px] rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                        Please upgrade to premium plan to avail this option
                      </div>
                    )}
                  </div>
                )}
              </div>
              <DateSelect
                setmonth={setMonth}
                setyear={setYear}
                month={month}
                year={year}
              />
            </div>

            <div className="grid items-center justify-between w-full grid-cols-1 gap-4 tabletM:grid-cols-4 laptop:flex-row">
              <CsvButton
                disabled={!dataExport || isDownloadLoading2}
                isLoading={isDownloadLoading2}
                handleClick={() => getClientsCSV()}
                text={
                  <div className="flex flex-row items-center gap-2">
                    <HiOutlineDocumentDownload />{' '}
                    {t('Dashboard_data_analytics_client_csv')}
                  </div>
                }
                height="fit"
              />

              <CsvButton
                disabled={!dataExport || isDownloadLoading1}
                isLoading={isDownloadLoading1}
                handleClick={() => getConversationCSV()}
                text={
                  <div className="flex flex-row items-center gap-2">
                    <HiOutlineDocumentDownload />{' '}
                    {t('Dashboard_data_analytics_conversion_csv')}
                  </div>
                }
                height="fit"
              />
              <CsvButton
                disabled={!dataExport || isDownloadLoading}
                isLoading={isDownloadLoading}
                handleClick={() => getFeedbackCSV()}
                text={
                  <div className="flex flex-row items-center gap-2">
                    <HiOutlineDocumentDownload />{' '}
                    {t('Dashboard_data_analytics_feedback_csv')}
                  </div>
                }
                height="fit"
              />
              <CsvButton
                disabled={!dataExport || false}
                isLoading={false}
                handleClick={() => {
                  router.push('/failed?month=' + month + '&year=' + year)
                }}
                text={
                  <div className="flex flex-row items-center gap-2">
                    <BsFillExclamationTriangleFill />
                    {t('Dashboard_data_analytics_meta_logs')}
                  </div>
                }
                height="fit"
              />
            </div>
          </div>
        </div>
      )}
    </MainScreenWrapper>
  )
}
