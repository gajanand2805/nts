// ContactChips.js
import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'

const ContactChips = ({
  setTextContacts,
  textContacts,
  textContactInputVal,
  setTextContactInputVal,
}) => {
  useEffect(() => {
    setTextContacts(textContacts)
  }, [textContacts])

  const handleInputChange = (event) => {
    const validInput = event.target.value.replace(/[^0-9,\n\s+]/g, '')

    setTextContactInputVal(validInput)
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      if (textContactInputVal.trim() !== '') {
        setTextContacts([...textContacts, textContactInputVal.trim()])
        setTextContactInputVal('')
      }
    }
  }

  const handleChipRemove = (index) => {
    const updatedChips = [...textContacts]
    updatedChips.splice(index, 1)
    setTextContacts(updatedChips)
  }
  const handlePaste = (event) => {
    event.preventDefault()
    const clipboardData = event.clipboardData || window.clipboardData
    const pastedText = clipboardData.getData('text')
    const contacts = pastedText.split(/[,\n]+/).map((contact) => contact.trim())
    setTextContacts([...textContacts, ...contacts])
  }

  const handleClearAll = () => {
    setTextContacts([])
  }

  const isChipPresent = textContacts?.length > 0

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-lg gap-4">
      <div>
        <p className="font-bold opacity-80">MANUAL</p>
        <p className="opacity-70">
          Enter comma(,) or new line separated contacts
        </p>
      </div>

      <div
        className={`relative flex flex-col gap-2 w-full rounded-[10px] ${isChipPresent && 'border-[1px] border-Black/20 dark:border-White/20 p-2'}`}>
        {isChipPresent && (
          <div className="flex flex-wrap w-full max-h-[300px] overflow-y-auto">
            {textContacts.map((chip, index) => (
              <div
                key={index}
                className="flex items-center py-1 m-0.5 text-sm text-white bg-blue-500 rounded-[10px]">
                <span className="px-2">{chip}</span>
                <button
                  onClick={() => handleChipRemove(index)}
                  className="pr-1 text-lg focus:outline-none hover:text-red-400">
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter contact numbers"
            value={textContactInputVal}
            onChange={handleInputChange}
            onPaste={handlePaste}
            onKeyDown={handleInputKeyDown}
            className="w-full p-2 border-[1px] border-Black/20 dark:border-White/20 rounded-md focus:outline-none bg-transparent"
          />
          {isChipPresent && (
            <button
              onClick={handleClearAll}
              className="px-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 whitespace-nowrap">
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactChips
