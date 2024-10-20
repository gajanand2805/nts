import React from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { GrAdd } from 'react-icons/gr'
import { HiPlusSm } from 'react-icons/hi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { useGlobalAuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
const SubscriptionNBalance = ({ subscription, Wallet }) => {
  const { buisnessDetails } = useGlobalAuthContext()
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-8 py-6 pl-6 pr-10 bg-Blue text-White rounded-xl">
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex flex-col item-start">
          <div className={`flex items-center gap-6 text-2xl font-black `}>
            {subscription ? (
              <>
                <p> {t && t('Active')}</p>
                <p className="p-2 text-xl text-white bg-green-600 rounded-full">
                  <GiCheckMark />
                </p>
              </>
            ) : (
              <>
                <p> {t && t('Inactive')}</p>
                <p className="p-2 text-xl text-white bg-red-600 rounded-full">
                  <GrAdd className="rotate-45" />
                </p>
              </>
            )}
          </div>
          <p className="text-sm font-semibold text-White/90">
            {t && t('Subscription')}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-semibold text-White/90">
            {t && t('Balance')}
          </p>
          <div className="flex flex-row gap-2 text-2xl font-black whitespace-nowrap">
            <div>{Wallet}</div>
            <div className="content-center">
              {<RiMoneyDollarCircleFill className="h-full" />}
            </div>
          </div>
          {buisnessDetails.Level >= 2 && (
            <button className="flex items-center gap-2 px-2 py-1 font-bold dark:bg-White/50 bg-Black/30 whitespace-nowrap dark:text-black rounded-xl">
              <HiPlusSm className="text-xl font-semibold" /> Add
              {/* Balance */}
              {t && t('Balance')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionNBalance
