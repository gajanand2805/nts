import axios from 'axios';
import i18n from 'i18next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  //? states
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isAccessToken, setIsAccessToken] = useState(false)
  const [buisnessDetails, setBuisnessDetails] = useState({})

  //? header states
  const [headerWarning, setHeaderWarning] = useState(false)
  const [alpha, setAlpha] = useState(true)
  const [progressActive, setProgressActive] = useState(false)
  const [cookieload, setcookieload] = useState(false)

  //?Language States
  const [selectedLang, setSelectedLang] = useState(i18n.language)
  const [isSubscribed, setIsSubscribed] = useState(false)

  //? functions
  function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }

  function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  function wrapper(res) {
    if (res.status === 403) {
      logout()
      throw new Error('session expired')
    } else {
      return res.json()
    }
  }

  const docsRoutes = [
    '/docs',
    '/docs/integrations',
    '/docs/integrations/create-order',
    '/docs/integrations/update-order',
    '/docs/integrations/abandoned-cart',
    '/docs/webhooks',
    '/docs/webhooks/salla',
    '/docs/webhooks/woo-commerce',
    '/docs/webhooks/shopify',
    '/docs/webhooks/wix',
  ]

  function isPublic(pathname) {
    return (
      pathname === '/' ||
      pathname === '/pricing' ||
      pathname === '/faq' ||
      pathname === '/forgot_password' ||
      pathname === '/auth' ||
      pathname === '/demo' ||
      pathname === '/about-us'
    )
  }
  console.log('PATH', router.pathname)
  function isPrivate(pathname) {
    return (
      pathname === '/contacts' ||
      pathname === '/complete-profile' ||
      pathname === '/subscription' ||
      pathname === '/profile' ||
      pathname === '/api_integration' ||
      pathname === '/api_integration/customise_order' ||
      pathname === '/dashboard' ||
      pathname === '/template' ||
      pathname === '/agents' ||
      pathname === '/campaign' ||
      pathname === '/campaign/new' ||
      pathname === '/campaign/[id]' ||
      pathname === '/health' ||
      pathname === '/support' ||
      pathname === '/support/[ticketId]' ||
      pathname.split('/')[1] === 'inspect' ||
      pathname.split('/')[1] === 'agents' ||
      pathname == '/orders' ||
      pathname == '/chatbot' ||
      pathname == '/failed' ||
      pathname == '/form' ||
      pathname == '/form/analytics' ||
      pathname == '/change_password' ||
      pathname == '/salla/callback' ||
      pathname == '/salla/unsubscribe' ||
      pathname == '/zid/callback' ||
      pathname === '/test' ||
      pathname === '/template/new' ||
      pathname === '/template/custom' ||
      pathname === '/chathistory' ||
      pathname === '/new_users_chat_history' ||
      pathname === '/live_chat' ||
      pathname === '/contact_list'
    )
  }

  function isReset(pathname) {
    return (
      pathname === '/reset_password' ||
      pathname === '/new_account' ||
      pathname === '/privacy' ||
      pathname === '/sandbox'
    )
  }

  const isDocs = (pathname) => {
    return docsRoutes.includes(pathname)
  }

  async function logout() {
    console.log('logout')
    await setIsLoading(true)
    await setBuisnessDetails({})
    await setCookie('access-token', '', 7)
    await setIsAccessToken(false)
  }

  async function login(x) {
    await setCookie('access-token', x, 7)
    await router.push('/dashboard')
    await setIsAccessToken(true)
  }

  async function handle_auth(x) {
    let flag = false
    let check =
      x != '' &&
      Object.keys(buisnessDetails).length === 0 &&
      buisnessDetails.constructor === Object
    if (check) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/Header`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: getCookie('access-token'),
          },
        }
      )
        .then(async function handle_res(res) {
          if (res.status === 403) {
            await logout()
            await setAlpha(x != '')
            await setIsAccessToken(x != '')
            return {}
          } else {
            flag = true
            return res.json()
          }
        })
        .then(async function handle_data(data) {
          if (flag) {
            await setBuisnessDetails(data)
            await setAlpha(x != '')
            await setIsAccessToken(x != '')
          }
        })
    } else {
      await setAlpha(x != '')
      await setIsAccessToken(x != '')
    }
  }
  console.log('auth', isLoading)
  //? effects
  useEffect(() => {
    ; (async () => {
      await setIsLoading(true)
      let x = getCookie('access-token')
      await handle_auth(x)
      const pathname = router.pathname

      if (isDocs(pathname)) {
        setIsLoading(false)
      } else if (isReset(pathname)) {
        if (x != '') {
          logout()
        }
        await setIsLoading(false)
      } else if (isPublic(pathname)) {
        if (x !== '') {
          if (buisnessDetails.Level != undefined) {
            if (buisnessDetails.Level < 1) {
              router.push('/complete-profile')
              await setIsLoading(false)
            } else {
              await router.push('/dashboard')
            }
          }
        } else {
          await setIsLoading(false)
        }
      } else if (isPrivate(pathname)) {
        if (x === '') {
          await router.push('/auth')
          await setIsLoading(false)
        } else {
          if (buisnessDetails.Level !== undefined) {
            if (buisnessDetails.Level < 1) {
              router.push('/complete-profile')
              setIsLoading(false)
            }
            if (buisnessDetails.Level > 0 && pathname === '/complete-profile') {
              await router.push('/dashboard')
              setIsLoading(false)
            }
          }
        }
      } else {
        if (x != '') {
          if (buisnessDetails.Level != undefined) {
            if (buisnessDetails.Level < 1) {
              router.push('/complete-profile')
            } else {
              await router.push('/dashboard')
            }
          }
        } else {
          await router.push('/')
          await setIsLoading(false)
        }
      }
    })()
  }, [isAccessToken, buisnessDetails, router.pathname])

  useEffect(() => {
    const token = getCookie('access-token');
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `${token}`,
      },
    };

    const url = `https://api.shoponcell.com/Dashboard/Subscription/v1.0/checksubscription`;

    const checkSubscription = async () => {
      try {
        const response = await axios.post(url, {}, config);
        const expireAt = new Date(response.data.ExpireAt); // Convert ExpireAt to a Date object
        const today = new Date(); // Get today's date
        // Check if ExpireAt is greater than today's date
        if (expireAt > today) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error('Error while checking subscription:', error);
      }
    };

    checkSubscription();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAccessToken,
        setIsAccessToken,
        setCookie,
        getCookie,
        buisnessDetails,
        setBuisnessDetails,
        headerWarning,
        setHeaderWarning,
        progressActive,
        setProgressActive,
        alpha,
        selectedLang,
        setSelectedLang,
        wrapper,
        login,
        logout,
        isPrivate,
        isSubscribed,
        setIsSubscribed
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useGlobalAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContext, AuthProvider };

