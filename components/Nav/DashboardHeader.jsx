import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineContacts, AiOutlineHistory, AiOutlineHome, AiOutlineMessage, AiOutlineSetting, AiOutlineWhatsApp } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { MdCampaign, MdOutlineHealthAndSafety, MdPayment } from 'react-icons/md';
import { useGlobalAuthContext } from '../../AuthContext';

import { useGlobalNavContext } from '../../contexts/NavContext';
import LeftDashboardHeader from './DashboardHeader/LeftDashboardHeader';
import TopDashboardHeader from './DashboardHeader/TopDashboardHeader';

const DashboardHeader = () => {
  //? router
  const router = useRouter()
  const path = router.pathname

  //? context
  const { showProfileDropdown, handleProfileDropDownClick } =
    useGlobalNavContext()
  const { buisnessDetails } = useGlobalAuthContext()

  //? translation
  const { t } = useTranslation()

  //? variables
  const ROUTES = [
    {
      name: t && t('Dashboard_heading'),
      route: '/dashboard',
      icon: <AiOutlineHome />,
    },
    {
      name: t && t('Onboard'),
      route: '/contacts',
      icon: <AiOutlineSetting />,
    },
    {
      name: t && t('Contacts_heading'),
      // route: '/contacts',
      route: '/contact_list',
      icon: <AiOutlineContacts />,
    },
    {
      name: t && t('Subscription_subscription_heading'),
      route: '/subscription',
      icon: <MdPayment />,
    },
    {
      name: 'Live Chat',
      route: '/live_chat',
      icon: <AiOutlineMessage />,
    },
    {
      name: 'Chat History',
      route: '/chathistory',
      icon: <AiOutlineHistory />,
    },
    {
      name: t && t('Campaign_New_Campaign'),
      route: '/campaign',
      icon: <MdCampaign />,
    },
    {
      name: t && t('Template_heading'),
      route: '/template',
      icon: <AiOutlineWhatsApp />,
    },
    {
      name: t && t('Agents_heading'),
      route: '/agents',
      icon: <IoIosPeople />,
    },
    {
      name: t && t('Health_heading'),
      route: '/health',
      icon: <MdOutlineHealthAndSafety />,
    }
  ]

  //? states
  const [active, setActive] = useState(0)
  const [showHeader, setShowHeader] = useState(true)

  //? effects
  useEffect(() => {
    console.log(path)

    if (path == '/dashboard') {
      setActive(0)
    } else if (path == '/contacts') {
      setActive(1)
    } else if (path == '/contact_list') {
      setActive(2)
    } else if (path == '/subscription') {
      setActive(3)
    } else if (path == '/live_chat') {
      setActive(4)
    } else if (path == '/chathistory') {
      setActive(5)
    } else if (['/campaign', '/campaign/[id]'].includes(path)) {
      setActive(6)
    } else if (path == '/template') {
      setActive(7)
    } else if (path == '/agents') {
      setActive(8)
    } else if (path.split('/')[1] == 'inspect') {
      setActive(8)
    } else if (
      path.split('/')[1] == 'agents' ||
      path.split('/')[1] == 'conversation'
    ) {
      setActive(8)
    } else if (path == '/health') {
      setActive(9)
    } else if (path == '/support') {
      setActive('support')
    }

    if (
      ['/salla/callback', '/salla/unsubscribe', '/zid/callback'].includes(path)
    ) {
      setShowHeader(false)
    } else setShowHeader(true)
  }, [path])

  if (!showHeader) {
    return null
  }

  return (
    <>
      <TopDashboardHeader
        active={active}
        routes={ROUTES}
        handleProfileDropDownClick={handleProfileDropDownClick}
        showProfileDropdown={showProfileDropdown}
        buisnessDetails={buisnessDetails}
      />

      <LeftDashboardHeader
        setActive={setActive}
        active={active}
        routes={ROUTES}
      />
    </>
  )
}

DashboardHeader.displayName = 'DashboardHeader'

export default DashboardHeader
