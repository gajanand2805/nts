import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalApiIntegrationContext } from '../../contexts/ApiIntegrationContext'

const ZidCallbackPage = () => {
  const [response, setResponse] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { getCookie } = useGlobalAuthContext()
  const router = useRouter()

  const callbackUrl = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/zid/callback`
  const { api } = useGlobalApiIntegrationContext()
  function generateRandomState(length) {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let state = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      state += charset[randomIndex]
    }
    return state
  }

  useEffect(() => {
    const authorizationCode = router.query.code
    const subscribeToZidWebhook = async () => {
      try {
        const config = {
          headers: {
            'redirect-uri': callbackUrl,
            Authorization: getCookie('access-token'),
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/zid/subscribe`,
          {
            code: authorizationCode
          },
          config
        )

        router.push('/api_integration')
        console.log(res)
      } catch (err) {
        console.log(err.response.status);
        if (err.response.status == 409) {
          router.push('/api_integration')

        }
        console.log('Error while subscribing to webhook', err)
      } finally {
        setIsLoading(true)
      }
    }
    const unsubscribeToZidWebhook = async () => {
      try {
        const config = {
          headers: {

            'redirect-uri': callbackUrl,
            Authorization: getCookie('access-token'),
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/zid/unsubscribe`,
          { code: authorizationCode, },
          config
        )

        router.push('/api_integration')
        console.log(res)
      } catch (err) {
        console.log('Error while subscribing to webhook', err)
      } finally {
        setIsLoading(true)
      }
    }
    console.log(authorizationCode, callbackUrl, api[5]?.Zid_Sub)
    if (authorizationCode && callbackUrl && api[5]?.Zid_Sub !== undefined) {
      if (api[5]?.Zid_Sub) {

        unsubscribeToZidWebhook()
      } else {
        subscribeToZidWebhook()
      }
    }
  }, [router.query, api])

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen gap-2">
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 text-black dark:text-white">
          <FaSpinner className="text-3xl animate-spin" />
          <p className="text-xl">{api[5]?.Zid_Sub ? 'Disconnecting' : 'Connecting'} your store...</p>
          <p className="opacity-70">
            Please dont close or reload your window. It will take few seconds.
          </p>
        </div>
      )}
    </div>
  )
}

export default ZidCallbackPage
