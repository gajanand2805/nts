import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillCreditCard } from 'react-icons/ai'
import { BsChatDotsFill } from 'react-icons/bs'
import { useGlobalAuthContext } from '../../AuthContext'
import ToggleButton from '../ToggleButton'
import { InfoButton } from '../UI/InfoButton'
import SaudiFlag from './SA - Saudi Arabia.svg'
import USFlag from './US - United States.svg'

const TopSection = ({
  wallet,
  toggle_bot,
  toggle_language,
  bot_toggle,
  language,
  setLanguage,
  bot_loader,
  lang_loader,
  free,
}) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  //? context
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-between w-full gap-5 laptop:flex-row">
      <div className="flex flex-col items-center justify-center w-full gap-1 p-6 bg-white dark:bg-bgBlack rounded-standard">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <p className="text-lg font-semibold ">
              {t('Subscription_subscription_wallet')}
            </p>
            <InfoButton text={t('Subscription_subscription_wallet_info')} />
          </div>
          <p className="text-xl">
            <AiFillCreditCard />
          </p>
        </div>

        <div className="flex items-end justify-start w-full gap-2 text-2xl font-bold">
          {wallet}
          <p className="pb-1 text-sm">
            {t('Dashboard_store_analytics_sessions')}
          </p>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start w-full gap-1 text-sm font-bold text-Green">
            {free}
            <p className="text-xs">
              {t('Dashboard_store_analytics_free_sessions')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-4 p-6 bg-white dark:bg-bgBlack rounded-standard">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <p className="text-lg font-semibold ">
              {t('Subscription_subscription_chatbot')}
            </p>
            <InfoButton text={t('Subscription_subscription_chatbot_info')} />
          </div>
          <p className="text-xl">
            <BsChatDotsFill />
          </p>
        </div>
        <div className="flex justify-start w-full">
          <ToggleButton
            toggleHandler={() => toggle_bot()}
            toggleStatus={bot_toggle}
            isLoading={bot_loader}
            selectedLang={selectedLang}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-4 p-6 bg-white dark:bg-bgBlack rounded-standard">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <p className="text-lg font-semibold ">
              {t('Subscription_subscription_language')}
            </p>
            <InfoButton text={t('Subscription_subscription_language_info')} />
          </div>
        </div>
        <div className="relative flex justify-start w-full">
          <div className="flex items-center justify-between w-full font-semibold max-w-[230px]">
            <button
              onClick={async () => {
                setShowLangDropdown(false)
                setLanguage('en')
                await toggle_language('en')
              }}
              className={`flex items-center justify-center w-full border-[1px] rounded-l-xl py-1  gap-2 ${language === 'en'
                  ? 'bg-Blue text-white border-Blue'
                  : 'hover:bg-Blue/50 bg-transparent border-gray-400'
                }`}>
              <Image
                src={USFlag}
                alt="US Flag"
              />
              En
            </button>
            <button
              onClick={async () => {
                setShowLangDropdown(false)
                setLanguage('ar')
                await toggle_language('ar')
              }}
              className={`flex items-center justify-center w-full border-[1px] border-l-0 rounded-r-xl py-1 gap-2 ${language === 'ar'
                  ? 'bg-Blue text-white border-Blue'
                  : 'hover:bg-Blue/50 bg-transparent border-gray-400'
                }`}>
              <Image
                src={SaudiFlag}
                alt="Saudi Flag"
              />
              Hi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopSection
