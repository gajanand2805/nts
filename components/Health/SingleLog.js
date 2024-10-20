import React from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
const SingleLog = ({ error, index }) => {
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div
      key={index}
      className="relative flex flex-col w-[100%] px-5 py-4 rounded-md group bg-white dark:bg-bgBlack">
      <div className="flex flex-col justify-between gap-4">
        <div className="grid grid-cols-2 tabletM:grid-cols-3  gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('Meta_Logs_id')}
            </p>
            <p className="text-base font-bold mobileL:text-base ">
              {error['Order ID']}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('Meta_Logs_template')}
            </p>
            <p className="text-base font-bold mobileL:text-base">
              {error.Template}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('Meta_Logs_tag')}
            </p>
            <p className="text-base font-bold mobileL:text-base">
              {error.logs.tag}
            </p>
          </div>
        </div>

        <div className="flex w-[100%] gap-4 overflow-auto">
          <div>
            <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
              {t && t('Meta_Logs_error')}
            </p>
            <pre className="text-base w-[100%] font-bold mobileL:text-base">
              {JSON.stringify(error.logs.value, null, 4)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleLog
