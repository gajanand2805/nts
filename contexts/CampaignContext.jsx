import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useGlobalAuthContext } from '../AuthContext'
const CampaignContext = React.createContext()

const CampaignProvider = ({ children }) => {
  const { isAccessToken, isLoading, getCookie, setIsLoading } =
    useGlobalAuthContext()
  const [campaignData, setCampaignData] = useState([])
  const [currentStep, setCurrentStep] = useState(2)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [inspectData, setInspectData] = useState({})
  const [allInputDissabled, setAllInputDissabled] = useState(false)
  const [viewData, setViewData] = useState(null)
  useEffect(() => {
    if (inspectData?.status !== 'pending') {
      setCurrentStep(3)
      setAllInputDissabled(true)
    } else {
      setAllInputDissabled(false)
      setCurrentStep(2)
    }
  }, [inspectData])

  const getInspectData = async (id) => {
    if (isAccessToken) {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaign/inspect/${id}`
        const config = {
          headers: {
            Authorization: getCookie('access-token'),
          },
        }

        const res = await axios.get(url, config)
        console.log(res.data)
        setInspectData(res.data)
        if (res.data.status !== 'pending') {
          //Fetching view data
          try {
            const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaign/view/${id}`

            const res = await axios.get(url, config)
            console.log(res.data)
            setViewData(res.data)
          } catch (err) {
            console.log('Error in fetching view data', err)
          }
        }
      } catch (err) {
        console.log('Error in campaign table', err)
      }
    }
  }

  return (
    <CampaignContext.Provider
      value={{
        campaignData,
        setCampaignData,
        currentStep,
        setCurrentStep,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        inspectData,
        setInspectData,
        getInspectData,
        allInputDissabled,
        viewData,
        setViewData,
      }}>
      {children}
    </CampaignContext.Provider>
  )
}

export const useGlobalCampaignContext = () => {
  return useContext(CampaignContext)
}

export { CampaignContext, CampaignProvider }
