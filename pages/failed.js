import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'
import SingleLog from '../components/Health/SingleLog'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import Pagination from '../components/UI/Pagination'

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

const Health = () => {
  const {
    isAccessToken,
    getCookie,
    isLoading,
    setIsLoading,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [logData, setLogData] = useState([])
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/failed/message/logs?month=${router.query.month}&year=${router.query.year}&page=${currentPage}`,
              config
            )
            .catch((err) => wrapper(err.response))
          setLogData(res.data.data)
          setCurrentPage(res.data?.Current_Page)
          setTotalPages(res.data?.Total_Pages)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }
      getHealthData()
    }
  }, [currentPage, isAccessToken])

  return (
    <MainScreenWrapper
      backLink="/dashboard"
      backText={t && t('Dashboard_heading')}
      screenHeader={t && t('Meta_Logs_Heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div
          className={`relative grow flex flex-col justify-center h-full text-Black dark:text-white`}>
          <main className="flex flex-col items-center justify-center w-full h-full gap-4 px-2">
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-start w-full px-5 py-4 rounded-md mobileM:flex-row bg-Blue ">
                <div>
                  <p className="text-sm font-semibold text-White/80 ">
                    {t && t('Meta_Logs_Title')}
                  </p>
                  <p className="text-lg font-bold text-white">
                    {t && t('Meta_Logs_Text')}
                  </p>
                </div>
              </div>

              <div className="">
                <div className="flex flex-col gap-4 ">
                  {logData?.map((error, key) => {
                    return (
                      <SingleLog
                        error={error}
                        index={key}
                        key={key}
                      />
                    )
                  })}
                </div>
                <div className="flex items-center justify-center w-full mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}></Pagination>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </MainScreenWrapper>
  )
}

export default Health
