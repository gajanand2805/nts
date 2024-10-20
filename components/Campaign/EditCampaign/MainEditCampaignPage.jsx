import React, { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext'
import AudienceSection from './AudienceSection'
import EditDetailsSection from './EditDetailsSection'
import MetricsSection from './MetricsSection'

const MainEditCampaignPage = () => {
  const { successMsg, errorMsg, setSuccessMsg, setErrorMsg } =
    useGlobalCampaignContext()
  const successMsgRef = useRef(null)
  const errorMsgRef = useRef(null)

  useEffect(() => {
    if (successMsg) {
      successMsgRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (errorMsg) {
      errorMsgRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [successMsg, errorMsg])
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-5 mt-5">
      {successMsg && (
        <div
          className="flex items-center justify-between w-full gap-4 px-4 py-2 font-semibold text-white bg-green-600 rounded-lg"
          ref={successMsgRef}>
          <p>{successMsg}</p>
          <button
            onClick={() => setSuccessMsg('')}
            className="p-1 text-black bg-white rounded-md dark:bg-black dark:text-white">
            <IoClose />
          </button>
        </div>
      )}
      {errorMsg && (
        <div
          className="flex items-center justify-between w-full gap-4 px-4 py-2 font-semibold text-white bg-red-600 rounded-lg"
          ref={errorMsgRef}>
          <p>{errorMsg}</p>
          <button
            onClick={() => setErrorMsg('')}
            className="p-1 text-black bg-white rounded-md dark:bg-black dark:text-white">
            <IoClose />
          </button>
        </div>
      )}
      <EditDetailsSection />
      <AudienceSection />
      <MetricsSection />
    </div>
  )
}

export default MainEditCampaignPage
