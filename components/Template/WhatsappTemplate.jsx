import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import Input from '../UI/Input'

const WhatsappTemplate = () => {
    // new
    const {
        isLoading,
        setIsLoading,
        getCookie,
        isAccessToken,
        wrapper,
    } = useGlobalAuthContext()
    const { t } = useTranslation()
    const [templateData, setTemplateData] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (isAccessToken) {
            const config = {
                headers: {
                    accept: 'application/json',
                    Authorization: getCookie('access-token'),
                },
            }
            setIsLoading(true)
            const getTemplate = async () => {
                try {
                    const res = await axios
                        .post(
                            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/WhatsappTemplates`,
                            '',
                            config
                        )
                        .catch((err) => wrapper(err.response))
                    setTemplateData(res.data)
                    setIsLoading(false)
                } catch (err) {
                    console.log(err)
                    setIsLoading(false)
                }
            }
            getTemplate()
        }
    }, [isAccessToken])

    // Search templates
    const searchTemplates = async () => {
        const token = getCookie('access-token');
        if (!token) {
            console.log('No access token found');
            return;
        }
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `${token}`, // Make sure 'Bearer' is used
            },
        };
        setIsLoading(true)
        try {
            const body = {
                category: category,
                name: name,
                status: status,
                type: type
            }
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/Whatsapp/v1.0/searchTemplate`,
                body,
                config
            ).catch((err) => wrapper(err.response))
            if (res.data.success === true) {
                setTemplateData(res.data.data)
                setIsLoading(false)
            } else {
                console.log("err")
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }




    return (
        <div>
            <div className="mt-1 mb-1 flex justify-between items-center">
                <div className=''>
                    <Input
                        type="text"
                        placeholder={t('Name...')}
                        className="w-56 "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <select
                    placeholder={t('Category...')}
                    className="form-control dark:bg-bgBlack dark:text-White   block w-56 px-2 py-2 mx-5 text-base font-normal text-gray-700 border-2 border-BlackTer dark:border-White/20 bg-white bg-clip-padding rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" selected>{t('Select a category...')}</option>
                    <option value="MARKETING">{t('MARKETING')}</option>
                    <option value="UTILITY">{t('UTILITY')}</option>
                    <option value="AUTHENTICATION">{t('AUTHENTICATION')}</option>
                </select>

                <select
                    placeholder={t('Status...')}
                    className="form-control dark:bg-bgBlack dark:text-White   block w-56 px-2 py-2 mx-5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="" selected>{t('Select a status...')}</option>
                    <option value="APPROVED">{t('APPROVED')}</option>
                    <option value="PENDING">{t('PENDING')}</option>
                    <option value="REJECTED">{t('REJECTED')}</option>
                </select>

                <select
                    placeholder={t('Type...')}
                    className="form-control dark:bg-bgBlack dark:text-White   block w-56 px-2 py-2 mx-5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="" selected>{t('Select a type...')}</option>
                    <option value="TEXT">{t('TEXT')}</option>
                    <option value="IMAGE">{t('IMAGE')}</option>
                    <option value="VIDEO">{t('VIDEO')}</option>
                    <option value="DOCUMENT">{t('DOCUMENT')}</option>
                </select>
                <button className="border-2 py-2 rounded-[10px] shadow-sm border-BlackTer dark:border-White/20 dark:bg-bgBlackSec bg-white flex items-center gap-1 px-5 text-Blue font-bold" onClick={() => searchTemplates()}> Filter</button>
            </div>
            <div className="relative w-full h-full overflow-x-auto rounded-lg shadow-sm">
                <table className="w-full min-w-[1000px] h-full tabletM:min-w-[600px]  text-sm text-left text-gray-500 dark:text-gray-400 border-spacing-2">
                    <thead className="text-xs text-gray-700  bg-gray-100 dark:bg-[#1B2431] dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Status
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Type
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Health
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Reason
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-left">
                                Created At
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {templateData.map((data, i) => (
                            <SingleTemplateRow
                                key={data.id}
                                data={data}
                                index={i}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WhatsappTemplate

const SingleTemplateRow = ({ data, index }) => {
    const router = useRouter()
    const { t } = useTranslation()
    return (
        <tr className="w-full bg-white border-b rounded-md group dark:bg-bgBlack/60 dark:border-gray-700 text-Black dark:text-White hover:bg-gray-50 dark:hover:bg-dBlack/60">
            <td className="px-6 py-4 text-xs text-left">
                {data.name}
            </td>
            <td className="px-6 py-4 text-xs text-left">
                {data.category}
            </td>
            <td className={`px-6 py-4 text-xs text-left font-bold ${data.status === 'REJECTED' ? 'text-red-500' : data.status === 'APPROVED' ? 'text-green-500' : ''}`}>
                {data.status}
            </td>
            <td className="px-6 py-4 text-xs text-left">
                {data.type}
            </td>
            <td className="px-6 py-4 text-xs text-left">{data.quality_score}
            </td>
            <td className="px-6 py-4 text-xs text-left">{data.reason}
            </td>
            <td className="px-6 py-4 text-left whitespace-nowrap">
                {new Date(data.created_date).toLocaleDateString('en-In', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </td>
        </tr>
    )
}


