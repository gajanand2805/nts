import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'
import DeleteSvg from './assets/Delete.svg'

const QuickMessageModal = ({ onClose }) => {
  const { quickData, setQuickData, alert, setAlert } = useGlobalAgentContext()
  const { getCookie } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [addActive, setAddActive] = useState(false)
  const [quickMessageKey, setQuickMessageKey] = useState('')
  const [quickMessageValue, setQuickMessageValue] = useState('')
  const [isApiLoading, setIsApiLoading] = useState(false)
  const updateQuick = async (arr, isDelete = false) => {
    setAlert(null)
    setIsApiLoading(true)
    const data = arr
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/update_quick`,
        { Quick: data },
        config
      )
      if (!isDelete) {
        setAlert({ success: 'Agent_success_quick' })
        onClose()
      }
    } catch (err) {
      console.log(err)
      setAlert({ error: 'Agent_error_wrong' })
      onClose()
    } finally {
      setQuickMessageKey('')
      setQuickMessageValue('')
      setIsApiLoading(false)
    }
  }

  const deleteQuickHandler = async (i) => {
    //TODO: No error handling for delete quick message!

    const updatedQuickData = quickData
    updatedQuickData.splice(i, 1)
    setQuickData(updatedQuickData)
    updateQuick(updatedQuickData, true)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8  px-8 py-6 w-[90%] tabletM:w-full max-w-[400px] bg-white rounded-[10px] dark:bg-bgBlack">
      <div className="flex flex-col items-center justify-center gap-4">
        {addActive ? (
          <>
            <p className="text-xl font-bold">
              {' '}
              {t('Agents_icon_quickmessages_addquickmessage')}{' '}
            </p>
            <p className="opacity-90">
              {' '}
              {t('Agents_icon_quickmessages_addquickmessage_text')}{' '}
            </p>
          </>
        ) : (
          <>
            <p className="text-xl font-bold">
              {' '}
              {t('Agents_icon_quickmessages')}{' '}
            </p>
            <p className="opacity-90">{t('Agents_icon_quickmessages_text')}</p>
          </>
        )}
      </div>

      {/* Body Section */}

      {addActive ? (
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <Input
            label={t('Agents_icon_quickmessages_enterquickmessagekey')}
            placeholder={t(
              'Agents_icon_quickmessages_enterquickmessagekey_box'
            )}
            value={quickMessageKey}
            onChange={(e) => setQuickMessageKey(e.target.value)}
          />
          <Input
            label={t('Agents_icon_quickmessages_enterquickmessage')}
            placeholder={t('Agents_icon_quickmessages_enterquickmessage_box')}
            value={quickMessageValue}
            onChange={(e) => setQuickMessageValue(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {quickData.map((item, i) => {
            for (let key in item) {
              return (
                <div
                  key={i}
                  className={`px-4 py-2 flex justify-between bg-bgWhiteSec dark:bg-bgBlackSec rounded-[10px]  items-center w-full dark:border-White/10 border-Black/10`}>
                  <div>
                    <p className="text-lg font-bold">/{key}</p>
                    <p className="text-base italic">{item[key]}</p>
                  </div>
                  <button onClick={() => deleteQuickHandler(i)}>
                    <Image
                      src={DeleteSvg}
                      alt="delete agent"
                    />
                  </button>
                </div>
              )
            }
          })}
        </div>
      )}

      {/* Button Section */}
      {addActive ? (
        <div className="flex items-center justify-between w-full gap-2 ">
          <SecondaryButton
            text={t('cancel')}
            handleClick={() => setAddActive(false)}
          />
          <PrimaryButton
            isLoading={isApiLoading}
            disabled={isApiLoading}
            handleClick={() => {
              setQuickData((arr) => {
                const a = [...arr]
                a.push({
                  [quickMessageKey]: quickMessageValue,
                })
                updateQuick(a)
                return a
              })
            }}
            text={t('submit')}
          />
          {/* <SecondaryButton text="Close" /> */}
        </div>
      ) : (
        <div className="flex items-center justify-between w-full gap-2 ">
          <div>
            <SecondaryButton
              text="X"
              handleClick={onClose}
            />
          </div>
          <PrimaryButton
            text={t('Agents_icon_quickmessages_addquickmessage')}
            handleClick={() => setAddActive(true)}
          />
          {/* <SecondaryButton text="Close" /> */}
        </div>
      )}
    </div>
  )
}

export default QuickMessageModal
