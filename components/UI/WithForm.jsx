import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { FormContext } from './Form'

const propTypes = {
  name: PropTypes.string.isRequired,
  validators: PropTypes.arrayOf(PropTypes.func),
}

export const withForm = (InputComponent) => {
  const WrappedWithForm = (props) => {
    const { errors, data, setFieldValue, registerInput } =
      useContext(FormContext)

    useEffect(
      () =>
        registerInput({
          name: props.name,
          validators: props.validators,
        }),
      []
    )

    const onChange = (val) => {
      setFieldValue(props.name, val)
      if (props.onChange) {
        const e = {
          target: {
            name: props.name,
            value: val,
          },
        }
        props.onChange(e)
      }
    }
    const inputValue = data[props.name]
    const inputErrors = errors[props.name] || []

    return (
      <InputComponent
        {...props}
        errors={inputErrors}
        value={inputValue}
        onChange={onChange}
      />
    )
  }

  WrappedWithForm.propTypes = propTypes
  return WrappedWithForm
}
