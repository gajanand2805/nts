import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiSolidShow } from 'react-icons/bi'
import { CgSandClock } from 'react-icons/cg'
import { MdDoneAll, MdOutlinePending } from 'react-icons/md'
import { PiPauseCircleBold } from 'react-icons/pi'
import { RiTimerFill } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalCampaignContext } from '../../contexts/CampaignContext'

const CampaignTable = () => {
  const { isAccessToken } = useGlobalAuthContext()
  const { campaignData } = useGlobalCampaignContext()
  const { t } = useTranslation()
  return (
    <div className="relative w-full h-full overflow-x-auto rounded-lg shadow-sm">
      <table className="w-full min-w-[1000px] h-full tabletM:min-w-[600px]  text-sm text-left text-gray-500 dark:text-gray-400 border-spacing-2">
        <thead className="text-xs text-gray-700  bg-gray-100 dark:bg-[#1B2431] dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left w-[320px] ">
              Campaign ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center">
              {t('Campaign_Table_StartDate_header')}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center">
              {t('Campaign_Table_progress_header')}
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-right">
              {t('Campaign_Table_Status_header')}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          {campaignData.map((data, i) => (
            <SingleCampaignRow
              data={data}
              index={i}
              key={data.campaign_ID}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CampaignTable

const SingleCampaignRow = ({ data, index }) => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <tr className="w-full bg-white border-b rounded-md group dark:bg-bgBlack/60 dark:border-gray-700 text-Black dark:text-White hover:bg-gray-50 dark:hover:bg-dBlack/60">
      <td className="px-6 py-4 text-xs text-left w-[320px]">
        {data.campaign_ID}
      </td>
      <td className="px-6 py-4 text-center whitespace-nowrap">{data.date}</td>
      <td className="px-6 py-4 text-center w-[240px]">
        {data.status === 'pending' ? (
          <ProgressBars />
        ) : (
          <ProgressBars progress={Math.round(data.percentage_sent)} />
        )}
      </td>

      <td className="px-6 py-4 text-right">
        <p className="flex items-center justify-end gap-2 font-semibold capitalize rounded-md">
          {data.status === 'pending' && (
            <>
              <MdOutlinePending className="text-xl text-yellow-500" />
              {t('Campaign_New_Pending')}
            </>
          )}
          {data.status === 'approval' && (
            <>
              <RiTimerFill className="text-xl text-yellow-500" />
              {t('Campaign_New_Approval')}
            </>
          )}
          {data.status === 'ongoing' && (
            <>
              <CgSandClock className="text-xl text-Blue" />
              {t('Campaign_New_Ongoing')}
            </>
          )}
          {data.status === 'completed' && (
            <>
              <MdDoneAll className="text-xl text-green-500" />
              {t('Campaign_New_Completed')}
            </>
          )}
          {data.status === 'paused' && (
            <>
              <PiPauseCircleBold className="text-xl text-violet-500" />
              {t('Campaign_New_Paused')}
            </>
          )}
        </p>
      </td>
      <td className="px-6 py-4 text-center">
        {data.status === 'pending' ? (
          <button
            onClick={() => router.push(`/campaign/${data.campaign_ID}`)}
            className="text-xl group-hover:text-Blue">
            <TbEdit />
          </button>
        ) : (
          <button
            onClick={() => router.push(`/campaign/${data.campaign_ID}`)}
            className="text-xl group-hover:text-Blue">
            <BiSolidShow />
          </button>
        )}
      </td>
    </tr>
  )
}

const ProgressBars = ({ progress = 0 }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-green-500 dark:bg-green-600 text-[10px] text-white  font-bold  text-center py-1 flex items-center justify-center leading-none rounded-full"
        style={{ width: `${progress < 20 ? '20' : progress}%` }}>
        {progress}%
      </div>
    </div>
  )
}
