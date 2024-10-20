import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BiSolidCalendarAlt,
  BiSolidCalendarExclamation
} from 'react-icons/bi'
import { HiPlayCircle } from 'react-icons/hi2'
import { IoSend } from 'react-icons/io5'
import { MdCurrencyRupee, MdPending, MdSmsFailed, MdTouchApp } from 'react-icons/md'
import { PiPauseCircleBold } from 'react-icons/pi'
import { SiTarget } from 'react-icons/si'
import { useGlobalAuthContext } from '../../../AuthContext'
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext'
import Modal from '../../Modal'
import PrimaryButton from '../../UI/Button/PrimaryButton'
import SecondaryButton from '../../UI/Button/SecondaryButton'
import { InfoButton } from '../../UI/InfoButton'

const CampaignAnalytics = () => {
  const { viewData, getInspectData, inspectData } = useGlobalCampaignContext()
  const { getCookie } = useGlobalAuthContext()
  const { t } = useTranslation()
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [isDownloadLoading, setIsDownloadLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const router = useRouter()
  const { id } = router.query
  const WhatsappCredits = viewData?.analytics?.Reach * 1 || 0;
  // console.log("viewData", viewData)
  async function getROI() {
    setIsDownloadLoading(true)
    let Header = {
      Authorization: getCookie('access-token'),
      'Content-type': 'application/json',
    }
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaign/roi/${id}`
    )
    await fetch(url, { method: 'GET', headers: Header })
      .then((res) => {
        return res.blob()
      })
      .then(async (data) => {
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(data)
        a.download = `roi_${id}`
        a.click()
        await new Promise((r) => setTimeout(r, 1))
        setIsDownloadLoading(false)
      })
  }

  const handleChangeStatus = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaigns/pause`

    try {
      setApiError(null)
      setIsApiLoading(true)
      const config = {
        params: {
          campaign_id: id,
        },
        headers: {
          Authorization: getCookie('access-token'),
          Accept: 'application/json',
        },
      }
      const res = await axios.get(apiUrl, config)
      await getInspectData(id)
      // setData(res.data)
    } catch (error) {
      console.log(error)
      setApiError('Something went wrong!')
    } finally {
      setIsApiLoading(false)
      setShowResumeModal(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4 bg-white dark:bg-bgBlack rounded-standard">
      <Modal
        isVisible={showResumeModal}
        onClose={() => setShowResumeModal(false)}>
        <ResumeModal
          onClose={() => setShowResumeModal(false)}
          handleChangeStatus={handleChangeStatus}
          isLoading={isApiLoading}
          inspectData={inspectData}
        />
      </Modal>
      <div className="flex items-center justify-between w-full">
        <p className="w-full text-lg font-semibold text-start">
          {t && t('Campaign_View_Header')}
        </p>

        {(inspectData?.status === 'ongoing' ||
          inspectData?.status === 'paused') && (
            <div>
              <PrimaryButton
                handleClick={() => setShowResumeModal(true)}
                size="small"
                text={
                  inspectData?.status === 'paused' ? (
                    <p className="flex items-center justify-center gap-2 text-sm">
                      <HiPlayCircle className="text-lg" />
                      {t('Campaign_View_ResumeButton')}
                    </p>
                  ) : (
                    <p className="flex items-center justify-center gap-2 text-sm">
                      <PiPauseCircleBold className="text-lg" />
                      {t('Campaign_View_PauseButton')}
                    </p>
                  )
                }
              />
            </div>
          )}
      </div>
      {apiError && (
        <p className="w-full px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg">
          {apiError}
        </p>
      )}
      <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        <div className="flex flex-col items-start justify-between w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t && t('Campaign_View_Duration')}
              <InfoButton text={t && t('Campaign_View_Duration')} />
            </p>
            <p className="text-2xl text-orange-500">
              <BiSolidCalendarAlt />
            </p>
          </div>
          <p className="font-semibold">
            {viewData?.days} {viewData?.days <= 1 ? 'Day' : 'Days'}
          </p>
        </div>

        <div className="flex flex-col items-start justify-between w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t && t('Campaign_View_Completed')}
              <InfoButton text={t && t('Campaign_View_Completed')} />
            </p>
            <p className="text-2xl text-yellow-500">
              <BiSolidCalendarExclamation />
            </p>
          </div>
          <p className="font-semibold">
            {viewData?.sent_batches}{' '}
            {viewData?.sent_batches <= 1 ? 'Day' : 'Days'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Campaign_Table_target_header')}
              <InfoButton text={t('Campaign_Table_info_target_header')} />
            </p>
            <p className="text-2xl text-red-500">
              <SiTarget />
            </p>
          </div>
          <p className="font-semibold">{viewData?.analytics?.Target}</p>
        </div>
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Campaign_Table_sent_header')}
              <InfoButton text={t('Campaign_Table_info_sent_header')} />
            </p>
            <p className="text-2xl text-blue-500">
              <IoSend className="-rotate-45" />
            </p>
          </div>
          <p className="font-semibold">{viewData?.analytics?.Sent}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Delivered')}
              <InfoButton text={t('Campaign_Table_info_reach_header')} />
            </p>
            <p className="text-2xl text-yellow-500">
              <MdPending />
            </p>
          </div>
          <p className="font-semibold">{viewData?.analytics?.Reach}</p>
        </div>
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Seen')}
              <InfoButton text={t('Campaign_Table_info_Impressions_header')} />
            </p>
            <p className="text-2xl text-green-500">
              <MdTouchApp />
            </p>
          </div>
          <p className="font-semibold">{viewData?.analytics?.Impression}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Failed')}
              <InfoButton text={t('Messages failed to sent.')} />
            </p>
            <p className="text-2xl text-red-500">
              <MdSmsFailed />
            </p>
          </div>
          <p className="font-semibold">{viewData?.analytics?.Failed}</p>
        </div>
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Whatsapp Credits')}
              <InfoButton text={t("Credits are deducted based on the number of successfully delivered messages.")} />
            </p>
            <p className="text-2xl text-red-500">
              <MdCurrencyRupee />
            </p>
          </div>
          <p className="font-semibold">{WhatsappCredits}</p>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Campaign_Table_Revenue_header')}
              <InfoButton text={t('Campaign_Table_info_Revenue_header')} />
            </p>
            <p className="text-2xl text-orange-500">
              <PrimaryButton
                handleClick={() => getROI()}
                size="small"
                disabled={isDownloadLoading}
                text={
                  <p className="flex items-center justify-center gap-1 text-xs">
                    CSV
                    <BiDownload className="text-md" />
                  </p>
                }
              />
            </p>
          </div>
          <p className="font-semibold">{viewData?.analytics?.Revenue} SAR</p>
        </div>
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Campaign_Table_CTR_header')}
              <InfoButton text={t('Campaign_Table_info_CTR_header')} />
            </p>
            <p className="text-2xl text-pink-500">
              <HiCursorClick />
            </p>
          </div>
          <p className="font-semibold">
            {viewData?.analytics?.CTR.toFixed(2)} %
          </p>
        </div>
      </div> */}
      {/* <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row">
        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Campaign_Table_Conversion_header')}
              <InfoButton text={t('Campaign_Table_info_Conversion_header')} />
            </p>
            <p className="text-2xl text-fuchsia-500">
              <SiConvertio />
            </p>
          </div>
          <p className="font-semibold">
            {viewData?.analytics?.Conversion.toFixed(2)} %
          </p>
        </div>

        <div className="flex flex-col items-start justify-between  w-full gap-4 px-4 py-2 dark:bg-dBlack border-BlackTer rounded-[10px] border-[1px] dark:border-dBlack">
          <div className="flex items-center justify-between w-full">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold opacity-80">
              {t('Campaign_Table_ROAS_header')}
              <InfoButton text={t('Campaign_Table_info_ROAS_header')} />
            </p>
            <p className="text-2xl text-cyan-500">
              <GoGraph />
            </p>
          </div>
          <p className="font-semibold">
            {viewData?.analytics?.ROS.toFixed(2)} %
          </p>
        </div>

      </div> */}
    </div>
  )
}

export default CampaignAnalytics

const ResumeModal = ({
  onClose,
  handleChangeStatus,
  isLoading,
  inspectData,
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex w-full mx-2 max-w-sm flex-col items-center justify-center gap-8  p-4 bg-white shadow-xl rounded-[10px] dark:bg-bgBlack">
      <div className="flex flex-col items-center justify-start w-full gap-3">
        <p className="text-xl font-bold">
          {inspectData?.status === 'paused'
            ? t('Campaign_View_Confirmresumecampaign')
            : t('Campaign_View_Confirmpausecampaign')}
        </p>
        <p className="text-center opacity-80">
          {inspectData?.status === 'paused'
            ? t('Campaign_View_AreYouSureresumecampaign')
            : t('Campaign_View_AreYouSurepausecampaign')}
        </p>
      </div>
      <div className="flex items-center justify-end w-full gap-5">
        <SecondaryButton
          handleClick={onClose}
          text={t('Integration_regenerate_modal_cancel')}
        />
        <PrimaryButton
          text={t('Integration_regenerate_modal_confirm')}
          handleClick={handleChangeStatus}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
