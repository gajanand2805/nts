import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CgSandClock } from 'react-icons/cg'
import { MdDoneAll, MdOutlinePending } from 'react-icons/md'
import { PiPauseCircleBold } from 'react-icons/pi'
import { RiTimerFill } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import MainEditCampaignPage from '../../components/Campaign/EditCampaign/MainEditCampaignPage'
import MainViewCampaignScreen from '../../components/Campaign/ViewCampaign/MainViewCampaignScreen'
import Loader from '../../components/Loader'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import { useGlobalCampaignContext } from '../../contexts/CampaignContext'

const SingleCampaignPage = () => {
  const { isAccessToken, isLoading, getCookie, setIsLoading } =
    useGlobalAuthContext()
  const { t } = useTranslation()
  const { inspectData, setInspectData, setViewData } =
    useGlobalCampaignContext()

  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    const getInspectData = async () => {
      if (isAccessToken) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaign/inspect/${id}`
          const config = {
            headers: {
              Authorization: getCookie('access-token'),
            },
          }

          setIsLoading(true)

          const res = await axios.get(url, config)
          console.log(res.data)
          setInspectData(res.data)
          if (res.data.status !== 'pending') {
            //Fetching view data
            try {
              const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaign/view/${id}`

              const res = await axios.get(url, config)
              console.log(res.data)
              setViewData(res.data)
            } catch (err) {
              console.log('Error in fetching view data', err)
            }
          }
        } catch (err) {
          console.log('Error in campaign table', err)
        } finally {
          setIsLoading(false)
        }
      }
    }
    getInspectData()
  }, [isAccessToken])

  return (
    <MainScreenWrapper
      backLink="/campaign"
      backText={t('Campaign_New_Gobacktocampaign')}
      headerItem={
        !isLoading && (
          <p className="flex items-center justify-end gap-2 text-lg font-bold capitalize rounded-md">
            {inspectData.status === 'pending' && (
              <>
                <MdOutlinePending className="text-xl text-yellow-500" />
                {t('Campaign_New_Pending')}
              </>
            )}
            {inspectData.status === 'approval' && (
              <>
                <RiTimerFill className="text-xl text-yellow-500" />
                {t('Campaign_New_Approval')}
              </>
            )}
            {inspectData.status === 'ongoing' && (
              <>
                <CgSandClock className="text-xl text-Blue" />
                {t('Campaign_New_Ongoing')}
              </>
            )}
            {inspectData.status === 'completed' && (
              <>
                <MdDoneAll className="text-xl text-green-500" />
                {t('Campaign_New_Completed')}
              </>
            )}
            {inspectData.status === 'paused' && (
              <>
                <PiPauseCircleBold className="text-xl text-violet-500" />
                {t('Campaign_New_Paused')}
              </>
            )}
          </p>
        )
      }
      screenHeader={
        inspectData?.status === 'pending'
          ? t('Campaign_New_NewCampaign')
          : t('Campaign_New_ViewCampaign')
      }>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : inspectData.status == 'pending' ? (
        <MainEditCampaignPage />
      ) : (
        <MainViewCampaignScreen />
      )}
    </MainScreenWrapper>
  )
}

export default SingleCampaignPage
