import axios from 'axios'

export const checkPasswordValidity = (value) => {
  const isContainsUppercase = /^(?=.*[A-Z]).*$/
  const isContainsLowercase = /^(?=.*[a-z]).*$/
  const isContainsNumber = /^(?=.*[0-9]).*$/
  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/
  const isValidLength = /^.{8,16}$/

  if (!isContainsUppercase.test(value)) {
    setInputPasswordError(
      'Password must have at least one Uppercase Character.'
    )
    return false
  } else if (!isContainsLowercase.test(value)) {
    setInputPasswordError(
      'Password must have at least one Lowercase Character.'
    )
    return false
  } else if (!isContainsNumber.test(value)) {
    setInputPasswordError('Password must contain at least one Digit.')
    return false
  } else if (!isContainsSymbol.test(value)) {
    setInputPasswordError('Password must contain at least one Special Symbol.')
    return false
  } else if (!isValidLength.test(value)) {
    setInputPasswordError('Password must be 8-16 Characters Long.')
    return false
  } else {
    setInputPasswordError('')
    return true
  }
}
