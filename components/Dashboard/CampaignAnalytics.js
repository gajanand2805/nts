import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import DateSelect from '../UI/DateSelect'
import { InfoButton } from '../UI/InfoButton'
import graphDec from './assets/graphDec.svg'
import graphInc from './assets/graphInc.svg'

// import TargetIcon from './assets/TargetIcon.svg'
// import CampgainSentMessages from './assets/CampgainSentMessages.svg'
// import CampgainDeliveredMessages from './assets/CampgainDeliveredMessages.svg'
// import CampgainSeenMessages from './assets/CampgainSeenMessages.svg'
// import CampgainFailedMessages from './assets/graphDec.svg'

const CampaignAnalytics = ({
    convo_count,
    conversation,
    message_data,
    setMonth,
    setYear,
    month,
    year,
}) => {
    const { selectedLang } = useGlobalAuthContext()
    const [selectedDate, setSelectedDate] = useState({ month: 0, year: 2020 })
    const { t } = useTranslation()

    return (
        <div className="flex flex-col justify-between w-full gap-6 p-4 bg-white dark:bg-bgBlack rounded-standard tabletM:p-7">
            <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
                <p className="text-xl font-bold">
                    Campaign Analytics
                </p>
                <DateSelect
                    setmonth={setMonth}
                    setyear={setYear}
                    month={month}
                    year={year}
                />
            </div>

            <div className="flex flex-col items-center justify-between w-full gap-4 tabletM:flex-row">
                {/*  */}
                <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
                    {/* <div
                        className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
                            } top-2 `}>
                        <Image
                            src={TargetIcon}
                            alt="wallet image"
                        />
                    </div> */}

                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-BlackSec">
                            Target
                        </p>
                        <InfoButton text={t('Dashboard_broadcast_analytics_sent_info')} />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="text-xl font-bold">{message_data.Total}</p>
                        <div className="flex items-center gap-2">
                            <p
                                className={`text-sm font-semibold ${message_data.percentage_total >= 0 ? 'text-Green' : 'text-Red'
                                    }`}>
                                {message_data.percentage_total}%
                            </p>
                            <div className="relative w-4">
                                <Image
                                    src={message_data.percentage_total >= 0 ? graphInc : graphDec}
                                    alt="increasing graph"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
                    {/* <div
                        className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
                            } top-2 `}>
                        <Image
                            src={CampgainSentMessages}
                            alt="wallet image"
                        />
                    </div> */}

                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-BlackSec">
                            {t('Dashboard_message_analytics_sent')}
                        </p>
                        <InfoButton text={t('Dashboard_broadcast_analytics_sent_info')} />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="text-xl font-bold">{message_data.sent}</p>
                        <div className="flex items-center gap-2">
                            <p
                                className={`text-sm font-semibold ${message_data.percentage_sent >= 0 ? 'text-Green' : 'text-Red'
                                    }`}>
                                {message_data.percentage_sent}%
                            </p>
                            <div className="relative w-4">
                                <Image
                                    src={message_data.percentage_sent >= 0 ? graphInc : graphDec}
                                    alt="increasing graph"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="relative flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
                    {/* <div
                        className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
                            } top-2 `}>
                        <Image
                            src={CampgainDeliveredMessages}
                            alt="wallet image"
                        />
                    </div> */}

                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-BlackSec">
                            {t('Dashboard_message_analytics_delivered')}
                        </p>
                        <InfoButton
                            text={t('Dashboard_broadcast_analytics_delivered_info')}
                        />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="text-xl font-bold">{message_data.delivered}</p>
                        <div className="flex items-center gap-2">
                            <p
                                className={`text-sm font-semibold ${message_data.percentage_delivered >= 0
                                    ? 'text-Green'
                                    : 'text-Red'
                                    }`}>
                                {message_data.percentage_delivered}%
                            </p>
                            <div className="relative w-4">
                                <Image
                                    src={
                                        message_data.percentage_delivered >= 0 ? graphInc : graphDec
                                    }
                                    alt="increasing graph"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="relative flex flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
                    {/* <div
                        className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
                            } top-2 `}>
                        <Image
                            src={CampgainSeenMessages}
                            alt="wallet image"
                        />
                    </div> */}

                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-BlackSec">
                            {t('Dashboard_message_analytics_seen')}
                        </p>
                        <InfoButton text={t('Dashboard_broadcast_analytics_seen_info')} />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="text-xl font-bold">{message_data.read}</p>
                        <div className="flex items-center gap-2">
                            <p
                                className={`text-sm font-semibold ${message_data.percentage_read >= 0 ? 'text-Green' : 'text-Red'
                                    }`}>
                                {message_data.percentage_read}%
                            </p>
                            <div className="relative w-4">
                                <Image
                                    src={message_data.percentage_read >= 0 ? graphInc : graphDec}
                                    alt="increasing graph"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}

                {/*  */}
                <div className="flex relative flex-col items-start gap-5 justify-start w-full rounded-[10px] border-[1px] dark:border-dBlack dark:bg-dBlack border-BlackTer p-5">
                    {/* <div
                        className={`absolute ${selectedLang == 'en' ? 'right-2' : 'left-2'
                            } top-2 `}>
                        <Image
                            src={CampgainFailedMessages}
                            alt="wallet image"
                        />
                    </div> */}

                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-BlackSec">
                            {t('Dashboard_message_analytics_failed')}
                        </p>
                        <InfoButton text={t('Dashboard_broadcast_analytics_failed_info')} />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <p className="text-xl font-bold">{message_data.failed}</p>
                        <div className="flex items-center gap-2">
                            <p
                                className={`text-sm font-semibold ${message_data.percentage_failed >= 0
                                    ? 'text-Green'
                                    : 'text-Red'
                                    }`}>
                                {message_data.percentage_failed}%
                            </p>
                            <div className="relative w-4">
                                <Image
                                    src={
                                        message_data.percentage_failed >= 0 ? graphInc : graphDec
                                    }
                                    alt="increasing graph"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>

        </div>
    )
}

export default CampaignAnalytics
