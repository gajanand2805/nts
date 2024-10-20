import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalProfileContext } from '../../contexts/ProfileContext'
import dummyAvatar from '../../public/dummyAvatar.png'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'
import editbuttonSvg from './assets/editbutton.svg'

const PersonalInfo = () => {
  const router = useRouter()
  const { selectedLang } = useGlobalAuthContext()
  const {
    profileData,
    changeHandler,
    logoChangeHandler,
    isLogoLoading,
    isUpdateLoading,
    updateHandler,
  } = useGlobalProfileContext()

  const { t } = useTranslation()
  const [currentLang, setCurrentLang] = useState(selectedLang)
  const cancelHandler = () => { }
  const toggleHandler = () => { }
  const handleLangSwitch = () => {
    setCurrentLang(currentLang == 'en' ? 'ar' : 'en')
  }

  return (
    <div className="flex flex-col items-center justify-end w-full ">
      <div className="flex flex-col items-center justify-start  w-full max-w-[500px] py-10">
        <div className="relative w-[200px] flex items-center justify-center  h-[200px] shadow-md bg-bgWhiteSec rounded-full">
          {isLogoLoading ? (
            <div className="w-20 h-20 border-t-2 border-black rounded-full animate-spin" />
          ) : (
            <Image
              src={profileData?.Logo_Link || dummyAvatar}
              alt="Profile Picture of merchant"
              objectFit="cover"
              layout="fill"
              className="rounded-full"
            />
          )}
          <label
            htmlFor="logo"
            className="absolute bottom-0 right-0 cursor-pointer">
            <div className="relative w-[50px] h-[50px] z-20 ">
              <Image
                src={editbuttonSvg}
                alt="edit button"
                objectFit="cover"
                className="z-20 "
              />
            </div>
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={logoChangeHandler}
            className="hidden"
          />
        </div>
        <div className="flex items-center justify-end w-full gap-4 py-10">
          <p className="font-bold text-BlackSec ">
            {t('profile_personalinfo_switch')}
            <span className="text-Black dark:text-White">
              {currentLang == 'en' ? 'العربية' : 'English'}
            </span>
          </p>
          <button
            onClick={handleLangSwitch}
            className={`text-sm px-3 py-2 font-semibold rounded-md  text-white bg-Blue dark:bg-Blue hover:bg-Blue/90 duration-150 transition-all cursor-pointer`}>
            {currentLang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
        {currentLang == 'en' ? (
          <div className="flex flex-col items-center justify-start w-full gap-10">
            <Input
              label={t('profile_personalinfo_businessname')}
              type="text"
              id="Business_Name"
              placeholder={t('profile_personalinfo_businessname_placeholder')}
              onChange={changeHandler}
              value={profileData?.Business_Name}
              name="Business_Name"
            />
            <div className="flex flex-col items-center justify-start w-full gap-4">
              <Input
                label={t('profile_personalinfo_addressline1')}
                type="text"
                id="Address_line1"
                placeholder={t('profile_personalinfo_addressline1_placeholder')}
                onChange={changeHandler}
                value={profileData?.Business_Address?.Address_line1}
                name="Address_line1"
              />
              <Input
                label={t('profile_personalinfo_addressline2')}
                type="text"
                id="Address_line2"
                placeholder={t('profile_personalinfo_addressline2_placeholder')}
                value={profileData?.Business_Address?.Address_line2}
                onChange={changeHandler}
                name="Address_line2"
              // error={t(errors.emailError)}
              />
              <Input
                label={t('profile_personalinfo_addressline3')}
                type="text"
                id="Address_line3"
                placeholder={t('profile_personalinfo_addressline3_placeholder')}
                value={profileData?.Business_Address?.Address_line3}
                onChange={changeHandler}
                name="Address_line3"
              // error={t(errors.emailError)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full gap-10">
            <Input
              label={t('profile_personalinfo_businessname')}
              type="text"
              id="Business_NameAr"
              placeholder={t('profile_personalinfo_businessname_placeholder')}
              onChange={changeHandler}
              value={profileData?.Business_Name_ar}
              name="Business_NameAr"
            />
            <div className="flex flex-col items-center justify-start w-full gap-4">
              <Input
                label={t('profile_personalinfo_addressline1')}
                type="text"
                id="Address_line1Ar"
                placeholder={t('profile_personalinfo_addressline1_placeholder')}
                onChange={changeHandler}
                value={profileData?.Business_Address_ar?.Address_line1}
                name="Address_line1Ar"
              />
              <Input
                label={t('profile_personalinfo_addressline2')}
                type="text"
                id="Address_line2Ar"
                placeholder={t('profile_personalinfo_addressline2_placeholder')}
                value={profileData?.Business_Address_ar?.Address_line2}
                onChange={changeHandler}
                name="Address_line2Ar"
              // error={t(errors.emailError)}
              />
              <Input
                label={t('profile_personalinfo_addressline3')}
                type="text"
                id="Address_line3Ar"
                placeholder={t('profile_personalinfo_addressline3_placeholder')}
                value={profileData?.Business_Address_ar?.Address_line3}
                onChange={changeHandler}
                name="Address_line3Ar"
              // error={t(errors.emailError)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full p-4">
        <div className="flex items-center justify-end gap-3 w-full tabletM:max-w-[40%]">
          <SecondaryButton
            disabled={false}
            isLoading={false}
            handleClick={() => router.push('/dashboard')}
            text={t('cancel')}
            size="small"
          />

          <PrimaryButton
            disabled={isUpdateLoading}
            isLoading={isUpdateLoading}
            handleClick={updateHandler}
            text={t('update')}
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
