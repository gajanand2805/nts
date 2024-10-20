import React from 'react'
import { useGlobalAuthContext } from '../AuthContext'
import FAQ from '../components/LandingPage/FAQ'
import Loader from '../components/Loader'

const FAQPage = () => {
  const { isAccessToken, alpha } = useGlobalAuthContext()

  return (
    <div className="flex flex-col items-center w-full bg-white">
      {alpha && <Loader></Loader>}
      {!alpha && (
        <div className="flex flex-col max-w-[2200px] font-['Poppins'] items-center w-full pt-20 ">
          <FAQ />
        </div>
      )}
    </div>
  )
}

export default FAQPage
