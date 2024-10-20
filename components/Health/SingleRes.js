import React from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
const SingleRes = ({ error, key }) => {
  const { selectedLang } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div
      key={key}
      className="relative bg-white dark:bg-bgBlack flex flex-col w-[100%] px-5 py-4 border-2 rounded-md group dark:border-bgBlack border-WhiteSec">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-White/40 text-Black/40">
              {t && t('contact')}
            </p>
            <p className="text-base font-bold mobileL:text-base ">
              {error['Contact']}
            </p>
          </div>
        </div>

        <div className="flex w-[100%] gap-4 overflow-auto">
          <div>
            <p className="text-sm font-semibold dark:text-White/40 text-Black/40 mb-2">
              {t && t('Response')}
            </p>
            <pre className="text-base w-[100%] font-bold mobileL:text-base">
              {error.Response.map((val, index) => {
                for (var i in val) {
                  return (
                    <div key={index}>
                      <p className="text-sm font-semibold dark:text-White/70 text-Black/70">
                        {i}
                      </p>
                      <p className="text-base font-bold mobileL:text-base mb-2">
                        {val[i]}
                      </p>
                    </div>
                  )
                }
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleRes
