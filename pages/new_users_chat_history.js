import { useTranslation } from 'react-i18next';
import { useGlobalAuthContext } from '../AuthContext';
// import ChatLeftPanel from '../components/NewUsersChatHistory/LeftPanel'
import React, { useState } from 'react';
import MainScreenWrapper from '../components/MainScreenWrapper';
import ChatList from '../components/NewUsersChatHistory/ChatList';
import ChatWindow from '../components/NewUsersChatHistory/ChatWindow';
import { useGlobalChatbotBuilderContext } from '../contexts/ChatbotBuilderContext';

function NewUsersChatHistory() {
    const { t } = useTranslation()

    //? contexts
    const { isLoading, isAccessToken } = useGlobalAuthContext()
    const { emulate, emulatorLoading } = useGlobalChatbotBuilderContext()
    const [currentChat, setCurrentChat] = useState(null);

    return (


        <MainScreenWrapper screenHeader="Chat History">
            {/* <ChatLeftPanel /> */}
            <div className="flex">
                <ChatList currentChat={currentChat} setCurrentChat={setCurrentChat} />
                {currentChat ? <ChatWindow currentChat={currentChat} /> : <div className="w-9/12 h-[calc(100vh-142px)] text-lg font-bold flex items-center justify-center flex-col scroll-smooth bg-[#F5EFDF] bg-[url('https://www.app.aisensy.com/static/media/i-like-food.7d2579fb89705c20be60280002640407.svg')] ">Select a chat to start messaging</div>}
            </div>
        </MainScreenWrapper>

    )

}

export default NewUsersChatHistory
