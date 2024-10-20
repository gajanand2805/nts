import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import Loader from '../../components/Loader'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import Rating from '../../components/UI/Rating/Rating'
import Chatpane from '../../components/chatroom/Chatpane'
import NotAvailable from '../../public/NotAvailable.png'

const InspectPhone = () => {
  const router = useRouter()
  const {
    getCookie,
    isLoading,
    setIsLoading,
    isAccessToken,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()
  const { t } = useTranslation()

  const [phoneData, setPhoneData] = useState([])
  const [conversation, setConversation] = useState({})

  useEffect(() => {
    if (isAccessToken) {
      setIsLoading(true)
      const { id } = router.query
      const getPhoneData = async () => {
        const config = {
          headers: {
            accept: 'application/json',
            'Phone-No': id,
            Authorization: getCookie('access-token'),
          },
        }

        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/inspect`,
            config
          )
          setPhoneData(res.data)

          const convRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/conversation?skip=0&limit=20&Phone-No=${id}`,
            config
          )
          setPhoneData(res.data)
          setConversation(convRes.data)
        } catch (err) {
          console.log('PHONE DATA ERROR', err)
        } finally {
          setIsLoading(false)
        }
      }
      getPhoneData()
    }
  }, [router, isAccessToken])

  return (
    <MainScreenWrapper
      backLink="/agents"
      backText={t('Agents_heading')}
      screenHeader={t('Agent_inspect_heading')}
      headerItem={
        <div className="flex flex-col items-start justify-start text-sm">
          <p className="italic opacity-70">{phoneData?.Agent_Email}</p>
          <div className="flex items-center justify-center">
            <p className="mr-2">Feedback</p>
            <Rating rating={phoneData?.Feedback} />
          </div>
        </div>
      }>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div
          className={`relative grow flex flex-col justify-center items-center h-full bg-bgWhiteSec text-Black dark:bg-dBlack dark:text-white`}>
          {conversation.length === 0 ? (
            <main className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] gap-10 pt-24">
              <div className="max-w-[300px]">
                <Image
                  src={NotAvailable}
                  alt="Not Available"
                />
              </div>
              <p className="text-xl max-w-[300px] text-center font-bold">
                No conversation available for this contact number
              </p>
            </main>
          ) : (
            <Chatpane
              setConversation={setConversation}
              currentChat={conversation}
            />
          )}
        </div>
      )}
    </MainScreenWrapper>
  )
}

export default InspectPhone
