import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'
import logoLandscapeDark from '../Logo/logo_landscape_dark.svg'
import logoLandscapeLight from '../Logo/logo_landscape_light.svg'
import DarkModeSwitch from '../components/DarkModeSwitch'
import LanguageChange from '../components/LanguageChange'
import Loader from '../components/Loader'
import Form from '../components/UI/Form'
import { FormInput } from '../components/UI/FormInput'
import editbuttonSvg from '../public/complete-profile/editbutton.svg'

const CompleteProfile = () => {
  //? routers
  const router = useRouter()
  const { t } = useTranslation()

  //? context
  const { isLoading, isAccessToken, getCookie, setBuisnessDetails } =
    useGlobalAuthContext()
  //? states
  //? states
  const [profileData, setProfileData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLogoLoading, setIsLogoLoading] = useState(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [logoError, setLogoError] = useState(false)
  // //? functions

  const requiredValidator = (val) => {
    if (!val) {
      return [t('Complete_Profile_field_required')]
    }

    return []
  }

  const businessNameValidator = (val, formData) => {
    if (val && val.length < 3) return [t('Complete_Profile_3_character')]
    return []
  }

  const addressLineOneValidator = (val, formData) => {
    if (val && val.length < 5) return [t('Complete_Profile_5_character')]
    return []
  }

  // Logo handlers
  const logoChangeHandler = async (event) => {
    setSelectedFile(event.target.files[0])
  }

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
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Profile/logo`,
          formData,
          config
        )
        setBuisnessDetails(res.data?.Header)
        setProfileData((prevProfileData) => {
          return {
            ...prevProfileData,
            Logo_Link: res.data?.Profile?.Logo_Link,
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        setIsLogoLoading(false)
      }
    }

    if (selectedFile) {
      handleLogo()
    }
  }, [selectedFile])

  const changeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'Business_Name') {
      setProfileData({
        ...profileData,
        Business_Name: value,
        Business_Name_ar: value,
      })
    }
    if (name === 'Address_line1') {
      setProfileData({
        ...profileData,
        Business_Address: {
          ...profileData?.Business_Address,
          Address_line1: value,
        },
        Business_Address_ar: {
          ...profileData?.Business_Address_ar,
          Address_line1: value,
        },
      })
    }
    if (name === 'Address_line2') {
      setProfileData({
        ...profileData,
        Business_Address: {
          ...profileData?.Business_Address,
          Address_line2: value,
        },
        Business_Address_ar: {
          ...profileData?.Business_Address_ar,
          Address_line2: value,
        },
      })
    }
    if (name === 'Address_line3') {
      setProfileData({
        ...profileData,
        Business_Address: {
          ...profileData?.Business_Address,
          Address_line3: value,
        },
        Business_Address_ar: {
          ...profileData?.Business_Address_ar,
          Address_line3: value,
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
          ...profileData?.Links,
          Website: value,
        },
      })

    if (name === 'facebook')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData?.Links,
          Facebook: value,
        },
      })
    if (name === 'instagram')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData?.Links,
          Instagram: value,
        },
      })
    if (name === 'twitter')
      setProfileData({
        ...profileData,
        Links: {
          ...profileData?.Links,
          Twitter: value,
        },
      })
  }

  const updateHandler = async () => {
    setLogoError(false)
    setIsUpdateLoading(true)
    try {
      if (selectedFile) {
        const config = {
          headers: {
            Authorization: getCookie('access-token'),
            'Content-type': 'application/json',
            accept: 'application/json',
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Profile/configure`,
          JSON.stringify({ ...profileData, Links: {} }),
          config
        )
        setBuisnessDetails(res.data?.Header)
        setProfileData(res.data?.Profile)
        await router.push('/dashboard')
      } else {
        setLogoError(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsUpdateLoading(false)
    }
  }

  return (
    <div className="w-full h-full bg-white dark:bg-dBlack">
      {isLoading || !isAccessToken ? (
        <Loader />
      ) : (
        <div className="z-50 flex flex-col items-center w-full h-full bg-white dark:bg-dBlack">
          <div className="flex items-center justify-between w-full px-5 py-2">
            <div className="hidden w-36 tablet:w-40 dark:flex">
              <Image
                src={logoLandscapeDark}
                objectFit="cover"
                className=""
                alt=""
              />
            </div>
            <div className="flex w-36 tablet:w-40 dark:hidden">
              <Image
                src={logoLandscapeLight}
                objectFit="cover"
                className=""
                alt=""
              />
            </div>
            <div className="flex flex-row gap-2">
              <DarkModeSwitch />
              <LanguageChange Dark={true} />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[90%] tabletM:w-full tabletM:max-w-[500px] py-10">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold dark:text-white">
                {t('Complete_Profile_heading')}
              </h1>
              <p className="text-sm text-BlackSec">
                {t('Complete_Profile_text')}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="font-semibold text-BlackSec">
                {t('Complete_Profile_businesss')}
              </p>
              <span className="text-red-600 ">*</span>
            </div>

            {profileData?.Logo_Link ? (
              <div className="relative w-[200px] flex items-center justify-center  h-[200px] shadow-md bg-bgWhiteSec rounded-full">
                {isLogoLoading ? (
                  <div className="w-20 h-20 border-t-2 border-black rounded-full animate-spin" />
                ) : (
                  <Image
                    src={profileData?.Logo_Link}
                    alt="Profile Picture"
                    objectFit="cover"
                    layout="fill"
                    priority
                    className="rounded-full"
                  />
                )}
                <label
                  htmlFor="logo"
                  className="absolute bottom-0 right-0 cursor-pointer">
                  <div className="relative w-[50px] h-[50px] z-20 ">
                    <Image
                      src={editbuttonSvg}
                      alt="edit button"
                      objectFit="cover"
                      className="z-20 "
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={logoChangeHandler}
                  className="hidden"
                />
              </div>
            ) : (
              <>
                <label
                  htmlFor="logo"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-bgBlack">
                  {isLogoLoading ? (
                    <div className="w-20 h-20 border-t-2 border-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="px-2 mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            {t('Complete_Profile_upload')}
                          </span>{' '}
                          {t('Complete_Profile_drag')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('Complete_Profile_format')}
                        </p>
                      </div>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/*"
                        onChange={logoChangeHandler}
                        className="hidden"
                      />
                    </>
                  )}
                </label>
                {logoError && (
                  <p className="text-sm font-semibold text-red-500 ">
                    {t('ToContinueWithOnboardingPleaseUploadYourLogo')}
                  </p>
                )}
              </>
            )}

            {/* {currentLang == 'en' ? ( */}
            <Form
              onSubmit={updateHandler}
              initialValues={{
                Business_Name: profileData?.Business_Name,
                Address_line1: profileData?.Business_Address?.Address_line1,
                Address_line2: profileData?.Business_Address?.Address_line2,
                Address_line3: profileData?.Business_Address?.Address_line3,
              }}
              className="flex flex-col justify-start w-full gap-5">
              <FormInput
                label={t('profile_personalinfo_businessname')}
                type="text"
                id="Business_Name"
                validators={[requiredValidator, businessNameValidator]}
                placeholder={t('profile_personalinfo_businessname_placeholder')}
                required={true}
                onChange={changeHandler}
                value={profileData?.Business_Name}
                name="Business_Name"
              />

              <div className="flex flex-col items-center justify-start w-full gap-4">
                <FormInput
                  label={t('profile_personalinfo_addressline1')}
                  type="text"
                  onChange={changeHandler}
                  id="Address_line1"
                  placeholder={t(
                    'profile_personalinfo_addressline1_placeholder'
                  )}
                  validators={[requiredValidator, addressLineOneValidator]}
                  required={true}
                  value={profileData?.Business_Address?.Address_line1}
                  name="Address_line1"
                />
                <FormInput
                  type="text"
                  id="Address_line2"
                  placeholder={t(
                    'profile_personalinfo_addressline2_placeholder'
                  )}
                  onChange={changeHandler}
                  validators={[]}
                  name="Address_line2"
                  label={t('profile_personalinfo_addressline2')}
                />
                <FormInput
                  validators={[]}
                  type="text"
                  id="Address_line3"
                  placeholder={t(
                    'profile_personalinfo_addressline3_placeholder'
                  )}
                  onChange={changeHandler}
                  name="Address_line3"
                  label={t('profile_personalinfo_addressline3')}
                />
              </div>
              <div className="flex items-center justify-start gap-3 w-full tabletM:max-w-[20%]">
                <button
                  className={`w-full py-2 text-sm font-bold disabled:opacity-40 text-white rounded-lg bg-Blue border-2 border-Blue hover:bg-Blue/80 flex items-center justify-center hover:shadow-lg transition-all duration-300`}
                  type="submit">
                  {isUpdateLoading ? (
                    <div
                      className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
                    />
                  ) : (
                    t('Complete_Profile_submit')
                  )}
                </button>
              </div>
            </Form>
            {/* ) : (
              <Form
                onSubmit={updateHandler}
                className="flex flex-col justify-start w-full gap-5"
              >
                <FormInput
                  label={t('profile_personalinfo_businessname')}
                  type="text"
                  id="Business_NameAr"
                  validators={[requiredValidator]}
                  placeholder={t(
                    'profile_personalinfo_businessname_placeholder'
                  )}
                  onChange={changeHandler}
                  required={true}
                  value={profileData?.Business_Name_ar}
                  name="Business_NameAr"
                />

                <div className="flex flex-col items-center justify-start w-full gap-4">
                  <FormInput
                    label={t('profile_personalinfo_addressline1')}
                    type="text"
                    id="Address_line1Ar"
                    placeholder={t(
                      'profile_personalinfo_addressline1_placeholder'
                    )}
                    onChange={changeHandler}
                    validators={[requiredValidator]}
                    required={true}
                    value={profileData?.Business_Address?.Address_line1_ar}
                    name="Address_line1Ar"
                  />
                  <FormInput
                    type="text"
                    id="Address_line2Ar"
                    placeholder={t(
                      'profile_personalinfo_addressline2_placeholder'
                    )}
                    onChange={changeHandler}
                    name="Address_line2Ar"
                    label={t('profile_personalinfo_addressline2')}
                  />
                  <FormInput
                    type="text"
                    id="Address_line3Ar"
                    placeholder={t(
                      'profile_personalinfo_addressline3_placeholder'
                    )}
                    onChange={changeHandler}
                    name="Address_line3Ar"
                    label={t('profile_personalinfo_addressline3')}
                  />
                </div>
                <div className="flex items-center justify-start gap-3 w-full tabletM:max-w-[20%]">
                  <button
                    className={`w-full py-2 text-sm font-bold disabled:opacity-40 text-white rounded-lg bg-Blue border-2 border-Blue hover:bg-Blue/80 flex items-center justify-center hover:shadow-lg transition-all duration-300`}
                    type="submit"
                  >
                    {isUpdateLoading ? (
                      <div
                        className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
                      />
                    ) : (
                      t('Complete_Profile_submit')
                    )}
                  </button>
                </div>
              </Form>
            )} */}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompleteProfile
