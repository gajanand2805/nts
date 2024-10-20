import React from 'react'
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext'
import CampaignAnalytics from './CampaignAnalytics'
import CampaignContent from './CampaignContent'

const MainViewCampaignScreen = () => {
  const { viewData } = useGlobalCampaignContext()

  return (
    <div className="flex flex-col items-start justify-start w-full gap-5 mt-5 laptop:flex-row">
      {/* Content */}
      <CampaignContent />
      {/* Analytics */}
      <CampaignAnalytics />
    </div>
  )
}

export default MainViewCampaignScreen
