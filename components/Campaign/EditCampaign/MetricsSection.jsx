import { useClickAway } from '@uidotdev/usehooks'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiSolidTimeFive, BiText } from 'react-icons/bi'
import { FiChevronRight } from 'react-icons/fi'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { MdClose, MdOutlineKeyboardBackspace, MdPending } from 'react-icons/md'
import { RiDatabase2Fill } from 'react-icons/ri'
import { TbFileTypeCsv, TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { useGlobalAuthContext } from '../../../AuthContext'
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext'
import Modal from '../../Modal'
import PrimaryButton from '../../UI/Button/PrimaryButton'
import { InfoButton } from '../../UI/InfoButton'

// RiDatabase2Fill
// TbFileTypeCsv
const HOUROPTIONS = [
  { title: '00', value: '0' },
  { title: '01', value: '1' },
  { title: '02', value: '2' },
  { title: '03', value: '3' },
  { title: '04', value: '4' },
  { title: '05', value: '5' },
  { title: '06', value: '6' },
  { title: '07', value: '7' },
  { title: '08', value: '8' },
  { title: '09', value: '9' },
  { title: '10', value: '10' },
  { title: '11', value: '11' },
  { title: '12', value: '12' },
  { title: '13', value: '13' },
  { title: '14', value: '14' },
  { title: '15', value: '15' },
  { title: '16', value: '16' },
  { title: '17', value: '17' },
  { title: '18', value: '18' },
  { title: '19', value: '19' },
  { title: '20', value: '20' },
  { title: '21', value: '21' },
  { title: '22', value: '22' },
  { title: '23', value: '23' },
]

const MetricsSection = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const { getCookie } = useGlobalAuthContext()
  const {
    currentStep,
    setCurrentStep,
    setSuccessMsg,
    setErrorMsg,
    inspectData,
    getInspectData,
    allInputDissabled,
  } = useGlobalCampaignContext()
  const [selectedHour, setSelectedHour] = useState('0') // Set an initial value (e.g., 0)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [showHourOptions, setShowHourOptions] = useState(false)

  const [showUnsubscribedContacts, setShowUnsubscribedContacts] =
    useState(false)
  const toggleShowUnsubscribedContacts = () => {
    setShowUnsubscribedContacts(!showUnsubscribedContacts)
  }

  const handleHourChange = (val) => {
    setSelectedHour(val)
  }

  const hourRef = useClickAway(() => {
    setShowHourOptions(false)
  })

  useEffect(() => {
    if (inspectData?.hour) {
      setSelectedHour(inspectData?.hour.toString())
    }
  }, [inspectData])

  const handleConfirmCampaign = async () => {
    setErrorMsg('')
    setSuccessMsg('')
    try {
      setIsApiLoading(true)
      setErrorMsg('')

      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/campaigns/confirm`

      const config = {
        headers: {
          Accept: 'application/json',
          'campaign-id': id,
          hour: selectedHour,
          Authorization: getCookie('access-token'),
        },
      }

      const res = await axios.post(url, {}, config)

      // Handle the res data as needed
      await getInspectData(id)
      console.log('Response Data:', res.data)
      setSuccessMsg(t('Campaign_New_Campaignsentapproval'))
    } catch (err) {
      // Handle errors
      setErrorMsg(err.message)
    } finally {
      setIsApiLoading(false)
    }
  }

  const isContinueDisabled = isApiLoading || !selectedHour

  return (
    <div className="w-full flex flex-col items-start justify-start bg-white dark:bg-bgBlack p-4 gap-10 rounded-[10px]">
      <Header
        inspectData={inspectData}
        t={t}
      />
      {currentStep === 3 && (
        <>
          <div className="flex flex-col items-start justify-start w-full h-full gap-10 ">
            {/* Database */}
            {/* <div className="flex flex-col items-start justify-start w-full gap-4">

              <div className="flex flex-col items-start justify-start w-full gap-8 border-[1px] border-Black/20 dark:border-White/20 py-2 pb-4 px-4 rounded-[10px]">
                <div className="flex items-center justify-between w-full gap-4">
                  <p className="flex items-center justify-center gap-2">
                    <BiSolidTimeFive className="text-xl text-violet-500" />{' '}
                    {t('Campaign_New_Campaignduration')}
                  </p>
                  <p className="text-lg font-bold">
                    {inspectData?.days} {t('Campaign_New_Days')}
                  </p>
                </div>
                <div className="relative flex items-center justify-start w-full gap-4">
                  <label
                    htmlFor="hour"
                    className="flex items-center gap-1 text-base font-semibold text-BlackSec">
                    <span>{t('Campaign_New_SelectStartHourForCampaign')}</span>
                  </label>
                  <div
                    className=""
                    ref={hourRef}>
                    <button
                      disabled={allInputDissabled}
                      onClick={() => setShowHourOptions(!showHourOptions)}
                      className="flex items-center justify-between w-20 p-2 text-sm bg-transparent border-2 border-gray-300 disabled:border-gray-200 text-textBlack rounded-xl focus:border-bgBlackD">
                      {
                        HOUROPTIONS.find(
                          (option) => option.value === selectedHour
                        ).title
                      }
                      <HiOutlineChevronDown className="text-xl" />
                    </button>
                    {showHourOptions && (
                      <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-hidden flex flex-col items-start justify-between text-sm  border-2 border-gray-300 dark:border-White/20 rounded-lg bottom-[52px] text-textBlack max-h-[300px] overflow-y-scroll w-20">
                        {HOUROPTIONS.map((option, i) => (
                          <button
                            key={option.title}
                            onClick={() => {
                              setShowHourOptions(false)
                              handleHourChange(option.value)
                            }}
                            className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec  py-3 text-left px-2.5 ${
                              selectedHour === option.value &&
                              'bg-gray-200 dark:bg-bgBlackSec'
                            }`}>
                            {option.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            {inspectData && (
              <div className="flex flex-col items-start justify-start w-full max-w-lg p-4 rounded-[10px] gap-4 border-[2px] border-Black/20 dark:border-White/20">
                {!!inspectData?.db_audience && (
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <div className="flex items-center justify-between w-full font-semibold">
                      <p className="flex items-center justify-center gap-2">
                        <span className="text-2xl">
                          <RiDatabase2Fill />
                        </span>
                        Total number of contacts selected from database.
                      </p>
                      <p>{inspectData?.db_audience}</p>
                    </div>
                  </div>
                )}
                {!!inspectData?.external_audience && (
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <div className="flex justify-between w-full font-semibold">
                      <p className="flex justify-center gap-2">
                        <span className="text-2xl">
                          <TbFileTypeCsv />
                        </span>
                        Total number of unique and valid contacts selected from
                        CSV
                      </p>
                      <p>{inspectData?.external_audience}</p>
                    </div>
                  </div>
                )}

                {!!inspectData?.text_audience && (
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <div className="flex justify-between w-full font-semibold">
                      <p className="flex justify-center gap-2">
                        <span className="text-2xl">
                          <BiText />
                        </span>
                        Total number of unique and valid manually entered
                        contacts selected
                      </p>
                      <p>{inspectData?.text_audience}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-start justify-start w-full gap-2 border-t-[1px] pt-2">
                  <div className="flex justify-between w-full font-semibold">
                    <p className="flex justify-center gap-2">
                      Total uniqe audience selected
                    </p>
                    <p>
                      {(parseFloat(inspectData?.audience) || 0) +
                        (parseFloat(inspectData?.unsubscribed_users) || 0)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start w-full gap-2">
                  <div className="flex justify-between w-full font-semibold text-red-600">
                    <p className="flex items-center justify-center gap-2">
                      Total unsubscribed contacts{' '}
                      <button onClick={() => toggleShowUnsubscribedContacts()}>
                        <InfoButton text="Show the unsubscribed contacts"></InfoButton>
                      </button>
                    </p>
                    <p className="">-{inspectData?.unsubscribed_users}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start w-full gap-2 border-t-[1px] pt-2">
                  <div className="flex justify-between w-full font-semibold text-green-600">
                    <p className="flex justify-center gap-2">
                      Effective uniqe audience selected
                    </p>
                    <p>{inspectData?.audience}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-start justify-start w-full max-w-lg p-4 rounded-[10px] gap-4 border-[2px] border-Black/20 dark:border-White/20">
              <div className="flex flex-col items-start justify-start w-full gap-2">
                <div className="flex items-center justify-between w-full font-semibold">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl">
                      <BiSolidTimeFive className="text-xl" />
                    </span>
                    {t('Campaign_New_Campaignduration')}
                  </p>
                  <p>
                    {inspectData?.days}{' '}
                    {inspectData?.days <= 1
                      ? t('Campaign_New_Day')
                      : t('Campaign_New_Days')}
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-start w-full gap-4">
                <label
                  htmlFor="hour"
                  className="flex items-center gap-1 font-semibold">
                  <span>{t('Campaign_New_SelectStartHourForCampaign')}</span>
                </label>
                <div
                  className=""
                  ref={hourRef}>
                  <button
                    disabled={allInputDissabled}
                    onClick={() => setShowHourOptions(!showHourOptions)}
                    className="flex items-center justify-between w-20 p-2 text-sm bg-transparent border-2 border-gray-300 disabled:border-gray-200 text-textBlack rounded-xl focus:border-bgBlackD">
                    {
                      HOUROPTIONS.find(
                        (option) => option.value === selectedHour
                      ).title
                    }
                    <HiOutlineChevronDown className="text-xl" />
                  </button>
                  {showHourOptions && (
                    <div className="absolute z-10 bg-white dark:bg-bgBlack drop-shadow-lg overflow-hidden flex flex-col items-start justify-between text-sm  border-2 border-gray-300 dark:border-White/20 rounded-lg bottom-[52px] text-textBlack max-h-[300px] overflow-y-scroll w-20">
                      {HOUROPTIONS.map((option, i) => (
                        <button
                          key={option.title}
                          onClick={() => {
                            setShowHourOptions(false)
                            handleHourChange(option.value)
                          }}
                          className={`w-full hover:bg-gray-100 dark:hover:bg-bgBlackSec  py-3 text-left px-2.5 ${selectedHour === option.value &&
                            'bg-gray-200 dark:bg-bgBlackSec'
                            }`}>
                          {option.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Modal
            isVisible={showUnsubscribedContacts}
            onClose={() => setShowUnsubscribedContacts(false)}>
            <div className="flex flex-col items-center justify-center w-full max-w-sm p-3 mx-4 overflow-y-auto bg-white rounded-xl max-h-[70vh]">
              <div className="flex items-center justify-between border-b-[1px] w-full pb-2">
                <p className="font-semibold">Unsubscribed Contacts</p>
                <button onClick={() => setShowUnsubscribedContacts(false)}>
                  <MdClose className="text-lg" />
                </button>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 py-3 mobileL:grid-cols-2">
                {inspectData?.unsubscribed_users_data?.map((contact, i) => (
                  <p key={contact}>
                    <span className="font-bold">{i + 1}.</span> {contact}
                  </p>
                ))}
              </div>
            </div>
          </Modal>

          {inspectData.status === 'approval' && (
            <p className="font-semibold text-white bg-yellow-600 rounded-[10px] py-2 px-4">
              {t('Campaign_New_Yourcampaignhasbeensentforapproval')}
            </p>
          )}

          <div className="flex items-center justify-between w-full ">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center justify-center gap-2 opacity-80">
              <MdOutlineKeyboardBackspace className="text-xl" />
              {t('Campaign_New_PreviousStep')}
            </button>
            <div className="w-full max-w-[150px]">
              {!allInputDissabled && (
                <PrimaryButton
                  handleClick={handleConfirmCampaign}
                  isLoading={isApiLoading}
                  disabled={isContinueDisabled}
                  text={t('Campaign_New_ConfirmCampaign')}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MetricsSection

const Header = ({ inspectData, t }) => {
  return (
    <div className="flex items-start justify-between w-full gap-2">
      <div>
        <p className="text-xl font-semibold">
          {t('Campaign_New_CampaignMetrics')}
        </p>
        <p className="mt-1 opacity-80">
          {t('Campaign_New_Keystatisticsandlaunch')}
        </p>
      </div>
      <div className="flex items-center justify-center gap-8">
        {inspectData?.status != 'pending' ? (
          <p className="flex items-center justify-center gap-3 text-lg">
            <TbSquareRoundedCheckFilled className="text-2xl text-green-500" />{' '}
            {t('Campaign_New_Completed')}
          </p>
        ) : (
          <p className="flex items-center justify-center gap-3 text-lg">
            <MdPending className="text-2xl text-yellow-500" />{' '}
            {t('Campaign_New_Pending')}
          </p>
        )}
        <p className="hidden text-4xl opacity-70 mobileL:block">
          <FiChevronRight />
        </p>
      </div>
    </div>
  )
}
