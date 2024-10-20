import React from 'react'
import { useGlobalNavContext } from '../../../contexts/NavContext'
import { useTranslation } from 'react-i18next'
import SecondaryButton from '../../UI/Button/SecondaryButton'
import PrimaryButton from '../../UI/Button/PrimaryButton'
import { useGlobalAuthContext } from '../../../AuthContext'
const LogoutModal = () => {
  const { t } = useTranslation()
  const { setShowLogout, logout } = useGlobalNavContext()

  return (
    <div className="flex flex-col gap-4 px-8 py-8 bg-white shadow-xl rounded-[10px] dark:bg-bgBlack">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-start justify-start w-full gap-1 ">
          <h2 className="text-xl text-center w-full font-bold dark:text-white">
            {t && t('Navbar_logout_header')}
          </h2>
          <p className="text-sm text-bgBlack w-full text-center dark:text-bgWhiteSec opacity-60">
            {t && t('Navbar_logout_text')}
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <SecondaryButton
          text={t && t('Navbar_logout_cancel')}
          handleClick={() => {
            setShowLogout(false)
          }}
        />
        <PrimaryButton
          handleClick={logout}
          text={t && t('Navbar_logout_done')}
        />
      </div>
    </div>
  )
}

export default LogoutModal
