import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useGlobalAuthContext } from '../../AuthContext';
import Message from './Message';
import MessageInput from './MessageInput';
import UserProfileTab from './UserProfileTab';

const socketUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/get_conversation_history`;

const getCurrentUTCTimestamp = () => {
    const currentDate = new Date()
    const utcTimestamp = currentDate.toISOString()
    return utcTimestamp
}

const ChatWindow = ({ currentChat, isInputVisible, setIsInputVisible }) => {
    const [chatState, setChatState] = useState({ ...currentChat, Messages: [] });
    const [isResolved, setIsResolved] = useState(false); // State to track if chat is resolved
    const { getCookie } = useGlobalAuthContext();
    const messagesEndRef = useRef(null);
    const [ws, setWs] = useState(null);
    const [userInfo, setuserInfo] = useState(null); // State to track if chat is resolved

    const config = {
        headers: {
            Authorization: getCookie('access-token'),
            'Content-type': 'application/json',
        },
    };

    const handleToggleInput = async () => {
        try {
            const intervene_url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/invite`;
            const response = await axios.get(`${intervene_url}/${currentChat.Contact}`, config);
            if (response.data.status) {
                alert("Invitation has been sent successfully.")
            }
            // setIsInputVisible(prev => !prev);
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };

    useEffect(() => {
        // Reset chat messages when the component mounts or currentChat changes
        setChatState({ ...currentChat, Messages: [] });
        setIsResolved(currentChat.State === 4); // Assuming State 4 means resolved

        const fetchChats = async () => {
            try {
                const response = await axios.get(`${socketUrl}/${currentChat.Contact}`, config);
                // console.log('chat window responsesss111', response.data.userinfo);
                setChatState(prevChat => ({
                    ...prevChat,
                    Messages: response.data.res.Messages
                }));
                // setuserInfo(response.data.userinfo)
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };

        fetchChats(); // Fetch initially

    }, [currentChat.Contact, getCookie, currentChat]);

    useEffect(() => {
        scrollToBottom();
    }, [chatState.Messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const groupByDate = (messages) => {
        const tempGroupedMessages = {};

        // Sort messages by timestamp
        messages.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

        messages.forEach((message) => {
            const date = new Date(message.Timestamp).toDateString();
            if (!tempGroupedMessages[date]) {
                tempGroupedMessages[date] = [];
            }
            tempGroupedMessages[date].push(message);
        });

        return tempGroupedMessages;
    };

    const groupedMessages = groupByDate(chatState.Messages);

    const handleSendMessage = async (message, Type) => {
        const newMessage = {
            Agent_ID: "Owner",
            Content: message,
            Role: 3,
            Type: Type,
            Timestamp: getCurrentUTCTimestamp(),
        };

        setChatState(prevChat => ({
            ...prevChat,
            Messages: [...(prevChat.Messages || []), newMessage]
        }));

        // Ensure scrolling happens after state update
        setTimeout(() => scrollToBottom(), 100);
    };

    return (
        <>
            <div className="flex w-[calc(100%-290px)] chat_massge_container relative">
                <div className="h-[calc(100vh-142px)] w-[calc(100%-290px)] chat_content_box text-lg font-bold flex justify-center flex-col scroll-smooth bg-[#F5EFDF] bg-[url('https://www.app.aisensy.com/static/media/i-like-food.7d2579fb89705c20be60280002640407.svg')]">
                    <div className="flex-shrink-0 border-b border-gray-300 p-2 bg-[#0a474c] h-[50px] gap-2 flex items-center ">
                        <h2 className="text-md font-medium text-white inline-block">{currentChat.Name ? currentChat.Name : currentChat.Contact} ({currentChat.Contact})</h2>
                    </div>
                    <div className="flex-grow p-2 overflow-y-auto">
                        {Object.keys(groupedMessages).length > 0 ? (
                            Object.keys(groupedMessages).map(date => (
                                <div key={date}>
                                    <div className="text-center text-gray-500 my-2 text-sm font-medium">
                                        <span className='bg-[#ebf5f3] p-1.5 rounded-lg'>{date}</span>
                                    </div>
                                    {groupedMessages[date].map(message => (
                                        <Message
                                            key={message.Timestamp}
                                            currentChat={currentChat}
                                            message={{
                                                ...message
                                            }}
                                        />
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 my-2 text-sm font-medium">
                                No messages yet.
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex-shrink-0 border-t border-gray-300 p-2">
                        <MessageInput
                            currentChat={currentChat}
                            onSendMessage={handleSendMessage}
                            isInputVisible={isInputVisible}
                            onToggleInput={handleToggleInput}
                        />
                    </div>
                </div >
                <UserProfileTab
                    user={currentChat}
                />
            </div >
        </>
    );
};

export default ChatWindow;
