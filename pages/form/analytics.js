import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAnalytics } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import MessageAnalytics from '../../components/Form/MessageAnalytics'
import Question from '../../components/Form/Question'
import Loader from '../../components/Loader'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import Modal from '../../components/Modal'

const Analytics = () => {
  const {
    isAccessToken,
    getCookie,
    isLoading,
    setIsLoading,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()

  const { t } = useTranslation()

  const [Data, setData] = useState({})

  const router = useRouter()
  const d = new Date()
  const [month, setMonth] = useState(d.getMonth() + 1)
  const [year, setYear] = useState(d.getFullYear())
  const [showResponse, setShowResponse] = useState(false)

  const [resload, setResload] = useState(true)
  const [resdata, setresdata] = useState({})

  function open(i) {
    setResload(true)
    setShowResponse(true)
    setresdata(Data.response_analytics.Questions[i])
    setResload(false)
  }

  useEffect(() => {
    if (isAccessToken) {
      const getHealthData = async () => {
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
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/form/analytics?month=${month}&year=${year}`,
              config
            )
            .catch((err) => wrapper(err.response))
          setData(res.data)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }
      getHealthData()
    }
  }, [isAccessToken, month, year])

  return (
    <MainScreenWrapper
      screenHeader={t('Form_analytics_heading')}
      backLink="/form"
      backText={t('Form_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div
          className={`relative grow flex flex-col justify-center items-center h-full bg-bgWhiteSec text-Black dark:bg-dBlack dark:text-white`}>
          <main className="flex flex-col items-center justify-center w-full h-full  gap-2 px-2">
            <div className="flex flex-col h-full w-full mt-2 gap-4">
              <MessageAnalytics
                data={Data}
                setMonth={setMonth}
                setYear={setYear}
                month={month}
                year={year}
              />
              {Data?.response_analytics?.Questions.map((item, i) => {
                return (
                  <Question
                    key={i}
                    item={item}
                    index={i}
                    open={open}
                  />
                )
              })}
            </div>
          </main>
        </div>
      )}

      <Modal
        isVisible={showResponse}
        onClose={() => setShowResponse(false)}>
        <div className="flex flex-col w-[90%] mt-2 gap-0  max-w-[800px] items-center justify-center shadow-xl border-0 border-Blue rounded-xl z-10">
          <div className="flex justify-between items-center w-full gap-4 px-4 py-4 text-white bg-Blue rounded-t-lg ">
            <p className="flex items-center gap-4 font-bold">
              <MdAnalytics className="text-2xl " />{' '}
              {t('Form_analytics_responses_heading')}
            </p>
            <div
              onClick={() => setShowResponse(false)}
              className="flex h-full justify-between cursor-pointer items-center">
              <RiCloseCircleFill className="h-6 w-6" />
            </div>
          </div>

          <div className="flex flex-col w-full text-[15px]">
            <div className="w-full h-[80vh] flex flex-col justify-center items-center tabletM:flex-row gap-5 p-5 overflow-y-auto rounded-b-xl  bg-bgWhiteSec dark:bg-bgBlack">
              {resload ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="border-t-transparent border-solid animate-spin  rounded-full border-Blue border-8 h-16 w-16"></div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col gap-2 justify-start">
                  <p className="font-bold text-xl">{resdata?.Question}</p>

                  {resdata.Options.map((val, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-row gap-2 w-full">
                        <p className="bg-white dark:bg-dBlack p-2 px-4 rounded-xl">
                          x{val.occurrence}
                        </p>
                        <p className="bg-white dark:bg-dBlack p-2 px-4 w-full rounded-xl">
                          {val.value}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </MainScreenWrapper>
  )
}

export default Analytics
