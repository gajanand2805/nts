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

    return (
        <div className="flex items-center p-2 bg-gray-100 rounded-full shadow-md">

            <button
                onClick={onToggleInput}
                className="ml-2 p-2 bg-blue-500 text-white rounded-full shadow-lg"
            >
                Send Invitation
            </button>
        </div>
    );
};

export default MessageInput;
