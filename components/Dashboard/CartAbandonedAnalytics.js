import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillSendCheckFill, BsFillSendXFill } from 'react-icons/bs'
import { HiCursorClick } from 'react-icons/hi'
import { IoSend } from 'react-icons/io5'
import { MdPending } from 'react-icons/md'
import DateSelect from '../UI/DateSelect'
import { InfoButton } from '../UI/InfoButton'
import graphDec from './assets/graphDec.svg'
import graphInc from './assets/graphInc.svg'
const CartAbandonedAnalytics = ({
  abandonData,
  setMonth,
  setYear,
  month,
  year,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col w-full gap-6 p-4 bg-white dark:bg-bgBlack rounded-standard tabletM:p-7">
      <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
        <p className="text-xl font-bold">
          {t('Dashboard_cartabandoned_analytics_heading')}
        </p>
        {abandonData?.service === true && (
          <DateSelect
            setmonth={setMonth}
            setyear={setYear}
            month={month}
            year={year}
          />
        )}
      </div>

      {abandonData?.service === true ? (
        <div className="flex flex-col w-full h-full gap-4 laptop:flex-row">
          <div className="flex flex-col w-full h-full gap-4">
            {/*  */}
            <div className="flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-4 h-[120px]">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-BlackSec">
                    {t('Dashboard_abandonedcart_analytics_sent')}
                  </p>
                  <InfoButton
                    text={t('Dashboard_abandonedcart_analytics_sent_info')}
                  />
                </div>
                <p className="text-3xl text-blue-500">
                  <IoSend className="-rotate-45" />
                </p>
              </div>

              <div className="flex items-center justify-between w-full">
                <p className="text-xl font-bold">{abandonData?.data?.sent}</p>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-bold ${
                      abandonData?.data?.percentage_sent >= 0
                        ? 'text-Green'
                        : 'text-Red'
                    }`}>
                    {abandonData?.data?.percentage_sent}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        abandonData?.data?.percentage_sent >= 0
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
            <div className="flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-4 h-[120px]">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-BlackSec">
                    {t('Dashboard_abandonedcart_analytics_delivered')}
                  </p>
                  <InfoButton
                    text={t('Dashboard_abandonedcart_analytics_delivered_info')}
                  />
                </div>
                <p className="text-3xl text-yellow-500">
                  <MdPending />
                </p>
              </div>

              <div className="flex items-center justify-between w-full">
                <p className="text-xl font-bold">
                  {abandonData?.data?.delivered}
                </p>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-bold ${
                      abandonData?.data?.percentage_delivered >= 0
                        ? 'text-Green'
                        : 'text-Red'
                    }`}>
                    {abandonData?.data?.percentage_delivered}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        abandonData?.data?.percentage_delivered >= 0
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
          <div className="flex flex-col w-full h-full gap-4">
            {/*  */}
            <div className="flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-4 h-[120px]">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-BlackSec">
                    {t('Dashboard_abandonedcart_analytics_seen')}
                  </p>
                  <InfoButton
                    text={t('Dashboard_abandonedcart_analytics_seen_info')}
                  />
                </div>
                <p className="text-3xl text-green-500">
                  <BsFillSendCheckFill />
                </p>
              </div>

              <div className="flex items-center justify-between w-full">
                <p className="text-xl font-bold">{abandonData?.data?.read}</p>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-bold ${
                      abandonData?.data?.percentage_read >= 0
                        ? 'text-Green'
                        : 'text-Red'
                    }`}>
                    {abandonData?.data?.percentage_read}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        abandonData?.data?.percentage_read >= 0
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
            <div className="flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-4 h-[120px]">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-BlackSec">
                    {t('Dashboard_abandonedcart_analytics_failed')}
                  </p>
                  <InfoButton
                    text={t('Dashboard_abandonedcart_analytics_failed_info')}
                  />
                </div>
                <p className="text-3xl text-red-500">
                  <BsFillSendXFill />
                </p>
              </div>

              <div className="flex items-center justify-between w-full">
                <p className="text-xl font-bold">{abandonData?.data?.failed}</p>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-bold ${
                      abandonData?.data?.percentage_failed >= 0
                        ? 'text-Green'
                        : 'text-Red'
                    }`}>
                    {abandonData?.data?.percentage_failed}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        abandonData?.data?.percentage_failed >= 0
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
          <div className="flex flex-col items-center gap-5 justify-between w-full  rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-4">
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_abandonedcart_analytics_clicks')}
                </p>
                <InfoButton
                  text={t('Dashboard_abandonedcart_analytics_clicks_info')}
                />
              </div>
              <p className="text-3xl text-orange-500">
                <HiCursorClick />
              </p>
            </div>
            <div className="flex items-center justify-center w-full">
              <p className="p-5 text-2xl font-bold rounded-3xl">
                {abandonData?.click_data?.percentage_clicks} %
              </p>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-xl font-bold">
                {abandonData?.click_data?.total_clicks_given_month}
              </p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-bold ${
                    abandonData?.click_data?.percentage_growth_clicks >= 0
                      ? 'text-Green'
                      : 'text-Red'
                  }`}>
                  {abandonData?.click_data?.percentage_growth_clicks}%
                </p>
                <div className="relative w-4">
                  <Image
                    src={
                      abandonData?.click_data?.percentage_growth_clicks >= 0
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
      ) : (
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="flex items-center justify-center gap-1.5 text-md font-medium opacity-70">
            <Link href="/subscription">
              <span className="font-semibold underline cursor-pointer">
                {t('Dashboard_abandonedcart_analytics_upgrade')}
              </span>
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default CartAbandonedAnalytics
