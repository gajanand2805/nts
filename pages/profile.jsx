import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DiAptana } from 'react-icons/di'
import { FiUser } from 'react-icons/fi'
import { MdPassword } from 'react-icons/md'
import { useGlobalAuthContext } from '../AuthContext'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import AdditionalInfo from '../components/profile/AdditionalInfo'
import ChangePassword from '../components/profile/ChangePassword'
import PersonalInfo from '../components/profile/PersonalInfo'
export default function Profile() {
  const { isAccessToken, isLoading } = useGlobalAuthContext()
  const { t } = useTranslation()
  const router = useRouter()
  const { tab } = router.query
  let destination = 'personalInfo'
  const [tabActive, setTabActive] = useState(destination)

  useEffect(() => {
    if (tab == 'info') destination = 'personalInfo'
    else if (tab == 'more') destination = 'additionalInfo'
    else if (tab == 'reset') destination = 'changePassword'
    else destination = 'personalInfo'
    setTabActive(destination)
  }, [tab])

  return (
    <MainScreenWrapper
      backLink="/dashboard"
      backText={t('Dashboard_heading')}
      screenHeader={t('profile_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col items-start justify-start w-full h-full gap-2 ">
          <div className="flex w-full gap-10  items-center bg-white dark:bg-bgBlack px-4 rounded-[10px]">
            <button
              onClick={() => setTabActive('personalInfo')}
              className={`flex items-center justify-center gap-2 py-4 text-md font-bold ${
                tabActive == 'personalInfo' && 'border-b-2 border-b-Blue'
              }  text-BlackSec`}>
              <FiUser />
              <p className="hidden tabletM:flex">
                {t('profile_personalinfo_heading')}
              </p>
            </button>
            <button
              onClick={() => setTabActive('additionalInfo')}
              className={`flex items-center justify-center gap-2 py-4 text-md font-bold ${
                tabActive == 'additionalInfo' && 'border-b-2 border-b-Blue'
              }  text-BlackSec`}>
              <span>
                <DiAptana />
              </span>{' '}
              <p className="hidden tabletM:flex">
                {t('Profile_additional_info_heading')}
              </p>
            </button>
            <button
              onClick={() => setTabActive('changePassword')}
              className={`flex items-center justify-center gap-2 py-4 text-md font-bold ${
                tabActive == 'changePassword' && 'border-b-2 border-b-Blue'
              }  text-BlackSec`}>
              <span>
                <MdPassword />
              </span>{' '}
              <p className="hidden tabletM:flex">
                {t('Profile_Changepassword_heading')}
              </p>
            </button>
          </div>
          <div className="flex w-full gap-10 p-4 bg-white dark:bg-bgBlack items-start justify-center rounded-[10px]">
            {tabActive == 'personalInfo' ? (
              <PersonalInfo />
            ) : tabActive == 'additionalInfo' ? (
              <AdditionalInfo />
            ) : (
              <ChangePassword />
            )}
          </div>
        </div>
      )}
    </MainScreenWrapper>
  )
}
