import classNames from 'classnames'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useGlobalAuthContext } from '../../AuthContext'
import { withForm } from './WithForm'

const propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
}

const defaultProps = {
  value: '',
  type: 'text',
}

const TextInput = ({
  label,
  errors,
  type,
  name,
  id,
  onChange,
  value,
  placeholder,
  enableDark = true,
  required = false,
}) => {
  //? variables
  const hasError = !isEmpty(errors)
  const klass = classNames('flex flex-col items-start w-full gap-1')

  //? functions
  const renderErrors = () => {
    if (!hasError) {
      return null
    }

    const errs = errors.map((errMsg, i) => (
      <li
        key={`${name}-error-${i}`}
        className="text-sm font-semibold text-Red">
        {errMsg}
      </li>
    ))

    return <ul className="flex flex-col">{errs}</ul>
  }

  const onChangeHandler = (e) => {
    onChange(e.target.value)
  }

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
    <div className={klass}>
      {label && (
        <label
          htmlFor={label}
          className="text-base flex items-center gap-1 font-semibold capitalize text-BlackSec">
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
        <input
          name={name}
          id={id}
          value={value}
          type={typeState}
          onChange={onChangeHandler}
          placeholder={placeholder}
          className={`px-4 bg-white w-full ${enableDark &&
            'dark:bg-dBlack dark:text-White dark:border-White/20 dark:placeholder:text-White'
            }  border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]  ${hasError
              ? 'animate-wiggle border-red-400'
              : 'focus-visible:border-Blue'
            }`}
        />
      </div>
      {renderErrors()}
    </div>
  )
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export const FormInput = withForm(TextInput)
