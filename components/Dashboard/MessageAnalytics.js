import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import DateSelect from '../UI/DateSelect'
import { InfoButton } from '../UI/InfoButton'
import messageIcon from './assets/MessageBlue.svg'
import agentIcon from './assets/agent.svg'
import chatbotIcon from './assets/chatbot.svg'
import delIcon from './assets/del.svg'
import failedIcon from './assets/failed.svg'
import graphDec from './assets/graphDec.svg'
import graphInc from './assets/graphInc.svg'
import seenIcon from './assets/seen.svg'

const MessageAnalytics = ({
  convo_count,
  conversation,
  message_data,
  setMonth,
  setYear,
  month,
  year,
}) => {
  const { selectedLang } = useGlobalAuthContext()
  const [selectedDate, setSelectedDate] = useState({ month: 0, year: 2020 })
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-between w-full gap-6 p-4 bg-white dark:bg-bgBlack rounded-standard tabletM:p-7">
      <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
        <p className="text-xl font-bold">
          {t('Dashboard_message_analytics_heading')}
        </p>
        <DateSelect
          setmonth={setMonth}
          setyear={setYear}
          month={month}
          year={year}
        />
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 tabletM:flex-row">
        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-2 `}>
            <Image
              src={messageIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Dashboard_message_analytics_sent')}
            </p>
            <InfoButton text={t('Dashboard_message_analytics_sent_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{message_data.sent}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${message_data.percentage_sent >= 0 ? 'text-Green' : 'text-Red'
                  }`}>
                {message_data.percentage_sent}%
              </p>
              <div className="relative w-4">
                <Image
                  src={message_data.percentage_sent >= 0 ? graphInc : graphDec}
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
              } top-2 `}>
            <Image
              src={delIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Dashboard_message_analytics_delivered')}
            </p>
            <InfoButton
              text={t('Dashboard_message_analytics_delivered_info')}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{message_data.delivered}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${message_data.percentage_delivered >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {message_data.percentage_delivered}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    message_data.percentage_delivered >= 0 ? graphInc : graphDec
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
              } top-2 `}>
            <Image
              src={seenIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Dashboard_message_analytics_seen')}
            </p>
            <InfoButton text={t('Dashboard_message_analytics_seen_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{message_data.read}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${message_data.percentage_read >= 0 ? 'text-Green' : 'text-Red'
                  }`}>
                {message_data.percentage_read}%
              </p>
              <div className="relative w-4">
                <Image
                  src={message_data.percentage_read >= 0 ? graphInc : graphDec}
                  alt="increasing graph"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-4 tabletM:flex-row">
        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
          <div
            className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
              } top-2 `}>
            <Image
              src={failedIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Dashboard_message_analytics_failed')}
            </p>
            <InfoButton text={t('Dashboard_message_analytics_failed_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{message_data.failed}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${message_data.percentage_failed >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {message_data.percentage_failed}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    message_data.percentage_failed >= 0 ? graphInc : graphDec
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
              } top-2 `}>
            <Image
              src={chatbotIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Dashboard_message_analytics_chatbot')}
            </p>
            <InfoButton text={t('Dashboard_message_analytics_chatbot_info')} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">{conversation.Client_Query}</p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${conversation.percentage_client_query >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {conversation.percentage_client_query}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    conversation.percentage_client_query >= 0
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
              } top-2 `}>
            <Image
              src={agentIcon}
              alt="wallet image"
            />
          </div>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-BlackSec">
              {t('Dashboard_message_analytics_agent')}
            </p>
            <InfoButton text={t('Dashboard_message_analytics_agent_info')} />
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">
              {convo_count?.Total_attended}/{convo_count?.Total_Conversations}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${convo_count?.percentage_Total_attended >= 0
                    ? 'text-Green'
                    : 'text-Red'
                  }`}>
                {convo_count?.percentage_Total_attended}%
              </p>
              <div className="relative w-4">
                <Image
                  src={
                    convo_count?.percentage_Total_attended >= 0
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
      </div>
    </div>
  )
}

export default MessageAnalytics
