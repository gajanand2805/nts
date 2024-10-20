import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCheck } from 'react-icons/bi'
import { MdClose, MdLocalGroceryStore } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
const CartModal = ({ res, open, buy }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [load, setload] = useState(false)
  const [conversationArray, setConversationArray] = useState([])
  const { getCookie, isAccessToken } = useGlobalAuthContext()

  res.sort((a, b) => {
    return a.Power - b.Power
  })

  function packet(index, type, name, features, cost, currency) {
    const arr = {
      Subscription: [
        { key: 'Agents', value: 'Subscription_subscription_agents' },
        {
          key: 'Invoice_Website',
          value: 'Subscription_subscription_invoicewebsite',
        },
        {
          key: 'Invoice_Social_Media',
          value: 'Subscription_subscription_invoicesocialmedia',
        },
        {
          key: 'Quick_Message',
          value: 'Subscription_subscription_quickmessage',
        },
        {
          key: 'Agent_Feedback',
          value: 'Subscription_subscription_agentfeedback',
        },
        { key: 'Survey', value: 'Subscription_subscription_surveyform' },
      ],
      Addon: [{ key: 'Sessions', value: 'Subscription_subscription_sessions' }],

      Upgrade: [
        { key: 'Agents', value: 'Subscription_subscription_agents' },
        {
          key: 'Invoice_Website',
          value: 'Subscription_subscription_invoicewebsite',
        },
        {
          key: 'Invoice_Social_Media',
          value: 'Subscription_subscription_invoicesocialmedia',
        },
        {
          key: 'Quick_Message',
          value: 'Subscription_subscription_quickmessage',
        },
        {
          key: 'Agent_Feedback',
          value: 'Subscription_subscription_agentfeedback',
        },
        { key: 'Survey', value: 'Subscription_subscription_surveyform' },
      ],
    }

    const validity = {
      Subscription: 'Subscription_validity_Subscription',
      Addon: 'Subscription_validity_Addon',
      Upgrade: 'Subscription_validity_Upgrade',
    }

    return (
      <div
        key={index}
        className={`flex flex-col  items-center justify-start w-full ${type === 'Addon' && "min-w-[250px]"}  h-full border-2 border-Blue gap-5 bg-white dark:bg-dBlack p-7 rounded-standard`}>
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <p className="text-lg font-bold text-BlackSec">{name}</p>
            {/* <div className="flex items-end gap-1">
              <p className="text-xl font-bold">{cost}</p>
              <p className="pb-1 text-xs font-semibold">{currency}</p>
            </div> */}

            <div className="flex items-end gap-1">
              <p className="font-bold text-md opacity-60">
                {t(validity[type])}
              </p>
              <p className="pb-1 text-xs font-semibold opacity-60">
                {t('Subscription_subscription_validity')}*
              </p>
            </div>

            {type === "Subscription" && <div
              className={`${type == 'Subscription' || type == 'Upgrade' ? 'flex' : 'hidden'
                } flex-col items-start gap-0`}>
              <p className="font-bold text-md opacity-60">{features.Sessions}</p>
              <p className="pb-1 text-xs font-semibold opacity-60">
                {t('Subscription_free_sessions')}
              </p>
            </div>}
          </div>
        </div>

        <div className="grid justify-between w-full grid-cols-1 gap-2 tabletM:grid-cols-1">
          {/* {arr[type].map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2">
                <p
                  className={`p-0 text-md text-white rounded ${features[item.key] ? 'bg-Blue/60' : 'bg-Red/60'
                    }`}>
                  {features[item.key] ? <BiCheck /> : <MdClose />}
                </p>
                <p className="text-sm font-semibold">
                  {item.key == 'Agents' || item.key == 'Sessions'
                    ? features[item.key] + ' ' + t(item.value)
                    : t(item.value)}
                </p>
              </div>
            )
          })} */}
          {Object.entries(features).map(([key, value]) => {
            return (
              <div
                key={key}
                className="flex items-center gap-2">
                <p
                  className={`p-0 text-md text-white rounded ${value ? 'bg-Blue/60' : 'bg-Red/60'
                    }`}>
                  {value ? <BiCheck /> : <MdClose />}
                </p>
                <p className="text-sm font-semibold">
                  {value !== true && value !== false
                    ? value + ' ' + key.split("_").join(" ")
                    : key.split("_").join(" ")}
                </p>
              </div>
            )
          })}
        </div>

        <PrimaryButton
          //handleClick={() => buy(name) }
          text=<div className="flex items-center gap-2">
            {t('landing_services_contact')}
          </div>
          size="small"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[90%] mt-2 gap-0  max-w-[800px] items-center justify-center shadow-xl border-0 border-Blue rounded-xl z-10">
      <div className="flex items-center justify-between w-full gap-4 px-4 py-4 text-white rounded-t-lg bg-Blue ">
        <p className="flex items-center gap-4 font-bold">
          <MdLocalGroceryStore className="text-2xl " />{' '}
          {t('Subscription_Store')}
        </p>
        <div
          onClick={() => open(false)}
          className="flex items-center justify-between h-full cursor-pointer">
          <RiCloseCircleFill className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col w-full text-[15px]">
        <div className=" h-[80vh] flex flex-col justify-start tabletM:justify-center items-center  tabletM:flex-row gap-6 p-6   rounded-b-xl  bg-bgWhiteSec dark:bg-bgBlack">
          <div className="w-full max-w-full flex flex-col justify-start   tabletM:flex-row  gap-6 overflow-x-scroll ">

            {res.map((item, index) => {
              return packet(
                index,
                item.Type,
                item.Name,
                item.Features,
                item.Cost,
                item.Currency
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal
