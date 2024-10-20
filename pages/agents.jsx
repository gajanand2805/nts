import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalAuthContext } from '../AuthContext';
import MainAgentScreen from '../components/Agent/MainAgentScreen';
import Loader from '../components/Loader';
import MainScreenWrapper from '../components/MainScreenWrapper';

const Agents = () => {
  //? translation
  const { t } = useTranslation()
  const router = useRouter();

  //? context
  const { isSubscribed, isAccessToken, isLoading } = useGlobalAuthContext()

  useEffect(() => {
    if (!isSubscribed && typeof window !== 'undefined') {
      // Only run router.push on the client side
      router.push({
        pathname: '/subscription',
        query: { openModal: true }, // Add query to open the modal
      });
    }
  }, [isSubscribed, router]);


  return (
    <MainScreenWrapper screenHeader={t('Agents_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <MainAgentScreen />
      )}
    </MainScreenWrapper>
  )
}

export default Agents
