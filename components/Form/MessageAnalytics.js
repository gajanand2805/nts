import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import DateSelect from '../UI/DateSelect'
import { InfoButton } from '../UI/InfoButton'
import messageIcon from './assets/MessageBlue.svg'
import agentIcon from './assets/agent.svg'
import delIcon from './assets/del.svg'
import graphDec from './assets/graphDec.svg'
import graphInc from './assets/graphInc.svg'
import seenIcon from './assets/seen.svg'

const MessageAnalytics = ({ data, setMonth, setYear, month, year }) => {
  const { selectedLang } = useGlobalAuthContext()
  const [selectedDate, setSelectedDate] = useState({ month: 0, year: 2020 })
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-between w-full gap-4 bg-white dark:bg-bgBlack rounded-standard p-4 tabletM:p-7">
      <div className="flex flex-col gap-2 tabletM:flex-row justify-between w-full ">
        <p className="text-xl font-bold">
          {t('Form_analytics_survey_heading')}
        </p>
        <DateSelect
          setmonth={setMonth}
          setyear={setYear}
          month={month}
          year={year}
        />
      </div>

      <div className="flex flex-col tabletM:flex-row items-center justify-between w-full gap-4">
        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-3 `}>
            <Image
              src={messageIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Form_analytics_survey_total')}
            </p>
            <InfoButton text={t('Form_analytics_survey_total_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{data?.survey_analytics?.Total}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${data?.survey_analytics?.percentage_total >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {data?.survey_analytics?.percentage_total}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    data?.survey_analytics?.percentage_total >= 0
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

        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-3 `}>
            <Image
              src={messageIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Form_analytics_survey_sent')}
            </p>
            <InfoButton text={t('Form_analytics_survey_sent_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{data?.survey_analytics?.sent}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${data?.survey_analytics?.percentage_sent >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {data?.survey_analytics?.percentage_sent}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    data?.survey_analytics?.percentage_sent >= 0
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

        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-3 `}>
            <Image
              src={messageIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Form_analytics_survey_failed')}
            </p>
            <InfoButton text={t('Form_analytics_survey_failed_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">
              {data?.survey_analytics?.failed}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${data?.survey_analytics?.percentage_failed >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {data?.survey_analytics?.percentage_failed}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    data?.survey_analytics?.percentage_failed >= 0
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
      </div>

      <div className="flex flex-col tabletM:flex-row items-center justify-between w-full gap-4">
        {/*  */}
        <div className="relative flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-3 `}>
            <Image
              src={delIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Form_analytics_survey_delivered')}
            </p>
            <InfoButton text={t('Form_analytics_survey_delivered_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">
              {data?.survey_analytics?.delivered}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${data?.survey_analytics?.percentage_delivered >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {data?.survey_analytics?.percentage_delivered}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    data?.survey_analytics?.percentage_delivered >= 0
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
        {/*  */}
        <div className="relative flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-3 `}>
            <Image
              src={seenIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Form_analytics_survey_seen')}
            </p>
            <InfoButton text={t('Form_analytics_survey_seen_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{data?.survey_analytics?.read}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${data?.survey_analytics?.percentage_read >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {data?.survey_analytics?.percentage_read}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    data?.survey_analytics?.percentage_read >= 0
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
        {/*  */}

        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-3 `}>
            <Image
              src={agentIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Form_analytics_survey_taken')}
            </p>
            <InfoButton text={t('Form_analytics_survey_taken_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">
              {data?.response_analytics?.Taken}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${data?.response_analytics?.percentage_taken >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {data?.response_analytics?.percentage_taken}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    data?.response_analytics?.percentage_taken >= 0
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
      </div>
    </div>
  )
}

export default MessageAnalytics
