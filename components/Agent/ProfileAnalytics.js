import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DateSelect from '../UI/DateSelect'
import { InfoButton } from '../UI/InfoButton'
import walletSvg from './assets/delivered.svg'
import graphDec from './assets/graphDec.svg'
import graphInc from './assets/graphInc.svg'
import queriesSvg from './assets/queries.svg'
import updatesSvg from './assets/updates.svg'

import { useGlobalAuthContext } from '../../AuthContext'
import LineChart from './LineChart'

const ProfileAnalytics = ({
  name,
  email,
  convos,
  logs,
  month,
  year,
  setMonth,
  setYear,
}) => {
  const { t } = useTranslation()
  const { selectedLang } = useGlobalAuthContext()
  const [toggle, settoggle] = useState(true)
  return (
    <div className="flex flex-col justify-between w-full gap-8 p-4 bg-white dark:bg-bgBlack rounded-standard tabletM:p-7">
      <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
        <p className="text-xl font-bold">{t('Agents_profile_analytics')}</p>
        <DateSelect
          setmonth={setMonth}
          setyear={setYear}
          month={month}
          year={year}
        />
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5 dark:border-dBlack dark:bg-dBlack">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-4' : 'left-4'
              } top-4`}>
            <Image
              src={walletSvg}
              alt="wallet image"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-BlackSec">
                {t('Agents_profile_agent')}
              </p>
              <InfoButton text={t('Agents_profile_agent_info')} />
            </div>
            <p className="text-3xl font-bold">{name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm w-[70vw] tabletM:w-full overflow-auto font-semibold text-Green">
              {email}
            </p>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col items-start justify-start w-full gap-2 ">
          <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Agents_profile_conversation')}
                </p>
                <InfoButton text={t('Agents_profile_conversation_info')} />
              </div>
              <div className="flex gap-5">
                <p className="text-xl font-bold">
                  {convos.Total_Conversations}
                </p>

                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-semibold ${convos.percentage_Total_Conversations >= 0
                      ? 'text-Green'
                      : 'text-Red'
                      }`}>
                    {convos.percentage_Total_Conversations}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        convos.percentage_Total_Conversations >= 0
                          ? graphInc
                          : graphDec
                      }
                      alt="increasing graph"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Image
              src={queriesSvg}
              alt="increasing graph"
              objectFit="cover"
            />
          </div>

          <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Agents_profile_hours')}
                </p>
                <InfoButton text={t('Agents_profile_hours_info')} />
              </div>
              <div className="flex gap-5">
                <p className="text-xl font-bold">{logs.total_hours}</p>
              </div>
            </div>

            <Image
              src={updatesSvg}
              alt="increasing graph"
              objectFit="cover"
            />
          </div>
        </div>
        {/*  */}

        {/*  */}
        <div className="flex flex-col items-start justify-start w-full gap-2 ">
          <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Agents_profile_feedbacks')}
                </p>
                <InfoButton text={t('Agents_profile_feedbacks_info')} />
              </div>
              <div className="flex gap-5">
                <p className="text-xl font-bold">{convos.Total_Feedbacks}</p>

                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-semibold ${convos.percentage_Total_Feedbacks >= 0
                      ? 'text-Green'
                      : 'text-Red'
                      }`}>
                    {convos.percentage_Total_Feedbacks}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        convos.percentage_Total_Feedbacks >= 0
                          ? graphInc
                          : graphDec
                      }
                      alt="increasing graph"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Image
              src={updatesSvg}
              alt="increasing graph"
              objectFit="cover"
            />
          </div>

          <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Agents_profile_rating')}
                </p>
                <InfoButton text={t('Agents_profile_rating_info')} />
              </div>
              <div className="flex gap-5">
                <p className="text-xl font-bold">
                  {convos.Avg_feedback.toFixed(1)}/5.0
                </p>

                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-semibold ${convos.percentage_Avg_feedback >= 0
                      ? 'text-Green'
                      : 'text-Red'
                      }`}>
                    {convos.percentage_Avg_feedback}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        convos.percentage_Avg_feedback >= 0
                          ? graphInc
                          : graphDec
                      }
                      alt="increasing graph"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Image
              src={queriesSvg}
              alt="increasing graph"
              objectFit="cover"
            />
          </div>
        </div>
        {/*  */}
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 tabletM:flex-row">
        {/* CHART */}
        <div className="flex flex-col items-end w-full h-full gap-1 baisi-1/2">
          <div className="flex items-center gap-4">
            <div
              className={`flex cursor-pointer rounded-xl p-2 items-center gap-2`}>
              <div className="w-2 h-2 rounded-full bg-[#5784F7]" />
              <p className="text-sm">{t('Agents_profile_logs')}</p>
            </div>
          </div>
          <div className="w-full ">
            <LineChart
              data={logs.log_graph}
              label={'Hours'}
              color={'#5784F7'}
            />
          </div>
        </div>

        {/* CHART */}
        <div className="flex flex-col items-end w-full h-full gap-1 baisi-1/2">
          <div className="flex items-center gap-4">
            <div
              className={`flex cursor-pointer rounded-xl p-2 items-center gap-2`}>
              <div className="w-2 h-2 rounded-full bg-[#FEC53D]" />
              <p className="text-sm">{t('Agents_profile_conversation')}</p>
            </div>
          </div>
          <div className="w-full ">
            <LineChart
              data={convos.convo_graph}
              label={'Conversations'}
              color={'#FEC53D'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileAnalytics
