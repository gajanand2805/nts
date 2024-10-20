import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { initReactI18next } from 'react-i18next'
import DirectionProvider, {
  DIRECTIONS,
} from 'react-with-direction/dist/DirectionProvider'
import { AuthProvider } from '../AuthContext'
import { Footer } from '../components/Footer'
import Header from '../components/Nav/Header'
import { AgentProvider } from '../contexts/AgentContext'
import { DashboardProvider } from '../contexts/DashboardContext'
import '../styles/globals.css'
// import HTML5Backend from "react-dnd-html5-backend";
import { useRouter } from 'next/router'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ApiIntegrationProvider } from '../contexts/ApiIntegrationContext'
import { CampaignProvider } from '../contexts/CampaignContext'
import { ChatbotBuilderProvider } from '../contexts/ChatbotBuilderContext'
import { NavProvider } from '../contexts/NavContext'
import { OrderProvider } from '../contexts/OrderContext'
import { ProfileProvider } from '../contexts/ProfileContext'
import { SupportProvider } from '../contexts/SupportContext'

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'hi'],
    fallbackLng: ['en', 'ar', 'hi'],
    debug: false,
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
    resources: {
      en: {
        translation: require('../locales/en/translations.json'),
      },
      ar: {
        translation: require('../locales/ar/translations.json'),
      },
    },
  })

function MyApp({ Component, pageProps }) {
  //? states
  const [title, setTitle] = useState('Shoponcell')
  const [showHeader, setShowHeader] = useState(true)
  const [showFooter, setShowFooter] = useState(false)
  const [currentLanguageCode, setCurrentLanguageCode] = useState('en')

  //? routers
  const router = useRouter()

  //? Meta Pixel
  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('1888264998172885') // facebookPixelId
        ReactPixel.pageView()
        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  //? effects
  useEffect(() => {
    if (router.isReady) {
      const routeName = router.pathname
        .split('/')
        .pop()
        .split('-')
        .join(' ')
        .toString()

      let title = routeName.charAt(0).toUpperCase() + routeName.slice(1)
      if (title == '[agentEmail]') {
        title = 'Agent Profile'
      }
      if (title == '[id]') {
        title = 'Inspect'
      }
      if (title == '[ticketId]') {
        title = 'Ticket'
      }
      setTitle(title)
    }
  }, [router])

  useEffect(() => {
    setCurrentLanguageCode(Cookies.get('i18next') || 'en')
    i18n.changeLanguage(Cookies.get('i18next') || 'en')
  }, [Cookies.get('i18next')])

  useEffect(() => {
    if (router.isReady) {
      if (
        router.asPath === '/' ||
        router.asPath === '/demo' ||
        router.asPath === '/privacy' ||
        router.asPath === '/pricing' ||
        router.asPath.startsWith('/#') ||
        router.asPath === '/about-us' ||
        router.asPath.startsWith('/docs')
      )
        setShowFooter(true)
      else setShowFooter(false)

      if (router.asPath === '/complete-profile') {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
    }
  }, [router])



  return (
    <div id="appId">
      <Head>
        <title>{title ? title : 'Shoponcell'}</title>
      </Head>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <DirectionProvider
            direction={
              // currentLanguageCode == 'ar' ? DIRECTIONS.RTL : DIRECTIONS.LTR
              DIRECTIONS.LTR
            }>
            <ProfileProvider>
              <NavProvider>
                <DashboardProvider>
                  <AgentProvider>
                    <ApiIntegrationProvider>
                      <OrderProvider>
                        <CampaignProvider>
                          <SupportProvider>
                            <ChatbotBuilderProvider>
                              {showHeader && <Header />}
                              <Component {...pageProps} />
                              {showFooter && <Footer />}
                            </ChatbotBuilderProvider>
                          </SupportProvider>
                        </CampaignProvider>
                      </OrderProvider>
                    </ApiIntegrationProvider>
                  </AgentProvider>
                </DashboardProvider>
              </NavProvider>
            </ProfileProvider>
          </DirectionProvider>
        </AuthProvider>
      </DndProvider>
    </div>
  )
}

export default MyApp
