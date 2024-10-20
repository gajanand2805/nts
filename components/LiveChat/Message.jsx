import React, { useState } from 'react';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { useGlobalAuthContext } from '../../AuthContext';
import LoadingSpinner from '../UI/Loaders/LoadingSpinner';
import NameAvatar from './NameAvatar';


const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, timeOptions);
}

const Message = ({ currentChat, message }) => {

    const AGENT_ENDED_SUBTITLE = "agent ended the conversation"
    const JOINED_CONVERSATION_SUBTITLE = "has joined the conversation"

    return (
        <div className="flex flex-col items-center justify-start w-full h-full pl-4">
            {/* <ChatHeader /> */}
            <div
                // ref={chatContainerRef}
                className="flex flex-col items-center justify-end w-full h-full pb-4 pr-4 "
            >
                <span
                    className="h-full"
                    // ref={targetSpanRef}
                    id="topOfChatContainer"
                ></span>
                <div className="w-full">
                    {/* <DateComponent date={date} /> */}
                    {message.Type === 1 && (
                        <SingleMessage
                            currentChat={currentChat}
                            message={message}
                            key={message.Timestamp}
                        />
                    )}
                    {message.Type === 2 && (
                        <SingleAttachment
                            currentChat={currentChat}
                            message={message}
                            key={message.Timestamp}
                        />
                    )}
                    {[3, 4, 5].includes(message.Type) && (
                        <HighlightedMessages
                            currentChat={currentChat}
                            message={message}
                            key={message.Timestamp}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;


const SingleMessage = ({ currentChat, message }) => {
    const role = message.Role
    const name =
        role === 3
            ? 'Owner'
            : role === 1
                ? currentChat?.Name
                    ? currentChat?.Name
                    : currentChat?.Contact
                : message?.Name
                    ? message?.Name
                    : 'Deleted User';
    return (
        <div
            key={message.Timestamp}
            className="flex items-start justify-start w-full gap-2 py-2"
        >
            <div>
                <NameAvatar name={name} />
            </div>
            <div className="flex flex-col items-start justify-start w-full">
                <div className="flex items-center justify-center gap-2">
                    <p
                        className={`${role === 1 ? 'opacity-100' : 'opacity-60'
                            } font-semibold text-sm`}
                    >
                        {name}
                    </p>
                    <p className="text-sm font-light opacity-50">
                        {getTimeFromTimestamp(message.Timestamp)}
                    </p>
                </div>
                <p
                    className={`${role === 1 ? 'opacity-100 text-gray-500 font-medium' : 'opacity-60'} whitespace-pre-line`}
                    style={{ fontSize: '16px' }}
                >
                    {message.Content}
                </p>
            </div>
        </div>
    )
}
const SingleAttachment = ({ currentChat, message }) => {
    const role = message.Role
    const name =
        role === 3
            ? 'Owner'
            : role === 1
                ? currentChat?.Name
                    ? currentChat?.Name
                    : currentChat?.Contact
                : message?.Name
                    ? message?.Name
                    : 'Deleted User';

    const [isDownloadLoading, setIsDownloadLoading] = useState(false)
    const { getCookie } = useGlobalAuthContext()

    const fileDownloadHandler = async () => {
        setIsDownloadLoading(true)
        let url = new URL(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/conversation/download/attachment/${message.Content}`
        )
        fetch(url, {
            method: 'GET',

            headers: {
                Authorization: getCookie('access-token'),
                'Content-type': 'application/json',
            },
        })
            .then((res) => {
                return res.blob()
            })
            .then((data) => {
                let a = document.createElement('a')
                a.href = window.URL.createObjectURL(data)
                a.download = message.Content
                a.click()
            })
            .catch((err) => {
                console.log('Error in downloading attachment', err)
            })
            .finally(() => {
                setIsDownloadLoading(false)
            })
    }

    return (
        <div
            key={message.Timestamp}
            className="flex items-start justify-start w-full gap-2 py-2"
        >
            <div>
                <NameAvatar name={name} />
            </div>
            <div className="flex flex-col items-start justify-start w-full">
                <div className="flex items-center justify-center gap-2">
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-sm font-light opacity-50">
                        {getTimeFromTimestamp(message.Timestamp)}
                    </p>
                </div>
                <div className="flex justify-start w-full max-w-xs py-2 bg-gray-100 rounded-md shadow-sm">
                    <button
                        onClick={fileDownloadHandler}
                        className="flex items-center justify-center px-3 text-xl"
                    >
                        {isDownloadLoading ? (
                            <LoadingSpinner color="black" />
                        ) : (
                            <IoCloudDownloadOutline />
                        )}
                    </button>
                    <p>Document</p>
                </div>
            </div>
        </div>
    )
}

const HighlightedMessages = ({ currentChat, message }) => {
    const role = message.Role
    return (
        <div
            key={message.Timestamp}
            className="flex items-start justify-start w-full gap-2 py-2"
        >
            <div className="flex flex-col items-center justify-start w-full">
                <p
                    className={`${role === 1 ? 'opacity-100 text-gray-500 font-medium' : 'opacity-60'} whitespace-pre-line`}
                    style={{ fontSize: '16px' }}
                >

                    <div className="text-center text-gray-500 my-2 text-sm font-medium">
                        <span className='bg-[#ebf5f3] p-1.5 rounded-lg'>{message.Content} ({getTimeFromTimestamp(message.Timestamp)})</span>
                    </div>

                </p>
            </div>
        </div>
    )
}

const DateComponent = ({ date }) => {
    function formatDate(timestamp) {
        let date = new Date(timestamp)
        let now = new Date()
        let diff = now - date
        const SECOND = 1000
        const MINUTE = 60 * SECOND
        const HOUR = 60 * MINUTE
        const DAY = 24 * HOUR
        const WEEK = 7 * DAY

        if (diff < DAY) {
            return 'Today'
        } else if (diff < 2 * DAY) {
            return 'Yesterday'
        } else if (diff < WEEK) {
            return date.toLocaleDateString('en-US', { weekday: 'long' })
        } else {
            // return date.toLocaleDateString('en-US')

            // Check if the date is less than a year ago
            const oneYearAgo = new Date(now)
            oneYearAgo.setFullYear(now.getFullYear() - 1)

            if (date > oneYearAgo) {
                // Format as "23 October"
                return date.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                })
            } else {
                // Format as "23 October, 2021"
                return date.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })
            }
        }
    }

    return (
        <div className="flex items-center justify-center w-full gap-2 py-5">
            <div className="max-w-52 w-full h-[1.5px] bg-gradient-to-l from-gray-200 via-gray-200 to-transparent"></div>
            <p className="px-2 font-medium whitespace-nowrap">
                {formatDate(date)}
            </p>
            <div className="max-w-52 w-full h-[1.5px] bg-gradient-to-r from-gray-200 via-gray-200 to-transparent"></div>
        </div>
    )
}