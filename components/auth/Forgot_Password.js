import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useGlobalAuthContext } from '../../AuthContext'
import logoLandscapeLight from '../../Logo/logo_landscape_light.svg'
import tick from '../../public/tick.svg'
import LanguageChange from '../LanguageChange'
import Modal from '../Modal'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'

export default function Forgot_Password() {
  //? router
  const router = useRouter()

  //? context
  const { selectedLang } = useGlobalAuthContext()

  //? translations
  const { t } = useTranslation()

  //? states
  const [merchantEmail, setMerchantEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const handleForgotPasswordChallenge = async (e) => {
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
      setIsLoading(true)

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/credentials/challenge`,
          config
        )
        setEmailSent(true)
      } catch (err) {
        if (err.response?.status == 400) {
          setErrors({
            emailError: 'Auth_error_invalid_email',
            globalError: '',
          })
        } else if (err.response?.status == 404) {
          setErrors({
            emailError: 'Auth_error_404',
            globalError: '',
          })
        } else
          setErrors({
            emailError: '',
            globalError: 'Auth_error_500',
          })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div
        className={`absolute z-40 w-40 top-3 ${selectedLang == 'en'
          ? 'left-4 tablet:left-6'
          : 'right-4 tablet:right-6'
          }`}>
        <Image
          src={logoLandscapeLight}
          alt="Invobot Logo"
          objectFit="cover"
        />
      </div>
      <div
        className={`absolute z-40 top-3 ${selectedLang != 'en'
          ? 'left-4 tablet:left-6'
          : 'right-4 tablet:right-6'
          }`}>
        <LanguageChange Dark={false} />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen pt-16 bg-white ">
        <div className="flex flex-col scale-90 pb-20 tabletM:pb-0 items-center justify-center w-full max-w-md gap-10 px-4 tabletM:gap-16 laptop:px-0">
          <div className="flex flex-col items-center gap-4 text-Black">
            <p className="text-3xl font-[800]">
              {t && t('Auth_forgot_password')}
            </p>
            <p className="text-xl text-center text-BlackSec">
              {t && t('Auth_forgot_password_text')}
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            {errors.globalError && (
              <p className="w-full px-6 py-4 font-medium text-left text-white bg-red-500 rounded-md ">
                {t(errors.globalError)}
              </p>
            )}
            <div className="flex flex-col items-center justify-center w-full gap-7">
              <Input
                enableDark={false}
                label={t && t('Auth_email_heading')}
                type="email"
                id="email"
                placeholder={t && t('Auth_email_input_box')}
                onChange={(e) => setMerchantEmail(e.target.value)}
                value={merchantEmail}
                name="newpassword"
                error={t(errors.emailError)}
              />
            </div>
          </div>

          <div className="flex flex-col items-center w-full gap-6">
            <PrimaryButton
              handleClick={handleForgotPasswordChallenge}
              disabled={isLoading}
              isLoading={isLoading}
              text={t && t('Auth_forgot_password_button')}
              size="large"
            />
            <button
              onClick={() => router.push('/auth')}
              className="flex items-center gap-2 group">
              <p className="transition-all duration-200 group-hover:-translate-x-1">
                <AiOutlineArrowLeft />
              </p>
              <p className="text-base font-bold cursor-pointer text-Black">
                {t && t('Auth_forgot_password_go_to_login')}
              </p>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isVisible={emailSent}
        onClose={() => {
          setEmailSent(false)
          setMerchantEmail('')
        }}>
        <div className="flex justify-center items-center w-fit h-fit bg-white p-2 rounded-xl">
          <div className="flex flex-col p-5 w-full h-full items-center justify-between  gap-5">
            <div className="flex flex-col gap-4 items-center">
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
                <p className="text-center text-Black font-semibold">
                  {merchantEmail}
                </p>
                <p className="text-center text-sm text-BlackSec font-semibold">
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
  )
}
