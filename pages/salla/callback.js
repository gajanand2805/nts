import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useGlobalAuthContext } from '../../AuthContext'

const SallaCallbackPage = () => {
  const [response, setResponse] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { getCookie } = useGlobalAuthContext()
  const router = useRouter()

  const clientId = 'da4ebceb0985dd818cf64264e77619da'
  const clientSecret = 'c6822d54b307af4b872d41b6fe4367a6'
  const callbackUrl = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/salla/callback`

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
    const subscribeToSallaWebhook = async () => {
      try {
        const config = {
          headers: {
            code: authorizationCode,
            'redirect-uri': callbackUrl,
            Authorization: getCookie('access-token'),
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/salla/subscribe`,
          '',
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
    if (authorizationCode && callbackUrl) {
      subscribeToSallaWebhook()
    }
  }, [router.query])

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen gap-2">
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 text-black dark:text-white">
          <FaSpinner className="text-3xl animate-spin" />
          <p className="text-xl">Connecting your store...</p>
          <p className="opacity-70">
            Please dont close or reload your window. It will take few seconds.
          </p>
        </div>
      )}
    </div>
  )
}

export default SallaCallbackPage
