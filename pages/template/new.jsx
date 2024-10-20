import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import DetailsSection from '../../components/Template/NewTemplate/DetailsSection'
import { useGlobalCampaignContext } from '../../contexts/CampaignContext'
const NewCampaignPage = () => {
    const { successMsg, errorMsg, setSuccessMsg, setErrorMsg } =
        useGlobalCampaignContext()
    const { t } = useTranslation()

    return (
        <MainScreenWrapper
            backLink="/template"
            backText={t('Template_New_Gobacktotemplate')}
            screenHeader={t('Template_New_AddTemplate')}>
            <div className="flex flex-col items-start justify-start w-full h-full gap-5 mt-5">
                {successMsg && (
                    <div className="flex items-center justify-between w-full gap-4 px-4 py-2 font-semibold text-white bg-green-600 rounded-lg">
                        <p>{successMsg}</p>
                        <button
                            onClick={() => setSuccessMsg('')}
                            className="p-1 text-black bg-white rounded-md dark:bg-black dark:text-white">
                            <IoClose />
                        </button>
                    </div>
                )}
                {errorMsg && (
                    <div className="flex items-center justify-between w-full gap-4 px-4 py-2 font-semibold text-white bg-red-600 rounded-lg">
                        <p>{errorMsg}</p>
                        <button
                            onClick={() => setErrorMsg('')}
                            className="p-1 text-black bg-white rounded-md dark:bg-black dark:text-white">
                            <IoClose />
                        </button>
                    </div>
                )}
                <DetailsSection />
            </div>
        </MainScreenWrapper>
    )
}

export default NewCampaignPage
