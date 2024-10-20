import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiText } from 'react-icons/bi'
import { FaFileCsv } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import {
  MdAdd,
  MdClose,
  MdOutlineDelete,
  MdOutlineKeyboardBackspace,
  MdPending,
} from 'react-icons/md'
import { RiDatabase2Fill } from 'react-icons/ri'
import { TbFileTypeCsv, TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { useGlobalAuthContext } from '../../../AuthContext'
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext'
import Modal from '../../Modal'
import PrimaryButton from '../../UI/Button/PrimaryButton'
import { InfoButton } from '../../UI/InfoButton'
import ContactChips from './ContactChip'

const AudienceSection = () => {
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
    allInputDissabled,
    getInspectData,
  } = useGlobalCampaignContext()
  const [databaseSelected, setDatabaseSelected] = useState(false)
  const [externalAudienceSelected, setExternalAudienceSelected] =
    useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [textContactInputVal, setTextContactInputVal] = useState('')
  const [textContacts, setTextContacts] = useState([])
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [responseData, setResponseData] = useState(null)

  const [showUnsubscribedContacts, setShowUnsubscribedContacts] =
    useState(false)
  const toggleShowUnsubscribedContacts = () => {
    setShowUnsubscribedContacts(!showUnsubscribedContacts)
  }

  useEffect(() => {
    if (inspectData?.db_audience) {
      setDatabaseSelected(!!inspectData?.db_audience)
    }
    if (inspectData?.external_audience) {
      setExternalAudienceSelected(!!inspectData?.external_audience)
    }

    setTextContacts(inspectData?.text_audience_data)
    // setResponseData(inspectData)
  }, [inspectData])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
    if (file && file.type === 'text/csv') {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
      alert('Please select a valid CSV file.')
    }
  }

  const formatFileSize = (sizeInBytes) => {
    const kbSize = sizeInBytes / 1024
    if (kbSize < 1024) {
      return kbSize.toFixed(2) + ' KB'
    } else {
      const mbSize = kbSize / 1024
      return mbSize.toFixed(2) + ' MB'
    }
  }

  const handleAudienceSelection = async (e) => {
    e.preventDefault()

    //This handles the case where if there is some val in the input filed of manual then it will also get selected
    let tempTextContacts = textContacts
    if (textContactInputVal) {
      tempTextContacts = [...textContacts, textContactInputVal]
      await setTextContacts((prevTextContacts) => [
        ...prevTextContacts,
        textContactInputVal,
      ])
      setTextContactInputVal('')
    }

    const url = `${
      process.env.NEXT_PUBLIC_API_DOMAIN
    }/Dashboard/Merchant/v1.0/campaigns/audience?db_customer=${
      databaseSelected ? 'true' : 'false'
    }`

    if (externalAudienceSelected) {
      url += '&preserve_csv=true'
    }

    const formData = new FormData()
    formData.append('csv', selectedFile ? selectedFile : '')
    if (tempTextContacts?.length > 0) {
      formData.append(
        'audience_text',
        JSON.stringify({
          audience: tempTextContacts,
        })
      )
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
        'campaign-id': id,
        Authorization: getCookie('access-token'),
      },
    }

    try {
      setIsApiLoading(true)
      setSuccessMsg('')
      setErrorMsg('')
      const res = await axios.post(url, formData, config)
      console.log(res.data)
      setResponseData(res.data)
      setSuccessMsg(t('Campaign_New_Audiencesuccessfullyselected'))
      await getInspectData(id)
      setSelectedFile(null)
      // setCurrentStep(3)
    } catch (err) {
      console.log(err?.response?.status == 422)
      if (err?.response?.status == 422) {
        setErrorMsg(
          'Invalid CSV Format. The selected CSV file should have only one column, which should contain phone numbers. Please make sure your CSV file meets this format requirement and try again.'
        )
      } else {
        setErrorMsg(err.message)
      }
    } finally {
      setIsApiLoading(false)
    }
  }

  const hasDataChanged =
    !!inspectData.db_audience !== databaseSelected ||
    selectedFile ||
    (!!selectedFile && !!inspectData.external_audience == 0) ||
    JSON.stringify(inspectData.text_audience_data) !==
      JSON.stringify(textContacts) ||
    !!inspectData.external_audience != externalAudienceSelected ||
    textContactInputVal

  console.log(!!inspectData.external_audience != externalAudienceSelected)

  const isContinueDisabled =
    isApiLoading ||
    (!databaseSelected &&
      !selectedFile &&
      !inspectData?.external_audience &&
      textContacts.length <= 0)

  return (
    <div className="w-full flex flex-col items-start justify-start bg-white dark:bg-bgBlack p-4 gap-10 rounded-[10px]">
      <Header
        hasDataChanged={hasDataChanged}
        t={t}
      />
      {currentStep === 2 && (
        <>
          <div className="flex flex-col items-start justify-start w-full h-full gap-10 ">
            {/* Database */}
            <div className="flex flex-col items-start justify-start w-full gap-4">
              <p className="font-bold opacity-80">
                {t('Campaign_New_Database')}
              </p>
              <div className="flex items-center justify-center gap-2">
                <input
                  disabled={allInputDissabled}
                  type="checkbox"
                  id="databaseSelected"
                  name="radioGroup"
                  value={databaseSelected}
                  checked={databaseSelected}
                  onChange={() => setDatabaseSelected(!databaseSelected)}
                  className="w-5 h-5 mr-2 accent-Blue "
                />
                <label
                  key="databaseSelected"
                  className={`flex items-center cursor-pointer  transition-colors ${
                    databaseSelected ? 'text-Blue' : 'hover:opacity-90'
                  }`}>
                  {t('Campaign_New_Select_audience_from_database')}
                </label>
              </div>
            </div>

            {/* CSV */}
            <div className="flex flex-col items-start justify-start w-full gap-5">
              <div>
                <p className="font-bold opacity-80">CSV</p>
                <p className="opacity-70">
                  {t('Campaign_New_Upload_CSV_file')}
                </p>
              </div>
              <div className="flex flex-col w-full max-w-lg gap-2">
                {selectedFile ? (
                  <div className="flex items-center justify-center w-full gap-4 border-[1px] border-Black/20 dark:border-White/20 p-2 rounded-[10px]">
                    <p className="text-3xl text-green-500 opacity-70">
                      <FaFileCsv />
                    </p>
                    <div className="w-full">
                      <p className="text-sm font-semibold opacity-70">
                        {selectedFile.name}
                      </p>
                      <p className="font-semibold">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null)
                        const fileInput = document.getElementById('csvFile')
                        if (fileInput) {
                          fileInput.value = ''
                        }
                      }}
                      className="text-2xl text-red-500">
                      <MdOutlineDelete />
                    </button>
                  </div>
                ) : externalAudienceSelected ? (
                  <div className="flex items-center justify-center w-full gap-4 border-[1px] border-Black/20 dark:border-White/20 p-2 rounded-[10px]">
                    <p className="text-3xl text-green-500 opacity-70">
                      <FaFileCsv />
                    </p>
                    <div className="w-full">
                      <p className="font-semibold opacity-70">Audience.csv</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null)
                        setExternalAudienceSelected(false)
                        const fileInput = document.getElementById('csvFile')
                        if (fileInput) {
                          fileInput.value = ''
                        }
                      }}
                      className="text-2xl text-red-500">
                      <MdOutlineDelete />
                    </button>
                  </div>
                ) : null}

                <input
                  disabled={allInputDissabled}
                  className="sr-only"
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                {!selectedFile && !externalAudienceSelected && (
                  <label
                    htmlFor="csvFile"
                    className="flex cursor-pointer py-3 font-semibold rounded-[10px] items-center justify-center gap-2 w-full  border-[2px]  border-dashed border-Black/20 dark:border-White/20 ">
                    <MdAdd className="text-xl" />{' '}
                    {inspectData?.external_audience
                      ? 'Change CSV file'
                      : 'Add CSV file'}
                  </label>
                )}
              </div>
            </div>

            <ContactChips
              textContactInputVal={textContactInputVal}
              setTextContactInputVal={setTextContactInputVal}
              setTextContacts={setTextContacts}
              textContacts={textContacts}
            />
          </div>

          {responseData &&
            (!!responseData?.provided_text_audience ||
              !!responseData?.external_audience ||
              databaseSelected) && (
              <div className="flex flex-col items-start justify-start w-full max-w-lg p-4 rounded-[10px] gap-4 border-[2px] border-Black/20 dark:border-White/20">
                {!!responseData?.db_audience && databaseSelected && (
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <div className="flex items-center justify-between w-full font-semibold">
                      <p className="flex items-center justify-center gap-2">
                        <span className="text-2xl">
                          <RiDatabase2Fill />
                        </span>
                        Total number of contacts selected from database.
                      </p>
                      <p>{responseData?.db_audience}</p>
                    </div>
                  </div>
                )}
                {!!responseData?.external_audience && (
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <div className="flex justify-between w-full font-semibold">
                      <p className="flex justify-center gap-2">
                        <span className="text-2xl">
                          <TbFileTypeCsv />
                        </span>
                        Total number of unique and valid contacts selected from
                        CSV
                      </p>
                      <p>
                        {responseData?.external_audience}/
                        {responseData?.provided_external_audience}
                      </p>
                    </div>
                  </div>
                )}

                {!!responseData?.provided_text_audience && (
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <div className="flex justify-between w-full font-semibold">
                      <p className="flex justify-center gap-2">
                        <span className="text-2xl">
                          <BiText />
                        </span>
                        Total number of unique and valid manually entered
                        contacts selected
                      </p>
                      <p>
                        {responseData?.text_audience}/
                        {responseData?.provided_text_audience}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-start justify-start w-full gap-2 border-t-[1px] pt-2">
                  <div className="flex justify-between w-full font-semibold">
                    <p className="flex justify-center gap-2">
                      Total uniqe audience selected
                    </p>
                    <p>
                      {(parseFloat(responseData?.audience) || 0) +
                        (parseFloat(responseData?.unsubscribed_users) || 0)}
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
                    <p className="">-{responseData?.unsubscribed_users}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start w-full gap-2 border-t-[1px] pt-2">
                  <div className="flex justify-between w-full font-semibold text-green-600">
                    <p className="flex justify-center gap-2">
                      Effective uniqe audience selected
                    </p>
                    <p>{responseData?.audience}</p>
                  </div>
                </div>
              </div>
            )}

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
                {responseData?.unsubscribed_users_data?.map((contact, i) => (
                  <p key={contact}>
                    <span className="font-bold">{i + 1}.</span> {contact}
                  </p>
                ))}
              </div>
            </div>
          </Modal>
          <div className="flex items-center justify-between w-full ">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center justify-center gap-2 opacity-80">
              <MdOutlineKeyboardBackspace className="text-xl" />{' '}
              {t('Campaign_New_PreviousStep')}
            </button>
            <div className="w-full max-w-[150px]">
              {hasDataChanged ? (
                <PrimaryButton
                  handleClick={handleAudienceSelection}
                  isLoading={isApiLoading}
                  disabled={isContinueDisabled || allInputDissabled}
                  text={
                    hasDataChanged
                      ? t('Campaign_New_SaveAndContinue')
                      : t('Campaign_New_Continue')
                  }
                />
              ) : (
                <PrimaryButton
                  handleClick={() => setCurrentStep(3)}
                  disabled={isContinueDisabled}
                  text={t('Campaign_New_Continue')}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AudienceSection

const Header = ({ hasDataChanged, t }) => {
  return (
    <div className="flex items-start justify-between w-full gap-2">
      <div>
        <p className="text-xl font-semibold">
          {t('Campaign_New_TargetAudience')}
        </p>
        <p className="mt-1 opacity-80">
          {t('Campaign_New_Select_from_database_or_upload_csv')}
        </p>
      </div>
      <div className="flex items-center justify-center gap-8">
        {hasDataChanged ? (
          <p className="flex items-center justify-center gap-3 text-lg">
            <MdPending className="text-2xl text-yellow-500" />{' '}
            {t('Campaign_New_Pending')}
          </p>
        ) : (
          <p className="flex items-center justify-center gap-3 text-lg">
            <TbSquareRoundedCheckFilled className="text-2xl text-green-500" />{' '}
            {t('Campaign_New_Completed')}
          </p>
        )}
        <p className="hidden text-4xl opacity-70 mobileL:block">
          <FiChevronRight />
        </p>
      </div>
    </div>
  )
}
