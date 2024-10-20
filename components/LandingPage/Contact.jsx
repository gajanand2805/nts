import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../UI/Button/PrimaryButton'

//? Icons

export const Contact = () => {
  //? translations
  const { t, i18n } = useTranslation()

  //? states
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submited, setSubmited] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [errors, setErrors] = useState(null)

  //? functions
  const formOnChangeHandler = (e) => {
    const elementName = e.target.name

    setFormState({
      ...formState,
      [elementName]: e.target.value,
    })
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
  const formSubmitHandler = (e) => {
    e.preventDefault()

    const emailValid = validateEmail(formState.email)
    setErrors(null)
    if (formState.fullName.length < 0) {
      setErrors({ nameError: 'Enter your name please' })
    } else if (formState.email.length < 0) {
      setErrors({ emailError: 'Enter your email please' })
    } else if (formState.message.length < 0) {
      setErrors({ messageError: 'Enter your message please' })
    } else if (!emailValid) {
      setErrors({ ...errors, emailError: 'Invalid Email' })
    } else {
      setIsSubmitting(true)
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/get/form`,
          {
            First_Name: formState.fullName,
            Last_Name: '',
            Email: formState.email,
            Contact: '',
            Company_Name: '',
            Job_Title: '',
            Problem_Solved: formState.message,
          }
        )
        .then((res) => {
          console.log('res', res.data)
          setIsSubmitting(false)
          setFormState({
            fullName: '',
            email: '',
            message: '',
          })
          setSubmited(true)
        })
        .catch((err) => {
          setIsSubmitting(false)
          console.log('Error in request', err)
          setFormState({
            fullName: '',
            email: '',
            message: '',
          })
        })
    }
  }

  useEffect(() => {
    if (formState.fullName && formState.email && formState.message)
      setIsFormValid(true)
    else setIsFormValid(false)
  }, [formState])

  return (
    <div className="flex flex-col items-center justify-center w-full px-5 py-10 text-white bg-white tablet:py-20 tablet:px-12 laptop:px-12 laptopL:px-20">
      <div className=" shadow-lg   relative flex flex-col  z-10 laptop:bg-gradient-to-r from-[#5785F817]/[0.03] to-[#5EC4FF]/30  items-center justify-center gap-7 px-5 tablet:px-8 py-16 flex-wrap tabletM:gap-6 w-full rounded-3xl  max-w-5xl">
        <div className="z-10 flex flex-col items-center  justify-center gap-3   text-[#4A4A4A]">
          <p className="text-2xl font-bold text-center font-josefinSans tablet:text-5xl">
            {t('landing_getintouch_heading')}
          </p>
          <p className="text-center tablet:text-lg">
            {t('landing_getintouch_text')}
          </p>
        </div>
        <form className="z-10 flex items-center w-full gap-8">
          <div className="grid w-full grid-cols-2 gap-3">
            <div className="relative col-span-2 tablet:col-span-1">
              <input
                value={formState.fullName}
                onChange={(e) => {
                  setSubmited(false)
                  setFormState({ ...formState, fullName: e.target.value })
                }}
                name="fullName"
                type="text"
                className="w-full px-4 py-2 text-black bg-white border rounded-lg outline-none tablet:px-5 tablet:py-3 placeholder:text-xs tablet:placeholder:text-sm placeholder:text-gray-400"
                placeholder={t('landing_getintouch_text_box1')}
              />
              {errors?.nameError && (
                <p className="absolute left-0 text-sm font-semibold -top-6 text-Red">
                  {errors?.nameError}
                </p>
              )}
            </div>
            <div className="relative col-span-2 tablet:col-span-1">
              <input
                value={formState.email}
                onChange={(e) => {
                  setSubmited(false)
                  setFormState({ ...formState, email: e.target.value })
                }}
                required
                name="email"
                type="email"
                className="w-full px-4 py-2 text-black bg-white border rounded-lg outline-none tablet:px-5 tablet:py-3 placeholder:text-xs tablet:placeholder:text-sm placeholder:text-gray-400"
                placeholder={t('landing_getintouch_text_box2')}
              />
              {errors?.emailError && (
                <p className="absolute left-0 text-sm font-semibold -top-6 text-Red">
                  {errors?.emailError}
                </p>
              )}
            </div>
            <div className="relative col-span-2">
              <textarea
                value={formState.message}
                onChange={(e) => {
                  setSubmited(false)
                  setFormState({ ...formState, message: e.target.value })
                }}
                required
                name="message"
                type="text"
                rows={3}
                className="z-20 w-full px-4 py-2 text-black bg-white border rounded-lg outline-none tablet:px-5 tablet:py-3 placeholder:text-xs tablet:placeholder:text-sm placeholder:text-gray-400"
                placeholder={t('landing_getintouch_text_box3')}
              />
              {errors?.messageError && (
                <p className="absolute left-0 text-sm font-semibold -top-6 text-Red">
                  {errors?.messageError}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <PrimaryButton
                text={
                  submited
                    ? t('landing_getintouch_sent_successfully')
                    : t('landing_getintouch_button')
                }
                disabled={isSubmitting || !isFormValid}
                handleClick={formSubmitHandler}
                isLoading={isSubmitting}
              />
              {/* <button
                disabled={isSubmitting || !isFormValid}
                onClick={formSubmitHandler}
                className={`bg-Blue border-2 border-Blue hover:bg-[#275de6] ${
                  isSubmitting
                    ? ''
                    : 'disabled:hover:bg-white disabled:hover:text-Blue'
                } cursor-pointer duration-100 transition-all px-5 py-3 rounded-lg text-sm disabled:opacity-90 disabled:cursor-not-allowed mt-2 w-full font-bold`}
                type="submit">
                {isSubmitting ? (
                  <div
                    className={`w-5 h-5 border-2 border-b-0 border-r-0 mx-12 rounded-full animate-spin border-White`}
                  />
                ) : (
                  <span>{t('landing_getintouch_button')}</span>
                )}
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
