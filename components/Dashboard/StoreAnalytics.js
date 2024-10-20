import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import DateSelect from '../UI/DateSelect'
import { InfoButton } from '../UI/InfoButton'
import LineChart from './LineChart'
import ProgressBar from './ProgressBar'
import graphDec from './assets/graphDec.svg'
import graphInc from './assets/graphInc.svg'
import moneySvg from './assets/money.svg'
import queriesSvg from './assets/queries.svg'
import updatesSvg from './assets/updates.svg'
import walletSvg from './assets/wallet.svg'

const StoreAnalytics = ({
  conversation,
  order_graph_data,
  setMonth,
  setYear,
  month,
  year,
}) => {
  const { selectedLang } = useGlobalAuthContext()
  const [toggle, settoggle] = useState(true)
  const { t } = useTranslation()

  return (
    <>
      {/* -------- */}
      <div className="flex flex-col justify-between w-full gap-4 p-4 bg-white dark:bg-bgBlack rounded-standard tabletM:p-7">
        <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
          <p className="text-xl font-bold">
            {t('Dashboard_store_analytics_heading')}
          </p>
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
              className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
                } top-2`}>
              <Image
                src={walletSvg}
                alt="wallet image"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_store_analytics_usage')}
                </p>
                <InfoButton text={t('Dashboard_store_analytics_usage_info')} />
              </div>
              <div className="flex flex-row items-end gap-2">
                <p className="text-3xl font-bold">{conversation.Usage}</p>
                <p className="pb-1 text-xs font-bold">
                  {t('Dashboard_store_analytics_sessions')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-semibold ${conversation.percentage_usage >= 0 ? 'text-Green' : 'text-Red'
                    }`}>
                  {conversation.percentage_usage}%
                </p>
                <div className="relative w-4">
                  <Image
                    src={conversation.percentage_usage >= 0 ? graphInc : graphDec}
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
                } top-2`}>
              <Image
                src={moneySvg}
                alt="wallet_image"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_store_analytics_invoice')}
                </p>
                <InfoButton text={t('Dashboard_store_analytics_invoice_info')} />
              </div>
              <p className="text-3xl font-bold">{conversation.Invoice_Message}</p>
            </div>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${conversation.invoice_growth >= 0 ? 'text-Green' : 'text-Red'
                  }`}>
                {conversation.invoice_growth}%
              </p>
              <div className="relative w-4">
                <Image
                  src={conversation.invoice_growth >= 0 ? graphInc : graphDec}
                  alt="increasing graph"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div className="flex flex-col items-start justify-start w-full gap-2 ">
            <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-BlackSec">
                    {t('Dashboard_store_analytics_updates')}
                  </p>
                  <InfoButton
                    text={t('Dashboard_store_analytics_updates_info')}
                  />
                </div>

                <div className="flex gap-5">
                  <p className="text-xl font-bold">
                    {conversation.Status_Message}
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-semibold ${conversation.status_growth >= 0
                        ? 'text-Green'
                        : 'text-Red'
                        }`}>
                      {conversation.status_growth}%
                    </p>
                    <div className="relative w-4">
                      <Image
                        src={
                          conversation.status_growth >= 0 ? graphInc : graphDec
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
                    {t('Dashboard_store_analytics_queries')}
                  </p>
                  <InfoButton
                    text={t('Dashboard_store_analytics_queries_info')}
                  />
                </div>
                <div className="flex gap-5">
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
          <div className="flex flex-col items-center w-full basis-1/3 rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5 gap-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_store_analytics_wallet')}
                </p>
                <InfoButton text={t('Dashboard_store_analytics_wallet_info')} />
              </div>
            </div>

            <div className="flex flex-row items-end justify-start w-full gap-2">
              <p className="text-3xl font-bold">{conversation.Wallet}</p>
              <p className="pb-1 text-xs font-bold">
                {t('Dashboard_store_analytics_sessions')}
              </p>
              <div className="pb-1">
                <InfoButton text={t('Dashboard_store_analytics_token_info')} />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-2 scale-90">
              <ProgressBar
                progress={conversation.session_percentage}
                count={conversation.sessions_available}
                showProgress={false}
              />
              <p className="flex flex-row gap-2 text-xs font-semibold text-Green">
                {t('Dashboard_store_analytics_free_sessions')}
                <InfoButton text={t('Dashboard_store_analytics_stoken_info')} />
              </p>
            </div>
          </div>

          <div className="flex flex-col tabletM:flex-row items-center w-full basis-2/3 rounded-[10px] tabletM:border-[1px] dark:border-bgBlack border-BlackTer tabletM:p-5 gap-2">
            <div className="flex flex-col items-center justify-center w-full gap-3 basis-1/3 ">
              <div className="w-full border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer px-4 py-2 rounded-[10px] flex flex-col items-start justify-center">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-BlackSec">
                    {t('Dashboard_store_analytics_prepaid')}
                  </p>
                </div>
                <div className="flex justify-between w-full gap-5">
                  <p className="text-lg font-bold">
                    {conversation.Prepaid_method}
                  </p>

                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-semibold ${conversation.precentage_prepaid >= 0
                        ? 'text-Green'
                        : 'text-Red'
                        }`}>
                      {conversation.precentage_prepaid}%
                    </p>
                    <div className="relative w-4">
                      <Image
                        src={
                          conversation.precentage_prepaid >= 0
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
              <div className="w-full border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer px-4 py-2 rounded-[10px] flex flex-col items-start justify-center">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-BlackSec">
                    {t('Dashboard_store_analytics_postpaid')}
                  </p>
                </div>
                <div className="flex justify-between w-full gap-5">
                  <p className="text-lg font-bold">
                    {conversation.Postpaid_method}
                  </p>

                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-semibold ${conversation.percentage_postpaid >= 0
                        ? 'text-Green'
                        : 'text-Red'
                        }`}>
                      {conversation.percentage_postpaid}%
                    </p>
                    <div className="relative w-4">
                      <Image
                        src={
                          conversation.percentage_postpaid >= 0
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
              <div className="w-full border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer px-4 py-2 rounded-[10px] flex flex-col items-start justify-center">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-BlackSec">
                    {t('Dashboard_store_analytics_undefined')}
                  </p>
                </div>
                <div className="flex justify-between w-full gap-5">
                  <p className="text-lg font-bold">{conversation.None_method}</p>

                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-semibold ${conversation.percentage_None_method >= 0
                        ? 'text-Green'
                        : 'text-Red'
                        }`}>
                      {conversation.percentage_None_method}%
                    </p>
                    <div className="relative w-4">
                      <Image
                        src={
                          conversation.percentage_None_method >= 0
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

            {/* CHART */}
            <div className="flex flex-col items-end w-full h-full gap-1 baisi-2/3">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => settoggle(true)}
                  className={`flex cursor-pointer rounded-xl p-2 ${toggle ? 'bg-bgWhiteSec dark:bg-dBlack' : 'bg-transparent'
                    } items-center gap-2`}>
                  <div className="w-2 h-2 rounded-full bg-[#5784F7]" />
                  <p className="text-sm">
                    {t('Dashboard_store_analytics_orders')}
                  </p>
                </div>

                <div
                  onClick={() => settoggle(false)}
                  className={`flex cursor-pointer rounded-xl p-2 ${!toggle ? 'bg-bgWhiteSec dark:bg-dBlack' : 'bg-transparent'
                    } items-center gap-2`}>
                  <div className="w-2 h-2 rounded-full bg-[#FEC53D]" />
                  <p className="text-sm">
                    {t('Dashboard_store_analytics_revenue')}
                  </p>
                </div>
              </div>
              <div className="w-full h-full ">
                <LineChart
                  data={order_graph_data}
                  toggle={toggle}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
          {/*  */}
          <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_store_analytics_orders')}
                </p>
                <InfoButton text={t('Dashboard_store_analytics_orders_info')} />
              </div>

              <div className="flex gap-5">
                <p className="text-xl font-bold">{conversation.Total_Orders}</p>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-semibold ${conversation.Percentage_Total_Orders >= 0
                      ? 'text-Green'
                      : 'text-Red'
                      }`}>
                    {conversation.Percentage_Total_Orders}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        conversation.Percentage_Total_Orders >= 0
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
              src={walletSvg}
              alt="increasing graph"
              objectFit="cover"
            />
          </div>

          <div className="flex items-center justify-between w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer py-2 px-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_store_analytics_revenue')}
                </p>
                <InfoButton text={t('Dashboard_store_analytics_revenue_info')} />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-row items-end gap-1 text-xl font-bold">
                  {conversation.Net_Rev.toFixed(2)}{' '}
                  <p className="text-sm font-semibold pb-[3px]">SAR</p>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-semibold ${conversation.percentage_net_rev >= 0
                      ? 'text-Green'
                      : 'text-Red'
                      }`}>
                    {conversation.percentage_net_rev}%
                  </p>
                  <div className="relative w-4">
                    <Image
                      src={
                        conversation.percentage_net_rev >= 0 ? graphInc : graphDec
                      }
                      alt="increasing graph"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Image
              src={moneySvg}
              alt="increasing graph"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreAnalytics
