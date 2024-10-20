import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiLogOut } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { FiLock } from 'react-icons/fi'
import { useGlobalAuthContext } from '../../../AuthContext'
import { useGlobalNavContext } from '../../../contexts/NavContext'
import dummyAvatar from '../../../public/dummyAvatar.png'

const ProfileDropdown = ({ buisnessDetails }) => {
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  const { openLogoutModal, setShowProfileDropdown } = useGlobalNavContext()
  const router = useRouter()
  return (
    <div
      className={`absolute ${selectedLang == 'en' ? 'tablet:right-3 left-3 tablet:left-auto' : 'tablet:left-3 right-3 tablet:right-auto'} z-50 flex flex-col items-center justify-start gap-4 px-3 py-4 bg-white dark:bg-bgBlack dark:text-white top-24 rounded-[10px]`}>
      <div className="flex items-center w-full gap-4">
        <div className="w-10 h-10 bg-bgWhiteSec border-[1px] border-[#EAEEEE] flex items-center justify-center rounded-full ">
          {buisnessDetails?.Logo_Link ? (
            <Image
              src={buisnessDetails?.Logo_Link}
              alt="profile avatar"
              objectFit="cover"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Image
              src={dummyAvatar}
              alt="profile avatar"
              objectFit="cover"
            />
          )}
        </div>

        <div className="flex flex-col items-start">
          <p className="text-sm font-bold text-Black dark:text-white">
            {buisnessDetails?.Business_Name}
          </p>
          <p className="text-xs font-semibold text-BlackSec dark:text-white/6">
            {buisnessDetails?.Email}
          </p>
        </div>
      </div>
      <div className="h-[1px] w-full  bg-[#E4E5E7] dark:bg-white/30" />

      <button
        onClick={() => {
          setShowProfileDropdown(false)
          router.push('/profile?tab=info')
        }}
        className="flex items-center justify-start w-full gap-3">
        <p className="text-lg text-BlackSec dark:text-white">
          <BsPerson />
        </p>
        <p className="font-semibold text-BlackSec dark:text-white">
          {t('Navbar_popup_account')}
        </p>
      </button>

      <div className="h-[1px] w-full  bg-[#E4E5E7] dark:bg-white/30" />

      <button
        onClick={() => {
          setShowProfileDropdown(false)
          router.push('/profile?tab=reset')
        }}
        className="flex items-center justify-start w-full gap-3">
        <p className="text-lg text-BlackSec dark:text-white">
          <FiLock />
        </p>
        <p className="font-semibold text-BlackSec dark:text-white">
          {t('Navbar_popup_password')}
        </p>
      </button>
      <div className="h-[1px] w-full  bg-[#E4E5E7] dark:bg-white/30" />

      <button
        onClick={openLogoutModal}
        className="flex items-center justify-start w-full gap-3 font-semibold text-Red">
        <p className="text-lg">
          <BiLogOut />
        </p>
        <p className="font-semibold">{t('Navbar_popup_logout')}</p>
      </button>
    </div>
  )
}

export default ProfileDropdown
