import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'

const OffboardModal = ({ onClose, setData }) => {
  const [isOffBoarding, setIsOffBoarding] = useState(false)
  const [removePassword, setRemovePassword] = useState('')
  const { getCookie } = useGlobalAuthContext()
  const [modalError, setModalError] = useState(null)
  const { t } = useTranslation()
  const offboard = async () => {
    setModalError(null)

    try {
      setIsOffBoarding(true)
      const config = {
        headers: {
          'Content-type': 'application/json',
          Password: removePassword,
          Authorization: getCookie('access-token'),
        },
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/offboard`,
        '',
        config
      )
      setData(res.data.Contacts)
      onClose()
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
      setIsOffBoarding(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 py-4 bg-white rounded-[10px] dark:bg-bgBlack">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <p className="text-xl font-bold dark:text-white text-Black">
          {t('Contacts_Offboarding_remove_contact')}
        </p>
        <div className="flex flex-col items-center w-full gap-1">
          <p className="text-center">
            {t('Contacts_Offboarding_remove_contact_confirm')}
          </p>
          <p>{t('Agent_remove_password')}</p>
        </div>
        {modalError?.globalError && (
          <p className="w-full px-2 py-1 rounded-[5px] bg-Red text-white text-base font-semibold">
            {t(modalError.globalError)}
          </p>
        )}
        <Input
          name="RemovePassword"
          id="RemovePassword"
          type="password"
          value={removePassword}
          onChange={(e) => setRemovePassword(e.target.value)}
          placeholder={t('Auth_login_password_input_box')}
          error={t(modalError?.passwordError)}
        />
      </div>
      <div className="flex items-center justify-between w-full gap-4">
        <PrimaryButton
          handleClick={offboard}
          isLoading={isOffBoarding}
          disabled={isOffBoarding || removePassword.length < 6}
          text={t('Integration_regenerate_modal_confirm')}
        />
        <SecondaryButton
          text={t('Integration_regenerate_modal_cancel')}
          handleClick={onClose}
        />
      </div>
    </div>
  )
}

export default OffboardModal
