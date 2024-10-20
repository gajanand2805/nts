import axios from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'
import Loader from '../components/Loader'

export default function Demo() {
  const [isLoginActive, setIsLoginActive] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const [isError, setIsError] = useState('')
  const [fn, setfn] = useState('')
  const [ln, setln] = useState('')
  const [em, setem] = useState('')
  const [ph, setph] = useState('')
  const [co, setco] = useState('')
  const [jo, setjo] = useState('')
  const [pb, setpb] = useState('')
  const [submit, setsubmit] = useState(false)
  const [isLoad, setisLoad] = useState(false)
  const {
    isLoading,
    setIsLoading,
    setIsAccessToken,
    setCookie,
    mailSent,
    selectedLang,
    login,
    isAccessToken,
    alpha,
  } = useGlobalAuthContext()
  const { t } = useTranslation()
  setIsLoading(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSubmit = async (event) => {
    setisLoad(true)
    event.preventDefault()
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/get/form`,
        {
          First_Name: fn,
          Last_Name: ln,
          Email: em,
          Contact: ph,
          Company_Name: co,
          Job_Title: jo,
          Problem_Solved: pb,
        }
      )
      .then((res) => {
        console.log('res', res.data)
        setisLoad(false)
        setsubmit(true)
      })
      .catch((err) => {
        setisLoad(false)
        console.log('error in request', err)
      })
  }

  return (
    <>
      {alpha && <Loader />}
      {!alpha && (
        <div className="flex w-full h-full bg-white justify-center items-center">
          <div className="flex w-100  laptop:h-screen z-10 items-center justify-center max-w-[1800px]  text-[#575757]  p-5 pt-14">
            <section className="flex flex-col laptop:flex-row items-center justify-center gap-10 px-2 mt-6 mb-5 mx-auto rounded-md">
              <div className="laptop:w-[50%] px-5 laptop:px-10 py-5 justify-center items-center">
                <p className="text-3xl text-[#353535] text-center font-bold">
                  {t('landing_demo_title')}
                </p>
                <p className="text-lg text-[#353535] mt-5 text-center">
                  {t('landing_demo_text')}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div className="flex flex-row md:flex-col gap-3">
                    <div className="w-full">
                      <label
                        className="text-sm font-bold text-[#353535]"
                        htmlFor="username">
                        {t('landing_demo_firstname')}
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder={t('landing_demo_firstname_placeholder')}
                        className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        onChange={(e) => setfn(e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="text-sm font-bold text-[#353535]"
                        htmlFor="username">
                        {t('landing_demo_lastname')}
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder={t('landing_demo_lastname_placeholder')}
                        className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        onChange={(e) => setln(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3">
                    <div className="w-full">
                      <label
                        className="text-sm font-bold text-[#353535]"
                        htmlFor="username">
                        {t('landing_demo_email')}
                      </label>
                      <input
                        id="username"
                        type="email"
                        placeholder={t('landing_demo_email_placeholder')}
                        className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        onChange={(e) => setem(e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="text-sm font-bold text-[#353535]"
                        htmlFor="username">
                        {t('landing_demo_phone')}
                      </label>
                      <input
                        id="username"
                        type="number"
                        placeholder={t('landing_demo_phone_placeholder')}
                        className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        onChange={(e) => setph(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3">
                    <div className="w-full">
                      <label
                        className="text-sm font-bold text-[#353535]"
                        htmlFor="username">
                        {t('landing_demo_company')}
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder={t('landing_demo_company_placeholder')}
                        className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        onChange={(e) => setco(e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="text-sm font-bold text-[#353535]"
                        htmlFor="username">
                        {t('landing_demo_job')}
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder={t('landing_demo_job_placeholder')}
                        className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        onChange={(e) => setjo(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-sm font-bold text-[#353535]"
                      htmlFor="passwordConfirmation">
                      {t('landing_demo_message')}
                    </label>
                    <input
                      id="passwordConfirmation"
                      type="text"
                      placeholder={t('landing_demo_message_placeholder')}
                      className="block w-full px-4 py-2 mt-2 font-semibold text-[#353535] bg-white/20 border border-gray-600 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      onChange={(e) => setpb(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    disabled={submit}
                    className="w-[140px] py-2.5 leading-5 text-white font-bold p-2 transition-colors duration-300 transform bg-Blue rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    type="submit">
                    {isLoad ? (
                      <div className="w-6 h-6 ml-12 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White " />
                    ) : submit ? (
                      t('landing_demo_submitted')
                    ) : (
                      t('landing_demo_submit')
                    )}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  )
}
