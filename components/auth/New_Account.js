import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlusLg } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { useGlobalAuthContext } from '../../AuthContext'
import logoLandscapeLight from '../../Logo/logo_landscape_light.svg'
import LanguageChange from '../LanguageChange'
import PrimaryButton from '../UI/Button/PrimaryButton'
import Input from '../UI/Input'

const New_Account = () => {
  const { setCookie, setIsLoading, isLoading, setIsAccessToken, selectedLang } =
    useGlobalAuthContext()
  const { t } = useTranslation()
  const router = useRouter()
  const { token } = router.query

  const [validated, setValidated] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLengthCheck, setIsLengthCheck] = useState(false)
  const [isContainNumber, setIsContainNumber] = useState(false)
  const [isContainSpecialChar, setIsContainSpecialChar] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)

  const [errors, setErrors] = useState({
    passwordError: '',
    globalError: '',
  })

  const resetErrors = () => {
    setErrors({
      passwordError: '',
      globalError: '',
    })
  }

  useEffect(() => {
    setIsAccessToken(false)
  }, [])

  useEffect(() => {
    const validate = async () => {
      resetErrors()
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/link/validator/new_account?token=${token}`
        )
        if (res.data.Status) {
          resetErrors()
          setValidated(true)
        }
      } catch (err) {
        if (err.response?.status == 409) {
          setErrors({
            passwordError: '',
            globalError: 'Auth_error_409',
          })
        } else
          setErrors({
            passwordError: '',
            globalError: 'Auth_error_403',
          })
      } finally {
      }
    }
    if (token) {
      validate()
    }
  }, [token, setIsLoading, router])

  // const containsUppercase = (str) => {
  //   return /[A-Z]/.test(str)
  // }
  // const containsLowercase = (str) => {
  //   return /[a-z]/.test(str)
  // }
  const lengthCheck = (str) => {
    return str.length >= 8 && str.length <= 16
  }
  const containsNumber = (str) => {
    return /\d/.test(str)
  }
  const containsSpecialChar = (str) => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return format.test(str)
  }

  const passwordMatch = () => {
    console.table(password, confirmPassword)
    return password.length > 0 && password === confirmPassword
  }

  useEffect(() => {
    // setIsContainUppercase(containsUppercase(password))
    // setIsContainLowercase(containsLowercase(password))
    setIsLengthCheck(lengthCheck(password))
    setIsContainNumber(containsNumber(password))
    setIsContainSpecialChar(containsSpecialChar(password))
    setIsPasswordMatch(passwordMatch())
  }, [password, confirmPassword])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'newpassword') {
      setPassword(value)
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    resetErrors()
    if (
      !isLengthCheck ||
      !isContainNumber ||
      !isContainSpecialChar ||
      !isPasswordMatch
    ) {
      setErrors({
        passwordError: 'Auth_error_pass_constraints',
        globalError: '',
      })
    } else if (!validated) {
      setErrors({
        passwordError: '',
        globalError: 'Auth_error_403',
      })
    } else {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Password: confirmPassword,
        },
      }
      setIsLoading(true)

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/signup/verify?token=${token}`,
          '',
          config
        )
        resetErrors()
        await setCookie(
          'access-token',
          `${res.data.token_type} ${res.data.token}`,
          7
        )
        await router.push('/dashboard')
        //await setIsAccessToken(true);
      } catch (err) {
        if (err.response?.status == 401) {
          setErrors({
            passwordError: 'Auth_error_401',
            globalError: '',
          })
        } else if (err.response?.status == 403) {
          setErrors({
            passwordError: '',
            globalError: 'Auth_error_403',
          })
        } else {
          setErrors({
            passwordError: '',
            globalError: 'Auth_error_500',
          })
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center w-screen ">
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
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen pt-10 pb-3 bg-white">
        <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 px-4 pb-20 scale-90 tabletM:pb-0 tabletM:gap-7 laptop:px-0">
          <div className="flex flex-col items-center gap-4 text-Black">
            <p className="text-2xl font-[800]">
              {t && t('Auth_signup_Setup_Password')}
            </p>
            <p className="text-lg text-center text-BlackSec">
              {t && t('Auth_signup_setup_info')}
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            {errors.globalError && (
              <p className="w-full px-6 py-4 font-medium text-left text-white bg-red-500 rounded-md ">
                {t(errors.globalError)}
              </p>
            )}
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <Input
                enableDark={false}
                label={t && t('Auth_signup_New_Password')}
                type="password"
                id="newpassword"
                placeholder={t && t('Auth_signup_New_Password')}
                onChange={handleChange}
                value={password}
                name="newpassword"
                error={t(errors.passwordError)}
              />
              <div className="flex flex-col items-start w-full gap-4">
                <Input
                  enableDark={false}
                  label={t && t('Auth_signup_Confirm_Password')}
                  type="password"
                  id="confirmPassword"
                  placeholder={t && t('Auth_signup_Confirm_Password')}
                  onChange={handleChange}
                  value={confirmPassword}
                  name="confirmPassword"
                />
                <div className="flex flex-col  items-start bg-bgWhiteSec rounded-[10px] px-4 py-2">
                  <p className="mb-1 text-sm font-semibold uppercase text-BlackSec">
                    {t && t('Auth_password_PassConstraints')}
                  </p>
                  <ul className="flex flex-col items-start gap-1">
                    <li className="flex gap-3 ">
                      <p>
                        {isLengthCheck ? (
                          <FaCheck className="mt-1 text-sm text-Blue font-2xl" />
                        ) : (
                          <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-xl" />
                        )}
                      </p>
                      <p>{t && t('Auth_password_MustContain8')}</p>
                    </li>
                    <li className="flex gap-3 ">
                      <p>
                        {isContainNumber && isContainSpecialChar ? (
                          <FaCheck className="mt-1 text-sm text-Blue font-2xl" />
                        ) : (
                          <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-xl" />
                        )}
                      </p>
                      <p>
                        <p>{t && t('Auth_password_MustContainNum')}</p>
                      </p>
                    </li>
                    <li className="flex gap-3 ">
                      <p>
                        {isPasswordMatch ? (
                          <FaCheck className="mt-1 text-sm text-Blue font-2xl" />
                        ) : (
                          <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-xl" />
                        )}
                      </p>
                      <p>{t && t('Auth_password_PasswordsMatch')}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <PrimaryButton
            handleClick={submitHandler}
            disabled={
              !validated ||
              // !isContainUppercase ||
              // !isContainLowercase ||
              !isLengthCheck ||
              !isContainNumber ||
              !isContainSpecialChar ||
              !isPasswordMatch
            }
            isLoading={isLoading}
            text={t && t('Auth_signup_create_account')}
            size="large"
          />
        </div>
      </div>
    </div>
  )
}

export default New_Account
