import React from 'react'
import { useState } from 'react'
import DateSelect from '../UI/DateSelect'
import graphInc from './assets/graphInc.svg'
import graphDec from './assets/graphDec.svg'
import Image from 'next/image'
import walletSvg from './assets/delivered.svg'
import moneySvg from './assets/money.svg'
import updatesSvg from './assets/updates.svg'
import queriesSvg from './assets/queries.svg'
import { useTranslation } from 'react-i18next'
import ProgressBar from './ProgressBar'
import BarChart from './BarChart'
import LineChart from './LineChart'
import { useGlobalAuthContext } from '../../AuthContext'

const HealthAnalytics = ({ rate, graph, month, year, setMonth, setYear }) => {
  const { selectedLang } = useGlobalAuthContext()
  const [toggle, settoggle] = useState(true)
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col tabletM:flex-row  gap-4">
        <div className="flex flex-col basis-2/3 items-center justify-between w-full gap-5 bg-white dark:bg-bgBlack rounded-standard p-4 tabletM:p-7">
          <div className="flex flex-col gap-2 tabletM:flex-row justify-between w-full ">
            <p className="text-lg font-bold"> {t('Health_apicalls')} </p>
            <DateSelect
              setmonth={setMonth}
              setyear={setYear}
              month={month}
              year={year}
            />
          </div>
          <div className="w-[100%] h-[100%]">
            <LineChart
              data={graph.Total_api_graph}
              label={'API '}
              color={'#5784F7'}
            />
          </div>
        </div>

        <div className="flex flex-col basis-1/3 items-center justify-between w-full gap-2 bg-white dark:bg-bgBlack rounded-standard p-4 tabletM:p-7">
          <div className="flex flex-col gap-2 tabletM:flex-row justify-between w-full ">
            <p className="text-lg font-bold"> {t('Health_rateanalytics')} </p>
          </div>
          <ProgressBar
            progress={Math.round(rate)}
            label={t('Health_rateanalytics_successrate')}
            count={Math.round(rate)}
            showProgress={false}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-8 bg-white dark:bg-bgBlack rounded-standard p-4 tabletM:p-7">
        <div className="flex flex-col gap-2 tabletM:flex-row justify-between w-full ">
          <p className="text-lg font-bold"> {t('Health_statusanalytics')} </p>

          <div className="flex flex-col tabletM:flex-row items-start tabletM:items-center gap-4 pt-2">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00CE92]"></div>
                <p> {t('Health_statusanalytics_success')} </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#232361]"></div>
                <p> {t('Health_statusanalytics_errors')} </p>
              </div>
            </div>

            <DateSelect
              setmonth={setMonth}
              setyear={setYear}
              month={month}
              year={year}
            />
          </div>
        </div>
        <div className="w-full">
          <BarChart data={graph.Error_success_graph} />
        </div>
      </div>
    </div>
  )
}

export default HealthAnalytics
