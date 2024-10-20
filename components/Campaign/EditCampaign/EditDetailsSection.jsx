import { useClickAway } from '@uidotdev/usehooks'
import axios from 'axios'
import i18n from 'i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillImageFill } from 'react-icons/bs'
import { FiChevronRight } from 'react-icons/fi'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { MdDelete, MdPending } from 'react-icons/md'
import { TbArrowsExchange, TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { useGlobalAuthContext } from '../../../AuthContext'
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext'
import ToggleButton from '../../ToggleButton'
import PrimaryButton from '../../UI/Button/PrimaryButton'
import Input from '../../UI/Input'
import SkeletonText from '../SkeletonText'

const EditDetailsSection = () => {
  const { t } = useTranslation()

  const { getCookie, selectedLang, setSelectedLang } = useGlobalAuthContext()

  const {
    currentStep,
    setCurrentStep,
    setSuccessMsg,
    setErrorMsg,
    inspectData,
    allInputDissabled,
    getInspectData,
  } = useGlobalCampaignContext()

  const router = useRouter()
  const [isCustomCampaign, setIsCustomCampaign] = useState(
    inspectData?.content?.text === '$custom'
  )
  const [selectedOption, setSelectedOption] = useState('CTA')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [text, setText] = useState('')
  const [website, setWebsite] = useState('')
  const [lang, setLang] = useState(selectedLang)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)

  const LANG_OPTIONS = [
    { title: 'English(en)', value: 'en' },
    { title: 'Arabic(ar)', value: 'ar' },
  ]
  const options = [
    { id: 'CTA', label: t('Campaign_New_CallToAction') },
    { id: 'Buttons', label: t('Campaign_New_Buttons') },
  ]

  const handleLangSwitch = (lang) => {
    if (selectedLang !== lang && (lang === 'en' || lang === 'ar')) {
      i18n.changeLanguage(lang)
      setSelectedLang(lang)
      router.replace(router.asPath)
    }
    // if (selectedLang === 'en') {
    //     i18n.changeLanguage('ar')
    //     setSelectedLang('ar')
    //     router.replace(router.asPath)
    // } else {
    //     i18n.changeLanguage('en')
    //     setSelectedLang('en')
    //     router.replace(router.asPath)
    // }
  }

  useEffect(() => {
    setLang(selectedLang)
  }, [selectedLang])

  useEffect(() => {
    if (inspectData?.campaign_ID) {
      inspectData?.buttons
        ? setSelectedOption('Buttons')
        : setSelectedOption('CTA')
      inspectData?.content.image && setImagePreview(inspectData?.content.image)
      inspectData?.content.lang === 'ar' && setLang('ar')
      inspectData?.content.text && setText(inspectData?.content.text)
      inspectData?.content.website && setWebsite(inspectData?.content.website)
    }
  }, [inspectData])

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }
  const imageInputRef = useRef(null)
  const handleDeleteImage = () => {
    setImage(null)
    if (imageInputRef.current) {
      imageInputRef.current.value = null
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccessMsg('')
    setErrorMsg('')
    const campaignId = router?.query?.id
    const buttons = selectedOption === 'Buttons'

    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaigns/new/?campaign_id=${campaignId}`

    const formData = new FormData()
    formData.append('text', isCustomCampaign ? '$custom' : text)
    formData.append('buttons', buttons)
    formData.append('website', website)
    formData.append('lang', lang)
    if (image) {
      formData.append('image', image)
    }
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: getCookie('access-token'),
      },
    }
    try {
      setIsApiLoading(true)
      const res = await axios.post(url, formData, config)
      console.log('API res:', res.data)
      if (res.data.status) {
        await getInspectData(campaignId)
        !campaignId && router.push(`/campaign/${res.data.campaign_id}`)
        setCurrentStep(currentStep + 1)
        setSuccessMsg(t('Campaign_New_Campaignbeensuccessfullyedited'))
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMsg(t('Campaign_New_Somethingwentwrong'))
    } finally {
      setIsApiLoading(false)
    }
  }

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId)
  }
  const langRef = useClickAway(() => {
    setShowLangDropdown(false)
  })

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
    const newValue = e.target.value
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\t/g, '    ') // Replace tab characters with 4 spaces
      .replace(/ {5,}/g, '    ')
    e.target.value = newValue
  }

  useEffect(() => {
    if (isCustomCampaign === true) {
      setSelectedOption('CTA')
      setText('$custom')
    } else {
      if (inspectData?.content?.text !== '$custom') {
        setText(inspectData.content.text)
      } else {
        setText('')
      }
    }
  }, [isCustomCampaign, inspectData])

  const isContinueDisabled =
    !selectedOption || !text || (selectedOption == 'CTA' && !website) || !lang

  const hasDataChanged =
    image ||
    text !== inspectData?.content?.text ||
    website !== inspectData?.content?.website ||
    lang !== inspectData?.content?.lang
  return (
    <div className="w-full flex flex-col items-start justify-start bg-white dark:bg-bgBlack p-4 gap-8 rounded-[10px] ">
      <Header
        t={t}
        hasDataChanged={hasDataChanged}
      />

      {currentStep === 1 && (
        <>
          <div className="flex flex-col items-center justify-start w-full h-full max-w-lg gap-4 ">
            <div className="flex flex-col items-start justify-start w-full gap-6 mobileL:flex-row">
              {/* Toogle Button */}
              <div className="relative flex flex-col items-start justify-center p-2 rounded-xl">
                <p className="flex items-center gap-1 text-base font-semibold text-BlackSec whitespace-nowrap">
                  {t('Campaign_New_CustomCampaign')}
                </p>
                <div>
                  <ToggleButton
                    // small
                    toggleHandler={() => setIsCustomCampaign(!isCustomCampaign)}
                    toggleStatus={isCustomCampaign}
                    // isLoading={botToggleLoader}
                    selectedLang={selectedLang}
                  />
                </div>
              </div>

              {/* Lang Field */}

              <div className="relative flex flex-col items-start justify-center w-full p-2 rounded-xl">
                <p className="flex items-center gap-1 text-base font-semibold capitalize text-BlackSec">
                  {t('Campaign_New_chooseLang')}
                </p>
                <div
                  className="w-full "
                  ref={langRef}>
                  <button
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    disabled={allInputDissabled}
                    className="bg-transparent border-2 border-gray-300 disabled:border-gray-200 flex items-center justify-between text-textBlack text-sm rounded-xl focus:border-bgBlackD w-full p-2.5">
                    {LANG_OPTIONS.find((option) => option.value === lang).title}
                    <HiOutlineChevronDown className="text-xl" />
                  </button>
                  {showLangDropdown && (
                    <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-hidden flex flex-col items-start justify-between w-full text-sm  border-2 border-gray-300 dark:border-White/20 rounded-lg top-[72px] text-textBlack ">
                      {LANG_OPTIONS.map((option, i) => (
                        <button
                          key={option.title}
                          onClick={() => {
                            setShowLangDropdown(false)
                            setLang(option.value)
                            handleLangSwitch(option.value)
                          }}
                          className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec py-3 text-left px-2.5 ${lang === option.value &&
                            'bg-gray-200 dark:bg-bgBlackSec'
                            }`}>
                          {option.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image field */}

            <div className="flex flex-col items-start justify-start w-full gap-3">
              <div className="flex items-center justify-between w-full gap-4">
                <p className="font-semibold capitalize text-BlackSec">
                  {t('Campaign_New_SelectImage')}
                </p>
                {imagePreview && (
                  <div className="flex items-center justify-center gap-4">
                    <label
                      htmlFor="image"
                      className="text-xl cursor-pointer text-Blue">
                      <TbArrowsExchange />
                    </label>
                    <button
                      disabled={allInputDissabled}
                      onClick={handleDeleteImage}
                      className="text-xl text-red-500">
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
              <input
                disabled={allInputDissabled}
                ref={imageInputRef}
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Selected"
                  width={500}
                  height={300}
                  layout="intrinsic"
                  objectFit="contain"
                />
              ) : (
                <label
                  htmlFor="image"
                  className="flex cursor-pointer flex-col items-center justify-center w-full h-[200px] bg-gray-100 dark:bg-bgBlackSec  rounded-t-[10px]">
                  <p className="text-3xl opacity-50">
                    <BsFillImageFill />
                  </p>
                </label>
              )}
            </div>

            {/* Content Filed */}
            <div className="flex flex-col items-start justify-center w-full gap-2 ">
              <label
                htmlFor="content"
                className="flex items-center gap-1 text-base font-semibold capitalize text-BlackSec">
                <span>{t('Campaign_New_EnterContent')}</span>
                <span className="text-red-600">*</span>
              </label>
              {isCustomCampaign ? (
                <SkeletonText />
              ) : (
                <div className="px-4  bg-white w-full rounded-[10px] dark:bg-dBlack  dark:text-White  dark:border-White/20  border-2 py-2 shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2  focus-visible:border-Blue dark:focus-visible:border-Blue">
                  <p
                    className={`w-full mb-1 ${lang === 'en' ? 'text-left' : 'text-right'
                      }`}>
                    {lang === 'en'
                      ? 'Dear Customer 👋 !'
                      : 'عزيزي العميل. 👋 !'}
                  </p>
                  <textarea
                    disabled={allInputDissabled}
                    value={text}
                    onChange={(e) => {
                      const newValue = e.target.value
                        .replace(/(\r\n|\n|\r)/gm, '')
                        .replace(/\t/g, '    ') // Replace tab characters with 4 spaces
                        .replace(/ {5,}/g, '    ') // Replace more than 4 consecutive spaces with 4 spaces
                      e.target.value = newValue
                      setText(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={t(
                      'Campaign_New_PlaceholderEnterYourContentHere'
                    )}
                    name="content"
                    id="content"
                    rows="4"
                    className="py-2 bg-white w-full rounded-[10px] dark:bg-dBlack  dark:text-White dark:placeholder:text-White   text-Black outline-0 placeholder:text-BlackSec placeholder:text-[15px]"></textarea>
                  <p
                    className={`w-full ${lang === 'en' ? 'text-left' : 'text-right'
                      }`}>
                    {lang === 'en'
                      ? 'Feel free to ask any questions'
                      : 'سعداء بالإجابة عن أي استفسار'}
                  </p>
                </div>
              )}
            </div>
            {/* Buttons */}

            <div className="flex flex-col items-center justify-center w-full gap-4">
              {isCustomCampaign !== true && (
                <div className="flex items-center justify-end w-full gap-5">
                  {options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center cursor-pointer transition-colors ${selectedOption === option.id
                        ? 'text-blue-500'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}>
                      <input
                        type="radio"
                        id={option.id}
                        name="radioGroup"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => handleOptionChange(option.id)}
                        className="mr-2 accent-Blue"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}

              {selectedOption === 'Buttons' && (
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <button
                    disabled
                    className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White rounded-[10px] text-center dark:placeholder:text-White  border-2 py-2 shadow-sm  text-Black outline-0   border-Blue placeholder:text-BlackSec placeholder:text-[15px]">
                    {t('Campaign_New_TrackOrderStatus')}
                  </button>
                  <button
                    disabled
                    className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White rounded-[10px] text-center dark:placeholder:text-White  border-2 py-2 shadow-sm  text-Black outline-0   border-Blue placeholder:text-BlackSec placeholder:text-[15px]">
                    {t('Campaign_New_FrequentlyAskedQuestion')}
                  </button>
                  <button
                    disabled
                    className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White rounded-[10px] text-center dark:placeholder:text-White  border-2 py-2 shadow-sm  text-Black outline-0   border-Blue placeholder:text-BlackSec placeholder:text-[15px]">
                    {t('Campaign_New_ContactCustomerSupport')}
                  </button>
                </div>
              )}
              {selectedOption === 'CTA' && (
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <button
                    disabled
                    className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White rounded-[10px] text-center dark:placeholder:text-White  border-2 py-2 shadow-sm  text-Black outline-0   border-Blue placeholder:text-BlackSec placeholder:text-[15px]">
                    {t('Campaign_New_Visitwebsite')}
                  </button>
                  <Input
                    name="website"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    label={t('Campaign_New_Enterwebsitelink')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between w-full ">
            <div></div>
            <div className="w-full max-w-[150px]">
              {hasDataChanged ? (
                <PrimaryButton
                  handleClick={handleSubmit}
                  isLoading={isApiLoading}
                  disabled={
                    isApiLoading || isContinueDisabled || allInputDissabled
                  }
                  text={t('Campaign_New_SaveAndContinue')}
                />
              ) : (
                <PrimaryButton
                  handleClick={() => setCurrentStep(2)}
                  disabled={isContinueDisabled}
                  text={t('Campaign_New_Continue')}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EditDetailsSection

const Header = ({ t, hasDataChanged }) => {
  return (
    <div className="flex items-start justify-between w-full gap-2">
      <div>
        <p className="text-xl font-semibold">
          {' '}
          {t('Campaign_New_NewCampaign')}
        </p>
        <p className="mt-1 opacity-80">
          {t('Campaign_New_IncludesImageTextcontent')}
        </p>
      </div>
      <div className="flex items-center justify-center gap-8">
        {hasDataChanged ? (
          <p className="flex items-center justify-center gap-3 text-lg">
            <MdPending className="text-2xl text-yellow-500" />{' '}
            {t('Campaign_New_Pending')}
          </p>
        ) : (
          <p className="flex items-center justify-center gap-3 text-lg">
            <TbSquareRoundedCheckFilled className="text-2xl text-green-500" />{' '}
            {t('Campaign_New_Completed')}
          </p>
        )}
        <p className="hidden text-4xl opacity-70 mobileL:block">
          <FiChevronRight />
        </p>
      </div>
    </div>
  )
}
