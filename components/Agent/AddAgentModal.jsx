import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'

const AddAgentModal = ({ onClose }) => {
  const { t } = useTranslation()
  const { getCookie } = useGlobalAuthContext()
  const { alert, setAlert } = useGlobalAgentContext()
  const [step, setStep] = useState(0)
  const [agentsName, setAgentsName] = useState('')
  const [agentsEmail, setAgentsEmail] = useState('')
  const [addPassword, setAddPassword] = useState('')
  const [error, setError] = useState(null)
  const [addApiLoading, setAddApiLoading] = useState(false)
  const step1NextHandler = () => {
    setError(null)
    const emailValid = validateEmail(agentsEmail)

    if (agentsName.trim().length < 3) {
      setError({ nameError: 'Agent_error_rename_size' })
    } else if (agentsEmail.trim().length == 0) {
      setError({ emailError: 'Agent_error_add_email' })
    } else if (!emailValid) {
      setError({ emailError: 'Agent_error_add_valid' })
    } else {
      setStep(1)
    }
  }

  const addAgentHandler = async () => {
    setAlert(null)
    setAddApiLoading(true)
    setError(null)
    try {
      const config = {
        headers: {
          accept: 'application/json',
          Password: addPassword,
          Authorization: getCookie('access-token'),
        },
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/add`,
        { Agent_Email: agentsEmail, Agent_Name: agentsName },
        config
      )
      console.log(res)
      if (res.data.Status == true) {
        setAlert({ success: 'Agent_success_invite' })
      } else {
        setAlert({ error: 'Agent_error_add_cant' })
      }
      onClose()
    } catch (err) {
      console.log(err)

      if (err.response.status == 401) {
        setError({ passwordError: 'Agent_error_add_401' })
      } else if (err.response.status == 409) {
        setAlert({
          error: 'Agent_error_add_409',
        })
        onClose()
      } else setError({ globalError: 'Agent_error_add_500' })
    } finally {
      setAddApiLoading(false)
      setAddPassword('')
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 py-4 bg-white rounded-[10px] dark:bg-black">
      <p className="text-xl font-bold"> {t('Agents_addagent')} </p>
      <div className="flex items-center justify-center gap-2">
        <div
          className={`w-[90px] h-1 ${step == 0 ? 'bg-Blue' : 'bg-Blue/20'
            }  rounded-full`}
        />
        <div
          className={`w-[90px] h-1 ${step == 1 ? 'bg-Blue' : 'bg-Blue/20'
            }  rounded-full`}
        />
      </div>
      {error?.globalError && (
        <p className="w-full py-2 px-2 rounded-[6px] bg-Red/60 font-semibold text-white text-sm">
          {t(error?.globalError)}
        </p>
      )}
      {step == 0 ? (
        <>
          <div className="flex flex-col items-start justify-start gap-4 w-fit">
            <Input
              label={t('Agents_addagent_name')}
              placeholder={t('Agents_addagent_name_textbox')}
              value={agentsName}
              onChange={(e) => setAgentsName(e.target.value)}
              type="text"
              name="AgentsName"
              id="AgentsName"
              error={t(error?.nameError)}
            />
            <Input
              label={t('Agents_addagent_email')}
              placeholder={t('Agents_addagent_email_textbox')}
              value={agentsEmail}
              onChange={(e) => setAgentsEmail(e.target.value)}
              type="email"
              name="AgentsEmail"
              id="AgentsEmail"
              error={t(error?.emailError)}
            />
          </div>
          <div className="flex items-end justify-end w-full gap-2">
            <SecondaryButton
              text={t('cancel')}
              handleClick={onClose}
            />
            <PrimaryButton
              text={t('next')}
              handleClick={step1NextHandler}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start justify-start gap-4">
            <Input
              label={t('password_confirm')}
              placeholder={t('password_confirm_textbox')}
              value={addPassword}
              onChange={(e) => setAddPassword(e.target.value)}
              type="password"
              name="AgentsPassword"
              id="AgentsPassword"
              error={t(error?.passwordError)}
            />
          </div>
          <div className="flex items-end justify-end w-full">
            <PrimaryButton
              text={t('Agents_addagent')}
              isLoading={addApiLoading}
              disabled={addApiLoading}
              handleClick={addAgentHandler}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AddAgentModal
