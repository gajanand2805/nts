import React from 'react'

const CsvButton = ({
  disabled = false,
  isLoading = false,
  handleClick,
  text,
  width = 'full',
  height = 'full',
}) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${'w-' + width} ${
        'h-' + height
      } px-3 py-2 text-base font-bold rounded-lg bg-bgWhite dark:bg-dBlack border-[1px] border-BlackTer dark:border-dBlack flex items-center justify-center hover:border-bgBlack dark:hover:border-BlackTer transition-all duration-300  disabled:opacity-60`}>
      {isLoading ? (
        <div
          className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-Black dark:border-White`}
        />
      ) : (
        text
      )}
    </button>
  )
}

export default CsvButton
