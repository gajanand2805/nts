import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlusLg } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'

const ChangePassword = ({ changedbuisnessfullDetails }) => {
  const router = useRouter()
  const { selectedLang, getCookie } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  // const [isContainUpperCase, setIsContainUpperCase] = useState(false)
  // const [isContainLowercase, setIsContainLowercase] = useState(false)
  const [isLengthCheck, setIsLengthCheck] = useState(false)
  const [isContainNumber, setIsContainNumber] = useState(false)
  const [isContainSpecialChar, setIsContainSpecialChar] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)
  const [globalSuccess, setGlobalSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    passwordError: '',
    globalError: '',
  })

  const resetErrors = () => {
    setErrors({
      passwordError: '',
      globalError: '',
    })
    setGlobalSuccess('')
  }

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
    return newPassword.length > 0 && newPassword === conPassword
  }

  useEffect(() => {
    // const isContainUpperCase = containsUppercase(newPassword)
    // const isContainLowercase = containsLowercase(newPassword)
    const isLengthCheck = lengthCheck(newPassword)
    const isContainNumber = containsNumber(newPassword)
    const isContainSpecialChar = containsSpecialChar(newPassword)
    // setIsContainUpperCase(isContainUpperCase)
    // setIsContainLowercase(isContainLowercase)
    setIsLengthCheck(isLengthCheck)
    setIsContainNumber(isContainNumber)
    setIsContainSpecialChar(isContainSpecialChar)
    setIsPasswordMatch(passwordMatch())
  }, [newPassword, conPassword])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name == 'oldPassword') {
      setOldPassword(value)
    }

    if (name == 'newPassword') {
      setNewPassword(value)
    }

    if (name == 'conPassword') {
      setConPassword(value)
    }

    console.log(value)
    console.log(value.length)
  }

  const updateHandler = async (e) => {
    e.preventDefault()
    resetErrors()
    if (
      // !isContainUpperCase ||
      // !isContainLowercase ||
      !isLengthCheck ||
      !isContainNumber ||
      !isContainSpecialChar ||
      !isPasswordMatch
    ) {
      setErrors({
        passwordError: '',
        globalError: '',
      })
    } else {
      const config = {
        headers: {
          accept: 'application/json',
          'old-password': oldPassword,
          'new-password': newPassword,
          Authorization: getCookie('access-token'),
        },
      }
      setIsLoading(true)

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/update/password`,
          '',
          config
        )
        resetErrors()
        console.log(res)

        setGlobalSuccess('Your password has been changed!')
        setOldPassword('')
        setNewPassword('')
        // await router.push('/dashboard')
        //await setIsAccessToken(true);
      } catch (err) {
        console.log(err)
        if (err.response?.status == 401) {
          setErrors({
            passwordError: '',
            globalError: 'Auth_err_401',
          })
        } else if (err.response?.status == 403) {
          setErrors({
            passwordError: '',
            globalError: 'Auth_err_403',
          })
        } else {
          setErrors({
            passwordError: '',
            globalError: 'Auth_err_500',
          })
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-end w-full ">
      <div className="flex flex-col items-center justify-start  w-full max-w-[500px] py-5">
        <div className="flex flex-col items-center justify-start w-full gap-5 py-5">
          {errors.globalError && (
            <p className="w-full px-6 py-4 font-medium text-left text-white bg-red-500 rounded-md ">
              {t(errors.globalError)}
            </p>
          )}
          {globalSuccess && (
            <p className="w-full px-6 py-4 font-medium text-left text-white bg-green-500 rounded-md ">
              {t(globalSuccess)}
            </p>
          )}

          <Input
            label={t('Auth_password_reset_oldpass')}
            type="password"
            id="oldPassword"
            placeholder={t('Auth_password_reset_oldpass')}
            onChange={handleChange}
            value={oldPassword}
            name="oldPassword"
          // error={t(errors.emailError)}
          />
          <Input
            label={t && t('Auth_signup_New_Password')}
            type="password"
            id="newPassword"
            placeholder={t && t('Auth_signup_New_Password')}
            onChange={handleChange}
            value={newPassword}
            name="newPassword"
            error={t(errors.passwordError)}
          />
          <Input
            label={t && t('Auth_signup_Confirm_Password')}
            type="password"
            id="conPassword"
            placeholder={t && t('Auth_signup_Confirm_Password')}
            onChange={handleChange}
            value={conPassword}
            name="conPassword"
            error={t(errors.passwordError)}
          />
          <div className="flex flex-col  items-start bg-bgWhiteSec dark:bg-bgBlackSec rounded-[10px] px-4 py-2">
            <p className="mb-1 text-sm font-semibold uppercase text-BlackSec">
              {t && t('Auth_password_PassConstraints')}
            </p>
            <ul className="flex flex-col items-start gap-1">
              <li className="flex gap-3 ">
                <p>
                  {isLengthCheck ? (
                    <FaCheck className="mt-1 text-sm text-Blue font-xl" />
                  ) : (
                    <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-2xl" />
                  )}
                </p>
                <p>{t && t('Auth_password_MustContain8')}</p>
              </li>
              {/* <li className="flex gap-3 ">
                <p>
                  {isContainLowercase && isContainUpperCase ? (
                    <FaCheck className="mt-1 text-sm text-Blue font-xl" />
                  ) : (
                    <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-2xl" />
                  )}
                </p>
                <p>{t && t('Auth_password_MustContainLetter')}</p>
              </li> */}
              <li className="flex gap-3 ">
                <p>
                  {isContainNumber && isContainSpecialChar ? (
                    <FaCheck className="mt-1 text-sm text-Blue font-xl" />
                  ) : (
                    <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-2xl" />
                  )}
                </p>
                <p>{t && t('Auth_password_MustContainNum')}</p>
              </li>
              <li className="flex gap-3 ">
                <p>
                  {isPasswordMatch ? (
                    <FaCheck className="mt-1 text-sm text-Blue font-xl" />
                  ) : (
                    <BsPlusLg className="mt-1 text-sm text-red-500 rotate-45 font-2xl" />
                  )}
                </p>
                <p>{t && t('Auth_password_PasswordsMatch')}</p>
              </li>
            </ul>
          </div>
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
            disabled={
              isLoading ||
              !isLengthCheck ||
              // !isContainUpperCase ||
              // !isContainLowercase ||
              !isContainNumber ||
              !isContainSpecialChar ||
              !isPasswordMatch
            }
            isLoading={isLoading}
            handleClick={updateHandler}
            text={t('update')}
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
