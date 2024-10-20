import React, { useState } from 'react'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import { useTranslation } from 'react-i18next'
import Input from '../UI/Input'

const TokenModal = ({ isApiLoading, handleClick, onClose, heading, text }) => {
  const { t } = useTranslation()
  const [password, setpassword] = useState('')
  return (
    <div className="flex flex-col items-center justify-start w-full mx-5 max-w-md  bg-white rounded-[10px] dark:bg-bgBlack gap-4 p-8">
      <p className="text-2xl font-bold">{heading}</p>

      <div className="flex flex-col w-full gap-6">
        <p className="text-sm text-center w-full opacity-60">{text}</p>

        <div className="w-full max-w-sm ">
          <Input
            label={t('Integration_regenerate_modal_password')}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder={t('Integration_regenerate_modal_password_placeholder')}
            enableDark={true}
          />
        </div>

        <div className="flex gap-4">
          <SecondaryButton
            handleClick={onClose}
            text={t('Integration_regenerate_modal_cancel')}
          />
          <PrimaryButton
            isLoading={isApiLoading}
            disabled={isApiLoading || password.trim() == ''}
            handleClick={() => handleClick(password)}
            text={t('Integration_regenerate_modal_confirm')}
          />
        </div>
      </div>
    </div>
  )
}

export default TokenModal
