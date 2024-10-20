import React from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../../components/UI/Button/PrimaryButton'
import SecondaryButton from '../../components/UI/Button/SecondaryButton'

const Question = ({ item, index, open }) => {
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div
      key={index}
      className="relative bg-white dark:bg-bgBlack flex flex-col w-[100%] px-5 py-4 border-2 rounded-standard group dark:border-bgBlack border-WhiteSec">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-White/40 text-Black/40">
              {t('Form_question')}
            </p>
            <p className="text-base font-bold mobileL:text-base ">
              {item.Question}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold dark:text-White/40 text-Black/40">
              {t('Form_analytics_responsetype')}
            </p>
            <p className="text-base font-bold mobileL:text-base ">
              {item.isOption ? 'Option' : 'Text'}
            </p>
          </div>
        </div>

        {item.isOption ? (
          item.Options.map((x, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-0 justify-between">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">
                    {x.value}
                  </span>
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">{`${x.percentage}%`}</span>
                </div>

                <div className="w-full bg-bgWhiteSec rounded-full h-2.5 dark:bg-dBlack">
                  <div
                    className="bg-Blue/60 h-2.5 rounded-full"
                    style={{ width: `${x.percentage}%` }}
                  />
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0 justify-between">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">
                    {t('Form_analytics_sentiment_positive')}
                  </span>
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">{`${item.Sentiment.positive}%`}</span>
                </div>

                <div className="w-full bg-bgWhiteSec rounded-full h-2.5 dark:bg-dBlack">
                  <div
                    className="bg-Green/40 h-2.5 rounded-full"
                    style={{ width: `${item.Sentiment.positive}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0 justify-between">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">
                    {t('Form_analytics_sentiment_neutral')}
                  </span>
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">{`${item.Sentiment.neutral}%`}</span>
                </div>

                <div className="w-full bg-bgWhiteSec rounded-full h-2.5 dark:bg-dBlack">
                  <div
                    className="bg-customGray/40 h-2.5 rounded-full"
                    style={{ width: `${item.Sentiment.neutral}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0 justify-between">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">
                    {t('Form_analytics_sentiment_negative')}
                  </span>
                  <span className="text-sm font-medium dark:text-White/90 text-Black/90">{`${item.Sentiment.negative}%`}</span>
                </div>

                <div className="w-full bg-bgWhiteSec rounded-full h-2.5 dark:bg-dBlack">
                  <div
                    className="bg-Red/40 h-2.5 rounded-full"
                    style={{ width: `${item.Sentiment.negative}%` }}
                  />
                </div>
              </div>
            </div>

            <SecondaryButton
              handleClick={() => open(index)}
              text={t('Form_analytics_viewresponses')}
              size="small"
              width="fit"
              className="pt-5"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Question
