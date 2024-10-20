import { useRouter } from 'next/router'
import { useGlobalAuthContext } from '../../AuthContext'
import { LandingPageHeader } from '../LandingPage/LandingPageHeader'
import DashboardHeader from './DashboardHeader'

export default function Header() {
  const { buisnessDetails, isAccessToken, setIsAccessToken } =
    useGlobalAuthContext()
  const { locale, locales, asPath } = useRouter()

  const landingPageHeaderRoutes = [
    '/',
    '/#features',
    '/#services',
    '/pricing',
    '/about-us',
    '/faq',
    '/demo',
    '/privacy',
    '/docs',
    '/docs/integrations/create-order',
    '/docs/integrations/update-order',
    '/docs/integrations/abandoned-cart',
    '/docs/webhooks/salla',
    '/docs/webhooks/woo-commerce',
    '/docs/webhooks/shopify',
    '/docs/webhooks/wix',
  ]

  const isLandingPageHeader = landingPageHeaderRoutes.includes(
    asPath.toLowerCase()
  )

  return (
    <>
      {/* <DarkModeSwitch /> */}
      {isAccessToken && !isLandingPageHeader && <DashboardHeader />}
      {isLandingPageHeader && <LandingPageHeader />}
    </>
  )
}
