import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useGlobalAuthContext } from '../../AuthContext';
import Message from './Message';
import MessageInput from './MessageInput';
import UserProfileTab from './UserProfileTab';

const socketUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/get_new_users_conversation_history`;

const ChatWindow = ({ currentChat }) => {
  const [chatState, setChatState] = useState({ ...currentChat, Messages: [] });
  const { getCookie } = useGlobalAuthContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Reset chat messages when the component mounts or currentChat changes
    setChatState({ ...currentChat, Messages: [] });

    const fetchChats = async () => {
      const config = {
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
        },
      };

      try {
        const response = await axios.get(`${socketUrl}/${currentChat.Contact}`, config);
        console.log('chat response', response.data);
        setChatState(prevChat => ({
          ...prevChat,
          Messages: response.data[0].Messages
        }));
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    let interval;
    if (currentChat.Contact) {
      fetchChats(); // Fetch initially
      interval = setInterval(fetchChats, 2000); // Fetch every 2 seconds
    }

    return () => {
      clearInterval(interval); // Clean up interval on component unmount or contact change
    };
  }, [currentChat.Contact, getCookie, currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.Messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today ${date.toLocaleTimeString()}`;
    } else if (diffDays === 1) {
      return `Yesterday ${date.toLocaleTimeString()}`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  };

  const groupMessagesByDate = (messages) => {
    if (!Array.isArray(messages)) {
      return {};
    }
    const tempGroupedMessages = {};
    messages.forEach((message) => {
      const date = new Date(message.Timestamp).toDateString();
      if (!tempGroupedMessages[date]) {
        tempGroupedMessages[date] = [];
      }
      tempGroupedMessages[date].push(message);
    });

    return tempGroupedMessages;
  };

  const groupedMessages = groupMessagesByDate(chatState.Messages);

  const handleSendMessage = async (message, Type) => {
    const newMessage = {
      Agent_ID: "Agent",
      Content: message,
      Role: 2,
      Type: Type,
      Timestamp: new Date().toISOString(),
    };

    setChatState(prevChat => ({
      ...prevChat,
      Messages: [...(prevChat.Messages || []), newMessage]
    }));

    scrollToBottom();
  };

  // popup profile show
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopupVisibility = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Function to format the message timestamp
  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate.replace('.', ':');
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [isInputVisible, setInputVisible] = useState(false);

  const handleAddClick = () => {
    setInputVisible(true);
  };

  const handleCancelClick = () => {
    setInputVisible(false);
  };


  return (
    <>
      <div className="flex w-[calc(100%-290px)] chat_massge_container relative">
        <div className="h-[calc(100vh-142px)] w-[calc(100%-290px)] chat_content_box text-lg font-bold flex justify-center flex-col scroll-smooth bg-[#F5EFDF] bg-[url('https://www.app.aisensy.com/static/media/i-like-food.7d2579fb89705c20be60280002640407.svg')]">
          <div className="flex-shrink-0 border-b border-gray-300 p-2 bg-[#0a474c] h-[50px] gap-2 flex items-center ">
            <h2 className="text-md font-medium text-white inline-block">{currentChat.Name ? currentChat.Name : currentChat.Contact}</h2>
            <button
              onClick={togglePopupVisibility}
              aria-expanded={isPopupVisible}
              aria-controls="popupprofile"
              className="leading-none hidden flex profile_mobile_arrow items-center justify-center"
            >
              <span className={`transform transition-transform duration-300 ${isPopupVisible ? 'rotate-180' : ''} inline-block`}>
                <span className="block w-2.5 h-2.5 border-t border-l border-white transform rotate-45"></span>
              </span>
            </button>
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
                        ...message,
                        Name: message.Name || 'Agent',
                        lastModified: formatTimestamp(message.Timestamp),
                        text: message.Content,
                        sender: message.Role === 1 ? 'You' : (message.Name || 'Agent')
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
              onSendMessage={handleSendMessage} />
          </div>
        </div>
        <UserProfileTab user={currentChat} />
        {/* Popup */}
        <div
          id="popupprofile"
          className={`absolute left-0 hidden mobile_profile_show h-[calc(100vh-192px)] top-10 mt-3 w-full z-50 transition-opacity duration-300 transform ${isPopupVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          {isPopupVisible && (
            <>
              <div className=" border-gray-300 overflow-hidden w-full h-full " style={{ backgroundColor: 'rgb(254, 254, 254)' }}>
                <div className='flex-shrink-0 border-b flex justify-between border-gray-300 p-2 bg-[#0a474c] h-[50px] flex items-center'> <h2 className='text-md font-medium text-white'>Chat Profile</h2> <button
                  onClick={togglePopupVisibility}
                  className=""
                >
                  <svg className="w-[20px] h-[20px]" version="1.1" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="11" x2="11" y2="1" stroke="white" strokeWidth="2"></line><line x1="1" y1="1" x2="11" y2="11" stroke="white" strokeWidth="2"></line></svg>
                </button></div>
                <div className='overflow-auto h-full pb-20'>
                  <div className='flex items-center justify-center gap-3 my-5'>
                    <div className='flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full text-white'>
                      <h2 className='font-medium' style={{ fontSize: '30px' }}>
                        {currentChat.Name.charAt(0)}
                      </h2>
                    </div>
                    <div className='text-center'>
                      <h4 style={{ fontSize: '20px' }}>
                        {currentChat.Name}
                      </h4>
                      <p className='text-sm'>{currentChat.Contact}</p>
                    </div>
                  </div>

                  <div className='py-3 px-4 bg-[#ebf5f3] m-2 rounded-md'>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Status </p>
                      <p className='text-xs font-normal'>Intervened</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Intervened By </p>
                      <p className="text-xs font-normal">Dimple</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Last Active</p>
                      <p className="text-xs font-normal">{getTimeFromTimestamp(currentChat.Trigger)}</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Template Messages </p>
                      <p className="text-xs font-normal">20</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Session Messages </p>
                      <p className="text-xs font-normal">0</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Unresolved Queries</p>
                      <p className="text-xs font-normal">0</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Source</p>
                      <p className="text-xs font-normal">ORGANIC</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">First Message</p>
                      <p className="text-xs font-normal">.....</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">WA Conversation</p>
                      <p className="text-xs font-normal">Inactive</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">MAU Status</p>
                      <p className="text-xs font-normal">Active</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Incoming</p>
                      <p className="text-xs font-normal">Allowed</p>
                    </div>
                    <div className='justify-between item-center flex mt-1.5'>
                      <p className="text-xs font-normal">Opted In</p>
                      <label className="inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                      </label>

                    </div>
                  </div>

                  <div id="accordionExample" className="w-full">
                    <div className="border border-neutral-200 dark:border-neutral-600">
                      <h2 id="headingOne">
                        <button
                          className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                          type="button"
                          onClick={() => toggleAccordion(1)}
                          aria-expanded={openIndex === 1}
                          aria-controls="collapseOne"
                        >
                          Payments
                          <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 1 ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      <div id="collapseOne" className={`px-5 py-4 ${openIndex === 1 ? '' : 'hidden'}`}>
                        <button className="px-2 py-2 border rounded-lg border-[#0a474c] text-[#0a474c] text-xs" style={{ letterSpacing: '1px' }}>
                          Create Payment
                        </button>
                        <div className='flex justify-between item-center mt-4'>
                          <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                            Order Id
                          </button>
                          <div className='flex justify-between item-center gap-5'>
                            <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                              Amount
                            </button>
                            <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                              Status
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
                      <h2 id="headingTwo">
                        <button
                          className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                          type="button"
                          onClick={() => toggleAccordion(2)}
                          aria-expanded={openIndex === 2}
                          aria-controls="collapseTwo"
                        >
                          Campaigns
                          <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 2 ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      <div id="collapseTwo" className={`px-5 py-4 ${openIndex === 2 ? '' : 'hidden'}`}>
                        <div className='justify-between item-center flex mt-1.5'>
                          <button className='text-sm font-normal'>daac_fee_approva...</button>
                          <div className='justify-between item-center flex mt-1.5'>
                            <span>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                              </svg>
                            </span>
                            <button>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className='justify-between item-center flex mt-1.5'>
                          <button className='text-sm font-normal'>daac_login</button>
                          <div className='justify-between item-center flex mt-1.5'>
                            <span>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                              </svg>
                            </span>
                            <button>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className='justify-between item-center flex mt-1.5'>
                          <button className='text-sm font-normal'>daac_login</button>
                          <div className='justify-between item-center flex mt-1.5'>
                            <span>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                              </svg>
                            </span>
                            <button>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className='justify-between item-center flex mt-1.5'>
                          <button className='text-sm font-normal'>daac_fee_approva...</button>
                          <div className='justify-between item-center flex mt-1.5'>
                            <span>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                              </svg>
                            </span>
                            <button>
                              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
                      <h2 id="headingThree">
                        <button
                          className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                          type="button"
                          onClick={() => toggleAccordion(3)}
                          aria-expanded={openIndex === 3}
                          aria-controls="collapseThree"
                        >
                          Attributes
                          <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 3 ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      <div id="collapseThree" className={`px-5 py-4 ${openIndex === 3 ? '' : 'hidden'}`}>
                        <button className='px-4 py-1.5 border rounded-lg border-[#0a474c] text-[#0a474c] text-xs'>
                          Edit
                        </button>
                        <div className='flex justify-between item-center mt-4'>
                          <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                            Enroll
                          </button>
                          <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                            DL1593
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
                      <h2 id="headingFour">
                        <button
                          className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                          type="button"
                          onClick={() => toggleAccordion(4)}
                          aria-expanded={openIndex === 4}
                          aria-controls="collapseFour"
                        >
                          Tags
                          <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 4 ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      <div id="collapseFour" className={`px-5 py-4 ${openIndex === 4 ? '' : 'hidden'}`}>
                        <div className='flex justify-between items-center mt-4 mb-2'>
                          {!isInputVisible ? (
                            <>
                              <select id="countries" className="bg-[rgb(240,240,240)] border border-gray-300 text-gray-900 text-xs  rounded-md block w-[133px]  gap-20 px-2.5 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Select & add tag</option>
                                <option value="US">DAAC_VDN</option>
                                <option value="CA">DAAC_MANSAROVAR</option>
                                <option value="FR">DAAC_DEGREE</option>
                                <option value="DE">DAAC_DESIGN</option>
                                <option value="CA">DAAC_DIGITAL</option>
                                <option value="FR">DAAC_ACCOUNT</option>
                                <option value="DE">DAAC_PROG</option>
                              </select>
                              <button className='flex items-center px-3 h-[35px] border rounded-lg border-[#0a474c] text-[#0a474c] text-xs'>
                                <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Add
                              </button>
                            </>
                          ) : (
                            <>
                              <input type="text" className="px-3 h-[35px] border rounded-lg border-[#0a474c] w-[133px] text-[#0a474c] text-xs" placeholder="Enter new tag" />
                              <button className='flex items-center text-[#0a474c] text-xs' onClick={handleCancelClick} style={{ width: 'max-content' }}>Create & Add Tag</button>
                            </>
                          )}
                        </div>
                        {!isInputVisible ?
                          <button className='flex items-center px-3  text-[#0a474c] text-xs' onClick={handleAddClick} >Create & Add Tag</button> : <button className='flex items-center px-3  text-[#0a474c] text-xs' onClick={handleCancelClick} >cancel</button>}
                      </div>
                    </div>


                    <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
                      <h2 id="headingfive">
                        <button
                          className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                          type="button"
                          onClick={() => toggleAccordion(5)}
                          aria-expanded={openIndex === 5}
                          aria-controls="collapsefive"
                        >
                          Customer Journey
                          <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 5 ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      <div id="collapsefive" className={`px-5  ${openIndex === 5 ? '' : 'hidden'}`}>
                        <div className='px-5 mb-5 relative'>
                          <div>
                            <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                            <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                          </div>
                          <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                            DAAC_DIGITAL
                          </button>
                          <span className='text-xs pl-3'>
                            removed by Vikas Solanki
                          </span>
                        </div>
                        <div className='px-5 mb-5 relative'>
                          <div>
                            <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                            <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                          </div>
                          <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                            DAAC_DIGITAL
                          </button>
                          <span className='text-xs pl-3'>
                            removed by Vikas Solanki
                          </span>
                        </div>
                        <div className='px-5 mb-5 relative'>
                          <div>
                            <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                            <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                          </div>
                          <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                            DAAC_DIGITAL
                          </button>
                          <span className='text-xs pl-3'>
                            removed by Vikas Solanki
                          </span>
                        </div>
                        <div className='px-5 mb-5 relative'>
                          <div>
                            <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                            <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                          </div>
                          <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                            DAAC_DIGITAL
                          </button>
                          <span className='text-xs pl-3'>
                            removed by Vikas Solanki
                          </span>
                        </div>
                        <div className='px-5 mb-5 relative'>
                          <div>
                            <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                            <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                          </div>
                          <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                            DAAC_DIGITAL
                          </button>
                          <span className='text-xs pl-3'>
                            removed by Vikas Solanki
                          </span>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

              </div>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
