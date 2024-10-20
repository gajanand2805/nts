import React, { useState } from 'react'
import DateSelect from '../UI/DateSelect'
import Image from 'next/image'
import graphInc from './assets/graphInc.svg'
import graphDec from './assets/graphDec.svg'
import BarChart from './BarChart'
import deliveredIcon from './assets/delivered.svg'
import feedbackIcon from './assets/feedback.svg'
import ratingIcon from './assets/rating.svg'
import { InfoButton } from '../UI/InfoButton'
import { useTranslation } from 'react-i18next'

const FeedbackAnalytics = ({
  feedback,
  feedback_graph_data,
  setMonth,
  setYear,
  month,
  year,
}) => {
  const [selectedDate, setSelectedDate] = useState({ month: 0, year: 2020 })
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-between w-full gap-8 bg-white dark:bg-bgBlack rounded-standard p-4 tabletM:p-7">
      <div className="flex flex-col gap-2 tabletM:flex-row justify-between w-full ">
        <p className="text-xl font-bold">
          {t('Dashboard_feedback_analytics_heading')}
        </p>
        <div className="flex tabletM:hidden">
          <DateSelect
            setmonth={setMonth}
            setyear={setYear}
            month={month}
            year={year}
          />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00CE92]"></div>
            <p>{t('Dashboard_feedback_analytics_excellent')}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#667fa866]"></div>
            <p>{t('Dashboard_feedback_analytics_average')}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F93C65]"></div>
            <p>{t('Dashboard_feedback_analytics_unsatisfied')}</p>
          </div>
          <div className="hidden tabletM:flex">
            <DateSelect
              setmonth={setMonth}
              setyear={setYear}
              month={month}
              year={year}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col tabletM:flex-row items-start justify-center w-full gap-4">
        <div className="flex flex-col items-center justify-center w-full gap-2 basis-1/3">
          <div className="border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer w-full px-4 py-2 gap-5 rounded-[10px] flex flex-col items-start justify-center">
            <div className="flex justify-between w-full gap-5">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_feedback_analytics_delivered')}
                </p>
                <InfoButton
                  text={t('Dashboard_feedback_analytics_delivered_info')}
                />
              </div>
              <Image
                src={deliveredIcon}
                alt="wallet image"
              />
            </div>
            <div className="flex justify-between w-full gap-5">
              <p className="text-lg font-bold">{feedback.Total_Delivered}</p>

              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-semibold ${
                    feedback.total_delivered_growth >= 0
                      ? 'text-Green'
                      : 'text-Red'
                  }`}>
                  {feedback.total_delivered_growth}%
                </p>
                <div className="relative w-4">
                  <Image
                    src={
                      feedback.total_delivered_growth >= 0 ? graphInc : graphDec
                    }
                    alt="increasing graph"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer w-full px-4 py-2 gap-5 rounded-[10px] flex flex-col items-start justify-center">
            <div className="flex justify-between w-full gap-5">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_feedback_analytics_feedbacks')}
                </p>
                <InfoButton
                  text={t('Dashboard_feedback_analytics_feedbacks_info')}
                />
              </div>
              <Image
                src={feedbackIcon}
                alt="wallet image"
              />
            </div>
            <div className="flex justify-between w-full gap-5">
              <p className="text-lg font-bold">{feedback.Total_Feedbacks}</p>

              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-semibold ${
                    feedback.percentage_Total_Feedbacks >= 0
                      ? 'text-Green'
                      : 'text-Red'
                  }`}>
                  {feedback.percentage_Total_Feedbacks}%
                </p>
                <div className="relative w-4">
                  <Image
                    src={
                      feedback.percentage_Total_Feedbacks >= 0
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

          <div className="border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer w-full px-4 py-2 gap-5 rounded-[10px] flex flex-col items-start justify-center">
            <div className="flex justify-between w-full gap-5">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-BlackSec">
                  {t('Dashboard_feedback_analytics_rating')}
                </p>
                <InfoButton
                  text={t('Dashboard_feedback_analytics_rating_info')}
                />
              </div>
              <Image
                src={ratingIcon}
                alt="wallet image"
              />
            </div>
            <div className="flex justify-between w-full gap-5">
              <p className="text-lg font-bold">{feedback.Avg_feedback} / 5.0</p>

              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-semibold ${
                    feedback.percentage_Avg_Feedback >= 0
                      ? 'text-Green'
                      : 'text-Red'
                  }`}>
                  {feedback.percentage_Avg_Feedback}%
                </p>
                <div className="relative w-4">
                  <Image
                    src={
                      feedback.percentage_Avg_Feedback >= 0
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

        <div className="flex flex-col items-center justify-center w-full h-full baisi-2/3">
          {/* <div className="w-full "> */}
          <BarChart data={feedback_graph_data} />
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default FeedbackAnalytics
