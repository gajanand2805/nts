import React from 'react'

const PrimaryButton = ({
  disabled = false,
  isLoading = false,
  handleClick,
  type = 'button',
  text,
  size = 'small',
  width = 'full',
  height = 'full',
  color = 'standard',
}) => {
  return size === 'small' ? (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={`${'w-' + width} ${
        'h-' + height
      } px-3 py-2 text-base font-bold text-white rounded-lg ${
        color == 'standard' && 'bg-Blue border-Blue'
      } ${
        color == 'danger' && 'bg-Red border-Red'
      }  border-[1.5px]  hover:opacity flex items-center justify-center hover:opacity-80 transition-all duration-300  disabled:opacity-60 whitespace-nowrap`}>
      {isLoading ? (
        <div
          className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
        />
      ) : (
        text
      )}
    </button>
  ) : (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type ? type : null}
      className={`w-full py-4 text-xl font-bold disabled:opacity-40 text-white rounded-lg bg-Blue border-2 border-Blue hover:bg-Blue/80 flex items-center justify-center hover:shadow-lg transition-all duration-300`}>
      {isLoading ? (
        <div
          className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
        />
      ) : (
        text
      )}
    </button>
  )
}

export default PrimaryButton
