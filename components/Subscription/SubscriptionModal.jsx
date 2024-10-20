import { useRouter } from 'next/router'
import PrimaryButton from '../UI/Button/PrimaryButton'
import UpgradeIcon from '../../public/upgrade.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export const SubscriptionModal = () => {
  //? router
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div className="flex w-[80%] max-w-[350px] flex-col items-center justify-center gap-5 p-8 bg-bgWhiteSec rounded-lg dark:bg-bgBlack">
      <Image
        src={UpgradeIcon}
        width={100}
        height={100}
        objectFit="contain"
        alt="UpgradeIcon"
      />
      <p className="font-bold text-lg text-center">
        {t('Subscription_modal_heading')}
      </p>
      <p className="font-semibold text-sm text-center opacity-60">
        {t('Subscription_modal_text')}
      </p>
      <PrimaryButton
        text={t('Subscription_modal_upgrade')}
        handleClick={() => router.push('/subscription')}
      />
    </div>
  )
}
