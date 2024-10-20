import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import NameAvatar from '../UI/Avatar/NameAvatar'

const getTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes}`
}

const Chatpane = ({ currentChat, setConversation }) => {
  const [groupedMessages, setGroupedMessages] = useState()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const chatContainerRef = useRef()
  const targetSpanRef = useRef()
  const { getCookie } = useGlobalAuthContext()
  const [isChatLazyLoading, setIsChatLazyLoading] = useState(false)
  const router = useRouter()

  const scrollToBottom = async () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      console.log('scrolled')
    }
  }

  useEffect(() => {
    if (isFirstRender && groupedMessages) {
      scrollToBottom()
      // Set isFirstRender to false after the first render
      setIsFirstRender(false)
    }
  }, [groupedMessages, isFirstRender])

  const groupByDate = (messages) => {
    const tempGroupedMessages = {}
    messages.reverse().forEach((message) => {
      const date = new Date(message.Timestamp).toDateString()
      if (!tempGroupedMessages[date]) {
        tempGroupedMessages[date] = []
      }
      tempGroupedMessages[date].push(message)
    })
    return tempGroupedMessages
  }

  useEffect(() => {
    console.log('CURR CHAT IN CHAT PANE', currentChat)
    if (currentChat?.Messages?.length > 0) {
      setGroupedMessages(groupByDate(currentChat?.Messages))
      console.log(groupByDate(currentChat?.Messages))
    }
  }, [currentChat])

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~INTERSECTION OBSERVER~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    const options = {
      root: chatContainerRef.current,
      threshold: 0, // Trigger the observer as soon as the target enters the viewport
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(
            currentChat?.Messages?.length >= 20,
            isChatLazyLoading === false,
            currentChat?.More
          )
          if (
            currentChat?.Messages?.length >= 20 &&
            isChatLazyLoading === false &&
            currentChat?.More
          ) {
            console.log('OBS CALLED')
            // retriveHistory(currentChat?.Contact, currentChat?.Messages?.length)
            getConversation()
          }
          // Perform actions when the span becomes visible.
        }
      })
    }, options)

    // Observe the target span
    setTimeout(() => {
      if (targetSpanRef.current) {
        observer?.observe(targetSpanRef?.current)
      }
    }, 1000)

    return () => {
      // Disconnect the observer when the component unmounts
      observer.disconnect()
    }
  }, [currentChat])

  const getConversation = async () => {
    const { id } = router.query
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Phone-No': currentChat?.Contact,
      },
    }
    try {
      setIsChatLazyLoading(true)
      const convRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/conversation?skip=${currentChat?.Messages.length}&limit=20`,
        config
      )
      setConversation({
        ...currentChat,
        Messages: [...currentChat.Messages, ...convRes.data.Messages],
        More: convRes.data.More,
      })
    } catch (err) {
      console.log('PHONE DATA ERROR', err)
    } finally {
      setIsChatLazyLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-[70vh]  bg-white dark:bg-bgBlack shadow-sm rounded-xl ">
      <div className="flex items-center justify-start gap-1 w-full border-b-[1px] border-gray-200 dark:border-gray-600 pl-4 p-2">
        {currentChat?.Name && <p>{currentChat?.Name} | </p>}
        <p className="text-sm opacity-80"> {currentChat?.Contact}</p>
      </div>
      <div
        ref={chatContainerRef}
        className="flex flex-col items-center justify-start w-full h-full pt-20 pb-6 pl-4 pr-4 overflow-y-scroll">
        <span
          className="h-full"
          ref={targetSpanRef}
          id="topOfChatContainer"></span>
        {isChatLazyLoading && (
          <div className="flex items-center justify-center w-full">
            <div
              className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-black dark:border-white`}
            />
          </div>
        )}
        {groupedMessages &&
          Object.keys(groupedMessages).map((date, i) => (
            <div
              className="w-full"
              key={i * 100}>
              <DateComponent date={date} />
              {groupedMessages[date].map((message) => {
                if (message.Type === 1) {
                  return (
                    <SingleMessage
                      currentChat={currentChat}
                      message={message}
                      key={message.Timestamp}
                    />
                  )
                } else if (message.Type === 2) {
                  return (
                    <SingleAttachment
                      currentChat={currentChat}
                      message={message}
                      key={message.Timestamp}
                    />
                  )
                } else if ([3, 4, 5].includes(message.Type)) {
                  return (
                    <HighlightedMessages
                      currentChat={currentChat}
                      message={message}
                      key={message.Timestamp}
                    />
                  )
                }

                return null // Or handle other cases
              })}
            </div>
          ))}
      </div>
      {/* <ChatFooter /> */}
    </div>
  )
}

export default Chatpane

const SingleMessage = ({ currentChat, message }) => {
  const role = message.Role
  const name =
    role === 1
      ? currentChat?.Name
        ? currentChat?.Name
        : currentChat?.Contact
      : message?.Name
        ? message?.Name
        : 'Deleted User'

  return (
    <div
      key={message.Timestamp}
      className="flex items-start justify-start w-full gap-2 py-2">
      <div>
        <NameAvatar name={name} />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">{name}</p>
          <p className="text-sm font-light opacity-50">
            {getTimeFromTimestamp(message.Timestamp)}
          </p>
        </div>
        <p className="font-light">{message.Content}</p>
      </div>
    </div>
  )
}
const SingleAttachment = ({ currentChat, message }) => {
  const role = message.Role
  const name =
    role === 1
      ? currentChat?.Name
        ? currentChat?.Name
        : currentChat?.Contact
      : message?.Name
        ? message?.Name
        : 'Deleted User'

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
      className="flex items-start justify-start w-full gap-2 py-2">
      <div>
        <NameAvatar name={name} />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">{name}</p>
          <p className="text-sm font-light opacity-50">
            {getTimeFromTimestamp(message.Timestamp)}
          </p>
        </div>
        <div className="flex justify-start w-full max-w-xs py-2 bg-gray-100 rounded-md shadow-sm dark:bg-dBlack">
          <button
            onClick={fileDownloadHandler}
            className="flex items-center justify-center px-3 text-xl">
            {isDownloadLoading ? (
              <div className="w-6 h-6 border-2 border-b-0 border-r-0 border-black rounded-full dark:border-white animate-spin " />
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
  const { Type, Role } = message
  const LEFT_CHAT_SUBTITLE = 'has left the chat'
  const AGENT_ENDED_SUBTITLE = 'agent ended the conversation'
  const JOINED_CONVERSATION_SUBTITLE = 'has joined the conversation'
  const INVITED_SUBTITLE = `invited ${currentChat?.Name ? currentChat?.Name : currentChat?.Contact
    }`

  const renderContent = (avatarName, title, subtitle) => (
    <div className="flex items-start justify-start w-full gap-2 py-2">
      <div>
        <NameAvatar name={avatarName} />
      </div>
      <div className="flex flex-col items-start justify-start w-full p-1 rounded-sm">
        <p className="font-semibold">{title}</p>
        <p className="italic text-gray-500">{subtitle}</p>
      </div>
    </div>
  )

  if (Type === 3) {
    return Role === 1
      ? renderContent(
        currentChat?.Name ? currentChat?.Name : currentChat?.Contact,
        currentChat?.Name ? currentChat?.Name : currentChat?.Contact,
        LEFT_CHAT_SUBTITLE
      )
      : renderContent(message.Name, message.Name, AGENT_ENDED_SUBTITLE)
  }

  if (Type === 4) {
    return Role === 1
      ? renderContent(
        currentChat?.Name ? currentChat?.Name : currentChat?.Contact,
        currentChat?.Name ? currentChat?.Name : currentChat?.Contact,
        JOINED_CONVERSATION_SUBTITLE
      )
      : renderContent(message.Name, message.Name, JOINED_CONVERSATION_SUBTITLE)
  }

  return renderContent(message.Name, message.Name, INVITED_SUBTITLE)
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
      return date.toLocaleDateString('en-US')
    }
  }

  return (
    <div className="flex items-center justify-center w-full gap-2 py-5">
      <div className="max-w-52 w-full h-[1.5px] bg-gradient-to-l from-gray-200 dark:from-Black via-gray-200 dark:via-Black to-transparent"></div>
      <p className="px-2 font-medium whitespace-nowrap">{formatDate(date)}</p>
      <div className="max-w-52 w-full h-[1.5px] bg-gradient-to-r from-gray-200 dark:from-Black via-gray-200 dark:via-Black  to-transparent"></div>
    </div>
  )
}
