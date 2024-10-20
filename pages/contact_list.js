import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'
import ContactList from '../components/Contact/ContactList'
import MainScreenWrapper from '../components/MainScreenWrapper'

const Business_contact = () => {
    const {
        isSubscribed,
        isAccessToken,
        getCookie,
        isLoading,
        setIsLoading,
        selectedLang,
        wrapper,
    } = useGlobalAuthContext()
    const { t } = useTranslation()
    const router = useRouter();

    // useEffect(() => {
    //     if (!isSubscribed && typeof window !== 'undefined') {
    //         // Only run router.push on the client side
    //         router.push({
    //             pathname: '/subscription',
    //             query: { openModal: true }, // Add query to open the modal
    //         });
    //     }
    // }, [isSubscribed, router]);

    return (
        <MainScreenWrapper screenHeader={t('Contact_list_heading')}>
            <div className={`relative grow flex flex-col justify-center h-full bg-bgWhiteSec text-Black dark:bg-dBlack dark:text-white`}>
                <ContactList />
            </div>
        </MainScreenWrapper>
    )
}

export default Business_contact
