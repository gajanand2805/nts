import React, { useEffect, useState } from 'react'

//* Package Imports

//* Local Imports
import { useRouter } from 'next/router'
import MerchantLogin from '../components/auth/MerchantLogin'
import MerchantSignup from '../components/auth/MerchantSignup'

export default function Auth() {
  //? router
  const router = useRouter()
  const query = router.query
  const [isLoginActive, setIsLoginActive] = useState(
    query.tab == 'signup' ? false : true
  )

  useEffect(() => {
    if (query && query.tab === 'signup') {
      setIsLoginActive(false)
    } else {
      setIsLoginActive('login')
    }
  }, [query])

  return (
    <>
      {isLoginActive ? (
        <MerchantLogin setIsLoginActive={() => setIsLoginActive(false)} />
      ) : (
        <MerchantSignup setIsLoginActive={() => setIsLoginActive(true)} />
      )}
    </>
  )
}
