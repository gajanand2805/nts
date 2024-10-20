import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'
import HealthAnalytics from '../components/Health/HealthAnalytics'
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
  const d = new Date()
  const [month, setMonth] = useState(d.getMonth() + 1)
  const [year, setYear] = useState(d.getFullYear())

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()

  const [data, setdata] = useState({ Errors: [] })
  const [graph, setgraph] = useState({
    Total_api_graph: { total_api_arr: [] },
    Error_success_graph: { success: [], error: [] },
  })

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
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Health?month=${month}&year=${year}&page=${currentPage}`,
              config
            )
            .catch((err) => wrapper(err.response))
          setdata(res.data?.Data)
          setgraph(res.data?.Graph_Data)
          setCurrentPage(res.data?.Data.Current_Page)
          setTotalPages(res.data?.Data.Total_Pages)
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }
      }
      getHealthData()
    }
  }, [month, year, currentPage, isAccessToken])

  function handleChange(e) {
    const { value } = e.target
    const arr = value.split('-')
    setYear(parseInt(arr[0]))
    setMonth(parseInt(arr[1]))
  }

  return (
    <MainScreenWrapper screenHeader={t('Health_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col w-full gap-4 pb-9 pt-2">
          <HealthAnalytics
            rate={data.Success_Rate}
            graph={graph}
            setYear={setYear}
            setMonth={setMonth}
            month={month}
            year={year}
          />
          {data.Errors.map((item, i) => {
            return (
              <>
                <div
                  key={i}
                  className="flex flex-col relative rounded-lg group border-[2px] ease-in gap-1 p-3 tabletM:px-5 dark:border-bgBlack border-WhiteSec bg-white cursor-pointer transition-all duration-300 dark:bg-bgBlack  w-full justify-between">
                  <div className="grid grid-cols-2 tabletM:grid-cols-3 gap-2 w-full justify-start">
                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Health_statusanalytics_responsecode')}
                      </p>
                      <p className="font-bold">{item.Response_Code}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Health_statusanalytics_date')}
                      </p>
                      <p className="text-xs font-bold">
                        {item.Trigger.split(' ')[0]}
                      </p>
                      <p className="text-xs font-bold">
                        {item.Trigger.split(' ')[1]}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70 ">
                        {t && t('Health_statusanalytics_description')}
                      </p>
                      <p className="text-xs font-bold">{item.Description}</p>
                    </div>
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
    </MainScreenWrapper>
  )
}

export default Health
