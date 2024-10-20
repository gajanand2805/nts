import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'
const RemoveAgentModal = ({ name, email, onClose, index }) => {
  const { t } = useTranslation()
  const { getCookie } = useGlobalAuthContext()
  const [removePassword, setRemovePassword] = useState('')
  const [isApiLoading, setIsApiLoading] = useState(false)
  const { agents, setAgents, alert, setAlert } = useGlobalAgentContext()
  const [modalError, setModalError] = useState(null)

  const removeAgentHandler = async () => {
    setModalError(null)
    setIsApiLoading(true)
    try {
      const config = {
        headers: {
          accept: 'application/json',
          'Agent-Email': email,
          Password: removePassword,
          Authorization: getCookie('access-token'),
        },
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/remove`,
        '',
        config
      )
      if (res.data.Status == true) {
        console.log('AGENTT', agents)
        setAlert({ success: 'Agent_success_remove', error: '' })
        setAgents(agents.slice(0, index).concat(agents.slice(index + 1)))
        onClose()
      } else {
        setModalError({ globalError: 'Agent_error_wrong' })
      }
    } catch (err) {
      console.log(err)
      if (err.response.status == 401) {
        setModalError({
          passwordError: 'Agent_error_add_401',
        })
      } else {
        setModalError({ globalError: 'Agent_error_wrong' })
      }
    } finally {
      setIsApiLoading(false)
      setRemovePassword('')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 py-4 bg-white rounded-[10px] dark:bg-black">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold dark:text-white text-Black">
          {t('Agent_remove')}
        </p>
        <div className="flex flex-col items-start gap-2">
          <p className="">
            {t('Agent_remove_confirm1')} {name} {t('Agent_remove_confirm2')}
          </p>
          <p>{t('Agent_remove_password')}</p>
        </div>
        {modalError?.globalError && (
          <p className="w-full px-2 py-1 rounded-[5px] bg-Green/60 text-white text-base font-semibold">
            {t(modalError.globalError)}
          </p>
        )}
        <Input
          name="RemovePassword"
          id="RemovePassword"
          type="password"
          value={removePassword}
          onChange={(e) => setRemovePassword(e.target.value)}
          placeholder="Enter your password"
          error={t(modalError?.passwordError)}
        />
      </div>
      <div className="flex items-center justify-between w-full gap-4">
        <PrimaryButton
          handleClick={removeAgentHandler}
          isLoading={isApiLoading}
          disabled={isApiLoading || removePassword.length < 6}
          text="Confirm"
        />
        <SecondaryButton
          text="Cancel"
          handleClick={onClose}
        />
      </div>
    </div>
  )
}

export default RemoveAgentModal
