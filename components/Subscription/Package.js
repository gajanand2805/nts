import React from 'react'
import { RiCoinFill } from 'react-icons/ri'
import { GiTwoCoins } from 'react-icons/gi'
import { FaCoins } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import { BsPlusLg } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
const PRICING_FEATURES = [
  {
    Name: 'Diamond',

    Icon: <FaCoins className="text-2xl" />,
    Cost: '400',
    Features: {
      Invoice_Website: true,
      Invoice_Social_Media: true,
      Quick_Message: true,
      Agent_Feedback: true,
      Add_Agents: 1000,
      Tokens: 2500,
    },
  },
  {
    Name: 'Silver',
    Icon: <GiTwoCoins className="text-2xl" />,
    Cost: '300',
    Features: {
      Invoice_Website: true,
      Invoice_Social_Media: false,
      Quick_Message: false,
      Agent_Feedback: false,
      Add_Agents: 5,
      Tokens: 1000,
    },
  },
  {
    Name: 'Bronze',
    Icon: <RiCoinFill className="text-2xl" />,
    Cost: '200',
    Features: {
      Invoice_Website: false,
      Invoice_Social_Media: false,
      Quick_Message: false,
      Agent_Feedback: false,
      Add_Agents: 2,
      Tokens: 1000,
    },
  },
]

const Package = ({ subscriptionData }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2 px-6 py-6 dark:bg-bgBlack bg-white rounded-xl">
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex flex-col item-start">
          <div className={`flex items-center gap-6 text-2xl font-black `}>
            <p> {subscriptionData.Package}</p>
          </div>
          <p className="text-sm font-semibold dark:text-White text-Black opacity-70">
            {t && t('Package')}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex flex-col items-center w-full mt-10 laptop:flex-row">
          {PRICING_FEATURES.map((feature, i) => {
            return (
              feature.Name === subscriptionData.Package && (
                // <div
                //   key={i}
                //   className="flex flex-col px-6 py-10 mx-auto gap-7 group "
                // >
                <div className="flex flex-col items-start w-56 gap-2">
                  <p className="flex items-center gap-2 opacity-80">
                    <FaCheck className="text-green-700 dark:text-green-400 font-2xl" />
                    {t && t('Add_Agents')} - {subscriptionData.Features.Agents}
                  </p>
                  <p className="flex items-center gap-2 opacity-80">
                    <FaCheck className="text-green-700 dark:text-green-400 font-2xl" />
                    {t && t('Tokens')} - {subscriptionData.Features.Tokens}
                  </p>
                  <p className="flex items-center gap-2 opacity-80">
                    {subscriptionData.Features.Invoice_Website ? (
                      <FaCheck className="text-green-700 dark:text-green-400 font-2xl" />
                    ) : (
                      <BsPlusLg className="text-lg text-red-700 rotate-45 dark:text-red-500 font-2xl" />
                    )}
                    {t && t('Invoice_Website')}
                  </p>
                  <p className="flex items-center gap-2 opacity-80">
                    {subscriptionData.Features.Invoice_Social_Media ? (
                      <FaCheck className="text-green-700 dark:text-green-400 font-2xl" />
                    ) : (
                      <BsPlusLg className="text-lg text-red-700 rotate-45 dark:text-red-500 font-2xl" />
                    )}
                    {t && t('Invoice_Social_Media')}
                  </p>
                  <p className="flex items-center gap-2 opacity-80">
                    {subscriptionData.Features.Quick_Message ? (
                      <FaCheck className="text-green-700 dark:text-green-400 font-2xl" />
                    ) : (
                      <BsPlusLg className="text-lg text-red-700 rotate-45 dark:text-red-500 font-2xl" />
                    )}
                    {t && t('Quick_Message')}
                  </p>
                  <p className="flex items-center gap-2 opacity-80">
                    {subscriptionData.Features.Agent_Feedback ? (
                      <FaCheck className="text-green-700 dark:text-green-400 font-2xl" />
                    ) : (
                      <BsPlusLg className="text-lg text-red-700 rotate-45 dark:text-red-500 font-2xl" />
                    )}
                    {t && t('Agent_Feedback')}
                  </p>
                </div>
                // </div>
              )
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Package
