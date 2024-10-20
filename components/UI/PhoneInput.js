import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiTwotonePlaySquare } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { useGlobalAuthContext } from '../../AuthContext'
import CountryCodeOption from '../../static/CountryCodeOption'
const PhoneInput = ({
  label,
  name,
  id,
  value,
  onChange,
  isValid = true,
  placeholder,
  error = '',
  enableDark = true,
  countryCode,
  countryCodeOnChange,
}) => {
  const { selectedLang } = useGlobalAuthContext()

  return (
    <div className="flex flex-col gap-2 ">
      {label && (
        <label
          htmlFor={label}
          className="text-base font-semibold capitalize text-BlackSec">
          {label}
        </label>
      )}
      <div
        className={`flex w-full overflow-hidden bg-transparent  border-collapse rounded-[10px]  border-Black/70 dark:border-White/70 ${selectedLang == 'ar' && 'flex-row-reverse'}`}>
        <select
          className={`w-40 bg-transparent text-sm ltr     p-2 bg-transparentpx-4 bg-white dark:bg-dBlack  dark:text-White dark:border-White/20 border-2 py-2 rounded-l-[10px] border-r-0 shadow-sm border-[BlackTer] text-Black outline-0 focus-visible:border-2`}
          onChange={countryCodeOnChange}
          value={countryCode}>
          <CountryCodeOption />
        </select>
        <input
          name={name}
          id={id}
          value={value}
          type="phone"
          onChange={onChange}
          placeholder={placeholder}
          className={` w-full p-2 bg-transparentpx-4 bg-white dark:bg-dBlack  dark:text-White dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-r-[10px] shadow-sm border-[BlackTer] text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px] ltr`}
        />
      </div>
      {error && <p className="text-base font-semibold text-Red">{error}</p>}
    </div>
  )
}

export default PhoneInput
