import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGlobalAuthContext } from '../../AuthContext';
import NameAvatar from './NameAvatar';

const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/conversation_data`;
const wsUrl = `wss://api.shoponcell.com/Dashboard/Merchant/v1.0/section/conversation_updates`;

const getTimeFromTimestamp = (timestamp) => {
  const messageDate = new Date(timestamp);
  const dateOptions = { month: 'short', day: 'numeric' };
  return messageDate.toLocaleDateString(undefined, dateOptions);
};

const ChatList = ({ setCurrentChat, setIsInputVisible }) => {
  const [activeTab, setActiveTab] = useState('styled-profile');
  const [chats, setChats] = useState({
    Active: [],
    Requesting: [],
    Intervened: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [ws, setWs] = useState(null);

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
        // console.log('API Response:', response.data); // Debug API response

        const { Active = [], Requesting = [], Intervened = [] } = response.data;

        setChats({
          Active: Active.map(chat => ({ ...chat, Status: 'Active' })),
          Requesting: Requesting.map(chat => ({ ...chat, Status: 'Requesting' })),
          Intervened: Intervened.map(chat => ({ ...chat, Status: 'Intervened' }))
        });
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChats();

    const connectWebSocket = () => {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log('WebSocket Connected');
      };

      socket.onmessage = (event) => {
        if (event.data == "new message") {
          const audio = new Audio('../../notification.mp3');
          // audio.play();
        }
        console.log('WebSocket Message Received:', event.data); // Debug WebSocket message
        fetchChats(); // Fetch chats when a WebSocket message is received
      };

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error.message);
      };

      socket.onclose = (event) => {
        console.log('WebSocket Closed:', event);
        setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
      };

      setWs(socket);
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, [getCookie]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClick = (chat) => {
    setCurrentChat(chat);
    setIsInputVisible(chat.State === 3);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredChats = chats[{
    'styled-profile': 'Active',
    'styled-dashboard': 'Requesting',
    'styled-settings': 'Intervened',
  }[activeTab]] || []
    .filter(chat => {
      const name = chat.Name ? chat.Name.toLowerCase() : "";
      const contact = chat.Contact ? chat.Contact.toLowerCase() : "";
      return name.includes(searchQuery.toLowerCase()) || contact.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => new Date(b.LastMessage.Timestamp) - new Date(a.LastMessage.Timestamp));

  return (
    <div className="border-gray-300 w-[320px] h-[calc(100vh-140px)] bg-gray-50">
      <div className="h-full">
        <ul className="flex h-[50px] text-sm font-medium text-center justify-between bg-[#0a474c]" role="tablist">
          {['styled-profile', 'styled-dashboard', 'styled-settings'].map(tabId => (
            <li key={tabId} className="me-2" role="presentation">
              <button
                className={`inline-block py-3 px-1 rounded-t-lg transition duration-300 ${activeTab === tabId ? 'border-white border-b-2 text-white' : 'border-gray-100 text-customGray'}`}
                onClick={() => handleTabClick(tabId)}
              >
                {tabId === 'styled-profile' ? `Active (${chats.Active.length})` :
                  tabId === 'styled-dashboard' ? `Requesting (${chats.Requesting.length})` :
                    `Intervened (${chats.Intervened.length})`}
              </button>
            </li>
          ))}
        </ul>

        <div className="overflow-y-auto h-full">
          <ul className="divide-y divide-gray-200">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat, index) => (
                <li key={index} className="flex items-center p-4 cursor-pointer" onClick={() => handleClick(chat)}>
                  <NameAvatar name={chat.Name} />
                  <div className="flex-1 ms-4 ml-2">
                    <h3 className="text-md font-semibold">{chat.Name}</h3>
                    <p className="text-sm text-gray-600 truncate max-w-[160px]">{chat.LastMessage.Content}</p>
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
