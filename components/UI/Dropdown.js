import React, { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
const Languages = [
  'NodeJS - Axios',
  'cURL',
  'Python - Requests',
  'JavaScript - Fetch',
  'Dart - http',
]
const Dropdown = ({ value, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className="relative flex flex-col items-start justify-center w-full">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-between w-full gap-5 px-4 py-2  font-semibold  bg-gray-300 rounded-[6px] dark:bg-[#1B2431]">
        {value} <AiOutlineDown className="text" />
      </button>
      {showDropdown && (
        <div className="absolute top-0 w-full bg-gray-300 rounded-[6px] dark:bg-[#1B2431]">
          {Languages.map((lang) => {
            return (
              <button
                key={lang}
                onClick={() => {
                  onSelect(lang)
                  setShowDropdown(false)
                }}
                className="flex items-center justify-between w-full gap-5 px-4 py-2 font-semibold hover:bg-gray-400 dark:hover:bg-gray-900">
                {lang}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
