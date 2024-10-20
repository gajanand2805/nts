import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'

const ConfigureAgent = ({ onClose }) => {
  const {
    agents,
    allowed,
    loadData,
    setConfigureAgentsActive,
    setChangedAgentConfig,
    changedAgentConfig,
    setAlert,
  } = useGlobalAgentContext()
  const { getCookie } = useGlobalAuthContext()
  const [agentConfigureIsLoading, setAgentConfigureIsLoading] = useState(false)
  const { t } = useTranslation()

  const serviceUpdate = async (e) => {
    e.preventDefault()
    setAgentConfigureIsLoading(true)

    const data = {
      Agents: {},
    }
    let count = 0
    agents.map((item, i) => {
      if (i < e.target.length)
        data.Agents[e.target[i].value] = e.target[i].checked
      if (e.target[i].checked) count = count + 1
    })
    let check = count <= allowed

    if (check) {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
          'Content-Type': 'application/json',
        },
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/service/update`,
          data,
          config
        )
        await loadData()
        onClose()
      } catch (err) {
        console.log(err)
      } finally {
        setAgentConfigureIsLoading(false)
      }
    } else {
      setAlert({ error: 'Agent_error_active_max' })
      setAgentConfigureIsLoading(false)
    }
    onClose()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 tabletM:px-8 py-6 w-[90%] tabletM:w-full max-w-[400px] bg-white rounded-[10px] dark:bg-bgBlack">
      <p className="text-xl font-bold">
        {' '}
        {t('Agents_icon_activeagents_heading')}{' '}
      </p>

      <form
        onSubmit={(e) => {
          serviceUpdate(e)
        }}
        className="flex flex-col w-full gap-8 mt-4 rounded-md">
        <div className="flex flex-col w-full gap-3">
          {agents?.map((contact, i) => {
            return (
              <div
                key={i}
                className={`px-4 py-2 flex justify-between items-center w-full bg-bgWhiteSec dark:bg-bgBlackSec rounded-md`}>
                <label
                  htmlFor={contact.Email}
                  className="font-semibold overflow-x-auto">
                  {contact.Email}
                </label>
                <input
                  className="float-left w-5 h-5 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-Green/60 checked:border-Green foutline-0 focus-visible:border-2 focus-visible:border-blue-300 hover:opacity-80"
                  type="checkbox"
                  value={contact.Email}
                  id={contact.Email}
                  defaultChecked={contact.Service}></input>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between w-full gap-2 ">
          <SecondaryButton
            text={t('cancel')}
            handleClick={onClose}
          />
          <PrimaryButton
            isLoading={agentConfigureIsLoading}
            disabled={agentConfigureIsLoading}
            type="submit"
            text={t && t('update')}
          />
        </div>
      </form>
    </div>
  )
}

export default ConfigureAgent
