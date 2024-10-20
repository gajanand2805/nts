import React from 'react';
import NameAvatar from './NameAvatar';


const ChatItem = ({ chat, currentChat, setCurrentChat }) => {
    const isActive = currentChat && currentChat.Contact === chat.Contact;

    // Check if chat.Messages is defined before accessing its properties
    let lastMessageContent = null;
    let lastMessageTime = null;
    if (chat.Messages && chat.Messages.length > 0) {
        const lastMessage = chat.Messages[chat.Messages.length - 1];
        lastMessageContent = lastMessage.Content;
        lastMessageTime = formatMessageTime(lastMessage.Timestamp);
    }

    console.log(chat)
    return (
        <li
            onClick={() => setCurrentChat(chat)}
            className={`cursor-pointer p-2 border-b border-[#f2f2f2] hover:bg-gray-200 ${isActive ? 'bg-blue-200' : ''}`}
        >
            <div className="flex items-center">
                <NameAvatar name={chat.Name ? chat.Name : chat.Contact} />
                <div className="ml-2">
                    <div className="font-bold text-sm h-4 w-[124px] overflow-hidden truncate whitespace-nowrap">
                        {chat.Name ? chat.Name : chat.Contact}
                    </div>
                    <div className="text-gray-600 text-sm h-4 w-[124px] overflow-hidden truncate whitespace-nowrap">
                        {lastMessageContent}
                    </div>
                </div>
                <div className="ml-auto text-xs text-gray-600 flex flex-col items-end">
                    {chat.Seen === false && (
                        <span className="bg-red-500 text-white text-[11px] mb-1 px-[7px] py-[2px]" style={{ borderRadius: '3px', lineHeight: '15px' }}>New</span>
                    )}
                    <span>{formatMessageTime(chat.Trigger)}</span>
                </div>
            </div>
        </li>
    );
};

export default ChatItem;


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
