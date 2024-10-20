import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import PhoneInput from '../UI/PhoneInput'

const InspectPhoneModal = ({ onClose }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { countryCode, setCountryCode } = useGlobalAgentContext()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState(null)

  function isValidPhonenumber(inputtxt) {
    var phoneno = /^\d{10}$/
    if (inputtxt.match(phoneno)) {
      return true
    } else {
      return false
    }
  }

  const handleInspect = async () => {
    setError(null)
    if (!isValidPhonenumber(phoneNumber)) {
      setError({ phoneError: 'Agent_error_invalid_phone' })
    } else {
      router.push(`/inspect/${countryCode + phoneNumber.trim()}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6  px-4 py-6 w-[90%] tabletM:w-full max-w-[400px] bg-white rounded-[10px] dark:bg-bgBlack">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold">
          {' '}
          {t('Agents_icon_inspectcontact_heading')}{' '}
        </p>
        {/* <p className="opacity-90">Inspect any phone no</p> */}
      </div>
      <div className="flex w-full ">
        <PhoneInput
          countryCode={countryCode}
          countryCodeOnChange={(e) => {
            setCountryCode(e.target.value)
          }}
          onChange={(e) => {
            if (!isNaN(e.target.value.trim())) {
              setPhoneNumber(e.target.value.trim())
            }
          }}
          label={t('Agents_icon_inspectcontact_text')}
          placeholder={t && t('Agents_icon_inspectcontact_inputbox')}
          type="phone"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber}
          error={t(error?.phoneError)}
        />
      </div>
      <div className="flex items-center justify-between w-full gap-2 ">
        <PrimaryButton
          // isLoading={isApiLoading}
          // disabled={isApiLoading}
          handleClick={handleInspect}
          text={t('inspect')}
        />
        <SecondaryButton
          text={t('cancel')}
          handleClick={onClose}
        />
      </div>
    </div>
  )
}

export default InspectPhoneModal
