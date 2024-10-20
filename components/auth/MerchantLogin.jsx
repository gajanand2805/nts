import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

// *Package Imports
import axios from 'axios'
import { useTranslation } from 'react-i18next'

// *Loacal Imports
import { useGlobalAuthContext } from '../../AuthContext'
import logoLandscapeLight from '../../Logo/logo_landscape_light.svg'
import PrimaryButton from '../UI/Button/PrimaryButton'
import { Carousel } from '../UI/Carousel/Carousel'
import { CarouselItem } from '../UI/Carousel/CarouselItem'
import Input from '../UI/Input'

//? Icons
import { useRouter } from 'next/router'
import f1 from '../../components/LandingPage/assets/landing_page/feature_section/f1.svg'
import f2 from '../../components/LandingPage/assets/landing_page/feature_section/f2.svg'
import f3 from '../../components/LandingPage/assets/landing_page/feature_section/f3.svg'
import Rings from '../../public/merchant_login/rings.svg'
import StarGray from '../../public/merchant_login/star_gray.svg'
import StarGreen from '../../public/merchant_login/star_green.svg'
import StarRed from '../../public/merchant_login/star_red.svg'

export default function MerchantLogin({ setIsLoginActive }) {
  const router = useRouter()
  //? context
  const { login, setIsAccessToken, selectedLang } = useGlobalAuthContext()

  //? translation
  const { t } = useTranslation()

  //? states
  const [merchantEmail, setMerchantEmail] = useState('')
  const [merchantPassword, setMerchantPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
    globalError: '',
  })

  //? functions
  const resetErrors = () => {
    setErrors({
      globalError: '',
      emailError: '',
      passwordError: '',
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
    setErrors({ emailError: '', passwordError: '' })
    // resetErrors();
    const { name, value } = e.target
    if (name == 'merchant_email') {
      setMerchantEmail(value)
    }
    if (name == 'merchant_pass') {
      setMerchantPassword(value)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    resetErrors()
    const emailValid = validateEmail(merchantEmail)

    if (emailValid === null) {
      setErrors({ ...errors, emailError: 'Auth_error_invalid_email' })
    } else if (merchantPassword.length == 0) {
      setErrors({ ...errors, passwordError: 'Auth_error_pass_required' })
    } else if (emailValid && merchantPassword.length > 0) {
      const config = {
        headers: {
          'Merchant-Email': merchantEmail,
          'Merchant-Password': merchantPassword,
          'Content-type': 'application/json',
        },
      }
      setLoading(true)
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/login`,
          '',
          config
        )
        resetErrors()
        let x = `${res.data.token_type} ${res.data.token}`
        login(x)
      } catch (err) {
        if (err.response?.status == 401)
          setErrors({
            ...errors,
            globalError: '',
            passwordError: 'Auth_error_pass_wrong',
          })
        else if (err.response?.status == 404)
          setErrors({
            ...errors,
            globalError: 'Auth_error_404',
          })
        else if (err.response?.status == 409)
          setErrors({
            emailError: '',
            passwordError: '',
            globalError: 'Auth_error_409',
          })
        else
          setErrors({
            emailError: '',
            passwordError: '',
            globalError: 'Auth_error_500',
          })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-screen ">
      <div className="relative flex w-full h-full">
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
        {/* <div
          className={`absolute z-40 top-3 ${selectedLang != 'en'
            ? 'left-4 tablet:left-6'
            : 'right-4 tablet:right-6'
            }`}>
          <LanguageChange Dark={false} />
        </div> */}
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen pt-16 bg-white tabletM:basis-1/2">
          <div className="flex flex-col items-center justify-center w-full max-w-md gap-5 px-4 pb-20 scale-90 tabletM:pb-0 tabletM:gap-8 laptop:px-0">
            <div className="flex flex-col items-center gap-4 text-Black">
              <p className="text-2xl font-[800]">
                {t && t('Auth_login_heading')}
              </p>
              <p className="text-lg text-center text-BlackSec">
                {t && t('Auth_login_text')}
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
                  onChange={handleChange}
                  value={merchantEmail}
                  name="merchant_email"
                  error={t(errors.emailError)}
                />
                <div className="flex flex-col items-end w-full">
                  <Input
                    enableDark={false}
                    label={t && t('Auth_login_password_heading')}
                    type="password"
                    id="password"
                    placeholder={t && t('Auth_login_password_input_box')}
                    onChange={handleChange}
                    value={merchantPassword}
                    name="merchant_pass"
                    error={t(errors.passwordError)}
                  />
                  <Link href="/forgot_password">
                    <a className="mt-4 text-base font-bold underline cursor-pointer text-Black">
                      {t && t('Auth_forgot_password')}
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full gap-6">
              <PrimaryButton
                handleClick={handleLogin}
                disabled={loading}
                isLoading={loading}
                text={t && t('Auth_login_text')}
                size="large"
              />
              <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col items-center justify-center w-full cursor-pointer text-Black text whitespace-nowrap">
                  {t && t('Auth_login_signup')}
                  <button
                    onClick={() => {
                      router.push('?tab=signup')
                      setIsLoginActive(false)
                    }}
                    className="text-base font-bold underline cursor-pointer text-Black">
                    {t && t('Auth_login_go_to_signup')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-col justify-center h-screen items-center hidden w-full overflow-hidden tabletM:flex laptop:px-0 basis-1/2 bg-gradient-to-b from-Blue to-[#343C45]">
          <Carousel>
            <CarouselItem>
              <div className="flex items-center justify-center w-[40vw] h-[50vh]">
                <Image
                  src={f3}
                  objectFit="contain"
                  alt="TotalApiCalls"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex items-center justify-center w-[40vw] h-[50vh]">
                <Image
                  src={f2}
                  objectFit="contain"
                  alt="AgentOne"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex items-center justify-center w-[40vw] h-[50vh]">
                <Image
                  src={f1}
                  objectFit="contain"
                  alt="SentMessages"
                />
              </div>
            </CarouselItem>
          </Carousel>

          <div className="absolute top-0 right-0 w-64">
            <Image
              src={Rings}
              objectFit="contain"
              alt="rings"
            />
          </div>
          <div className="absolute top-10 left-16 ">
            <Image
              src={StarGray}
              objectFit="contain"
              alt="star_gray"
            />
          </div>
          <div className="absolute bottom-32 left-10 ">
            <Image
              src={StarGreen}
              objectFit="contain"
              alt="StarGreen"
            />
          </div>
          <div className="absolute w-8 bottom-40 right-10 ">
            <Image
              src={StarRed}
              objectFit="contain"
              alt="StarRed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
