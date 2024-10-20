import { useEffect, useState } from 'react'
import { IoMdResize } from 'react-icons/io'
import { RxReload } from 'react-icons/rx'
import BlueTick from '../../public/blue-tick.png'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

export const ChatbotEmulator = () => {
  //? states
  const [isOpen, setIsOpen] = useState(false)
  const [menuOptions, setMenuOptions] = useState(null)
  const [buttons, setButtons] = useState([])
  const [selectedMenuOption, setSelectedMenuOption] = useState('')

  //? contexts
  const { emulatedChats, setEmulatedChats, emulate, resetEmulate } =
    useGlobalChatbotBuilderContext()

  //? functions
  const onButtonClick = async (button) => {
    setEmulatedChats((prevProps) => {
      return [...prevProps, { text: menuOptions[button], align: 'right' }]
    })
    await emulate(button)
  }

  //? effects
  useEffect(() => {
    if (emulatedChats) {
      const element = document.getElementById(
        `message-${emulatedChats.length - 1}`
      )
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [emulatedChats])

  useEffect(() => {
    menuOptions && setButtons(Object.keys(menuOptions))
  }, [menuOptions])

  return emulatedChats.length ? (
    <div className="flex z-50 border border-4 border-white dark:border-bgBlack bg-[#ece5dd] dark:bg-[#323232] gap-2 shadow-xl tablet:w-80 w-[95%] flex-col rounded-2xl fixed right-2 bottom-2">
      <div
        className={`flex justify-between rounded-t-xl bg-gray-50 dark:bg-bgBlack px-4 py-3 w-full`}>
        <span className="font-semibold text-black dark:text-White">
          Emulator
        </span>
        <div className="flex items-center gap-3">
          <button className="p-1 rounded-full cursor-pointer hover:bg-gray-400/20">
            <RxReload
              onClick={async () => {
                await resetEmulate()
              }}
              className="w-5 h-5 text-Blue"
            />
          </button>
          <button className="p-1 rounded-full cursor-pointer hover:bg-gray-400/20">
            <IoMdClose
              className="w-5 h-5 text-Black dark:text-white"
              onClick={() => setEmulatedChats([])}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 h-[25rem] relative">
        <div className="flex items-center justify-center w-full text-xs">
          <span className="p-1 bg-[#E2F7CB] dark:bg-[#128C7E] dark:text-white text-black rounded-md">
            Today
          </span>
        </div>
        <div className="flex flex-col gap-3 p-3 overflow-y-auto">
          {emulatedChats.map((msg, index) => {
            return (
              <Message
                key={index}
                id={index}
                menuOptions={menuOptions}
                setMenuOptions={setMenuOptions}
                align={msg.align}
                propButtons={msg.buttons}
                message={msg.text}
              />
            )
          })}
        </div>
        {menuOptions ? (
          <div className="absolute bottom-0 right-0 flex flex-col w-full gap-3 p-3 text-xs text-black bg-white dark:text-white h-2/3 dark:bg-bgBlack">
            <div className="flex items-center">
              <IoMdClose
                onClick={() => setMenuOptions(null)}
                className="w-6 h-6 p-1 transition-all duration-150 rounded-full cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-100/20 "
              />
              <div className="flex justify-center flex-grow">
                <span className="font-semibold">View Options</span>
              </div>
            </div>
            <span className="text-xs text-[#34B7F1]">Options</span>
            <div className="flex flex-col overflow-y-auto">
              {buttons.map((button, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedMenuOption(button)}
                    className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100/20">
                    <label
                      htmlFor="optionRadio"
                      className="flex flex-col ml-2 text-sm">
                      <span className="text-black dark:text-white">
                        {menuOptions[button][0]}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {menuOptions[button][1]}
                      </span>
                    </label>
                    <input
                      id="optionRadio"
                      type="radio"
                      value=""
                      checked={selectedMenuOption === button ? true : false}
                      name="option-radio"
                      className="w-4 h-4 text-[#128C7E] bg-gray-100 border-gray-300 focus:ring-[#128C7E] dark:focus:ring-[#128C7E] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                )
              })}
            </div>
            {selectedMenuOption ? (
              <button
                onClick={async () => {
                  setMenuOptions(null)
                  setSelectedMenuOption('')
                  await onButtonClick(selectedMenuOption)
                }}
                className="rounded-2xl p-2 font-semibold bg-[#128C7E] text-white">
                Send
              </button>
            ) : (
              <span className="p-2 text-xs text-center text-gray-600 dark:text-gray-400">
                Tap to select an item
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  ) : null
}

export const Message = ({
  align,
  message,
  propButtons,
  id,
  menuOptions,
  setMenuOptions,
}) => {
  //? variables
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`
  const str = message
  let isMono = false

  if (
    str &&
    (str[0] === '`' ||
      str[1] === '`' ||
      str[2] === '`' ||
      str[str.length - 1] === '`' ||
      str[str.length - 2] === '`' ||
      str[str.length - 3] === '`')
  ) {
    isMono = true
    message = str.slice(3, str.length - 3)
  }

  //? contexts
  const { emulate, emulatedChats, setEmulatedChats } =
    useGlobalChatbotBuilderContext()

  //? states
  const [isMenu, setIsMenu] = useState(false)
  const [buttons, setButtons] = useState([])

  //? functions
  const onButtonClick = async (button) => {
    setEmulatedChats((prevProps) => {
      return [...prevProps, { text: propButtons[button], align: 'right' }]
    })
    await emulate(button)
  }

  //? effects
  useEffect(() => {
    if (buttons && buttons.length > 3) {
      setIsMenu(true)
    }
  }, [buttons])

  useEffect(() => {
    propButtons && setButtons(Object.keys(propButtons))
  }, [propButtons])

  return (
    <div
      id={'message-' + id}
      className={`flex flex-col gap-2 w-full ${
        align === 'left' ? 'items-start' : 'items-end'
      }`}>
      <div
        className={`flex flex-col text-sm w-4/5 break-all p-3 ${
          align === 'left'
            ? 'bg-[#F2F2F2] dark:bg-bgBlack rounded-bl-none'
            : 'bg-[#E2F7CB] dark:bg-[#075E54] rounded-tr-none'
        } rounded-lg `}>
        <pre
          className={`whitespace-pre-wrap ${
            isMono ? 'font-mono' : ''
          } text-gray-900 dark:text-white`}>
          {typeof message === 'object' ? (
            <div className="flex flex-col">
              <p>{message[0]}</p>
              <p>{message[1]}</p>
            </div>
          ) : (
            message
          )}
        </pre>
        <div className="flex items-center justify-end w-full gap-2">
          <span className="text-xs text-gray-500">{time}</span>
          {align === 'right' && (
            <div className="w-4 h-4">
              <Image
                src={BlueTick}
                alt="blue-tick"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-4/5 gap-2">
        {buttons && buttons.length ? (
          isMenu ? (
            <button
              onClick={() => setMenuOptions(propButtons)}
              className={`flex gap-2 items-center justify-center rounded-md font-semibold text-Blue text-sm w-full p-1 ${
                align === 'left'
                  ? 'bg-[#F2F2F2] dark:bg-bgBlack'
                  : 'bg-[#E2F7CB]'
              }`}>
              <FiMenu />
              <span>Menu</span>
            </button>
          ) : (
            buttons.map((button) => {
              return (
                <button
                  onClick={async () => await onButtonClick(button)}
                  key={button}
                  className={`rounded-md font-semibold text-Blue text-sm w-full p-1 ${
                    align === 'left'
                      ? 'bg-[#F2F2F2] dark:bg-bgBlack'
                      : 'bg-[#E2F7CB]'
                  }`}>
                  {propButtons[button]}
                </button>
              )
            })
          )
        ) : null}
      </div>
    </div>
  )
}
