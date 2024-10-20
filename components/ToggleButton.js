import React from 'react'

const ToggleButton = ({
  toggleHandler,
  toggleStatus,
  isLoading,
  selectedLang,
  small,
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={toggleHandler}
      className={`flex justify-start ${
        small
          ? 'w-[35px] h-[20px] px-[4px] py-[4px]'
          : 'w-[67px] h-[40px] px-[5px] py-[5px]'
      } rounded-full  ${
        toggleStatus ? 'bg-Green/20' : 'bg-BlackSec/20'
      } disabled:opacity-70`}>
      <div
        className={` ${
          small ? 'w-[12px] h-[12px]' : 'w-[30px] h-[30px]'
        } rounded-full transition-all duration-300 ${
          toggleStatus
            ? selectedLang == 'en'
              ? small
                ? 'translate-x-4 bg-Green'
                : 'translate-x-6 bg-Green'
              : small
                ? '-translate-x-4 bg-Green'
                : '-translate-x-6 bg-Green'
            : 'bg-BlackSec'
        }`}
      />
    </button>
  )
}

export default ToggleButton
