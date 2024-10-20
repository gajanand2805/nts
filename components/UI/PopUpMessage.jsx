import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaExclamationTriangle } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'

function PopUpMessage({
  show,
  setShow,
  messageTitle,
  messageContent,
  isError,
}) {
  const { t } = useTranslation()
  return (
    show && (
      <div className="fixed z-[100] px-10 flex flex-col items-center justify-center top-0 bottom-0 left-0 right-0 bg-White/80 dark:bg-Black/80 animate-popUp">
        <div className="w-full flex flex-col px-5 py-5 space-y-5 bg-white dark:bg-black rounded-lg max-w-[400px] ">
          <div className="flex flex-col items-center space-y-5">
            {isError ? (
              <p className="p-3 bg-red-500 rounded-full">
                <FaExclamationTriangle className="text-3xl text-White" />
              </p>
            ) : (
              <p className="p-3 bg-green-500 rounded-full">
                <GiCheckMark className="text-3xl text-White" />
              </p>
            )}
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl font-semibold text-left dark:text-white">
                {messageTitle}
              </h1>
              <p className="text-left dark:text-white">{messageContent}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 text-Blue"
              onClick={() => {
                setShow(false)
              }}>
              {t && t('okay')}
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default PopUpMessage
