import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../UI/Input'
import CampaignTable from './CampaignTable'

const MainCampaignScreen = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 mt-5">
      <CampaignTable />
    </div>
  )
}

export default MainCampaignScreen
