import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdSend } from 'react-icons/md'
import { useGlobalAuthContext } from '../../AuthContext'
import dummyAvatar from '../../public/dummyAvatar.png'
import main from '../../public/main.png'

export const ChatUI = ({
  conversations,
  fetchTicket,
  state,
  data,
  setData,
}) => {
  //? router
  const router = useRouter()
  const { query } = router

  //? contexts
  const { getCookie, buisnessDetails, selectedLang } = useGlobalAuthContext()

  //? states
  const [message, setMessage] = useState('')
  const [length, setLength] = useState(0)
  const [sendingMessage, setSendingMessage] = useState(false)

  const { t } = useTranslation()

  //? functions
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await sendMessage()
    }
  }

  const sendMessage = async () => {
    if (message !== '') {
      setData({
        ...data,
        conversation: [
          ...data.conversation,
          {
            Role: 'customer',
            Message: message,
          },
        ],
      })
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
        },
      }
      try {
        setMessage('')
        setSendingMessage(true)
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/support/tickets/send`,
          {
            ticket_id: query.ticketId,
            message: message,
          },
          config
        )
        await fetchTicket()
      } catch (err) {
        let copy = [...data] // makes sure you don't give the same reference to setTodos
        data.conversation.pop()
        setData(copy)
        console.log(err)
      } finally {
        setSendingMessage(false)
      }
    }
  }

  //? effects
  useEffect(() => {
    if (conversations && length != conversations.length) {
      const element = document.getElementById(
        `message-${conversations.length - 1}`
      )
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setLength(conversations.length)
    }
  }, [conversations])

  return (
    <div className="flex flex-col flex-grow w-full h-full overflow-hidden bg-white rounded-lg dark:bg-bgBlack">
      <div className="flex flex-col flex-grow h-0 p-4 gap-4 overflow-auto ">
        {conversations &&
          conversations.length &&
          conversations.map((convo, index) => {
            return convo.Role !== 'customer' ? (
              <div
                id={`message-${index}`}
                className="flex w-full gap-2">
                <div className="w-10 h-10 bg-bgWhiteSec border-[1px] border-[#EAEEEE] flex items-center justify-center rounded-full ">
                  {buisnessDetails?.Logo_Link ? (
                    <Image
                      src={main}
                      alt="profile avatar"
                      objectFit="cover"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={dummyAvatar}
                      alt="profile avatar"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div>
                  <div className="p-3 rounded-r-lg rounded-bl-lg bg-bgWhiteSec dark:bg-dBlack">
                    <p className="max-w-sm text-sm">{convo.Message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id={`message-${index}`}
                className={`flex w-full gap-2 ${selectedLang == 'en' ? 'ml-auto' : 'mr-auto'
                  } justify-end`}>
                <div>
                  <div className="p-3 text-white rounded-l-lg rounded-br-lg bg-Blue">
                    <p className="text-sm">{convo.Message}</p>
                  </div>
                </div>
                <div className="w-10 h-10 bg-bgWhiteSec border-[1px] border-[#EAEEEE] flex items-center justify-center rounded-full ">
                  {buisnessDetails?.Logo_Link ? (
                    <Image
                      src={buisnessDetails?.Logo_Link}
                      alt="profile avatar"
                      objectFit="cover"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={dummyAvatar}
                      alt="profile avatar"
                      objectFit="cover"
                    />
                  )}
                </div>{' '}
              </div>
            )
          })}
      </div>

      <div className={`p-4 ${state === 'closed' ? 'hidden' : 'visible'}`}>
        <label className="flex items-center gap-3 px-2 border-0 border-gray-400 rounded-lg bg-bgWhiteSec dark:bg-dBlack">
          <input
            className="flex items-center w-full px-3 py-3 text-sm bg-transparent border-none rounded outline-none"
            type="text"
            placeholder={t('ticket_message')}
            onKeyDown={async (e) => await handleKeyDown(e)}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            onClick={sendMessage}
            disabled={sendingMessage}
            className={`flex relative group items-center justify-center p-1.5 hover:bg-gray-100 disabled:hover:bg-transparent transition-all duration-200 rounded-full`}>
            <MdSend className="w-6 h-6 group-disabled:text-Blue/50 text-Blue" />
          </button>
        </label>
      </div>
    </div>
  )
}
