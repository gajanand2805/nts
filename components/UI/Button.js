import React from 'react'

const Button = ({
  buttonType = 'primary',
  disabled,
  isLoading,
  handleClick,
  text,
  type = 'button',
  width = 'full',
  margin = '3',
}) => {
  return (
    <>
      {buttonType === 'primary' && (
        <button
          type={type}
          disabled={disabled}
          className={`flex justify-center whitespace-nowrap w-${width} p-2 px-3  focus:outline-none focus:ring focus:ring-blue-300 py-2 mt-${margin} font-bold text-white rounded-lg bg-Blue dark:bg-Blue hover:bg-DarkBlue dark:hover:bg-blue-400 outline-0 disabled:opacity-60`}
          onClick={handleClick}>
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White " />
          ) : (
            text
          )}
        </button>
      )}
      {buttonType === 'secondary' && (
        <button
          type={type}
          disabled={disabled}
          className={`flex justify-center w-${width} focus:outline-none focus:ring focus:ring-blue-300  disabled:opacity-60 px-3 py-2 font-bold border-[1px] dark:border-White/60 border-Black/60 text-Black/60  dark:text-White/60    dark:hover:border-White/90 hover:border-Black/90 hover:text-Black/90  dark:hover:text-White/90`}
          onClick={handleClick}>
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-Black dark:border-White " />
          ) : (
            text
          )}
        </button>
      )}
    </>
  )
}

export default Button
