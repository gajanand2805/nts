import Image from 'next/image'
import React, { useState } from 'react'

//* Package Imports
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'

//* Local Imports
import logoLandscapeLight from '../../Logo/logo_landscape_light.svg'
import f3 from '../../components/LandingPage/assets/landing_page/feature_section/f3.svg'
import tick from '../../public/tick.svg'
import LanguageChange from '../LanguageChange'
import Modal from '../Modal'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'
import Rectangle1 from './assets/Rectangle1.svg'

//* Icons
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MerchantSignup({ setIsLoginActive }) {
  const { push } = useRouter()
  //? translation
  const { t } = useTranslation()

  //? contexts
  const { selectedLang } = useGlobalAuthContext()

  //? states
  const [merchantEmail, setMerchantEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [errors, setErrors] = useState({
    emailError: '',
    globalError: '',
  })

  //? functions
  const resetErrors = () => {
    setErrors({
      emailError: '',
      globalError: '',
    })
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleChange = (e) => {
    setErrors({ emailError: '' })
    const { name, value } = e.target
    if (name == 'merchant_email') {
      setMerchantEmail(value)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    resetErrors()
    const emailValid = validateEmail(merchantEmail)

    if (!emailValid) {
      setErrors({ ...errors, emailError: 'Auth_error_invalid_email' })
    }

    if (emailValid) {
      const config = {
        headers: {
          email: merchantEmail,
          'Content-type': 'application/json',
        },
      }
      setLoading(true)
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/signup/challenge`,
          config
        )
        console.log(res)
        resetErrors()
        setEmailSent(true)
      } catch (err) {
        if (err.response?.status == 400) {
          setErrors({
            emailError: 'Auth_error_invalid_email',
            globalError: '',
          })
        } else if (err.response?.status == 409) {
          setErrors({
            emailError: 'Auth_error_409',
            globalError: '',
          })
        } else
          setErrors({
            emailError: '',
            globalError: 'Auth_error_500',
          })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-screen ">
      <div className="relative flex w-full h-full ">
        <Link href={'/'}>
          <div
            className={`absolute cursor-pointer z-40 w-40 top-3 ${selectedLang == 'en'
              ? 'left-4 tablet:left-6'
              : 'right-4 tablet:right-6'
              }`}>
            <Image
              src={logoLandscapeLight}
              alt="Invobot Logo"
              objectFit="cover"
            />
          </div>
        </Link>
        <div
          className={`absolute z-40 top-3 ${selectedLang != 'en'
            ? 'left-4 tablet:left-6'
            : 'right-4 tablet:right-6'
            }`}>
          <LanguageChange Dark={false} />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen pt-16 bg-white tabletM:basis-1/2">
          <div className="flex flex-col items-center justify-center w-full max-w-md gap-5 px-4 pb-20 scale-90 tabletM:pb-0 tabletM:gap-8 laptop:px-0">
            <div className="flex flex-col items-center gap-4 text-Black">
              <p className="text-2xl font-[800]">
                {t && t('Auth_signup_heading')}
              </p>
              <p className="text-lg text-center text-BlackSec">
                {t && t('Auth_signup_create_account')}
              </p>
            </div>
            <div className="flex flex-col w-full gap-4">
              {errors.globalError && (
                <p className="w-full px-6 py-4 font-medium text-left text-white bg-red-500 rounded-md ">
                  {t(errors.globalError)}
                </p>
              )}
              <div className="flex flex-col items-center justify-center w-full gap-9">
                <Input
                  enableDark={false}
                  label={t && t('Auth_email_heading')}
                  type="email"
                  id="email"
                  placeholder={t && t('Auth_email_input_box')}
                  onChange={handleChange}
                  value={merchantEmail}
                  name="merchant_email"
                  error={t(errors.emailError)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center w-full gap-9">
              <PrimaryButton
                handleClick={handleSignup}
                disabled={loading}
                isLoading={loading}
                text={t && t('Auth_signup_heading')}
                size="large"
              />
              <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col items-center justify-center w-full cursor-pointer text-Black text whitespace-nowrap">
                  {t && t('Auth_signup_login')}
                  <button
                    onClick={() => {
                      push('?tab=login')
                      setIsLoginActive(false)
                    }}
                    className="text-base font-bold underline cursor-pointer text-Black">
                    {t && t('Auth_signup_go_to_login')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-col items-center justify-start hidden w-full h-screen px-4 pt-20 overflow-hidden tabletM:flex laptop:px-0 basis-1/2 bg-gradient-to-b from-Blue to-[#343C45]">
          <div className="flex flex-col items-center w-full max-w-lg gap-4 text-white ">
            <p className="text-xl font-bold text-center">
              {t && t('Auth_signup_textonimage_heading')}
            </p>
            <p className="font-normal text-center text-md">
              {t && t('Auth_signup_textonimage_text')}
            </p>
          </div>

          <div className="absolute w-[80%] -bottom-4 -right-4">
            <Image
              src={f3}
              alt="loginImg"
              height={3}
              width={5}
              layout="responsive"
              objectFit="cover"
            />
          </div>

          <div className="absolute left-0 h-full scale-110 -top-28 -bottom-0 -right-10">
            <Image
              src={Rectangle1}
              height={1}
              width={1}
              layout="responsive"
              alt="rectangle"
              objectFit="cover"
            />
          </div>

          <div className="absolute inset-0 h-full scale-110 -rotate-90">
            <Image
              src={Rectangle1}
              height={1}
              width={1}
              layout="responsive"
              alt="rectangle"
              objectFit="cover"
            />
          </div>
        </div>

        <Modal
          isVisible={emailSent}
          onClose={() => {
            setEmailSent(false)
            setMerchantEmail('')
          }}>
          <div className="flex items-center justify-center p-2 bg-white w-fit h-fit rounded-xl">
            <div className="flex flex-col items-center justify-between w-full h-full gap-5 p-5">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32">
                  <Image
                    src={tick}
                    layout="responsive"
                    alt="tick"
                  />
                </div>
                <p className="w-full mt-6 text-xl font-bold text-center">
                  {t('Auth_signup_confirmation_text')}
                </p>
                <div className="flex flex-col">
                  <p className="font-semibold text-center text-Black">
                    {merchantEmail}
                  </p>
                  <p className="text-sm font-semibold text-center text-BlackSec">
                    {t('Auth_signup_spam')}
                  </p>
                </div>
                <SecondaryButton
                  handleClick={() => {
                    setEmailSent(false)
                    setMerchantEmail('')
                  }}
                  text={
                    <div className="flex items-center gap-2">
                      {t('Auth_signup_okay')}
                    </div>
                  }
                  size="small"
                  height="fit"
                  width="full"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
