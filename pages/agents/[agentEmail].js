import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import ProfileAnalytics from '../../components/Agent/ProfileAnalytics'
import Loader from '../../components/Loader'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import Modal from '../../components/Modal'
import SecondaryButton from '../../components/UI/Button/SecondaryButton'
import Pagination from '../../components/UI/Pagination'
import Rating from '../../components/UI/Rating/Rating'
import Chatpane from '../../components/chatroom/Chatpane'

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

const AgentProfile = () => {
  const router = useRouter()
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

  const [isDecodedEmail, setIsDecodedEmail] = useState(false)
  const [showConvo, setShowConvo] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [conversation, setConversation] = useState({})
  const [isInitConvoLoading, setIsInitConvoLoading] = useState(false)

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [convos, setconvos] = useState({
    Total_Conversations: 0,
    percentage_Total_Conversations: 0,
    Total_Feedbacks: 0,
    percentage_Total_Feedbacks: 0,
    Avg_feedback: 0,
    percentage_Avg_feedback: 0,
    convo_graph: [],
  })
  const [logs, setlogs] = useState({ log_graph: [] })
  const [chats, setchats] = useState({ Conversations: [] })

  const openConvModal = (Contact) => {
    setShowConvo(true)
    getInitConvData(Contact)
  }
  const getInitConvData = async (Contact) => {
    setIsInitConvoLoading(true)
    const config = {
      headers: {
        accept: 'application/json',
        'Phone-No': Contact,
        Authorization: getCookie('access-token'),
      },
    }

    try {
      const convRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/conversation?skip=0&limit=20&Phone-No=${Contact}`,
        config
      )
      setConversation(convRes.data)
    } catch (err) {
      console.log('PHONE DATA ERROR', err)
    } finally {
      setIsInitConvoLoading(false)
    }
  }

  useEffect(() => {
    console.log(currentPage, totalPages, 'PAGESS')
    if (isAccessToken) {
      setIsLoading(true)
      let arr = window.location.href.split('/')
      let agentEmail = window && window?.atob(arr[arr.length - 1])

      const config = {
        headers: {
          accept: 'application/json',
          'Agent-Email': agentEmail,
          Authorization: getCookie('access-token'),
        },
      }
      const getAgentProfile = async () => {
        try {
          const res = await axios
            .get(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/profile?month=${month}&year=${year}&page=${currentPage}`,
              config
            )
            .catch((err) => wrapper(err.response))
          setname(res?.data.Name)
          setemail(res?.data.Email)
          setconvos(res?.data.Convo_Data)
          setlogs(res?.data.Log_Data)
          setchats(res.data?.Conversations_data)
          // setCurrentPage(res.data?.Conversations_data.Current_Page)
          setTotalPages(res.data?.Conversations_data.Total_Pages)
        } catch (err) {
        } finally {
          setIsLoading(false)
        }
      }
      getAgentProfile()
    }
  }, [month, year, currentPage, isAccessToken])

  return (
    <MainScreenWrapper
      screenHeader={t('Agent Profile')}
      backLink="/agents"
      backText={t('Agents_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col w-full gap-4 pb-9">
          <ProfileAnalytics
            name={name}
            email={email}
            convos={convos}
            logs={logs}
            setYear={setYear}
            setMonth={setMonth}
            month={month}
            year={year}
          />
          {chats.Conversations.map((item, i) => {
            return (
              <>
                <div
                  onClick={() => openConvModal(item.Contact)}
                  key={i}
                  className="flex flex-col relative rounded-lg group border-[2px] ease-in gap-1 p-3 tabletM:px-5 dark:border-bgBlack border-WhiteSec bg-white cursor-pointer transition-all duration-300 dark:bg-bgBlack  w-full justify-between">
                  <div className="grid justify-between w-full grid-cols-2 gap-2 tabletM:grid-cols-5">
                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Agents_profile_table_contact')}
                      </p>
                      <p className="font-bold">{item.Contact}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Agents_profile_feedbacks')}
                      </p>
                      <p className="font-bold">
                        <Rating rating={item.Feedback.toFixed(1)} />
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Agents_profile_table_date')}
                      </p>
                      <p className="font-bold">{item.Date}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Agents_profile_table_time')}
                      </p>
                      <p className="font-bold">{item.Time}</p>
                    </div>

                    <SecondaryButton
                      disabled={false}
                      isLoading={false}
                      handleClick={() => { }}
                      text={t('Agents_profile_table_view')}
                      size="small"
                      width="fit"
                    />
                  </div>
                </div>
              </>
            )
          })}
          <div className="flex items-center justify-center w-full mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}></Pagination>
          </div>
        </div>
      )}
      <Modal
        isVisible={showConvo}
        onClose={() => setShowConvo(false)}>
        <div className="w-full max-w-2xl mx-2">
          {isInitConvoLoading ? (
            <div className="flex items-center justify-center w-full max-w-2xl bg-white dark:bg-bgBlack rounded-xl h-[50vh]">
              <div
                className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-black dark:border-white`}
              />
            </div>
          ) : (
            <Chatpane
              currentChat={conversation}
              setConversation={setConversation}
            />
          )}
        </div>
      </Modal>
    </MainScreenWrapper>
  )
}

export default AgentProfile
