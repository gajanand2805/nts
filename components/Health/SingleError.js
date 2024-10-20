import React from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
const SingleError = ({ error }) => {
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div
      key={error.Trigger}
      className="relative flex flex-col px-5 py-4 rounded-md group bg-white dark:bg-bgBlack">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('responseCode')}
            </p>
            <p className="text-base font-bold mobileL:text-base ">
              {error.Response_Code}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('date')}
            </p>
            <p className="text-base font-bold mobileL:text-base">
              {error.Trigger.split(' ')[0]}
            </p>
            <p className="text-base italic font-bold mobileL:text-base">
              {error.Trigger.split(' ')[1]}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('description')}
            </p>
            <p className="text-base font-bold mobileL:text-base">
              {error.Description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleError
