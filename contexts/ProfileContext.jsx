import axios from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useGlobalAuthContext } from '../AuthContext'
const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
  //? contexts
  const {
    isAccessToken,
    getCookie,
    setIsLoading,
    isLoading,
    setBuisnessDetails,
  } = useGlobalAuthContext()

  //? router
  const router = useRouter()

  //? states
  const [profileData, setProfileData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLogoLoading, setIsLogoLoading] = useState(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

  //? functions
  async function getHeader() {
    let auth = true
    fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/Header`,
      {
        method: 'GET',
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.status === 403) {
          auth = false
        }
        return res.json()
      })
      .then(async (data) => {
        if (auth) {
          setBuisnessDetails(data)
        }
      })
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'Business_Name') {
      setProfileData({
        ...profileData,
        Business_Name: value,
        Business_Name_ar: profileData.Business_Name_ar
          ? profileData.Business_Name_ar
          : value,
      })
    }
    if (name === 'Address_line1') {
      setProfileData({
        ...profileData,
        Business_Address: {
          ...profileData.Business_Address,
          Address_line1: value,
        },
        Business_Address_ar: {
          ...profileData.Business_Address_ar,
          Address_line1: profileData.Business_Address_ar.Address_line1
            ? profileData.Business_Address_ar.Address_line1
            : value,
        },
      })
    }
    if (name === 'Address_line2') {
      setProfileData({
        ...profileData,
        Business_Address: {
          ...profileData.Business_Address,
          Address_line2: value,
        },
        Business_Address_ar: {
          ...profileData.Business_Address_ar,
          Address_line2: profileData.Business_Address_ar.Address_line2
            ? profileData.Business_Address_ar.Address_line2
            : value,
        },
      })
    }
    if (name === 'Address_line3') {
      setProfileData({
        ...profileData,
        Business_Address: {
          ...profileData.Business_Address,
          Address_line3: value,
        },
        Business_Address_ar: {
          ...profileData.Business_Address_ar,
          Address_line3: profileData.Business_Address_ar.Address_line3
            ? profileData.Business_Address_ar.Address_line3
            : value,
        },
      })
    }
    if (name === 'Business_NameAr') {
      setProfileData({
        ...profileData,
        Business_Name_ar: value,
        Business_Name: profileData.Business_Name
          ? profileData.Business_Name
          : value,
      })
    }
    if (name === 'Address_line1Ar') {
      setProfileData({
        ...profileData,
        Business_Address_ar: {
          ...profileData.Business_Address_ar,
          Address_line1: value,
        },
        Business_Address: {
          ...profileData.Business_Address,
          Address_line1: profileData.Business_Address.Address_line1
            ? profileData.Business_Address.Address_line1
            : value,
        },
      })
    }
    if (name === 'Address_line2Ar') {
      setProfileData({
        ...profileData,
        Business_Address_ar: {
          ...profileData.Business_Address_ar,
          Address_line2: value,
        },
        Business_Address: {
          ...profileData.Business_Address,
          Address_line2: profileData.Business_Address.Address_line2
            ? profileData.Business_Address.Address_line2
            : value,
        },
      })
    }
    if (name === 'Address_line3Ar') {
      setProfileData({
        ...profileData,
        Business_Address_ar: {
          ...profileData.Business_Address_ar,
          Address_line3: value,
        },
        Business_Address: {
          ...profileData.Business_Address,
          Address_line3: profileData.Business_Address.Address_line3
            ? profileData.Business_Address.Address_line3
            : value,
        },
      })
    }
    if (name === 'contact')
      setProfileData({ ...profileData, Business_Contact: value })
    if (name === 'email')
      setProfileData({ ...profileData, Business_Email: value })
    if (name === 'vat') setProfileData({ ...profileData, VAT: value })
    if (name === 'website')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData.Links,
          Website: value,
        },
      })

    if (name === 'facebook')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData.Links,
          Facebook: value,
        },
      })
    if (name === 'instagram')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData.Links,
          Instagram: value,
        },
      })
    if (name === 'twitter')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData.Links,
          Twitter: value,
        },
      })
  }

  const logoChangeHandler = async (event) => {
    setSelectedFile(event.target.files[0])
  }

  const updateHandler = async (data) => {
    setIsUpdateLoading(true)

    try {
      if (profileData?.Logo_Link) {
        const config = {
          headers: {
            Authorization: getCookie('access-token'),
            'Content-type': 'application/json',
            accept: 'application/json',
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Profile/configure`,
          JSON.stringify(profileData),
          config
        )
        setBuisnessDetails(res.data?.Header)
        setProfileData(res.data?.Profile)
        // await router.push('/profile')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsUpdateLoading(false)
    }
  }

  const providerValue = {
    profileData,
    setProfileData,
    changeHandler,
    logoChangeHandler,
    isLogoLoading,
    isUpdateLoading,
    updateHandler,
  }

  //? effects
  useEffect(() => {
    async function getProfileData() {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
        },
      }
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Profile`,
          config
        )
        setProfileData(res.data)
        setIsLoading(false)
      } catch (err) {
        console.log('error in getting profile data', err)
      }
    }
    if (isAccessToken && router.pathname === '/profile') {
      getProfileData()
    }
  }, [router.pathname, isLoading, isAccessToken])

  useEffect(() => {
    const handleLogo = async () => {
      setIsLogoLoading(true)
      const formData = new FormData()
      formData.append('Image', selectedFile)
      const config = {
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      }
      try {
        const res = await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Profile/logo`,
            formData,
            config
          )
          .catch((err) => wrapper(err.response))
          .catch((r) => { })

        setBuisnessDetails(res.data?.Header)
        setProfileData(res.data?.Profile)
        setTimeout(() => {
          setIsLogoLoading(false)
        }, 1000)
      } catch (error) {
        setIsLogoLoading(false)
      }
    }

    if (selectedFile) {
      console.log(selectedFile)
      handleLogo()
    }
  }, [selectedFile])

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useGlobalProfileContext = () => {
  return useContext(ProfileContext)
}

export { ProfileContext, ProfileProvider }
