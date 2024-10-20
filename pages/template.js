import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../AuthContext'
import MainScreenWrapper from '../components/MainScreenWrapper'
import WhatsappTemplate from '../components/Template/WhatsappTemplate'
import PrimaryButton from '../components/UI/Button/PrimaryButton'
import { useGlobalCampaignContext } from '../contexts/CampaignContext'


const Template = () => {
  const router = useRouter()
  const {
    isSubscribed,
    isLoading,
    setIsLoading,
    getCookie,
    buisnessDetails,
    setProgressActive,
    setHeaderWarning,
    isAccessToken,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()

  const { successMsg, errorMsg, setSuccessMsg, setErrorMsg } =
    useGlobalCampaignContext()

  const { t } = useTranslation()

  // new
  const [templateData, setTemplateData] = useState({})

  // useEffect(() => {
  //   if (!isSubscribed && typeof window !== 'undefined') {
  //     // Only run router.push on the client side
  //     router.push({
  //       pathname: '/subscription',
  //       query: { openModal: true }, // Add query to open the modal
  //     });
  //   }
  // }, [isSubscribed, router]);

  useEffect(() => {
    if (isAccessToken) {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
        },
      }

      const getTemplate = async () => {
        try {
          const res = await axios
            .post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Template`,
              '',
              config
            )
            .catch((err) => wrapper(err.response))

          // const resData =
          //     tempLang === 'en' ? res.data?.en : res.data?.ar
          // console.log(res.data)
          setTemplateData(res.data)

          setIsLoading(false)
        } catch (err) {
          console.log(err)
          setIsLoading(false)
        }
      }
      getTemplate()
    }
  }, [isAccessToken])

  return (
    <MainScreenWrapper
      screenHeader={t('Template_heading')}

      headerItem={
        <div>
          {/* <PrimaryButton
            text={t('Custom_Templates')}
            handleClick={() => router.push('/template/custom')}
          /> */}
          <PrimaryButton
            text={t('Template_New_AddTemplate')}
            handleClick={() => router.push('/template/new')}
          />
        </div>
      }
    >

      <div className="flex flex-col items-start justify-start w-full h-full gap-5 mt-5">
        {successMsg && (
          <div className="flex items-center justify-between w-full gap-4 px-4 py-2 font-semibold text-white bg-green-600 rounded-lg">
            <p>{successMsg}</p>
            <button
              onClick={() => setSuccessMsg('')}
              className="p-1 text-black bg-white rounded-md dark:bg-black dark:text-white">
              <IoClose />
            </button>
          </div>
        )}
        {errorMsg && (
          <div className="flex items-center justify-between w-full gap-4 px-4 py-2 font-semibold text-white bg-red-600 rounded-lg">
            <p>{errorMsg}</p>
            <button
              onClick={() => setErrorMsg('')}
              className="p-1 text-black bg-white rounded-md dark:bg-black dark:text-white">
              <IoClose />
            </button>
          </div>
        )}
      </div>

      <WhatsappTemplate />

      {/* {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : ( */}

      {/* <div className="flex flex-col items-center justify-center w-full gap-8 pt-2 tabletM:items-start tabletM:flex-row">
          <OrderInitTemplate templateData={templateData} />
          <OrderCommitTemplate templateData={templateData} />
          <OrderPushTemplate templateData={templateData} />
        </div> */}
      {/* )} */}
    </MainScreenWrapper>
  )
}

export default Template
