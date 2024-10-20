import React from 'react';
import NameAvatar from './NameAvatar';

const ChatItem = ({ chat, currentChat, setCurrentChat }) => {
    const isActive = currentChat && currentChat.Contact === chat.Contact;
    console.log(chat)
    return (
        <li
            onClick={() => setCurrentChat(chat)}
            className={`cursor-pointer p-2 hover:bg-gray-200 text-sm ${isActive ? 'bg-blue-200' : ''}`}
        >
            <div className="flex items-center">
                <NameAvatar name={chat.Name ? chat.Name : chat.Contact} />
                <div className="ml-2 w-[70%]">
                    <div className="font-bold">{chat.Name}</div>
                    <div className="text-gray-600 text-sm h-4 w-[124px] overflow-hidden truncate whitespace-nowrap"><LastMessage contact={chat} /></div>
                </div>
                <div className="ml-auto text-xs text-gray-600 w-[20%] flex justify-end ">{formatMessageTime(chat.LastMessage
                    .Timestamp)}</div>
            </div>
        </li>
    );
};

export default ChatItem;



const LastMessage = ({ contact }) => {
    const lastMessage = contact?.LastMessage
    const lastMessageType = lastMessage?.Type
    const lastMessageRole = lastMessage?.Role
    const SENT_ATTACHMENT_SUBSTITUTE = "Sent an attachment"
    const RECIEVED_ATTACHMENT_SUBSTITUTE = "Recieved an attachment"
    const USER_ENDED_SUBTITLE = "User ended the chat"
    const CHAT_ENDED_SUBTITLE = "Chat was ended"
    const JOINED_CONVERSATION_SUBTITLE = "has joined the conversation"
    const INVITED_SUBTITLE = "Contact invited"
    return (
        <p className="opacity-50 font-light max-w-[190px] truncate text-sm">
            {!lastMessage || (!lastMessageType && '---------')}
            {lastMessageType === 1 && lastMessage?.Content}
            {lastMessageType === 2 &&
                (lastMessageRole === 1
                    ? SENT_ATTACHMENT_SUBSTITUTE
                    : RECIEVED_ATTACHMENT_SUBSTITUTE)}
            {lastMessageType === 3 &&
                (lastMessageRole === 1
                    ? USER_ENDED_SUBTITLE
                    : CHAT_ENDED_SUBTITLE)}
            {lastMessageType === 4 && JOINED_CONVERSATION_SUBTITLE}
            {lastMessageType === 5 && INVITED_SUBTITLE}
        </p>
    )
}

// Function to format the message timestamp
const formatMessageTime = timestamp => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();

    if (
        messageDate.getDate() === currentDate.getDate() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getFullYear() === currentDate.getFullYear()
    ) {
        // Message sent today, show time only
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // Message sent on a different day, show date
        return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
};
