import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useGlobalAuthContext } from '../../AuthContext'

const Input = ({
  label,
  type,
  name,
  id,
  value,
  onChange,
  isValid = true,
  placeholder,
  icon,
  required,
  error = '',
  enableDark = true,
}) => {
  //? states
  const [showPassword, setShowPassword] = useState(false)
  const [typeState, setTypeState] = useState(type)

  //? contexts
  const { selectedLang } = useGlobalAuthContext()

  //? effects
  useEffect(() => {
    if (showPassword) {
      setTypeState('text')
    } else setTypeState(type)
  }, [showPassword, type])

  return (
    <div className="flex flex-col items-start w-full gap-1 ">
      {label && (
        <label
          htmlFor={label}
          className="flex items-center gap-1 text-base font-semibold capitalize text-BlackSec">
          <span>{label}</span>
          <span className={`${required ? 'block' : 'hidden'} text-red-600`}>
            *
          </span>
        </label>
      )}
      <div className="relative flex items-center justify-center w-full">
        {type == 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute text-xl ${selectedLang == 'en' ? 'right-4' : 'left-4'
              } `}>
            {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          name={name}
          id={id}
          value={value}
          type={typeState}
          onChange={onChange}
          placeholder={placeholder}
          className={`${icon ? 'pl-9' : ''} px-4 bg-white w-full ${enableDark &&
            'dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White'
            }  border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]  ${error ? 'animate-wiggle border-Red' : 'focus-visible:border-Blue'
            }`}
        />
      </div>
      {error && <p className="text-base font-semibold text-Red">{error}</p>}
    </div>
  )
}

export default Input
