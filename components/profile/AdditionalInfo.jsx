import React, { useState } from 'react'
import Input from '../UI/Input'
import { useTranslation } from 'react-i18next'
import SecondaryButton from '../UI/Button/SecondaryButton'
import PrimaryButton from '../UI/Button/PrimaryButton'
import { BsFacebook, BsFillTelephoneFill, BsGlobe } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { useGlobalProfileContext } from '../../contexts/ProfileContext'
import { useRouter } from 'next/router'
import { MdEmail } from 'react-icons/md'
import Modal from '../Modal'
import { SubscriptionModal } from '../Subscription/SubscriptionModal'

const AdditionalInfo = () => {
  //? router
  const router = useRouter()

  //? context
  const { profileData, changeHandler, isUpdateLoading, updateHandler } =
    useGlobalProfileContext()

  //? translations
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-end w-full ">
      <div className="flex flex-col items-center justify-start  w-full max-w-[500px] py-5">
        <div className="flex flex-col items-center justify-start w-full gap-3">
          <Input
            label={t('Profile_additional_info_contact')}
            type="text"
            id="contact"
            icon={<BsFillTelephoneFill />}
            placeholder={t('Profile_additional_info_contact_placeholder')}
            onChange={changeHandler}
            value={profileData?.Business_Contact}
            name="contact"
            // error={t(errors.emailError)}
          />
          <Input
            label={t('Profile_additional_info_email')}
            type="text"
            id="email"
            icon={<MdEmail />}
            placeholder={t('Profile_additional_info_email_placeholder')}
            onChange={changeHandler}
            value={profileData?.Business_Email}
            name="email"
            // error={t(errors.emailError)}
          />
          <Input
            label={t('Profile_additional_info_vat')}
            type="text"
            id="vat"
            placeholder={t('Profile_additional_info_vat_placeholder')}
            onChange={changeHandler}
            value={profileData?.VAT}
            name="vat"
            // error={t(errors.emailError)}
          />
          {!profileData?.Invoice_Website && (
            <div className="font-semibold flex text-xs gap-1 text-white p-3 rounded bg-gradient-to-r from-[#1A2980] to-[#26D0CE] w-full">
              <span>{t('Profile_additional_info_website_warning')}</span>
              <span
                onClick={() => router.push('/subscription')}
                className="underline hover:cursor-pointer">
                {t('Profile_additional_info_upgrade')}
              </span>
            </div>
          )}
          <Input
            label={t('Profile_additional_info_website')}
            type="text"
            id="website"
            icon={<BsGlobe />}
            placeholder={t('Profile_additional_info_website_placeholder')}
            onChange={changeHandler}
            value={profileData?.Links.Website}
            name="website"
            // error={t(errors.emailError)}
          />
          {!profileData?.Invoice_Social_Media && (
            <div className="font-semibold flex text-xs gap-1 text-white p-3 rounded bg-gradient-to-r from-[#1A2980] to-[#26D0CE] w-full">
              <span className="">
                {t('Profile_additional_info_socialmedia_warning')}
              </span>
              <span
                onClick={() => router.push('/subscription')}
                className="underline hover:cursor-pointer">
                {t('Profile_additional_info_upgrade')}
              </span>
            </div>
          )}
          <Input
            label={t('Profile_additional_info_socialmedia_facebook')}
            type="text"
            icon={<BsFacebook />}
            id="facebook"
            placeholder={t(
              'Profile_additional_info_socialmedia_facebook_placeholder'
            )}
            onChange={changeHandler}
            value={profileData?.Links.Facebook}
            name="facebook"
            // error={t(errors.emailError)}
          />
          <Input
            label={t('Profile_additional_info_socialmedia_instagram')}
            type="text"
            icon={<BsInstagram />}
            id="instagram"
            placeholder={t(
              'Profile_additional_info_socialmedia_instagram_placeholder'
            )}
            onChange={changeHandler}
            value={profileData?.Links.Instagram}
            name="instagram"
            // error={t(errors.emailError)}
          />
          <Input
            label={t('Profile_additional_info_socialmedia_twitter')}
            icon={<BsTwitter />}
            type="text"
            id="twitter"
            placeholder={t(
              'Profile_additional_info_socialmedia_twitter_placeholder'
            )}
            onChange={changeHandler}
            value={profileData?.Links.Twitter}
            name="twitter"
            // error={t(errors.emailError)}
          />
        </div>
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

export default AdditionalInfo
