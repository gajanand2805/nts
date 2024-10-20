import { useClickAway } from '@uidotdev/usehooks'
import axios from 'axios'
import i18n from 'i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillImageFill } from 'react-icons/bs'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { MdDelete } from 'react-icons/md'
import { TbArrowsExchange } from 'react-icons/tb'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalCampaignContext } from '../../contexts/CampaignContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import Input from '../UI/Input'
import SkeletonText from './SkeletonText'

const BroadcastPopup = ({
    isOpen,
    onClose,
    selectedContacts,
}) => {
    const { getCookie } = useGlobalAuthContext()
    const { setSuccessMsg, setErrorMsg } = useGlobalCampaignContext()
    const { t } = useTranslation()

    const router = useRouter()

    const [campaignName, setCampaignName] = useState('');
    const [selectedLang, setSelectedLang] = useState('en');
    const [isCustomCampaign, setIsCustomCampaign] = useState(false)
    const [selectedOption, setSelectedOption] = useState('CTA')
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [text, setText] = useState('')
    const [website, setWebsite] = useState('')
    const [lang, setLang] = useState(selectedLang || 'en');
    const [showLangDropdown, setShowLangDropdown] = useState(false)
    const [isApiLoading, setIsApiLoading] = useState(false)

    // State variables for total cost and number of contacts
    const [totalCost, setTotalCost] = useState(0);
    const [totalContacts, setTotalContacts] = useState(0);

    const LANG_OPTIONS = [
        { title: 'English(en)', value: 'en' },
        // { title: 'Arabic(ar)', value: 'ar' },
    ]

    // Update total cost and number of contacts
    useEffect(() => {
        setTotalContacts(selectedContacts.length);
        setTotalCost(selectedContacts.length * 1); // Multiply by 1 per contact
    }, [selectedContacts]);


    const handleLangSwitch = (lang) => {
        if (selectedLang !== lang && (lang === 'en' || lang === 'ar')) {
            i18n.changeLanguage(lang)
            setSelectedLang(lang)
            router.replace(router.asPath)
        }
    }

    useEffect(() => {
        setLang(selectedLang)
    }, [selectedLang])

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }
    const imageInputRef = useRef(null)
    const handleDeleteImage = () => {
        setImage(null)
        setImagePreview('')
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
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaigns/Broadcast/`

        const formData = new FormData()
        formData.append('name', campaignName)
        formData.append('text', isCustomCampaign ? '$custom' : text)
        formData.append('buttons', "")
        formData.append('website', "")
        formData.append('buttons', buttons)
        // formData.append('website', website)
        formData.append('lang', lang)
        formData.append('contacts', JSON.stringify(selectedContacts));
        if (image) {
            formData.append('image', image)
        }

        // console.log("contacts", selectedContacts)

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
                !campaignId && router.push(`/campaign/${res.data.campaign_id}`)
                setImage(null)
                setSuccessMsg(
                    'Campaign has been successfully initiated. Please select audience in next step.'
                )
            }
        } catch (error) {
            console.error('Error:', error)
            setErrorMsg(t('Campaign_New_Somethingwentwrong'))
        } finally {
            setIsApiLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            e.preventDefault()
        }
        const newValue = e.target.value
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\t/g, '    ') // Replace tab characters with 4 spaces
            .replace(/ {5,}/g, '    ')
        e.target.value = newValue
    }


    const langRef = useClickAway(() => {
        setShowLangDropdown(false)
    })

    if (!isOpen) return null;

    const isContinueDisabled =
        !selectedOption || !text || !campaignName || !lang
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            style={{ zIndex: 9999 }}
        >
            <div className="bg-white p-0 rounded shadow-lg max-w-lg w-full h-[600px] overflow-x-auto">
                <div className="w-full flex flex-col items-start justify-start bg-white dark:bg-bgBlack p-4 gap-4 rounded-[10px] ">
                    <div className="flex items-start justify-between w-full gap-2">
                        <div>
                            <p className="text-xl font-semibold">
                                {t('Campaign_New_NewCampaign')}
                            </p>
                            {/* <p className="mt-1 opacity-80">
                                {t('Campaign_New_IncludesImageTextcontent')}
                            </p> */}
                            <p className="mt-1 opacity-80">
                                Selected Audience: {totalContacts} (Total Cost: ₹{totalCost.toFixed(2)})
                            </p>
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-start w-full h-full max-w-lg gap-3 ">
                        <div className="flex flex-col items-start justify-start w-full gap-6 mobileL:flex-row">

                            {/* Name Field */}

                            <div className="relative flex flex-col items-start justify-center w-full rounded-xl">
                                <p className="flex items-center gap-1 text-base font-semibold capitalize text-BlackSec">
                                    Name
                                </p>
                                <div
                                    className="w-full "
                                    ref={langRef}>
                                    <Input
                                        id="campaign-name"
                                        type="text"
                                        value={campaignName}
                                        onChange={(e) => setCampaignName(e.target.value)}
                                        placeholder="Enter campaign name"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Lang Field */}

                            <div className="relative flex flex-col items-start justify-center w-full rounded-xl">
                                <p className="flex items-center gap-1 text-base font-semibold capitalize text-BlackSec">
                                    {t('Campaign_New_chooseLang')}
                                </p>
                                <div
                                    className="w-full "
                                    ref={langRef}>
                                    <button
                                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                                        className="bg-transparent border-2 border-gray-300 disabled:border-gray-200 flex items-center justify-between text-textBlack text-sm rounded-xl focus:border-bgBlackD w-full p-2.5">
                                        {LANG_OPTIONS.find((option) => option.value === lang)?.title || 'Select Language'}
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
                                            onClick={handleDeleteImage}
                                            className="text-xl text-red-500">
                                            <MdDelete />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <input
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

                        {/* Content */}

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
                                <div className="px-4  bg-white w-full rounded-[10px] dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White  border-2 py-2 shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2  focus-visible:border-Blue dark:focus-visible:border-Blue placeholder:text-BlackSec placeholder:text-[15px]">
                                    <p
                                        className={`w-full mb-1 ${lang === 'en' ? 'text-left' : 'text-right'
                                            }`}>
                                        {lang === 'en' ? 'Dear Customer 👋 !' : '👋 عزيزي العميل. !'}
                                    </p>
                                    <textarea
                                        value={text}
                                        onChange={(e) => {
                                            const newValue = e.target.value
                                                .replace(/(\r\n|\n|\r)/gm, '')
                                                .replace(/\t/g, '    ') // Replace tab characters with 4 spaces
                                                .replace(/ {5,}/g, '    ')
                                            e.target.value = newValue
                                            setText(e.target.value)
                                        }}
                                        onKeyDown={handleKeyDown}
                                        name="content"
                                        id="content"
                                        rows="5"
                                        placeholder={t('Campaign_New_PlaceholderEnterYourContentHere')}
                                        className="py-2 bg-white w-full rounded-[10px] dark:bg-dBlack  dark:text-White dark:placeholder:text-White   text-Black outline-0 placeholder:text-BlackSec placeholder:text-[15px]"></textarea>
                                    <p
                                        className={`w-full ${lang === 'en' ? 'text-left' : 'text-right'
                                            }`}>
                                        {lang === 'en'
                                            ? 'Feel free to ask any questions'
                                            : 'आप कोई भी प्रश्न पूछ सकते हैं'}</p>
                                </div>
                            )}
                        </div>

                        {/* Buttons options */}

                        {/* <div className="flex flex-col items-center justify-center w-full gap-4">
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

                        </div> */}
                        {/*  */}
                    </div>
                    <div className="flex items-center justify-end w-full gap-[5px]">
                        <div></div>
                        <div className="w-full max-w-[80px]">
                            <PrimaryButton
                                handleClick={handleSubmit}
                                isLoading={isApiLoading}
                                disabled={isApiLoading || isContinueDisabled}
                                text="Send"
                            />
                        </div>
                        <div>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded"
                                onClick={onClose}
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default BroadcastPopup;
