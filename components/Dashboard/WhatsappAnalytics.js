import React from 'react'
import { useTranslation } from 'react-i18next'
import { InfoButton } from '../UI/InfoButton'

const WhatsappAnalytics = ({
  conversation,
}) => {

  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-between w-full gap-4 p-4 bg-white dark:bg-bgBlack rounded-md tabletM:p-7">

      <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">

        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-black text-sm">
                WhatsApp Business API Status
              </p>
              <InfoButton
                className="text-black text-xs py-0"
                text={<div className='py-0 leading-4' style={{ fontSize: '10px' }}>{t('• WhatsApp Business API is now live!')}<br />{t('• 10000 Daily messaging limit.')}
                </div>
                }
              />

            </div>
            <button className="text-xs bg-green-500 px-3 py-1 text-white font-bold max-w-min rounded-xl mt-2">
              Live
            </button>
          </div>
        </div>

        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-black text-sm">
                Quality Rating
              </p>
              <InfoButton
                className="text-black text-xs py-0"
                text={<div className='py-0 leading-4' style={{ fontSize: '10px' }}>{t('Your WhatsApp Business Account’s quality rating (as assessed by WhatsApp) is High, as the messages that you have been sending to your customers in the last 7 days have been of good quality.')}<br />
                </div>
                }
              />
            </div>
            <button className="text-xs bg-green-500 px-3 py-1 text-white font-bold max-w-min rounded-xl mt-2">
              High
            </button>
          </div>
        </div>

        {/*  */}
        <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-black text-sm">
                Remaining Quota
              </p>
              <InfoButton
                className="text-black text-xs py-0"
                text={<div className='py-0 leading-4' style={{ fontSize: '10px' }}>{t('Number of unique users you can send template messages.')}
                </div>
                }
              />

            </div>
            <p className="text-xl font-bold">
              {conversation.RemainingQuota}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WhatsappAnalytics
