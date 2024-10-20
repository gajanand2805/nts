import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGlobalAuthContext } from '../../AuthContext';
import ChatItem from './ChatItem';

const socketUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/all_new_users_conversation`;

const ChatList = ({ currentChat, setCurrentChat }) => {
    const { getCookie } = useGlobalAuthContext();
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchChats = async () => {
        const config = {
            headers: {
                Authorization: getCookie('access-token'),
                'Content-type': 'application/json',
            },
        };

        try {
            const response = await axios.get(socketUrl, config);
            console.log('chat response', response.data);
            setChats(response.data);
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };

    useEffect(() => {
        fetchChats(); // Fetch initially
        const interval = setInterval(fetchChats, 10000); // Fetch every 2 seconds

        return () => {
            clearInterval(interval); // Clean up interval on component unmount
        };
    }, [getCookie]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChatSelection = (chat) => {
        setChats(prevChats =>
            prevChats.map(c =>
                c.Contact === chat.Contact ? { ...c, Seen: true } : c
            )
        );
        setCurrentChat(chat);
    };

    const filteredChats = chats.filter(chat => {
        const name = chat.Name ? chat.Name.toLowerCase() : "";
        const contact = chat.Contact ? chat.Contact.toLowerCase() : "";
        return name.includes(searchQuery.toLowerCase()) || contact.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="w-[290px] py-2 border-gray-300 overflow-hidden h-[calc(100vh-142px)]" style={{ backgroundColor: 'rgb(254, 254, 254)' }}>
            <div className='px-2'>
                <form className="max-w-full w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full border h-8 px-4 py-2 mb-1 rounded-md dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                            placeholder="Search"
                        />
                        <button type="submit">
                            <svg className="text-gray-400 fill-current absolute top-2 right-3" xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 56.966 56.966">
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-y-scroll h-full">
                <ul className="overflow-y-auto">
                    {filteredChats.map(chat => (
                        <ChatItem
                            key={chat.Contact}
                            chat={chat}
                            currentChat={currentChat}
                            setCurrentChat={handleChatSelection}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatList;
