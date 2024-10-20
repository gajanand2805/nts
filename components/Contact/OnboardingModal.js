import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import PhoneInput from '../UI/PhoneInput'

const OnboardingModal = ({ onClose }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { buisnessDetails, getCookie, wrapper } = useGlobalAuthContext()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('966')
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false)
  const [sent, setSent] = useState(false)
  const [category, setCategory] = useState('')
  function isValidPhonenumber(inputtxt) {
    if (inputtxt.length > 4 && inputtxt.length < 16) {
      return true
    } else {
      return false
    }
  }

  const Onboarding = async () => {
    setError(null)
    if (!isValidPhonenumber(phoneNumber)) {
      setError({ phoneError: 'Agent_error_invalid_phone' })
    } else {
      setLoad(true)

      let Header = {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
        'business-category': category,
        'country-code': countryCode,
        'phone-number': phoneNumber,
      }

      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/channel/onboard/request`
      )

      await fetch(url, { method: 'GET', headers: Header })
        .then((res) => wrapper(res))
        .then((data) => {
          setLoad(false)
          setSent(true)
        })
        .catch((e) => {
          onClose()
        })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4  px-6 py-6 w-[90%] tabletM:w-full max-w-[450px] bg-white rounded-[10px] dark:bg-bgBlack">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold"> {t('Onboarding_heading')} </p>
      </div>

      <ul className="flex flex-col w-full items-start gap-1">
        <li className="flex gap-3 text-sm">
          <p>
            <FaCheck className="mt-1 text-sm text-Blue font-xl" />
          </p>
          <p>{t && t('Onboarding_check_one')}</p>
        </li>

        <li className="flex gap-3 text-sm">
          <p>
            <FaCheck className="mt-1 text-sm text-Blue font-xl" />
          </p>
          <p>{t && t('Onboarding_check_two')}</p>
        </li>
      </ul>

      <div className="flex w-full flex-col gap-4">
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
          label={t && t('Onboarding_phone')}
          placeholder={t && t('Agents_icon_inspectcontact_inputbox')}
          type="phone"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber}
          error={t(error?.phoneError)}
        />

        <div className="flex flex-col gap-2 ">
          <label
            htmlFor={t && t('Onboarding_category')}
            className="text-base font-semibold capitalize text-BlackSec">
            {t && t('Onboarding_category')}
          </label>
          <select
            className={`bg-transparent text-sm ltr p-2 bg-transparentpx-4 bg-white dark:bg-dBlack  dark:text-White dark:border-White/20 border-2 py-2 rounded-[10px] border-r-0 shadow-sm border-[BlackTer] text-Black outline-0 focus-visible:border-2`}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            value={category}>
            <>
              <option
                value="Automotive"
                selected>
                Automotive
              </option>
              <option
                value="Beauty, Spa and Salon"
                selected>
                Beauty, Spa and Salon
              </option>
              <option
                value="Clothing and Apparel"
                selected>
                Clothing and Apparel
              </option>
              <option
                value="Education"
                selected>
                Education
              </option>
              <option
                value="Entertainment"
                selected>
                Entertainment
              </option>
              <option
                value="Event Planning and Service"
                selected>
                Event Planning and Service
              </option>
              <option
                value="Finance and Banking"
                selected>
                Finance and Banking
              </option>
              <option
                value="Food and Grocery"
                selected>
                Food and Grocery
              </option>
              <option
                value="Public Service"
                selected>
                Public Service
              </option>
              <option
                value="Hotel and Lodging"
                selected>
                Hotel and Lodging
              </option>
              <option
                value="Medical and Health"
                selected>
                Medical and Health
              </option>
              <option
                value="Non-profit"
                selected>
                Non-profit
              </option>
              <option
                value="Professional Services"
                selected>
                Professional Services
              </option>
              <option
                value="Shopping and Retail"
                selected>
                Shopping and Retail
              </option>
              <option
                value="Travel and Transportation"
                selected>
                Travel and Transportation
              </option>
              <option
                value="Restaurant"
                selected>
                Restaurant
              </option>
              <option
                value="other"
                selected>
                other
              </option>
            </>
          </select>
        </div>

        {sent && (
          <div className="w-full bg-Green dark:bg-Green/60 gap-2 py-2 px-4 rounded-xl flex flex-row justify-between">
            <p className=" text-white font-bold text-sm">
              {t && t('Onboarding_success')} <br />
            </p>
          </div>
        )}

        <div className="flex items-center justify-between w-full gap-2 ">
          <SecondaryButton
            text={t && t('Onboarding_cancel')}
            handleClick={onClose}
          />

          <PrimaryButton
            isLoading={load}
            disabled={sent}
            handleClick={Onboarding}
            text={t && t('Onboarding_submit')}
            width="full"
          />
        </div>
      </div>
    </div>
  )
}

export default OnboardingModal
