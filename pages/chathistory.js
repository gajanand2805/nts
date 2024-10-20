import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalAuthContext } from '../AuthContext';
import ChatList from '../components/ChatHistory/ChatList';
import ChatWindow from '../components/ChatHistory/ChatWindow';
import MainScreenWrapper from '../components/MainScreenWrapper';
import { useGlobalChatbotBuilderContext } from '../contexts/ChatbotBuilderContext';

function ChatHistory() {
    const { t } = useTranslation()

    //? contexts
    const { isSubscribed, isLoading, isAccessToken } = useGlobalAuthContext()
    const { emulate, emulatorLoading } = useGlobalChatbotBuilderContext()
    const [currentChat, setCurrentChat] = useState(null);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     if (!isSubscribed && typeof window !== 'undefined') {
    //         // Only run router.push on the client side
    //         router.push({
    //             pathname: '/subscription',
    //             query: { openModal: true }, // Add query to open the modal
    //         });
    //     }
    // }, [isSubscribed, router]);
    return (
        <MainScreenWrapper screenHeader="Chat History">
            {/* <ChatLeftPanel /> */}
            <div className="flex">
                <ChatList currentChat={currentChat} setCurrentChat={setCurrentChat} setIsInputVisible={setIsInputVisible} />
                {currentChat ? <ChatWindow currentChat={currentChat} isInputVisible={isInputVisible} setIsInputVisible={setIsInputVisible} /> : <div className="w-[calc(100%-290px)]  text-lg font-bold flex items-center justify-center flex-col scroll-smooth bg-[#F5EFDF] bg-[url('https://www.app.aisensy.com/static/media/i-like-food.7d2579fb89705c20be60280002640407.svg')] ">Select a chat to start messaging</div>}
            </div>
        </MainScreenWrapper>
    )

}

export default ChatHistory
