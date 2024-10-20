import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillTag } from 'react-icons/ai'
import { FaCheck, FaCheckSquare, FaSpinner } from 'react-icons/fa'
import tick from '../public/tick.svg'

import { useRouter } from 'next/router'
import {
  MdDelete,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlinePending,
} from 'react-icons/md'
import { useGlobalAuthContext } from '../AuthContext'
import OffboardModal from '../components/Contact/OffboardModal'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import Modal from '../components/Modal'
import PrimaryButton from '../components/UI/Button/PrimaryButton'

const Business_contact = () => {
  const {
    isAccessToken,
    getCookie,
    isLoading,
    setIsLoading,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [Data, setData] = useState({})
  const [OnboardingModal, setOnboardingModal] = useState(false)
  const [isProcess, setIsProcess] = useState(false)
  const [isOffBoardOpen, setIsOffBoardOpen] = useState(false)
  const router = useRouter()

  //----------------------------------------------------------------------------------------------------------------------------

  // Render Contact Data
  useEffect(() => {
    if (isAccessToken) {
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/channel`
      )
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
        },
      })
        .then((res) => wrapper(res))
        .then((data) => {
          setData(data.Contacts)
          setIsLoading(false)
        })
        .catch((r) => { })
    }
  }, [isAccessToken])

  //----------------------------------------------------------------------------------------------------------------------------

  //  Load the Facebook JavaScript  SDK 
  useEffect(() => {
    window.fbAsyncInit = function () {
      // JavaScript SDK configuration and setup
      FB.init({
        //appId: '1201811970392808', //process.env.NEXT_PUBLIC_META_APP_ID, // Facebook App ID
        appId: '446854524391736',
        cookie: true, // enable cookies
        xfbml: true, // parse social plugins on this page
        version: 'v19.0', //Graph API version
      })
    }

      // Load the JavaScript SDK asynchronously
      ; (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
  }, [])

  //----------------------------------------------------------------------------------------------------------------------------

  // Facebook Login with JavaScript SDK
  const launchWhatsAppSignup = () => {
    // Launch Facebook login
    fbq &&
      fbq('trackCustom', 'WhatsAppOnboardingStart', {
        // appId: '1201811970392808',
        appId: '446854524391736',
        feature: 'whatsapp_embedded_signup',
      })

    FB.login(
      async function (response) {
        console.log(response)
        if (response.authResponse?.code) {
          setIsProcess(true)
          setOnboardingModal(true)
          const code = response.authResponse.code
          console.log('code : ', code)
          try {
            const config = {
              headers: {
                'Content-type': 'application/json',
                Authorization: getCookie('access-token'),
                code: code,
              },
            }
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/onboard`,
              '',
              config
            )
            // console.log("res : ", res)
            setData(res.data.Contacts)
            setIsProcess(false)
          } catch (err) {
            console.log(err)
            setOnboardingModal(false)
            setIsProcess(false)
          }
        } else {
          router.reload()
        }
      },
      {
        config_id: '2018344455226298', // configuration ID goes here
        // config_id: '1500454600551244', // configuration ID goes here
        response_type: 'code', // must be set to 'code' for System User access token
        override_default_response_type: true, // when true, any response types passed in the "response_type" will take precedence over the default types
      }
    )
  }

  //----------------------------------------------------------------------------------------------------------------------------

  return (
    <MainScreenWrapper screenHeader={t('Onboard')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div
          className={`relative grow flex flex-col justify-center h-full bg-bgWhiteSec text-Black dark:bg-dBlack dark:text-white`}>
          <main className="flex flex-col items-center w-full h-full ">
            <div className="flex flex-col w-full gap-4 max-w-[360px] px-2">
              <div
                key={Data?.standard_waba?.contact?.display}
                className="flex items-center w-full gap-4">
                <div
                  className={`flex items-center gap-2 px-3 py-2 dark:bg-bgBlack  shadow-sn rounded-lg w-full max-w-[360px] bg-white`}>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center justify-start w-full gap-2">
                      <p>
                        {Data?.custom_waba?.wabaid ? (
                          <MdOutlineCheckBoxOutlineBlank className="text-green-500" />
                        ) : (
                          <FaCheckSquare className="text-green-500" />
                        )}
                      </p>

                      <p className="w-full text-lg font-black whitespace-nowrap">
                        +{Data.standard_waba?.contact?.display}
                      </p>
                    </div>

                    <p></p>
                    <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                      {t('Contacts_type')}
                    </p>
                    <p className="flex items-center gap-1 text-sm font-semibold opacity-70">
                      {'Standard'} <AiFillTag />
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                      {t('Contacts_phoneid')}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-bold">
                      {Data?.standard_waba?.contact?.phoneid}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                      {t('Contacts_wabaid')}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-bold">
                      {Data?.standard_waba?.wabaid}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                      {t('Contacts_template')}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      {Data.standard_waba?.template ? (
                        <>
                          <FaCheck style={{ color: 'green' }} />
                          <p className="text-green-500">
                            {t('Contacts_approved')}
                          </p>
                        </>
                      ) : (
                        <>
                          <MdOutlinePending style={{ color: 'orange' }} />
                          <p className="text-orange-400">
                            {t('Contacts_pending')}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>


              {Data?.custom_waba?.wabaid ? (
                <div
                  key={Data.custom_waba?.contact?.display}
                  className="flex items-center w-full gap-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 dark:bg-bgBlack  shadow-sn rounded-lg w-full max-w-[360px] bg-white relative`}>
                    {Data?.fblogin && (
                      <button
                        onClick={() => setIsOffBoardOpen(true)}
                        className={`absolute text-red-500 top-3 ${selectedLang === 'en' ? 'right-2' : 'left-2'}`}>
                        <MdDelete />
                      </button>
                    )}
                    <div className="grid w-full grid-cols-2 gap-1">
                      <div className="flex items-center justify-start w-full gap-2">
                        <p>
                          <FaCheckSquare className="text-green-500" />
                        </p>

                        <p className="w-full text-lg font-black whitespace-nowrap">
                          +{Data.custom_waba?.contact?.display}
                        </p>
                      </div>

                      <p></p>
                      <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                        {t('Contacts_type')}
                      </p>
                      <p className="flex items-center gap-1 text-sm font-semibold opacity-70">
                        {'Custom'} <AiFillTag />
                      </p>
                      <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                        {t('Contacts_phoneid')}
                      </p>
                      <p className="flex items-center gap-2 text-sm font-bold">
                        {Data.custom_waba?.contact?.phoneid}
                      </p>
                      <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                        {t('Contacts_wabaid')}
                      </p>
                      <p className="flex items-center gap-2 text-sm font-bold">
                        {Data.custom_waba?.wabaid}
                      </p>
                      <p className="flex items-center gap-2 text-sm font-semibold opacity-70">
                        {t('Contacts_template')}
                      </p>

                      <div className="flex items-center gap-1 text-sm font-bold">
                        {Data.custom_waba?.template ? (
                          <>
                            <FaCheck style={{ color: 'green' }} />
                            <p className="text-green-500">
                              {t('Contacts_approved')}
                            </p>
                          </>
                        ) : (
                          <>
                            <MdOutlinePending style={{ color: 'orange' }} />
                            <p className="text-orange-400">
                              {t('Contacts_pending')}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <PrimaryButton
                    text="Disconnect Contact"
                    handleClick={offboard}
                    disabled={isOffBoarding}
                    isLoading={isOffBoarding}
                  /> */}
                </div>
              ) : (
                <button
                  onClick={() => launchWhatsAppSignup()}
                  className="bg-[#5890FF] border-0 rounded-[4px] text-[#fff] cursor-pointer text-base font-bold h-10 py-0 px-6">
                  {t && t('Contacts_loginwithfb')}
                </button>
              )}

              {/* <button
                onClick={() => window.location.href = "/contact_list"}
                className="bg-[#5890FF] border-0 rounded-[4px] text-[#fff] cursor-pointer text-base font-bold h-10 py-0 px-6">
                {t && t('Contact_list_heading')}
              </button> */}
            </div>
          </main>
          <Modal
            isVisible={isOffBoardOpen}
            onClose={() => setIsOffBoardOpen(false)}>
            <OffboardModal
              onClose={() => setIsOffBoardOpen(false)}
              setData={setData}
            />
          </Modal>

          <Modal
            isVisible={OnboardingModal}
            onClose={() => {
              if (isProcess) {
                return
              } else {
                setOnboardingModal(false)
              }
            }}>
            <div className="w-full max-w-xs h-full max-h-[200px] p-4  flex flex-col items-center justify-center bg-white text-black rounded-xl gap-4 dark:bg-bgBlack dark:text-white">
              {isProcess ? (
                <>
                  <FaSpinner className="text-2xl animate-spin" />
                  <div className="flex flex-col items-center justify-center gap-0">
                    <p className="text-lg text-center">
                      {t('Contacts_onboarding_phone_number')}
                    </p>
                    <p className="text-sm text-center opacity-80">
                      {t('Contacts_onboarding_do_not_close_or_refresh')}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-between h-full">
                  <p className="text-center text-md">
                    {t(
                      'Contacts_onboarding_your_phone_number_has_been_updated'
                    )}
                  </p>

                  <div className="w-16 h-16">
                    <Image
                      src={tick}
                      layout="responsive"
                      alt="tick"
                    />
                  </div>

                  <div>
                    <PrimaryButton
                      text={t('ticket_close')}
                      handleClick={() => setOnboardingModal(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
    </MainScreenWrapper>
  )
}

export default Business_contact
