import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGlobalAuthContext } from "../../AuthContext";
import { useGlobalCampaignContext } from "../../contexts/CampaignContext";
import PrimaryButton from "../UI/Button/PrimaryButton";
import typeDocuemntTemplate from "./assets/document-sample-image.png";
import typeImageTemplate from "./assets/type_image_template.png";
import typeVideoTemplate from "./assets/video-sample-image.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const BroadcastPopup = ({ isOpen, onClose, selectedContacts }) => {
    const { setSuccessMsg, setErrorMsg } = useGlobalCampaignContext();
    const [campaignName, setCampaignName] = useState("");
    const [templates, setTemplates] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [inputs, setInputs] = useState({});
    const [testNumber, setTestNumber] = useState("");
    const textareaRef = useRef(null);
    const [totalCost, setTotalCost] = useState(0);
    const [totalContacts, setTotalContacts] = useState(0);
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const { t } = useTranslation();
    const router = useRouter();
    const [isApiLoading, setIsApiLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [tempateType, setTempateType] = useState("");
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState("");
    const [crousalData, setCrousalData] = useState("");
    const [selectedCrosualFiles, setSelectedCrosualFiles] = useState([]);
    const [crousalFilePreviews, setCrousalFilePreviews] = useState([]);

    const { isLoading, setIsLoading, getCookie, isAccessToken, wrapper } =
        useGlobalAuthContext();

    useEffect(() => {
        setTotalContacts(selectedContacts.length);
        setTotalCost(selectedContacts.length * 1); // Multiply by 1 per contact
    }, [selectedContacts]);

    useEffect(() => {
        if (isAccessToken) {
            const fetchTemplates = async () => {
                try {
                    setFilePreview("");
                    const config = {
                        headers: {
                            accept: "application/json",
                            Authorization: getCookie("access-token"),
                        },
                    };
                    const res = await axios
                        .post(
                            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/WhatsappTemplates`,
                            "",
                            config
                        )
                        .catch((err) => wrapper(err.response));
                    setTemplates(res.data);
                } catch (err) {
                    console.error("Error fetching templates:", err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchTemplates();
        }
    }, [isAccessToken, getCookie, wrapper, setIsLoading]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
        }
    }, [selectedTemplate, inputs]);
    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setFilePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl); // Cleanup
        }
    }, [file]);
    const handleTemplateChange = (e) => {
        const templateKey = e.target.value;
        setSelectedTemplate(templateKey);

        const template = templates[templateKey];
        if (template) {
            setTempateType(template.type);

            if (template.type == "DOCUMENT") {
                setFilePreview(typeDocuemntTemplate);
            } else {
                setFilePreview(typeImageTemplate);
            }
            setCrousalData(template.cardBody);
            const placeholders = template.format.match(/{{\d+}}/g) || [];
            const newInputs = {};
            placeholders.forEach((param) => {
                newInputs[param] = "";
            });
            setInputs(newInputs);
        } else {
            setTempateType("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const getTemplatePreview = () => {
        if (!selectedTemplate) return "";
        const template = templates[selectedTemplate];
        if (template) {
            return template.format.replace(
                /{{(\d+)}}/g,
                (match) => inputs[match] || match
            );
        }
        return "";
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 16 * 1024 * 1024) {
            alert("File size exceeds the 16 MB limit.");
            setFile(null);
            return;
        }
        setFile(file);
    };

    // Handle file change for multiple images
    const handleCrosualFileChange = (event, index) => {
        const file = event.target.files[0]; // Only single file selected
        // Update the state by creating a new array with the file at the specified index
        setSelectedCrosualFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index] = file; // Set the file at the index
            return newFiles; // Return the updated array
        });

        const newPreviewUrl = URL.createObjectURL(file); // Create a URL for the file
        // Update the preview URL for the specific card
        setCrousalFilePreviews((prevPreviews) => {
            const updatedPreviews = [...prevPreviews];
            updatedPreviews[index] = newPreviewUrl; // Set the file preview for the specific index
            return updatedPreviews;
        });
    };

    const handleSubmit = async () => {
        // console.log(Object.values(selectedCrosualFiles));
        // return
        if (!campaignName) {
            setErrorMessage("Campaign name is required.");
            return;
        }

        if (!selectedTemplate) {
            setErrorMessage("Please select a template.");
            return;
        }

        if (tempateType === "IMAGE" || tempateType === "VIDEO") {
            if (!file) {
                setErrorMessage("Please upload " + tempateType);
                return;
            }
        }

        // Check if all required inputs for the selected template are filled
        const template = templates[selectedTemplate];
        if (template) {
            const placeholders = template.format.match(/{{\d+}}/g) || [];
            for (const param of placeholders) {
                if (!inputs[param]) {
                    setErrorMessage(`Please provide value for ${param}.`);
                    return;
                }
            }
        }

        // Ensure no file is missing
        if (crousalData) {
            for (let i = 0; i < crousalData.text.length; i++) {
                if (!selectedCrosualFiles[i]) {
                    setErrorMessage(`Please upload file for card - ${i + 1}.`);
                    return;
                }
            }
        }

        setErrorMessage(""); // Clear previous error messages

        const preview = getTemplatePreview();
        const templateInputsArray = Object.entries(inputs).map(([key, value]) => ({
            key,
            value,
        }));

        const formData = new FormData();
        formData.append("campaignName", campaignName);
        formData.append("templateName", templates[selectedTemplate]?.name);
        formData.append("message", preview);
        formData.append("contacts", JSON.stringify(selectedContacts)); // Make sure contacts is also JSON
        formData.append("templateInputs", JSON.stringify(templateInputsArray));
        if (file) {
            formData.append("file", file);
        }
        console.log("file", file);
        formData.append(
            "cardBody",
            JSON.stringify(templates[selectedTemplate]?.cardBody)
        );
        formData.append("language", templates[selectedTemplate]?.language);
        formData.append("type", templates[selectedTemplate]?.type);
        // Append each carousel file from the array to FormData
        // Append carousel files
        selectedCrosualFiles.forEach((file) => {
            formData.append("crosualFiles", file); // Append each carousel file
        });

        try {
            setIsApiLoading(true);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accept: "application/json",
                    Authorization: getCookie("access-token"),
                },
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/Campaigns/Broadcast`,
                formData,
                config
            );

            if (response.data.status) {
                router.push(`/campaign/${response.data.campaign_id}`);
                setSuccessMsg(
                    "Campaign has been successfully initiated. Please select audience in next step."
                );
            }
        } catch (error) {
            console.error("Error sending broadcast:", error);
            setErrorMessage("Error sending broadcast:", error);
            setIsApiLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            style={{ zIndex: 9999 }}
        >
            <div className=" brodcst-mdl bg-white p-6 rounded shadow-lg w-[55rem] w-full   overflow-y-auto">
                <div className="flex mb-4 border-b border-gray-400 justify-between items-start">
                    <h2 className="text-lg font-semibold mb-2">
                        Create Campaign
                        <p className="text-sm opacity-60">
                            Selected Audience: {totalContacts} (Total Cost: ₹
                            {totalCost.toFixed(2)})
                        </p>
                    </h2>

                    <button className="" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-x-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="campaign-name"
                        className="block text-sm font-semibold mb-2"
                    >
                        Campaign Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        id="campaign-name"
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="   w-full focus:outline-none bg-gray-100  bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                        placeholder="Enter campaign name"
                        required
                    />
                </div>

                <div className="mb-4 flex">
                    <div className="w-1/2 mr-2">
                        <label
                            htmlFor="template-select"
                            className="block text-sm font-semibold mb-2"
                        >
                            Select Template<span className="text-red-500">*</span>
                        </label>
                        <select
                            id="template-select"
                            onChange={handleTemplateChange}
                            className=" w-full focus:outline-none bg-gray-100  bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                        >
                            <option value="">Select a template</option>
                            {Object.keys(templates).map((key) => (
                                <option key={key} value={key}>
                                    {templates[key].name}
                                </option>
                            ))}
                        </select>
                        {tempateType === "VIDEO" && (
                            <div className="mb-4 mt-4">
                                <label
                                    htmlFor="video-upload"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Select Video <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="video-upload"
                                    type="file"
                                    accept="video/*"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        )}

                        {tempateType === "IMAGE" && (
                            <div className="mb-4 mt-4">
                                <label
                                    htmlFor="image-upload"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Select Image <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        )}

                        {tempateType === "DOCUMENT" && (
                            <div className="mb-4 mt-4">
                                <label
                                    htmlFor="ducument-upload"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Select Document <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="ducument-upload"
                                    type="file"
                                    accept=".pdf,.PDF/*"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        )}

                        {crousalData?.mediaType === "IMAGE" &&
                            crousalData.text.map((carousel, index) => (
                                <div className="mb-4 mt-4" key={index}>
                                    <label
                                        htmlFor={`image-upload-${index}`}
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        Select Image for card - {index + 1}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id={`image-upload-${index}`}
                                        type="file"
                                        accept="image/*"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        onChange={(event) => handleCrosualFileChange(event, index)}
                                        required
                                    />
                                </div>
                            ))}

                        {crousalData?.mediaType === "VIDEO" &&
                            crousalData.text.map((carousel, index) => (
                                <div className="mb-4 mt-4" key={index}>
                                    <label
                                        htmlFor={`video-upload-${index}`}
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        Select Video for card - {index + 1}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id={`video-upload-${index}`}
                                        type="file"
                                        accept="video/*"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        onChange={(event) => handleCrosualFileChange(event, index)}
                                        required
                                    />
                                </div>
                            ))}

                        <div className="w-full mt-4">
                            <span className=" text-sm text-red-500">
                                Note: Please use $name for the dynamic Name.
                            </span>
                            {templates[selectedTemplate]?.format
                                .match(/{{\d+}}/g)
                                ?.map((param) => (
                                    <div key={param} className="mb-4">
                                        <label className="block text-sm font-semibold mb-2">
                                            {`Input for ${param}`}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={param}
                                            value={inputs[param] || ""}
                                            onChange={handleInputChange}
                                            className=" w-full focus:outline-none bg-gray-100  bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                                            placeholder={`Enter value for ${param}`}
                                            required
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="w-1/2 ml-2">
                        <h3 className="text-sm font-semibold mb-2">Template Preview</h3>
                        {/* Video Preview */}
                        {tempateType === "VIDEO" && (
                            <div className="mb-2">
                                <video
                                    controls
                                    className="w-full border border-gray-300 rounded h-40 object-cover" // Adjust height as needed
                                    src={filePreview} // replace this with the actual video source URL or state
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        {/* Image Preview */}
                        {tempateType === "IMAGE" && (
                            <div className="mb-2">
                                <Image
                                    width={400}
                                    height={160} // You can adjust these values as needed
                                    src={filePreview}
                                    alt="Template Preview"
                                    className="w-50 h-40 object-cover border border-gray-300 rounded"
                                />
                            </div>
                        )}

                        {/* Document Preview */}
                        {tempateType === "DOCUMENT" && (
                            <div className="mb-2">
                                <iframe
                                    src={filePreview}
                                    width="400"
                                    height="160"
                                    className="w-50 h-40 object-cover border border-gray-300 rounded"
                                    title="PDF Preview"
                                />
                            </div>
                        )}

                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            readOnly
                            rows="1"
                            value={getTemplatePreview()}
                            className=" w-full focus:outline-none bg-gray-100  bg-transparent   rounded-md p-2.5 text-sm text-textBlack"
                        />

                        {/* Crousal Preview */}
                        {tempateType === "CAROUSEL" && (
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
                                        {crousalData.text.map((carousel, index) => (
                                            <>
                                                <SwiperSlide
                                                    style={{
                                                        width: "100%",
                                                        maxWidth: "270px",
                                                        minWidth: "75px",
                                                    }}
                                                    key={index}
                                                >
                                                    <div className="p-2 shadow pb-20 border rounded-md border-gray-200 relative">
                                                        {crousalData?.mediaType === "IMAGE" && (
                                                            <Image
                                                                width={400}
                                                                height={160} // You can adjust these values as needed
                                                                src={
                                                                    crousalFilePreviews[index] ||
                                                                    typeImageTemplate
                                                                }
                                                                alt="Selected"
                                                                className="max-w-full h-auto rounded-md"
                                                            />
                                                        )}
                                                        {crousalData?.mediaType === "VIDEO" && (
                                                            <video
                                                                src={
                                                                    crousalFilePreviews[index] ||
                                                                    typeVideoTemplate
                                                                } // Make sure to define typeImageTemplate
                                                                alt="Selected"
                                                                className="max-w-full h-[150px] rounded-md"
                                                            />
                                                        )}
                                                        {/* Display Text Preview Here */}
                                                        <p className="mt-4 text-base text-gray-800">
                                                            {carousel}
                                                        </p>

                                                        {/* Display Button Preview Here */}

                                                        <p className="mt-4 text-base text-sky-500">
                                                            <FontAwesomeIcon
                                                                icon={faPhone}
                                                                className="mr-2"
                                                            />{" "}
                                                            {crousalData?.buttonPhoneTitle || ""}
                                                        </p>
                                                    </div>
                                                </SwiperSlide>
                                            </>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {errorMessage && (
                    <div className="bg-red-100 text-red-700 py-2 px-4 rounded mb-2">
                        {errorMessage}
                    </div>
                )}
                <div className="flex justify-start space-x-2">
                    <div className="w-full ">
                        <PrimaryButton
                            handleClick={handleSubmit}
                            isLoading={isApiLoading}
                            disabled={isDisabled}
                            text="Send"
                        />
                    </div>
                    <button
                        className="bg-gray-500 w-full text-white py-2 px-4 rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BroadcastPopup;
