import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { useGlobalAuthContext } from "../../../AuthContext";
import { useGlobalCampaignContext } from "../../../contexts/CampaignContext";
import PrimaryButton from "../../UI/Button/PrimaryButton";
// import previewImage from './assets/AiSensy.png'
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import templateWhatsappImage from "../assets/adTemp-whtsapp.png";
import documentSampleImg from "../assets/document-sample-image.png";
import typeImageTemplate from "../assets/type_image_template.png";
import videoImageTemplate from "../assets/video-sample-image.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const CATEGORY_OPTIONS = [
    { title: "UTILITY", value: "UTILITY" },
    { title: "MARKETING", value: "MARKETING" },
    // { title: 'AUTHENTICATION', value: 'AUTHENTICATION' },
];

const LANGUAGE_OPTIONS = [
    { title: "English", value: "en" },
    { title: "English (US)", value: "en_US" },
    { title: "English (UK)", value: "en_GB" },
    { title: "Hindi", value: "hi" },
];

const TYPE_OPTIONS = [
    { title: "Select Type", value: "" },
    { title: "TEXT", value: "TEXT" },
    { title: "IMAGE", value: "IMAGE" },
    { title: "VIDEO", value: "VIDEO" },
    { title: "DOCUMENT", value: "DOCUMENT" },
    { title: "CAROUSEL", value: "CAROUSEL" },
];

const Media_Type_OPTIONS = [
    { title: "Select Type", value: "" },
    { title: "IMAGE", value: "IMAGE" },
    { title: "VIDEO", value: "VIDEO" },
];

const TemplateForm = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { getCookie, selectedLang, setSelectedLang } = useGlobalAuthContext();
    const { setSuccessMsg, errorMsg, setErrorMsg } = useGlobalCampaignContext();
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
    const [showCrousalDropdown, setShowCrousalDropdown] = useState(false);
    const [crousalMediaType, setCrousalMediaType] = useState(
        Media_Type_OPTIONS[0].value
    );
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [type, setType] = useState(TYPE_OPTIONS[0].value);
    const [name, setName] = useState("");
    const [headerText, setHeaderText] = useState("");
    const [formatText, setFormatText] = useState("");
    const [footer, setFooter] = useState("");
    const [formatBodyTextPlaceholders, setFormatBodyTextPlaceholders] = useState(
        []
    );
    const [formatTextBodyText, setFormatTextBodyText] = useState({});
    const [filePreview, setFilePreview] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [buttonPhoneTitle, setPhoneButtonTitle] = useState("");
    const categoryRef = useRef(null);
    const languageRef = useRef(null);
    const typeRef = useRef(null);
    const [carousels, setCarousels] = useState([]); // State for carousels
    const [headerTexts, setHeaderTexts] = useState([]); // Store carousel values

    const handleTypeSwitch = (value) => {
        if (value == "IMAGE") {
            setFilePreview(typeImageTemplate);
        } else if (value == "DOCUMENT") {
            setFilePreview(documentSampleImg);
        } else if (value == "VIDEO") {
            setFilePreview(videoImageTemplate);
        } else if (value == "CAROUSEL") {
            handleAddCarousel()
        } else {
            setFilePreview("");
        }
    };

    const handleFormatTextChange = (e) => {
        const text = e.target.value;
        setFormatText(text);
        const matches = text.match(/{{(.*?)}}/g) || [];
        const uniqueMatches = [...new Set(matches)];
        setFormatBodyTextPlaceholders(uniqueMatches);
    };

    const handlePlaceholderChange = (key, value) => {
        setFormatTextBodyText((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = async (event) => {
        console.log("headerTexts", headerTexts);
        event.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");

        if (name === "") {
            setErrorMsg("Select template name");
            return;
        } else if (type === "") {
            setErrorMsg("Select template type");
            return;
        } else if (formatText === "") {
            setErrorMsg("Please fill template Format");
            return;
        }

        if (type === "IMAGE") {
            headerText = "";
        }

        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/Template/add`;
        const formData = new FormData();
        formData.append("name", name || "");
        formData.append("category", category || "");
        formData.append("language", language || "");
        formData.append("type", type || "");
        formData.append("headerText", headerText || "");
        formData.append("formatText", formatText || "");
        formData.append("footer", footer || "");
        formData.append("crosualCardsText", headerTexts || "");
        formData.append("buttonPhoneTitle", buttonPhoneTitle || "");
        formData.append("phoneNumber", phoneNumber || "");
        formData.append("crousalMediaType", crousalMediaType || "");
        // Prepare placeholder data for form submission
        const placeholderData = formatBodyTextPlaceholders.map((placeholder) => ({
            name: placeholder.replace(/{{|}}/g, ""),
            value: formatTextBodyText[placeholder.replace(/{{|}}/g, "")] || "",
        }));
        formData.append("formatTextBodyText", JSON.stringify(placeholderData));

        const config = {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: getCookie("access-token"),
            },
        };

        try {
            setIsApiLoading(true);
            const res = await axios.post(url, formData, config);
            console.log("API res:", res.data.status);
            if (res.data.status) {
                setSuccessMsg(res.data.message);
                router.push(`/template`);
            } else {
                setErrorMsg(res.data.message);
                setIsApiLoading(false);
                return;
            }
        } catch (error) {
            setErrorMsg("Something went wrong");
            setIsApiLoading(false);
        } finally {
            setIsApiLoading(false);
        }
    };

    // Function to add a new carousel
    const handleAddCarousel = () => {
        const newCarousel = {
            id: carousels.length, // Use the current length of the array for id
        };
        setCarousels([...carousels, newCarousel]);
        setHeaderTexts([...headerTexts, `carousel-${carousels.length + 1}`]); // Add default value
    };

    // Function to delete a carousel
    const handleDeleteCarousel = (id) => {
        const updatedCarousels = carousels.filter((_, index) => index !== id);
        setCarousels(updatedCarousels);
        const updatedHeaderTexts = headerTexts.filter((_, index) => index !== id);
        setHeaderTexts(updatedHeaderTexts);
    };

    // Function to handle input changes for each carousel
    const handleInputChange = (id, value) => {
        const updatedHeaderTexts = [...headerTexts];
        updatedHeaderTexts[id] = value; // Update the text for the corresponding carousel id
        setHeaderTexts(updatedHeaderTexts);
    };

    const renderPreview = () => {
        let previewText = formatText;
        formatBodyTextPlaceholders.forEach((placeholder) => {
            const key = placeholder.replace(/{{|}}/g, "");
            previewText = previewText.replace(
                new RegExp(`{{${key}}}`, "g"),
                formatTextBodyText[key] || ""
            );
        });

        return (
            <div className="px-3 w-100">
                {type === "TEXT" && <p className="font-bold">{headerText}</p>}

                {filePreview && (
                    <div className="mt-2">
                        <Image
                            src={filePreview}
                            alt="Selected"
                            className="max-w-full h-auto rounded-md"
                        />
                    </div>
                )}

                <div className="pb-10 shadow mb-4 border rounded-md border-gray-200 relative">
                    <div className="absolute -left-4 -top-4">
                        <Image
                            src={templateWhatsappImage}
                            alt="Selected"
                            className=""
                            width={35}
                            height={35}
                        />
                    </div>
                    <p
                        className="text-sm break-words mt-4 ml-4"
                        dangerouslySetInnerHTML={{
                            __html: previewText.replace(/\n/g, "<br>"),
                        }}
                    ></p>
                </div>

                <p className="text-gray-400">{footer}</p>

                {type === "CAROUSEL" && (
                    <div className="mt-2">
                        <div
                            className="overflow-hidden "
                            style={{ width: "100%", maxWidth: "800px", minWidth: "75px" }}
                        >
                            <Swiper
                                slidesPerView={"auto"}
                                centeredSlides={true}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation
                                modules={[Navigation, Pagination]}
                                className="mySwiper  add-teplet-sld"
                                style={{ paddingBottom: "40px", paddingTop: "20px" }}
                            >
                                {carousels.map((carousel, index) => (
                                    <>
                                        <SwiperSlide
                                            style={{
                                                width: "100%",
                                                maxWidth: "270px",
                                                minWidth: "75px",
                                            }}
                                            key={carousel.id}
                                        >
                                            <div className="p-2 shadow pb-20 border rounded-md border-gray-200 relative">
                                                <p
                                                    className="bg-gray-300 absolute -top-3 z-10 -right-3 inline-block p-2 rounded-full"
                                                    onClick={() => handleDeleteCarousel(carousel.id)}
                                                >
                                                    <svg
                                                        className="fill-current text-gray-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={10}
                                                        viewBox="0 0 448 512"
                                                    >
                                                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                    </svg>
                                                </p>
                                                <Image
                                                    src={typeImageTemplate} // Make sure to define typeImageTemplate
                                                    alt="Selected"
                                                    className="max-w-full h-auto rounded-md"
                                                />
                                                {/* Display Text Preview Here */}
                                                <p className="mt-4 text-base text-gray-800">
                                                    {headerTexts[index] || "Preview your text here..."}
                                                </p>

                                                {/* Display Button Preview Here */}
                                                <p className="mt-4 text-base text-sky-500">
                                                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                                    {buttonPhoneTitle || ""}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    </>
                                ))}
                            </Swiper>
                        </div>
                        {/* Button to add new carousel */}
                        <div className="flex justify-center w-100">
                            <button
                                onClick={handleAddCarousel}
                                className="border flex items-center text-white px-4 text-slate-500 py-2 rounded-md mt-4"
                            >
                                <svg
                                    className="mr-2 fill-current text-slate-500 "
                                    width={12}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                                </svg>{" "}
                                Add Card
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col items-start justify-start bg-white dark:bg-bgBlack p-10 gap-8 rounded-[10px] ">
            {/* Two Inputs in Single Row */}
            <div className="flex w-full gap-20  add-temp-cl flex-col laptop:flex-row">
                {/* Name Field */}
                <div className="relative flex flex-col items-start justify-center w-full rounded-xl cl sm 6">
                    <p className="flex gap-1 text-base font-semibold">
                        Template Name<span className="text-red-500">*</span>
                    </p>
                    <span className="text-sm  text-BlackSec  min-h-[40px]">
                        Name can only be in lowercase alphanumeric characters and
                        underscores. Special characters and white-space are not allowed e.g.
                        - app_verification_code
                    </span>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full focus:outline-none bg-gray-100 mt-3 bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                    />
                </div>

                {/* Language Dropdown */}
                <div className="relative flex flex-col items-start justify-center w-full rounded-xl cl sm 6">
                    <p className="flex items-center gap-1 text-base font-semibold">
                        Template Language<span className="text-red-500">*</span>
                    </p>
                    <span className="text-sm  text-BlackSec min-h-[40px]">
                        You will need to specify the language in which message template is
                        submitted.
                    </span>
                    <div className="w-full mt-3" ref={languageRef}>
                        <button
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                            className="bg-gray-100 flex items-center  justify-between text-textBlack text-sm rounded-md focus:border-bgBlackD w-full p-2.5"
                        >
                            {
                                LANGUAGE_OPTIONS.find((option) => option.value === language)
                                    .title
                            }
                            <HiOutlineChevronDown className="text-xl" />
                        </button>
                        {showLanguageDropdown && (
                            <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-auto h-52 flex flex-col items-start justify-between w-full text-sm border-2 border-gray-300 dark:border-White/20 rounded-lg top-[120px] text-textBlack">
                                {LANGUAGE_OPTIONS.map((option) => (
                                    <button
                                        key={option.title}
                                        onClick={() => {
                                            setShowLanguageDropdown(false);
                                            setLanguage(option.value);
                                        }}
                                        className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec py-3 text-left px-2.5 ${language === option.value &&
                                            "bg-gray-200 dark:bg-bgBlackSec"
                                            }`}
                                    >
                                        {option.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Two Inputs in Single Row */}
            <div className="flex w-full gap-20 add-temp-cl flex-col laptop:flex-row">
                {/* Category Dropdown */}
                <div className="relative flex flex-col items-start justify-center w-full rounded-xl cl sm 6">
                    <p className="flex items-center gap-1 text-base font-semibold">
                        Template Category<span className="text-red-500">*</span>
                    </p>
                    <span className="text-sm  text-BlackSec  min-h-[30px]">
                        Your template should fall under one of these categories.
                    </span>
                    <div className="w-full" ref={categoryRef}>
                        <button
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            className="bg-gray-100 flex items-center justify-between text-textBlack text-sm rounded-md focus:border-bgBlackD w-full p-2.5"
                        >
                            {
                                CATEGORY_OPTIONS.find((option) => option.value === category)
                                    .title
                            }
                            <HiOutlineChevronDown className="text-xl" />
                        </button>
                        {showCategoryDropdown && (
                            <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-hidden flex flex-col items-start justify-between w-full text-sm border-2 border-gray-300 dark:border-White/20 rounded-lg top-24 text-textBlack">
                                {CATEGORY_OPTIONS.map((option) => (
                                    <button
                                        key={option.title}
                                        onClick={() => {
                                            setShowCategoryDropdown(false);
                                            setCategory(option.value);
                                        }}
                                        className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec py-3 text-left px-2.5 ${category === option.value &&
                                            "bg-gray-200 dark:bg-bgBlackSec"
                                            }`}
                                    >
                                        {option.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Language Dropdown */}
                <div className="relative flex flex-col items-start justify-center w-full rounded-xl cl sm 6">
                    <p className="flex items-center gap-1 text-base font-semibold">
                        Template Type<span className="text-red-500">*</span>
                    </p>
                    <span className="text-sm  text-BlackSec  min-h-[30px]">
                        Your template type should fall under one of these categories.
                    </span>
                    <div className="w-full" ref={typeRef}>
                        <button
                            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                            className="bg-gray-100 flex items-center justify-between text-textBlack text-sm rounded-md focus:border-bgBlackD w-full p-2.5"
                        >
                            {TYPE_OPTIONS.find((option) => option.value === type).title}
                            <HiOutlineChevronDown className="text-xl" />
                        </button>
                        {showTypeDropdown && (
                            <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-hidden flex flex-col items-start justify-between w-full text-sm border-2 border-gray-300 dark:border-White/20 rounded-lg top-24 text-textBlack">
                                {TYPE_OPTIONS.map((option) => (
                                    <button
                                        key={option.title}
                                        onClick={() => {
                                            setShowTypeDropdown(false);
                                            setType(option.value);
                                            handleTypeSwitch(option.value);
                                        }}
                                        className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec py-3 text-left px-2.5 ${type === option.value && "bg-gray-200 dark:bg-bgBlackSec"
                                            }`}
                                    >
                                        {option.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex w-full gap-20 add-temp-cl flex-col laptopM:flex-row">
                <div className="temp-foot relative flex flex-col items-start justify-center w-1/2 rounded-xl">
                    {/* Header Text Field */}
                    {type === "TEXT" && category !== "AUTHENTICATION" && (
                        <div className="flex flex-col items-start justify-center w-full rounded-xl cl sm 6">
                            <p className="flex items-center gap-1 text-base font-semibold capitalize">
                                Template Header Text (Optional)
                            </p>
                            <span className="text-sm font-semibold text-BlackSec">
                                Header text is optional and only upto 60 characters are allowed.
                            </span>
                            <input
                                type="text"
                                value={headerText}
                                onChange={(e) => setHeaderText(e.target.value)}
                                className="w-full focus:outline-none bg-gray-100 mt-3 bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                            />
                        </div>
                    )}

                    {/* Format Text Field */}
                    <div className="flex flex-col items-start justify-center w-full rounded-xl cl sm 6 mt-[15px]">
                        <p className="flex items-center gap-1 text-base font-semibold">
                            Template Format<span className="text-red-500">*</span>
                        </p>
                        <span className="text-sm font-semibold text-BlackSec">
                            Use text formatting - *bold* , _italic_ & ~strikethrough~ Your
                            message content. Upto 1024 characters are allowed.
                        </span>
                        <textarea
                            value={formatText}
                            onChange={handleFormatTextChange}
                            maxLength={1024}
                            placeholder="For dynamic values, use {{}}. For example, if you want to add a dynamic value, use {{1}}. For a second value, use {{2}}"
                            className="w-full focus:outline-none mt-3 bg-gray-100   rounded-md p-2.5 text-sm text-textBlack"
                            rows="5"
                            onInput={(e) => {
                                e.target.style.height = "auto"; // Reset the height to auto
                                e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scroll height
                            }}

                        />
                    </div>

                    {/* Dynamically Generated Input Fields */}
                    {formatBodyTextPlaceholders.map((placeholder, index) => {
                        const key = placeholder.replace(/{{|}}/g, "");
                        return (
                            <div
                                key={index}
                                className="flex mt-2 flex-col items-start justify-center w-1/2  rounded-xl cl sm 6"
                            >
                                <p className="flex items-center gap-1 text-base font-semibold">
                                    Variable-{key} Value <span className="text-red-500">*</span>
                                </p>
                                <input
                                    type="text"
                                    value={formatTextBodyText[key] || ""}
                                    onChange={(e) => handlePlaceholderChange(key, e.target.value)}
                                    className="w-full focus:outline-none rounded-md bg-gray-100  p-2.5 text-sm text-textBlack"
                                />
                            </div>
                        );
                    })}

                    {/* Footer Field */}
                    {(type === "TEXT" ||
                        type === "IMAGE" ||
                        type === "VIDEO" ||
                        type === "DOCUMENT") &&
                        category !== "AUTHENTICATION" && (
                            <div className="flex flex-col items-start justify-center w-full rounded-xl cl sm 6 mt-[15px]">
                                <p className="flex items-center gap-1 text-base font-semibold">
                                    Template Footer(Optional)
                                </p>
                                <span className="text-sm font-semibold text-BlackSec">
                                    Your message content. Upto 60 characters are allowed.
                                </span>
                                <input
                                    type="text"
                                    value={footer}
                                    placeholder="Enter footer text here"
                                    onChange={(e) => setFooter(e.target.value)}
                                    className="w-full mt-3 focus:outline-none bg-gray-100 rounded-md p-2.5 text-sm text-textBlack"
                                />
                            </div>
                        )}

                    {/* Header Text Field */}
                    {type === "CAROUSEL" && (
                        <>
                            <div className="flex flex-col items-start justify-center w-full rounded-xl cl sm 6 mt-[15px]">
                                <p className="flex items-center gap-1 text-base font-semibold capitalize">
                                    Carousel Media Type
                                </p>
                                <span className="text-sm font-semibold text-BlackSec">
                                    Your carousel template type should fall under one of these
                                    categories.
                                </span>
                                <div className="w-full mt-3" ref={languageRef}>
                                    <button
                                        onClick={() => setShowCrousalDropdown(!showCrousalDropdown)}
                                        className="bg-gray-100 flex items-center  justify-between text-textBlack text-sm rounded-md focus:border-bgBlackD w-full p-2.5"
                                    >
                                        {
                                            Media_Type_OPTIONS.find(
                                                (option) => option.value === crousalMediaType
                                            ).title
                                        }
                                        <HiOutlineChevronDown className="text-xl" />
                                    </button>
                                    {showCrousalDropdown && (
                                        <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-auto flex flex-col items-start w-full text-sm border-2 border-gray-300 dark:border-White/20 rounded-lg top-[120px] text-textBlack">
                                            {Media_Type_OPTIONS.map((option) => (
                                                <button
                                                    key={option.title}
                                                    onClick={() => {
                                                        setShowCrousalDropdown(false);
                                                        setCrousalMediaType(option.value);
                                                    }}
                                                    className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec py-3 text-left px-2.5 ${crousalMediaType === option.value &&
                                                        "bg-gray-200 dark:bg-bgBlackSec"
                                                        }`}
                                                >
                                                    {option.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {carousels.map((carousel, index) => (
                                <div
                                    key={carousel.id}
                                    className="flex flex-col items-start justify-center w-full rounded-xl cl sm 6 mt-[15px]"
                                >
                                    <p className="flex items-center gap-1 text-base font-semibold capitalize">
                                        Card {index + 1} Body<span className="text-red-500">*</span>
                                    </p>
                                    <span className="text-sm font-semibold text-BlackSec">
                                        Your message content. Upto 160 characters are allowed.
                                    </span>
                                    <textarea
                                        value={headerTexts[index] || ""}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        maxLength={160}
                                        rows="3"
                                        onInput={(e) => {
                                            e.target.style.height = "auto"; // Reset the height to auto
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scroll height
                                        }}
                                        className="w-full focus:outline-none bg-gray-100 mt-3 bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                                    />
                                </div>
                            ))}

                            <div className="flex flex-col items-start justify-center w-full rounded-xl cl sm 6 mt-[15px]">
                                <p className="flex items-center gap-1 text-base font-semibold">
                                    Interactive Actions
                                </p>
                                <span className="text-sm font-semibold text-BlackSec">
                                    In addition to your message, you can send actions with your
                                    message. Maximum 25 characters are allowed in CTA button title
                                    & Quick Replies.
                                </span>
                                <div className="flex mt-[15px]">
                                    <label className="text-sm font-semibold">Phone Number<span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={buttonPhoneTitle}
                                        placeholder="Button Title"
                                        onChange={(e) => setPhoneButtonTitle(e.target.value)}
                                        maxLength={25} // Limit to 25 characters
                                        className="w-[150px] mt-1 focus:outline-none bg-gray-100 rounded-md p-2.5 text-sm text-black mr-2"
                                    />
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        placeholder="Phone number with 91"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        maxLength={12}
                                        className="w-[260px] mt-1 focus:outline-none bg-gray-100 rounded-md p-2.5 text-sm text-black"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Preview */}
                <div className="relative temp-foot flex flex-col items-start w-1/2  rounded-xl cl sm 6">
                    <div className="mb-0 w-full">
                        <p className="flex items-center gap-1 text-base font-semibold mb-5">
                            Template Preview
                        </p>
                        {renderPreview()}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between w-full ">
                <div className="text-red-500"><p>{errorMsg}</p></div>
                <div className="w-full max-w-[150px]">
                    <PrimaryButton
                        handleClick={handleSubmit}
                        isLoading={isApiLoading}
                        disabled={isApiLoading}
                        text={t("Create")}
                    />
                </div>
            </div>
        </div>
    );
};

export default TemplateForm;
