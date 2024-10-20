import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useGlobalAuthContext } from '../../AuthContext';
import { useGlobalCampaignContext } from '../../contexts/CampaignContext';

const MessageInput = ({ currentChat, onSendMessage, isInputVisible, onToggleInput }) => {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const { getCookie } = useGlobalAuthContext();
    const [isApiLoading, setIsApiLoading] = useState(false);
    const { setSuccessMsg, setErrorMsg } = useGlobalCampaignContext();
    const fileInputRef = useRef(null);

    const handleSendMessage = async () => {
        const { Contact } = currentChat;
        setMessage('');
        setAttachment(null);

        const formData = new FormData();
        formData.append('Contact', Contact || "");
        let url;

        if (message !== "") {
            url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/whatsapp/sendmessage`;
            formData.append('message', message || "");
        } else {
            url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/whatsapp/send/attachment`;
            formData.append('Attachment', attachment);
        }

        const config = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': getCookie('access-token'),
            },
        };

        try {
            setIsApiLoading(true);
            const res = await axios.post(url, formData, config);

            if (res.data.status) {
                setSuccessMsg('Message sent successfully');
                if (res.data.id) {
                    onSendMessage(res.data.id, 2);
                } else {
                    onSendMessage(message, 1);
                }
            } else {
                setErrorMsg('Failed to send message');
            }
        } catch (error) {
            setErrorMsg('Something went wrong');
        } finally {
            setIsApiLoading(false);
        }
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
        setMessage('');
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        setAttachment(null);
    };

    const handleRemoveAttachment = () => {
        setAttachment(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex items-center p-2 bg-gray-100 rounded-full shadow-md">
            {isInputVisible ? (
                <div className="flex items-center flex-grow space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your message"
                        className="flex-grow px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none"
                        disabled={!!attachment}
                    />
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleAttachmentChange}
                        className="hidden"
                        disabled={!!message}
                        ref={fileInputRef}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`cursor-pointer p-2 rounded-full ${message ? 'bg-gray-300' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a2 2 0 00-2.828-2.828z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 13V7h-6" />
                        </svg>
                    </label>
                    {attachment && (
                        <button onClick={handleRemoveAttachment} className="p-2 bg-red-500 text-white rounded-full">
                            X
                        </button>
                    )}
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 p-2 bg-green-500 text-white rounded-full shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                            <path d="M22 2L11 13"></path>
                            <path d="M22 2L15 22 11 13 2 9 22 2z"></path>
                        </svg>
                    </button>
                </div>
            ) : (
                <button
                    onClick={onToggleInput}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-full shadow-lg"
                >
                    Intervene
                </button>
            )}
        </div>
    );
};

export default MessageInput;
