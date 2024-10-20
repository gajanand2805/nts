import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import MainCampaignScreen from '../../components/Campaign/MainCampaignScreen'
import Loader from '../../components/Loader'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import PrimaryButton from '../../components/UI/Button/PrimaryButton'
import { useGlobalCampaignContext } from '../../contexts/CampaignContext'
const CampaignPage = () => {
  //? translation
  const { t } = useTranslation()

  //? context
  const { isSubscribed, isAccessToken, isLoading, getCookie, setIsLoading } =
    useGlobalAuthContext()
  const { setCampaignData } = useGlobalCampaignContext()
  const router = useRouter()

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
    const getCampaignData = async () => {
      if (isAccessToken) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaigns`
          const config = {
            headers: {
              Authorization: getCookie('access-token'),
            },
          }

          setIsLoading(true)

          const res = await axios.get(url, config)
          console.log(res.data)
          setCampaignData(res.data)
        } catch (err) {
          console.log('Error in campaign table', err)
        } finally {
          setIsLoading(false)
        }
      }
    }
    getCampaignData()
  }, [isAccessToken])

  return (
    <MainScreenWrapper
      screenHeader={t('Campaign_New_Campaign')}
      headerItem={
        <div>
          <PrimaryButton
            text={t('Campaign_New_AddCampaign')}
            // handleClick={() => router.push('/campaign/new')}
            handleClick={() => router.push('/contact_list')}
          />
        </div>
      }>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <MainCampaignScreen />
      )}
    </MainScreenWrapper>
  )
}

export default CampaignPage
