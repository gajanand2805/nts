import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGlobalAuthContext } from '../../AuthContext';
import NameAvatar from './NameAvatar';

const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/conversation_history_data`;

const getTimeFromTimestamp = (timestamp) => {
  const messageDate = new Date(timestamp);
  const dateOptions = { month: 'short', day: 'numeric' };
  return messageDate.toLocaleDateString(undefined, dateOptions);
};

const ChatList = ({ setCurrentChat, setIsInputVisible }) => {
  const [activeTab, setActiveTab] = useState('styled-profile');
  const [chats, setChats] = useState({
    Active: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { getCookie } = useGlobalAuthContext();

  useEffect(() => {
    const fetchChats = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('access-token'),
        },
      };

      try {
        const response = await axios.get(url, config);
        const { Active = [] } = response.data;

        setChats({
          Active: Active.map((chat) => ({ ...chat, Status: 'Active' })),
        });
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChats();
  }, [getCookie]);

  const handleClick = (chat) => {
    setCurrentChat(chat);
    setIsInputVisible(chat.State === 3);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredChats = chats.Active
    .filter((chat) => {
      const name = chat.Name ? chat.Name.toLowerCase() : '';
      const contact = chat.Contact ? chat.Contact.toLowerCase() : '';
      return name.includes(searchQuery.toLowerCase()) || contact.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => new Date(b.LastMessage.Timestamp) - new Date(a.LastMessage.Timestamp));

  return (
    <div className="border-gray-300 w-[320px] h-[calc(100vh-140px)] bg-gray-50">
      <div className="h-full">
        {/* Search input */}
        <div className="p-2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Search by name or mobile number"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* <ul className="flex h-[50px] text-sm font-medium text-center justify-between bg-[#0a474c]" role="tablist">
          <li key="styled-profile" className="me-2" role="presentation">
            <button
              className={`inline-block py-3 px-1 rounded-t-lg transition duration-300 border-white border-b-2 text-white`}
            >
              {`Active (${chats.Active.length})`}
            </button>
          </li>
        </ul> */}

        <div className="overflow-y-auto h-full">
          <ul className="divide-y divide-gray-200">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat, index) => (
                <li key={index} className="flex items-center p-4 cursor-pointer" onClick={() => handleClick(chat)}>
                  <NameAvatar name={chat.Name} />
                  <div className="flex-1 ms-4 ml-2">
                    <h3 className="text-md font-semibold">{chat.Name}</h3>
                    <p className="text-sm text-gray-600 truncate max-w-[160px]">
                      {chat.LastMessage.Content}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{getTimeFromTimestamp(chat.LastMessage.Timestamp)}</p>
                </li>
              ))
            ) : (
              <li className="p-4">No chats found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
