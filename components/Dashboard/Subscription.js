import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalAuthContext } from '../../AuthContext';
import Modal from '../Modal';

const Subscription = ({
    conversation,
    order_graph_data,
    setMonth,
    setYear,
    month,
    year,
}) => {
    const { selectedLang } = useGlobalAuthContext()
    const [toggle, settoggle] = useState(true)
    const [selectedDate, setSelectedDate] = useState({ month: 0, year: 2020 })
    const [isModalVisible, setModalVisible] = useState(false)
    const [isModalWhatsApp_Conversation, setModalWhatsApp_Conversation] = useState(false)
    const [isModalcurrentplan, setisModalcurrentplan] = useState(false)
    const [isModalEditBilling, setisModalEditBilling] = useState(false)
    const [WCCAmount, setWCCAmount] = useState(0)

    const [isModalEditinner, setisModalEditinner] = useState(false)
    const openModalEditBilling = () => setisModalEditBilling(true)
    const closeEditBillingModal = () => setisModalEditBilling(false)

    const openModaleditinner = () => setisModalEditinner(true)
    const closeEditeditinner = () => setisModalEditinner(false)

    const [ismodaladdcard, setismodaladdcard] = useState(false)
    const openmodaladdcard = () => setismodaladdcard(true)
    const closeaddcardmodal = () => setismodaladdcard(false)

    const openModal = () => setModalVisible(true)
    const opencurrentplanModal = () => setisModalcurrentplan(true)
    const closecurrentplanModal = () => setisModalcurrentplan(false)

    const openWhatsappModal = () => setModalWhatsApp_Conversation(true)
    const closeModal = () => setModalVisible(false)
    const closeWhatsappModal = () => setModalWhatsApp_Conversation(false)
    const { t } = useTranslation()


    const [activeTab, setActiveTab] = useState('dashboard'); // State to track active tab

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    const [activeBox, setActiveBox] = useState(1); // Set default active box to 1

    const handleBoxClick = (boxNumber) => {
        setActiveBox(boxNumber);
    };

    // Navigate the subscription pages
    const router = useRouter();
    const handleNavigation = () => {
        // Navigate to the "/subscription" page
        // router.push('/subscription');
        router.push({
            pathname: '/subscription',
            query: { openModal: true }, // Add query to open the modal
        });
    };

    const updateWCCAmount = (amount) => {
        // alert(amount)
        setWCCAmount(amount)
    };



    return (
        <>
            {/* -------- */}
            <div className="flex flex-col justify-between w-full gap-4 dark:bg-bgBlack rounded-md ">
                {/* <div className="flex flex-col justify-between w-full gap-2 tabletM:flex-row ">
          <p className="text-xl font-bold">
            {t('Dashboard_store_analytics_heading')}
          </p>

        </div> */}

                <div className="flex flex-col items-center justify-between w-full gap-4 laptop:flex-row p-0">
                    {/*  */}
                    <div className="flex relative flex-col items-start gap-5 justify-center w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack bg-white px-5 py-2" style={{ minHeight: '170px' }}>
                        <div className="flex flex-col gap-2 w-full">
                            <div className=" items-center gap-1 flex justify-between mb-3">
                                <p className="font-semibold text-black text-xs">
                                    Free Service Conversation
                                </p>
                                <p className="font-semibold text-black text-xs">
                                    {conversation.FreeServiceConversation} /1000 used
                                </p>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full dark:bg-gray-700" style={{ height: '6px' }}>
                                <div className="relative">
                                    <div className="absolute top-0 left-0 right-0 text-center" style={{ marginTop: '-20px' }}>
                                        <span className="text-black text-xs">
                                            {conversation.FreeServiceConversation} / 1000 used (
                                            {(((1000 - conversation.FreeServiceConversation) / 1000) * 100).toFixed(1)}% used)
                                        </span>
                                    </div>
                                    <div className="bg-gray-300 rounded-full h-2 w-full">
                                        <div
                                            className="bg-blue-600 h-full rounded-full"
                                            style={{ width: `${((1000 - conversation.FreeServiceConversation) / 1000) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <p className="font-semibold text-black text-sm">
                                WhatsApp Conversation Credits (WCC)
                            </p>
                            <div className="flex items-center justify-between mt-5">
                                <h3 className="font-bold text-black text-xl"><span>₹</span> {conversation.Wallet}</h3>
                                <button className="text-xs px-3 py-1.5 text-white font-samibold w-30 rounded-md" style={{ backgroundColor: '#0a474c' }} onClick={openWhatsappModal}>
                                    Buy More
                                </button>

                            </div>
                        </div>
                    </div>
                    {/*  */}

                    <div className="flex relative flex-col items-start gap-5 justify-center w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack bg-white px-5 py-2" style={{ minHeight: '170px' }}>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold text-black text-xs">
                                    Advertisement Credits
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-5">
                                <h3 className="font-bold text-black text-xl"><span>₹0</span></h3>
                                <button className="text-xs px-3 py-1.5 text-light font-samibold w-30 rounded-md  border-[1px] border-slate-400" onClick={openModal}>
                                    Buy Credits
                                </button>

                            </div>
                        </div>

                    </div>

                    {/*  */}

                    {/*  */}

                    <div className="flex relative flex-col items-start gap-5 justify-center w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack bg-white px-5 py-2" style={{ minHeight: '170px' }}>
                        <div className="flex flex-col gap-2" style={{ width: '100%' }}>

                            <div className="flex items-center gap-1">
                                <p className="font-semibold text-black text-xs">
                                    Current Plan
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <h3 className="font-bold text-black text-xs"> <span className="font-bold text-black" style={{ fontSize: '15px' }}>BASIC</span>(quarterly)</h3>
                                <p className="font-semibold text-black text-xs">
                                    renews on 15/7/2024
                                </p>

                            </div>
                            <button className="text-xs px-3 py-1.5 text-white font-samibold w-100 rounded-md mt-5" style={{ backgroundColor: 'rgb(96, 14, 125)', height: '35px' }}
                                // onClick={opencurrentplanModal}
                                onClick={handleNavigation}
                            >
                                Upgrade Now
                            </button>
                        </div>

                    </div>
                    {/*  */}
                </div>


            </div>
            {/* -------- */}
            {/*------------------------- Purchase WhatsApp Conversation Credits (WCC)Modal start--------------- */}
            <Modal isVisible={isModalWhatsApp_Conversation} onClose={closeWhatsappModal}>
                <div className="bg-white rounded shadow-lg" style={{ width: '566px', height: 'auto', overflowY: 'scroll', position: 'absolute', right: '0', top: '2px', transform: 'translateX(0)' }}>
                    <div className=' items-center justify-between rounded-md border border-stroke bg-white px-4 py-3 flex item-center'>
                        <h3 className='text-md'>Purchase WhatsApp Conversation Credits (WCC)</h3>
                        <button onClick={closeWhatsappModal}><svg className='w-[20px] h-[20px]' version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2"></line>
                            <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2"></line>
                        </svg></button>
                    </div>
                    <div className='bg-white px-4 py-3 h-full' style={{ backgroundColor: '#f9f8f873' }}>
                        <div className='w-full p-5 bg-white border border-gray-300 rounded-lg'>
                            <h3 className='text-md text-black my-2'>Enter WCC Amount</h3>
                            <p className="font-semibold text-black text-xs my-2">
                                Minimum purchase of ₹1000 credits is allowed
                            </p>
                            <form>
                                <input
                                    type="number"
                                    value={WCCAmount}
                                    id="number-input"
                                    aria-describedby="helper-text-explanation"
                                    className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    style={{ backgroundColor: 'rgb(240,240,240)' }}
                                    placeholder="90210"
                                    required />
                            </form>
                            <div className='flex mt-5'>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400" onClick={() => updateWCCAmount(2500)}>
                                    +2500
                                </button>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400 ml-2" onClick={() => updateWCCAmount(5000)}>
                                    +5000
                                </button>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400 ml-2" onClick={() => updateWCCAmount(10000)}>
                                    +10000
                                </button>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400 ml-2" onClick={() => updateWCCAmount(50000)}>
                                    +50000
                                </button>

                            </div>
                            <div className='flex mt-5'>
                                <button className=" px-4 py-3 text-light font-semibold rounded-md mt-3" style={{ backgroundColor: 'rgb(50, 149, 254)', width: "100%" }}>
                                    <span className='text-white text-sm'>
                                        Pay Via Razorpay
                                    </span>
                                    <span className='block text-white text-xs'>
                                        Only Indian Customers
                                    </span>
                                </button>
                                {/* <button className=" px-4 py-3 text-light font-semibold w-30 rounded-md mt-3 ml-3 w-1/2" style={{ backgroundColor: '#0a474c' }}>
                                    <span className='text-white text-sm'>
                                        Pay Now
                                    </span>
                                    <span className='block text-white text-xs'>
                                        Via International Cards
                                    </span>
                                </button> */}
                            </div>
                        </div>
                        {/* model second box */}
                        {/* <div className='w-full p-5 bg-white border border-gray-300 rounded-lg mt-3'>
                            <div className='flex item-center justify-between'>
                                <h3 className='text-md text-black my-2'>Enable WCC auto-recharge</h3>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className='flex item-center'>
                                <p className="font-semibold text-black text-sm mr-2">
                                    Enter minimum WCC amount
                                </p>
                                <InfoButton
                                    className="text-black text-xs py-0 top: '2px'"
                                    text={<div className='py-0 leading-4' style={{ fontSize: '10px' }}>{t('WCC auto-recharge will be initiated when the balance goes below the amount specified here')}<br />
                                    </div>
                                    }
                                />
                            </div>
                            <form>
                                <input type="text" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" style={{ backgroundColor: 'rgb(240,240,240)' }} placeholder="90210" required />
                                <div className='flex item-center'>
                                    <p className="font-semibold text-black text-sm mr-2">
                                        Enter auto-recharge amount
                                    </p>
                                    <InfoButton
                                        className="text-black text-xs py-0 top: '0px'"
                                        text={<div className='py-0 leading-4' style={{ fontSize: '10px' }}>{t('WCC auto-recharge will be done of amount specified here')}<br />
                                        </div>
                                        }
                                    />
                                </div>
                                <input type="text" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ backgroundColor: 'rgb(240,240,240)' }} placeholder="90210" required />
                            </form>

                            <p className="font-semibold text-light text-xs mt-4 mb-1">
                                WCC auto-recharge of ₹5000 will be initiated when WhatsApp Conversation Credit (WCC) goes below ₹500
                            </p>
                            <button className=" px-4 py-2 font-semibold w-30 rounded-md mt-3 text-xs" style={{ backgroundColor: '#d1cfcf', color: 'rgb(175 175 175)' }}>
                                SAVE
                            </button>
                        </div> */}
                    </div>

                </div>
            </Modal>
            {/*------------------------- Modal end--------------- */}
            {/*-------------------------add credit Modal start--------------- */}
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="bg-white rounded shadow-lg" style={{ maxWidth: '566px', height: '100%', overflowY: 'scroll', position: 'absolute', right: '0', top: '2px', transform: 'translateX(0)' }}>
                    <div className=' items-center justify-between rounded-md border border-stroke bg-white px-4 py-3 flex item-center'>
                        <h3 className='text-md'>Purchase Shoponcell Ads Credits</h3>
                        <button onClick={closeModal}><svg className='w-[20px] h-[20px]' version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2"></line>
                            <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2"></line>
                        </svg></button>
                    </div>
                    <div className='bg-white px-4 py-3 h-full' style={{ backgroundColor: '#f9f8f873' }}>
                        <p className='font-semibold text-black text-xs'> These Ad credits can be utilized to create and run ads only from Shoponcell Ads Manager.</p>
                        <p className='pb-5 font-semibold text-black text-xs'>These Ads are run on facebook & instagram and land on whatsapp.</p>

                        <div className='w-full p-5 bg-white border border-gray-300 rounded-lg'>
                            <h3 className='text-md text-black my-2'>Enter Amount</h3>
                            <p className="font-semibold text-black text-xs my-2">
                                Minimum purchase of ₹1000 credits is allowed
                            </p>
                            <form>
                                <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ backgroundColor: 'rgb(240,240,240)' }} placeholder="₹1000" required />
                            </form>
                            <div className='flex mt-5'>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400">
                                    +2500
                                </button>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400 ml-2">
                                    +5000
                                </button>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400 ml-2">
                                    +10000
                                </button>
                                <button className="text-xs px-3 py-1.5 text-light font-semibold w-30 rounded-md border-[1px] border-slate-400 ml-2">
                                    +50000
                                </button>

                            </div>
                            <div className='flex mt-5'>
                                <button className=" px-4 py-3 text-light font-semibold w-30 rounded-md mt-3 w-1/2" style={{ backgroundColor: 'rgb(50, 149, 254)' }}>
                                    <span className='text-white text-sm'>
                                        Pay Via Razorpay
                                    </span>
                                    <span className='block text-white text-xs'>
                                        Only Indian Customers
                                    </span>
                                </button>
                                <button className=" px-4 py-3 text-light font-semibold w-30 rounded-md mt-3 ml-3 w-1/2" style={{ backgroundColor: '#0a474c' }}>
                                    <span className='text-white text-sm'>
                                        Pay Now
                                    </span>
                                    <span className='block text-white text-xs'>
                                        Via International Cards
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/*-------------------------add credit Modal end--------------- */}
            {/*-------------------------current plan Modal start--------------- */}
            <Modal isVisible={isModalcurrentplan} onClose={closecurrentplanModal}>
                <div className="bg-white rounded shadow-lg max-w-full md:max-w-screen-md lg:max-w-screen-lg h-full overflow-y-scroll absolute right-0 top-2 transform translate-x-0">

                    <div className=' items-center justify-between rounded-md border border-stroke bg-white px-4 py-3 flex item-center'>
                        <h3 className='text-md'>Change Plan</h3>
                        <button onClick={closecurrentplanModal}><svg className='w-[20px] h-[20px]' version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2"></line>
                            <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2"></line>
                        </svg></button>
                    </div>
                    <div className='bg-white px-4 py-3 h-full mb-8' style={{ backgroundColor: '#f9f8f873' }}>

                        <div className='w-full p-5 pb-0 border-b-0 bg-white border border-gray-300 rounded-lg ' style={{ backgroundColor: '#f9f8f873' }}>
                            <ul className="flex flex-wrap text-sm font-medium text-center border-[2.5px] rounded-xl" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist" style={{ borderColor: '#600e7d' }}>
                                <li role="presentation" className="flex-1">
                                    <button
                                        className={`ripple w-full h-full rounded-l-lg inline-block px-2 py-2 font-semibold text-sm ${activeTab === 'profile' ? 'border-blue-500 text-white' : 'border-transparent text-black'}`}
                                        style={{ backgroundColor: activeTab === 'profile' ? '#600e7d' : 'aliceblue' }}
                                        id="profile-tab"
                                        onClick={() => handleTabClick('profile')}
                                        type="button"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected={activeTab === 'profile'}>
                                        monthly
                                    </button>
                                </li>
                                <li role="presentation" className="flex-1">
                                    <button
                                        className={`ripple w-full h-full inline-block px-2 py-2 font-semibold text-sm ${activeTab === 'dashboard' ? 'border-blue-500 text-white' : 'border-transparent text-black'}`}
                                        style={{ backgroundColor: activeTab === 'dashboard' ? '#600e7d' : 'aliceblue' }}
                                        id="dashboard-tab"
                                        onClick={() => handleTabClick('dashboard')}
                                        type="button"
                                        role="tab"
                                        aria-controls="dashboard"
                                        aria-selected={activeTab === 'dashboard'}>
                                        Quarterly <span className={`block text-xs ${activeTab === 'dashboard' ? 'text-white' : 'text-black'}`}>Additional 5% Off</span>
                                    </button>
                                </li>
                                <li role="presentation" className="flex-1">
                                    <button
                                        className={`ripple w-full h-full rounded-r-lg inline-block px-2 py-2 font-semibold text-sm ${activeTab === 'settings' ? 'border-blue-500 text-white' : 'border-transparent text-black'}`}
                                        style={{ backgroundColor: activeTab === 'settings' ? '#600e7d' : 'aliceblue' }}
                                        id="settings-tab"
                                        onClick={() => handleTabClick('settings')}
                                        type="button"
                                        role="tab"
                                        aria-controls="settings"
                                        aria-selected={activeTab === 'settings'}>
                                        yearly <span className={`block text-xs ${activeTab === 'settings' ? 'text-white' : 'text-black'}`}>Additional 10% Off</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div id="default-tab-content">
                            {/* --------------------- */}
                            <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? 'block' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div>
                                    <div className='w-full flex justify-between mt-7'>
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[rgb(244 240 245)] pricing_box ${activeBox === 1 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(1)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>BASIC</h3>
                                            <h4 className='text-lg text-center font-bold mb-4' style={{ color: '#600e7d' }}>
                                                ₹ <span>999/month</span>
                                            </h4>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 5 Custom Attributes</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Users</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Agent Login</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Multi-Agent Live Chat</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Retargeting Campaigns</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Smart Campaign Manager</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Template Message APIs</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>1200 message/min</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Shoponcell Marketplace</li>
                                                <li className='mt-1'><span className='mr-1'>•</span> Shopify & Woocommerce</li>
                                            </ul>
                                            <button className='px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300' style={{ color: '#600e7d' }}>
                                                Select Plan <span className='inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900' style={{ width: '18px', height: '18px' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 2 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(2)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>PRO</h3>
                                            <h4 className='text-lg text-center font-bold mb-4' style={{ color: '#600e7d' }}>
                                                ₹ <span>2399/month</span>
                                            </h4>
                                            <p className='text-xs text-left font-bold mb-1' style={{ color: '#600e7d' }}>→ All in Basic</p>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 100 Tags </li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Scheduler</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Click Tracking</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Budget & Analytics</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Project APIs</li>
                                            </ul>
                                            <button className='px-2 h-10 bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-md text-center font-bold' style={{ color: '#600e7d' }}>
                                                Chosen Plan
                                            </button>
                                        </div>
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 3 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(3)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>ENTERPRISE</h3>
                                            <h4 className='text-lg text-center font-bold mb-4 opacity-0' style={{ color: '#600e7d' }}>
                                                ₹ <span>999/month</span>
                                            </h4>
                                            <p className='text-xs text-left font-bold mb-1' style={{ color: '#600e7d' }}>→ All in Basic</p>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 5 Custom Attributes</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Users</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Agent Login</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Multi-Agent Live Chat</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Retargeting Campaigns</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Smart Campaign Manager</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Template Message APIs</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>1200 message/min</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Shoponcell Marketplace</li>
                                                <li className='mt-1'><span className='mr-1'>•</span> Shopify & Woocommerce</li>
                                            </ul>
                                            <button className='px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300' style={{ color: '#600e7d' }}>
                                                Select Plan <span className='inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900' style={{ width: '18px', height: '18px' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                                        <div>
                                            <h3 className='text-black text-md'>
                                                Billing Address
                                            </h3>
                                            <span className='text-xs text-black'>FIRST FLOOR AND SECOND FLOOR, A-3, MAL ROAD,, VIDHYADHAR NAGAR, SECTOR-1, JAIPUR, Jaipur, 302023,
                                                Rajasthan, IN</span>

                                        </div>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-sm font-samibold text-bg-teal-1000 text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                                            style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openModalEditBilling}
                                        >
                                            Edit
                                        </button>

                                    </div>
                                    <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                                        <div>
                                            <h3 className='text-black text-md'>
                                                Payment Method
                                            </h3>
                                            <span className='text-xs' style={{ color: 'red' }}>Add billing address to enable payment method</span>
                                            <span className='text-xs block' style={{ color: 'red' }}>Add your credit card for future purchases.</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-sm font-samibold text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                                            style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openmodaladdcard}
                                        >
                                            Add Card
                                        </button>


                                    </div>
                                    {/* <h6 className='text-black text-xs pt-2 px-5 '>This plan is already active.</h6> */}
                                    <div className='flex items-start justify-between w-full rounded-[10px]  px-5 pt-2'>

                                        <div>
                                            <h3 className='text-black text-md pt-5 leading-3'>
                                                Total
                                            </h3>
                                            <span className='text-xs text-black'>w-full flex justify-between mt-7</span>

                                        </div>
                                        <div className='text-right'>
                                            <h3 className='text-black text-md pt-5 leading-3 font-bold' style={{ color: 'rgb(96, 14, 125)' }}>
                                                ₹2399/month
                                            </h3>
                                            <span className='text-xs text-black font-samibold text-right'>(Tax Excl.)</span>
                                        </div>
                                    </div>
                                    <div className='mt-5 pb-5'>
                                        <button className=" px-4 py-3 text-light font-semibold w-full rounded-md mt-3" style={{ backgroundColor: 'rgb(50, 149, 254)' }}>
                                            <span className='text-white text-sm'>
                                                Pay Via Razorpay
                                            </span>
                                            <span className='block text-white text-xs'>
                                                Only Indian Customers
                                            </span>
                                        </button>
                                        <button className=" px-4 py-3 text-light font-semibold w-full rounded-md mt-3" style={{ backgroundColor: '#600e7d' }}>
                                            <span className='text-white text-sm'>
                                                Proceed To Pay
                                            </span>
                                            <span className='block text-white text-xs'>
                                                Via International Cards
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ------------------ */}





                            <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? 'block' : 'hidden'}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                <div>
                                    <div className='w-full flex justify-between mt-7'>

                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 1 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(1)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>BASIC</h3>
                                            <h4 className='text-lg text-center font-bold mb-4' style={{ color: '#600e7d' }}>₹ <span>949/month</span></h4>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 5 Custom Attributes</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Users</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Agent Login</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Multi-Agent Live Chat</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Retargeting Campaigns</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Smart Campaign Manager</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Template Message APIs</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>1200 message/min</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Shoponcell Marketplace</li>
                                                <li className='mt-1'><span className='mr-1'>•</span> Shopify & Woocommerce</li>
                                            </ul>
                                            <button className='px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300' style={{ color: '#600e7d' }} >
                                                Select Plan <span className='inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900' style={{ width: '18px', height: '18px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                                </svg></span>

                                            </button>
                                        </div>
                                        {/*  */}
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 2 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(2)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>PRO</h3>
                                            <h4 className='text-lg text-center font-bold mb-4' style={{ color: '#600e7d' }}>₹ <span>2279/month</span></h4>
                                            <p className='text-xs text-left font-bold mb-1' style={{ color: '#600e7d' }}>→ All in Basic</p>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 100 Tags </li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Scheduler</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Click Tracking</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Budget & Analytics</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Project APIs</li>
                                            </ul>
                                            <button className='px-2 h-10 bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-md text-center font-bold ' style={{ color: '#600e7d' }} >
                                                Chosen Plan
                                            </button>
                                        </div>
                                        {/*  */}
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 3 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(3)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>ENTERPRISE</h3>
                                            <h4 className='text-lg text-center font-bold mb-4 opacity-0' style={{ color: '#600e7d' }}>₹ <span>999/month</span></h4>
                                            <p className='text-xs text-left font-bold mb-1' style={{ color: '#600e7d' }}>→ All in Basic</p>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 5 Custom Attributes</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Users</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Agent Login</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Multi-Agent Live Chat</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Retargeting Campaigns</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Smart Campaign Manager</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Template Message APIs</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>1200 message/min</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Shoponcell Marketplace</li>
                                                <li className='mt-1'><span className='mr-1'>•</span> Shopify & Woocommerce</li>
                                            </ul>
                                            <button className='px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300' style={{ color: '#600e7d' }} >
                                                Select Plan <span className='inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900' style={{ width: '18px', height: '18px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                                </svg></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                                        <div>
                                            <h3 className='text-black text-md'>
                                                Billing Address
                                            </h3>
                                            <span className='text-xs text-black'>FIRST FLOOR AND SECOND FLOOR, A-3, MAL ROAD,, VIDHYADHAR NAGAR, SECTOR-1, JAIPUR, Jaipur, 302023,
                                                Rajasthan, IN</span>

                                        </div>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-sm font-samibold text-bg-teal-1000 text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                                            style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openModalEditBilling}
                                        >
                                            Edit
                                        </button>

                                    </div>
                                    <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                                        <div>
                                            <h3 className='text-black text-md'>
                                                Payment Method
                                            </h3>
                                            <span className='text-xs' style={{ color: 'red' }}>Add billing address to enable payment method</span>
                                            <span className='text-xs block' style={{ color: 'red' }}>Add your credit card for future purchases.</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-sm font-samibold text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                                            style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openmodaladdcard}
                                        >
                                            Add Card
                                        </button>
                                    </div>
                                    <h6 className='text-black text-xs pt-2 px-5 '>This plan is already active.</h6>
                                    <div className='flex items-start justify-between w-full rounded-[10px]  px-5 pt-2'>

                                        <div>
                                            <h3 className='text-black text-md pt-5 leading-3'>
                                                Total
                                            </h3>
                                            <span className='text-xs text-black'>Renewing every month on 6th, next renewal on 06/08/24</span>

                                        </div>
                                        <div className='text-right'>
                                            <h3 className='text-black text-md pt-5 leading-3 font-bold' style={{ color: 'rgb(96, 14, 125)' }}>
                                                ₹6837/quarter
                                            </h3>
                                            <span className='text-xs text-black font-samibold text-right'>(Tax Excl.)</span>
                                        </div>

                                    </div>

                                    <div className='mt-5 pb-5'>
                                        <button className=" px-4 py-3 font-semibold rounded-md w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgb(54, 81, 90)' }}>
                                            <span className=' text-sm'>
                                                Pay Via Razorpay
                                            </span>
                                            <span className='block text-xs'>
                                                Only Indian Customers
                                            </span>
                                        </button>
                                        <button className=" px-4 py-3 font-semibold rounded-md mt-3 w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgb(54, 81, 90)' }}>
                                            <span className=' text-sm'>
                                                Proceed To Pay
                                            </span>
                                            <span className='block text-xs'>
                                                Via International Cards
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ------------------ */}








                            <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? 'block' : 'hidden'}`} id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                <div>
                                    <div className='w-full flex justify-between mt-7'>
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 1 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(1)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>BASIC</h3>
                                            <h4 className='text-lg text-center font-bold mb-4' style={{ color: '#600e7d' }}>₹ <span>899/month</span></h4>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 5 Custom Attributes</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Users</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Agent Login</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Multi-Agent Live Chat</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Retargeting Campaigns</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Smart Campaign Manager</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Template Message APIs</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>1200 message/min</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Shoponcell Marketplace</li>
                                                <li className='mt-1'><span className='mr-1'>•</span> Shopify & Woocommerce</li>
                                            </ul>
                                            <button className='px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300' style={{ color: '#600e7d' }} >
                                                Select Plan <span className='inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900' style={{ width: '18px', height: '18px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                                </svg></span>
                                            </button>
                                        </div>

                                        {/*  */}
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 2 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(2)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>PRO</h3>
                                            <h4 className='text-lg text-center font-bold mb-4' style={{ color: '#600e7d' }}>₹ <span>2159/month</span></h4>
                                            <p className='text-xs text-left font-bold mb-1' style={{ color: '#600e7d' }}>→ All in Basic</p>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 100 Tags </li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Scheduler</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Click Tracking</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Campaign Budget & Analytics</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Project APIs</li>
                                            </ul>
                                            <button className='px-2 h-10 bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-md text-center font-bold ' style={{ color: '#600e7d' }} >
                                                Chosen Plan
                                            </button>
                                        </div>
                                        {/*  */}
                                        <div
                                            className={`w-1/3 relative border border-solid p-4 pl-8 rounded-xl border-[3px] hover:bg-[#fdf7ff] pricing_box ${activeBox === 3 ? 'border-[#600e7d]' : 'border-transparent'}`}
                                            style={{ minHeight: '430px' }}
                                            onClick={() => handleBoxClick(3)}
                                        >
                                            <h3 className='text-lg font-bold text-center mb-2'>ENTERPRISE</h3>
                                            <h4 className='text-lg text-center font-bold mb-4 opacity-0' style={{ color: '#600e7d' }}>₹ <span>999/month</span></h4>
                                            <p className='text-xs text-left font-bold mb-1' style={{ color: '#600e7d' }}>→ All in Basic</p>
                                            <ul className='text-xs text-black '>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 10 Tags</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Upto 5 Custom Attributes</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Users</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Unlimited Agent Login</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Multi-Agent Live Chat</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Retargeting Campaigns</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Smart Campaign Manager</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Template Message APIs</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>1200 message/min</li>
                                                <li className='mt-1'><span className='mr-1'>•</span>Shoponcell Marketplace</li>
                                                <li className='mt-1'><span className='mr-1'>•</span> Shopify & Woocommerce</li>
                                            </ul>
                                            <button className='px-2 h-10 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3 absolute rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300' style={{ color: '#600e7d' }} >
                                                Select Plan <span className='inline-flex align-middle items-center justify-center rounded-full border ml-1 border-purple-900' style={{ width: '18px', height: '18px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                                </svg></span>

                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                                        <div>
                                            <h3 className='text-black text-md'>
                                                Billing Address
                                            </h3>
                                            <span className='text-xs text-black'>FIRST FLOOR AND SECOND FLOOR, A-3, MAL ROAD,, VIDHYADHAR NAGAR, SECTOR-1, JAIPUR, Jaipur, 302023,
                                                Rajasthan, IN</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-sm font-samibold text-bg-teal-1000 text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                                            style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openModalEditBilling}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div className='flex items-start justify-between w-full rounded-[10px] dark:border-dBlack dark:bg-dBlack border px-5 py-5 mt-5'>
                                        <div>
                                            <h3 className='text-black text-md'>
                                                Payment Method
                                            </h3>
                                            <span className='text-xs' style={{ color: 'red' }}>Add billing address to enable payment method</span>
                                            <span className='text-xs block' style={{ color: 'red' }}>Add your credit card for future purchases.</span>

                                        </div>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-sm font-samibold text-center rounded-lg focus:outline-none border-2 border-teal-900 hover:bg-teal-1000"
                                            style={{ lineHeight: 'normal', color: '#0a474c' }} onClick={openmodaladdcard}>
                                            Add Card
                                        </button>
                                    </div>
                                    <h6 className='text-black text-xs pt-2 px-5 '>This plan is already active.</h6>
                                    <div className='flex items-start justify-between w-full rounded-[10px]  px-5 pt-2'>
                                        <div>
                                            <h3 className='text-black text-md pt-5 leading-3'>
                                                Total
                                            </h3>
                                            <span className='text-xs text-black'>Renewing every year on 6th July, next renewal on 06/07/25</span>

                                        </div>
                                        <div className='text-right'>
                                            <h3 className='text-black text-md pt-5 leading-3 font-bold' style={{ color: 'rgb(96, 14, 125)' }}>
                                                ₹25909/year
                                            </h3>
                                            <span className='text-xs text-black font-samibold text-right'>(Tax Excl.)</span>
                                        </div>

                                    </div>

                                    <div className='mt-5 pb-5'>
                                        <button className=" px-4 py-3 text-light font-semibold w-full rounded-md mt-3" style={{ backgroundColor: 'rgb(50, 149, 254)' }}>
                                            <span className='text-white text-sm'>
                                                Pay Via Razorpay
                                            </span>
                                            <span className='block text-white text-xs'>
                                                Only Indian Customers
                                            </span>
                                        </button>
                                        <button className=" px-4 py-3 text-light font-semibold w-full rounded-md mt-3" style={{ backgroundColor: '#600e7d' }}>
                                            <span className='text-white text-sm'>
                                                Proceed To Pay
                                            </span>
                                            <span className='block text-white text-xs'>
                                                Via International Cards
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </Modal>
            {/*-------------------------current plan Modal end--------------- */}
            {/* edit button modal */}
            <Modal isVisible={isModalEditBilling} onClose={closeEditBillingModal}>
                <div className="bg-white rounded shadow-lg" style={{ maxWidth: '400px', height: '480px', overflowY: 'hidden', position: 'absolute' }}>
                    <div className='shadow-sm rounded-md px-4 py-3 bg-white'>
                        <div className=' items-center justify-between flex item-center '>
                            <img
                                alt=""
                                src="/_next/static/media/logo_landscape_light.de3c5c18.svg"
                                style={{
                                    display: 'block',
                                    width: '70px',
                                    height: 'auto',
                                    margin: 'auto',
                                }}
                            />
                            <button onClick={closeEditBillingModal}><svg className='w-[20px] h-[20px]' version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2"></line>
                                <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2"></line>
                            </svg></button>
                        </div>
                        <h3 className='text-center mt-2 text-sm font-bold' style={{ color: 'rgb(3, 207, 101)' }}>Billing & Shipping Addresses</h3>
                    </div>
                    <div className='px-8 py-2 h-full' style={{ backgroundColor: '#f4f5f9' }}>
                        <h3 className='mt-2 text-sm font-samibold text-black pb-2'>Billing</h3>
                        <div className='bg-white pl-4 pr-8 py-5 shadow-sm hover:bg-inherit relative cursor-pointer' onClick={openModaleditinner}>
                            <ul className=' text-black' style={{ fontSize: '12px' }}>
                                <li>contact@doomshell.com</li>
                                <li>+91 98 29 732221</li>
                                <li>DOOMSHELL ACADEMY OF ADVANCE COMPUTING</li>
                                <li>FIRST FLOOR AND SECOND FLOOR, A-3, MAL ROAD,, VIDHYADHAR NAGAR, SECTOR-1, JAIPUR, Jaipur, 302023</li>
                                <li>India Rajasthan</li>
                                <li>08AAKFD9537B1ZD</li>
                            </ul>
                            <span className='absolute top-1/2 right-0 transform -translate-y-1/2 pr-4' style={{ transform: 'rotate(270deg)' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="12"
                                    height="12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-6"
                                >
                                    <path d="M6.75 12.75l7.5 7.5 7.5-7.5" />
                                </svg>
                            </span>


                        </div>
                    </div>
                </div>
            </Modal>
            {/* edit button modal end */}

            {/* add card popup */}
            <Modal isVisible={ismodaladdcard} onClose={closeaddcardmodal}>
                <div className="bg-white rounded shadow-lg" style={{ maxWidth: '400px', height: 'auto', overflowY: 'hidden', position: 'absolute' }}>
                    <div className='shadow-sm rounded-md px-4 py-3 bg-white'>
                        <div className=' items-center justify-between flex item-center '>
                            <img
                                alt=""
                                src="/_next/static/media/logo_landscape_light.de3c5c18.svg"
                                style={{
                                    display: 'block',
                                    width: '70px',
                                    height: 'auto',
                                    margin: 'auto',
                                }}
                            />
                            <button onClick={closeaddcardmodal}><svg className='w-[20px] h-[20px]' version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1" y1="11" x2="11" y2="1" stroke="black" strokeWidth="2"></line>
                                <line x1="1" y1="1" x2="11" y2="11" stroke="black" strokeWidth="2"></line>
                            </svg></button>
                        </div>
                        <h3 className='text-center mt-2 text-sm font-bold' style={{ color: 'rgb(3, 207, 101)' }}>Add a payment method</h3>
                    </div>
                    <div className='px-8 py-2 pb-5' style={{ backgroundColor: '#f4f5f9' }}>
                        <form>
                            <div className='flex item-center gap-1 mb-2'>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="First Name Optional"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="Last Name Optional"></input>
                            </div>
                            <div className='mb-2'>
                                <input type="email" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="Email Optional"></input>
                                <input type="number"
                                    className="block w-full mt-2 border-0 py-2.5 pl-2 pr-1 text-xs sm:text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder-gray-400 placeholder-xs sm:leading-6"
                                    placeholder="Card Number"
                                />

                                <div className='flex item-center gap-1 mt-2'>
                                    <input id='expiry' type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="MM/YY"></input>
                                    <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="CVV"></input>
                                </div>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs mt-2 sm:text-sm sm:leading-6" placeholder="Adress Line-1 Optional"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs mt-2 sm:text-sm sm:leading-6" placeholder="Adress Line-2 Optional"></input>
                            </div>
                            <div className='flex item-center gap-1 mb-2'>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="City"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="zip"></input>
                            </div>
                            <div className='flex item-center gap-1 mb-2'>
                                <select className='border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 w-1/2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6'>
                                    <option selected="selected" value="">Country</option> <option value="AF">
                                        Afghanistan
                                    </option><option value="AX">
                                        Aland Islands
                                    </option><option value="AL">
                                        Albania
                                    </option><option value="DZ">
                                        Algeria
                                    </option><option value="AS">
                                        American Samoa
                                    </option><option value="AD">
                                        Andorra
                                    </option><option value="AO">
                                        Angola
                                    </option><option value="AI">
                                        Anguilla
                                    </option><option value="AQ">
                                        Antarctica
                                    </option><option value="AG">
                                        Antigua And Barbuda
                                    </option><option value="AR">
                                        Argentina
                                    </option><option value="AM">
                                        Armenia
                                    </option><option value="AW">
                                        Aruba
                                    </option><option value="AU">
                                        Australia
                                    </option><option value="AT">
                                        Austria
                                    </option><option value="AZ">
                                        Azerbaijan
                                    </option><option value="BS">
                                        Bahamas
                                    </option><option value="BH">
                                        Bahrain
                                    </option><option value="BD">
                                        Bangladesh
                                    </option><option value="BB">
                                        Barbados
                                    </option><option value="BY">
                                        Belarus
                                    </option><option value="BE">
                                        Belgium
                                    </option><option value="BZ">
                                        Belize
                                    </option><option value="BJ">
                                        Benin
                                    </option><option value="BM">
                                        Bermuda
                                    </option><option value="BT">
                                        Bhutan
                                    </option><option value="BO">
                                        Bolivia
                                    </option><option value="BA">
                                        Bosnia And Herzegovina
                                    </option><option value="BW">
                                        Botswana
                                    </option><option value="BV">
                                        Bouvet Island
                                    </option><option value="BR">
                                        Brazil
                                    </option><option value="IO">
                                        British Indian Ocean Territory
                                    </option><option value="VG">
                                        British Virgin Islands
                                    </option><option value="BN">
                                        Brunei Darussalam
                                    </option><option value="BG">
                                        Bulgaria
                                    </option><option value="BF">
                                        Burkina Faso
                                    </option><option value="BI">
                                        Burundi
                                    </option><option value="KH">
                                        Cambodia
                                    </option><option value="CM">
                                        Cameroon
                                    </option><option value="CA">
                                        Canada
                                    </option><option value="CV">
                                        Cape Verde
                                    </option><option value="KY">
                                        Cayman Islands
                                    </option><option value="CF">
                                        Central African Republic
                                    </option><option value="TD">
                                        Chad
                                    </option><option value="CL">
                                        Chile
                                    </option><option value="CN">
                                        China
                                    </option><option value="CX">
                                        Christmas Island
                                    </option><option value="CC">
                                        Cocos (Keeling) Islands
                                    </option><option value="CO">
                                        Colombia
                                    </option><option value="KM">
                                        Comoros
                                    </option><option value="CG">
                                        Congo
                                    </option><option value="CD">
                                        Congo (Democratic Republic)
                                    </option><option value="CK">
                                        Cook Islands
                                    </option><option value="CR">
                                        Costa Rica
                                    </option><option value="HR">
                                        Croatia
                                    </option><option value="CU">
                                        Cuba
                                    </option><option value="CW">
                                        Curaçao
                                    </option><option value="CY">
                                        Cyprus
                                    </option><option value="CZ">
                                        Czech Republic
                                    </option><option value="CI">
                                        Côte Divoire
                                    </option><option value="DK">
                                        Denmark
                                    </option><option value="DJ">
                                        Djibouti
                                    </option><option value="DM">
                                        Dominica
                                    </option><option value="DO">
                                        Dominican Republic
                                    </option><option value="EC">
                                        Ecuador
                                    </option><option value="EG">
                                        Egypt
                                    </option><option value="SV">
                                        El Salvador
                                    </option><option value="GQ">
                                        Equatorial Guinea
                                    </option><option value="ER">
                                        Eritrea
                                    </option><option value="EE">
                                        Estonia
                                    </option><option value="ET">
                                        Ethiopia
                                    </option><option value="FK">
                                        Falkland Islands (Malvinas)
                                    </option><option value="FO">
                                        Faroe Islands
                                    </option><option value="FJ">
                                        Fiji
                                    </option><option value="FI">
                                        Finland
                                    </option><option value="FR">
                                        France
                                    </option><option value="GF">
                                        French Guiana
                                    </option><option value="PF">
                                        French Polynesia
                                    </option><option value="TF">
                                        French Southern Territories
                                    </option><option value="GA">
                                        Gabon
                                    </option><option value="GM">
                                        Gambia
                                    </option><option value="GE">
                                        Georgia
                                    </option><option value="DE">
                                        Germany
                                    </option><option value="GH">
                                        Ghana
                                    </option><option value="GI">
                                        Gibraltar
                                    </option><option value="GR">
                                        Greece
                                    </option><option value="GL">
                                        Greenland
                                    </option><option value="GD">
                                        Grenada
                                    </option><option value="GP">
                                        Guadeloupe
                                    </option><option value="GU">
                                        Guam
                                    </option><option value="GT">
                                        Guatemala
                                    </option><option value="GG">
                                        Guernsey
                                    </option><option value="GN">
                                        Guinea
                                    </option><option value="GW">
                                        Guinea-bissau
                                    </option><option value="GY">
                                        Guyana
                                    </option><option value="HT">
                                        Haiti
                                    </option><option value="HM">
                                        Heard Island And Mcdonald Islands
                                    </option><option value="HN">
                                        Honduras
                                    </option><option value="HK">
                                        Hong Kong
                                    </option><option value="HU">
                                        Hungary
                                    </option><option value="IS">
                                        Iceland
                                    </option><option value="IN">
                                        India
                                    </option><option value="ID">
                                        Indonesia
                                    </option><option value="IR">
                                        Iran
                                    </option><option value="IQ">
                                        Iraq
                                    </option><option value="IE">
                                        Ireland
                                    </option><option value="IM">
                                        Isle Of Man
                                    </option><option value="IL">
                                        Israel
                                    </option><option value="IT">
                                        Italy
                                    </option><option value="JM">
                                        Jamaica
                                    </option><option value="JP">
                                        Japan
                                    </option><option value="JE">
                                        Jersey
                                    </option><option value="JO">
                                        Jordan
                                    </option><option value="KZ">
                                        Kazakhstan
                                    </option><option value="KE">
                                        Kenya
                                    </option><option value="KI">
                                        Kiribati
                                    </option><option value="KP">
                                        Korea (Democratic Peoples Republic)
                                    </option><option value="KR">
                                        Korea (Republic)
                                    </option><option value="XK">
                                        Kosovo
                                    </option><option value="KW">
                                        Kuwait
                                    </option><option value="KG">
                                        Kyrgyzstan
                                    </option><option value="LA">
                                        Lao (Peoples Democratic Republic)
                                    </option><option value="LV">
                                        Latvia
                                    </option><option value="LB">
                                        Lebanon
                                    </option><option value="LS">
                                        Lesotho
                                    </option><option value="LR">
                                        Liberia
                                    </option><option value="LY">
                                        Libya
                                    </option><option value="LI">
                                        Liechtenstein
                                    </option><option value="LT">
                                        Lithuania
                                    </option><option value="LU">
                                        Luxembourg
                                    </option><option value="MO">
                                        Macao
                                    </option><option value="MK">
                                        Macedonia
                                    </option><option value="MG">
                                        Madagascar
                                    </option><option value="MW">
                                        Malawi
                                    </option><option value="MY">
                                        Malaysia
                                    </option><option value="MV">
                                        Maldives
                                    </option><option value="ML">
                                        Mali
                                    </option><option value="MT">
                                        Malta
                                    </option><option value="MH">
                                        Marshall Islands
                                    </option><option value="MQ">
                                        Martinique
                                    </option><option value="MR">
                                        Mauritania
                                    </option><option value="MU">
                                        Mauritius
                                    </option><option value="YT">
                                        Mayotte
                                    </option><option value="MX">
                                        Mexico
                                    </option><option value="FM">
                                        Micronesia
                                    </option><option value="MD">
                                        Moldova
                                    </option><option value="MC">
                                        Monaco
                                    </option><option value="MN">
                                        Mongolia
                                    </option><option value="ME">
                                        Montenegro
                                    </option><option value="MS">
                                        Montserrat
                                    </option><option value="MA">
                                        Morocco
                                    </option><option value="MZ">
                                        Mozambique
                                    </option><option value="MM">
                                        Myanmar
                                    </option><option value="NA">
                                        Namibia
                                    </option><option value="NR">
                                        Nauru
                                    </option><option value="NP">
                                        Nepal
                                    </option><option value="NL">
                                        Netherlands
                                    </option><option value="AN">
                                        Netherlands Antilles
                                    </option><option value="NC">
                                        New Caledonia
                                    </option><option value="NZ">
                                        New Zealand
                                    </option><option value="NI">
                                        Nicaragua
                                    </option><option value="NE">
                                        Niger
                                    </option><option value="NG">
                                        Nigeria
                                    </option><option value="NU">
                                        Niue
                                    </option><option value="NF">
                                        Norfolk Island
                                    </option><option value="MP">
                                        Northern Mariana Islands
                                    </option><option value="NO">
                                        Norway
                                    </option><option value="OM">
                                        Oman
                                    </option><option value="PK">
                                        Pakistan
                                    </option><option value="PW">
                                        Palau
                                    </option><option value="PS">
                                        Palestinian Territory (Occupied)
                                    </option><option value="PA">
                                        Panama
                                    </option><option value="PG">
                                        Papua New Guinea
                                    </option><option value="PY">
                                        Paraguay
                                    </option><option value="PE">
                                        Peru
                                    </option><option value="PH">
                                        Philippines
                                    </option><option value="PN">
                                        Pitcairn
                                    </option><option value="PL">
                                        Poland
                                    </option><option value="PT">
                                        Portugal
                                    </option><option value="PR">
                                        Puerto Rico
                                    </option><option value="QA">
                                        Qatar
                                    </option><option value="RE">
                                        Reunion
                                    </option><option value="RO">
                                        Romania
                                    </option><option value="RU">
                                        Russian Federation
                                    </option><option value="RW">
                                        Rwanda
                                    </option><option value="BL">
                                        Saint Barthélemy
                                    </option><option value="SH">
                                        Saint Helena
                                    </option><option value="KN">
                                        Saint Kitts And Nevis
                                    </option><option value="LC">
                                        Saint Lucia
                                    </option><option value="MF">
                                        Saint Martin (French Part)
                                    </option><option value="PM">
                                        Saint Pierre And Miquelon
                                    </option><option value="VC">
                                        Saint Vincent And The Grenadines
                                    </option><option value="WS">
                                        Samoa
                                    </option><option value="SM">
                                        San Marino
                                    </option><option value="ST">
                                        Sao Tome And Principe
                                    </option><option value="SA">
                                        Saudi Arabia
                                    </option><option value="SN">
                                        Senegal
                                    </option><option value="RS">
                                        Serbia
                                    </option><option value="SC">
                                        Seychelles
                                    </option><option value="SL">
                                        Sierra Leone
                                    </option><option value="SG">
                                        Singapore
                                    </option><option value="BQ">
                                        Sint Eustatius And Saba Bonaire
                                    </option><option value="SX">
                                        Sint Maarten (Dutch Part)
                                    </option><option value="SK">
                                        Slovakia
                                    </option><option value="SI">
                                        Slovenia
                                    </option><option value="SB">
                                        Solomon Islands
                                    </option><option value="SO">
                                        Somalia
                                    </option><option value="ZA">
                                        South Africa
                                    </option><option value="GS">
                                        South Georgia And The South Sandwich Islands
                                    </option><option value="SS">
                                        South Sudan
                                    </option><option value="ES">
                                        Spain
                                    </option><option value="IC">
                                        Spain - Canary Islands
                                    </option><option value="EA">
                                        Spain - Ceuta and Melilla
                                    </option><option value="LK">
                                        Sri Lanka
                                    </option><option value="SD">
                                        Sudan
                                    </option><option value="SR">
                                        Suriname
                                    </option><option value="SJ">
                                        Svalbard And Jan Mayen
                                    </option><option value="SZ">
                                        Swaziland
                                    </option><option value="SE">
                                        Sweden
                                    </option><option value="CH">
                                        Switzerland
                                    </option><option value="SY">
                                        Syrian Arab Republic
                                    </option><option value="TW">
                                        Taiwan(Province Of China)
                                    </option><option value="TJ">
                                        Tajikistan
                                    </option><option value="TZ">
                                        Tanzania
                                    </option><option value="TH">
                                        Thailand
                                    </option><option value="TL">
                                        Timor-leste
                                    </option><option value="TG">
                                        Togo
                                    </option><option value="TK">
                                        Tokelau
                                    </option><option value="TO">
                                        Tonga
                                    </option><option value="TT">
                                        Trinidad And Tobago
                                    </option><option value="TN">
                                        Tunisia
                                    </option><option value="TR">
                                        Turkey
                                    </option><option value="TM">
                                        Turkmenistan
                                    </option><option value="TC">
                                        Turks And Caicos Islands
                                    </option><option value="TV">
                                        Tuvalu
                                    </option><option value="VI">
                                        U.S. Virgin Islands
                                    </option><option value="UG">
                                        Uganda
                                    </option><option value="UA">
                                        Ukraine
                                    </option><option value="AE">
                                        United Arab Emirates
                                    </option><option value="GB">
                                        United Kingdom
                                    </option><option value="XI">
                                        United Kingdom (Northern Ireland)
                                    </option><option value="US">
                                        United States
                                    </option><option value="UM">
                                        United States Minor Outlying Islands
                                    </option><option value="UY">
                                        Uruguay
                                    </option><option value="UZ">
                                        Uzbekistan
                                    </option><option value="VU">
                                        Vanuatu
                                    </option><option value="VA">
                                        Vatican City
                                    </option><option value="VE">
                                        Venezuela
                                    </option><option value="VN">
                                        Viet Nam
                                    </option><option value="WF">
                                        Wallis And Futuna
                                    </option><option value="EH">
                                        Western Sahara
                                    </option><option value="YE">
                                        Yemen
                                    </option><option value="ZM">
                                        Zambia
                                    </option><option value="ZW">
                                        Zimbabwe
                                    </option>
                                </select>
                                <select className='border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 w-1/2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs sm:text-sm sm:leading-6'>
                                    <option value="">State</option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AX">Aland Islands</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AS">American Samoa</option>
                                    <option value="AD">Andorra</option>
                                    <option value="AO">Angola</option>
                                    <option value="AI">Anguilla</option>
                                    <option value="AQ">Antarctica</option>
                                    <option value="AG">Antigua And Barbuda</option>
                                    <option value="AR">Argentina</option> </select>
                            </div>
                            <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="GSTIN"></input>

                            <lable className='text-sm text-black'>
                                I authorize Triny to save this payment method and automatically charge this payment method whenever a subscription is associated with it.
                            </lable>

                            <button className='px-2 h-10 mt-5 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3  rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300 text-white' style={{ backgroundColor: 'rgb(3, 207, 101)' }} >
                                Add
                            </button>
                        </form>

                    </div>
                </div>
            </Modal>
            {/* add card popup end*/}

            {/* adit button inner popup start*/}
            <Modal isVisible={isModalEditinner} onClose={closeEditeditinner}>
                <div className="bg-white rounded shadow-lg" style={{ maxWidth: '400px', height: 'auto', overflowY: 'hidden', position: 'absolute' }}>
                    <div className='shadow-sm rounded-md px-4 pb-3 pt-4 bg-white'>
                        <div className=' items-center justify-between flex item-center '>
                            <button onClick={closeEditeditinner}>
                                <span className='absolute transform -translate-y-1/2' style={{ transform: 'rotate(90deg)' }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-6"
                                    >
                                        <path d="M6.75 12.75l7.5 7.5 7.5-7.5" />
                                    </svg>
                                </span>
                                <span className='ml-5 text-sm align-text-top'>Update your billing details</span>

                            </button>

                        </div>

                    </div>
                    <div className='px-8 py-2 pb-5' style={{ backgroundColor: '#f4f5f9' }}>
                        <form>
                            <div className='flex item-center gap-1 mb-2'>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="First Name"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="Last Name"></input>
                            </div>
                            <div className='mb-2'>
                                <input type="email" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="Email Optional"></input>
                                <input type="number" className="block w-full mt-2 border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="Phone Optional"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs mt-2 sm:text-sm sm:leading-6" placeholder="Company Optional"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs mt-2 sm:text-sm sm:leading-6" placeholder="Adress Line-1 Optional"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs mt-2 sm:text-sm sm:leading-6" placeholder="Adress Line-2 Optional"></input>
                            </div>
                            <div className='flex item-center gap-1 mb-2'>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="City"></input>
                                <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="zip"></input>
                            </div>
                            <div className='flex item-center gap-1 mb-2'>
                                <select className='border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 w-1/2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6'>
                                    <option selected="selected" value="">Country</option> <option value="AF">
                                        Afghanistan
                                    </option><option value="AX">
                                        Aland Islands
                                    </option><option value="AL">
                                        Albania
                                    </option><option value="DZ">
                                        Algeria
                                    </option><option value="AS">
                                        American Samoa
                                    </option><option value="AD">
                                        Andorra
                                    </option><option value="AO">
                                        Angola
                                    </option><option value="AI">
                                        Anguilla
                                    </option><option value="AQ">
                                        Antarctica
                                    </option><option value="AG">
                                        Antigua And Barbuda
                                    </option><option value="AR">
                                        Argentina
                                    </option><option value="AM">
                                        Armenia
                                    </option><option value="AW">
                                        Aruba
                                    </option><option value="AU">
                                        Australia
                                    </option><option value="AT">
                                        Austria
                                    </option><option value="AZ">
                                        Azerbaijan
                                    </option><option value="BS">
                                        Bahamas
                                    </option><option value="BH">
                                        Bahrain
                                    </option><option value="BD">
                                        Bangladesh
                                    </option><option value="BB">
                                        Barbados
                                    </option><option value="BY">
                                        Belarus
                                    </option><option value="BE">
                                        Belgium
                                    </option><option value="BZ">
                                        Belize
                                    </option><option value="BJ">
                                        Benin
                                    </option><option value="BM">
                                        Bermuda
                                    </option><option value="BT">
                                        Bhutan
                                    </option><option value="BO">
                                        Bolivia
                                    </option><option value="BA">
                                        Bosnia And Herzegovina
                                    </option><option value="BW">
                                        Botswana
                                    </option><option value="BV">
                                        Bouvet Island
                                    </option><option value="BR">
                                        Brazil
                                    </option><option value="IO">
                                        British Indian Ocean Territory
                                    </option><option value="VG">
                                        British Virgin Islands
                                    </option><option value="BN">
                                        Brunei Darussalam
                                    </option><option value="BG">
                                        Bulgaria
                                    </option><option value="BF">
                                        Burkina Faso
                                    </option><option value="BI">
                                        Burundi
                                    </option><option value="KH">
                                        Cambodia
                                    </option><option value="CM">
                                        Cameroon
                                    </option><option value="CA">
                                        Canada
                                    </option><option value="CV">
                                        Cape Verde
                                    </option><option value="KY">
                                        Cayman Islands
                                    </option><option value="CF">
                                        Central African Republic
                                    </option><option value="TD">
                                        Chad
                                    </option><option value="CL">
                                        Chile
                                    </option><option value="CN">
                                        China
                                    </option><option value="CX">
                                        Christmas Island
                                    </option><option value="CC">
                                        Cocos (Keeling) Islands
                                    </option><option value="CO">
                                        Colombia
                                    </option><option value="KM">
                                        Comoros
                                    </option><option value="CG">
                                        Congo
                                    </option><option value="CD">
                                        Congo (Democratic Republic)
                                    </option><option value="CK">
                                        Cook Islands
                                    </option><option value="CR">
                                        Costa Rica
                                    </option><option value="HR">
                                        Croatia
                                    </option><option value="CU">
                                        Cuba
                                    </option><option value="CW">
                                        Curaçao
                                    </option><option value="CY">
                                        Cyprus
                                    </option><option value="CZ">
                                        Czech Republic
                                    </option><option value="CI">
                                        Côte Divoire
                                    </option><option value="DK">
                                        Denmark
                                    </option><option value="DJ">
                                        Djibouti
                                    </option><option value="DM">
                                        Dominica
                                    </option><option value="DO">
                                        Dominican Republic
                                    </option><option value="EC">
                                        Ecuador
                                    </option><option value="EG">
                                        Egypt
                                    </option><option value="SV">
                                        El Salvador
                                    </option><option value="GQ">
                                        Equatorial Guinea
                                    </option><option value="ER">
                                        Eritrea
                                    </option><option value="EE">
                                        Estonia
                                    </option><option value="ET">
                                        Ethiopia
                                    </option><option value="FK">
                                        Falkland Islands (Malvinas)
                                    </option><option value="FO">
                                        Faroe Islands
                                    </option><option value="FJ">
                                        Fiji
                                    </option><option value="FI">
                                        Finland
                                    </option><option value="FR">
                                        France
                                    </option><option value="GF">
                                        French Guiana
                                    </option><option value="PF">
                                        French Polynesia
                                    </option><option value="TF">
                                        French Southern Territories
                                    </option><option value="GA">
                                        Gabon
                                    </option><option value="GM">
                                        Gambia
                                    </option><option value="GE">
                                        Georgia
                                    </option><option value="DE">
                                        Germany
                                    </option><option value="GH">
                                        Ghana
                                    </option><option value="GI">
                                        Gibraltar
                                    </option><option value="GR">
                                        Greece
                                    </option><option value="GL">
                                        Greenland
                                    </option><option value="GD">
                                        Grenada
                                    </option><option value="GP">
                                        Guadeloupe
                                    </option><option value="GU">
                                        Guam
                                    </option><option value="GT">
                                        Guatemala
                                    </option><option value="GG">
                                        Guernsey
                                    </option><option value="GN">
                                        Guinea
                                    </option><option value="GW">
                                        Guinea-bissau
                                    </option><option value="GY">
                                        Guyana
                                    </option><option value="HT">
                                        Haiti
                                    </option><option value="HM">
                                        Heard Island And Mcdonald Islands
                                    </option><option value="HN">
                                        Honduras
                                    </option><option value="HK">
                                        Hong Kong
                                    </option><option value="HU">
                                        Hungary
                                    </option><option value="IS">
                                        Iceland
                                    </option><option value="IN">
                                        India
                                    </option><option value="ID">
                                        Indonesia
                                    </option><option value="IR">
                                        Iran
                                    </option><option value="IQ">
                                        Iraq
                                    </option><option value="IE">
                                        Ireland
                                    </option><option value="IM">
                                        Isle Of Man
                                    </option><option value="IL">
                                        Israel
                                    </option><option value="IT">
                                        Italy
                                    </option><option value="JM">
                                        Jamaica
                                    </option><option value="JP">
                                        Japan
                                    </option><option value="JE">
                                        Jersey
                                    </option><option value="JO">
                                        Jordan
                                    </option><option value="KZ">
                                        Kazakhstan
                                    </option><option value="KE">
                                        Kenya
                                    </option><option value="KI">
                                        Kiribati
                                    </option><option value="KP">
                                        Korea (Democratic Peoples Republic)
                                    </option><option value="KR">
                                        Korea (Republic)
                                    </option><option value="XK">
                                        Kosovo
                                    </option><option value="KW">
                                        Kuwait
                                    </option><option value="KG">
                                        Kyrgyzstan
                                    </option><option value="LA">
                                        Lao (Peoples Democratic Republic)
                                    </option><option value="LV">
                                        Latvia
                                    </option><option value="LB">
                                        Lebanon
                                    </option><option value="LS">
                                        Lesotho
                                    </option><option value="LR">
                                        Liberia
                                    </option><option value="LY">
                                        Libya
                                    </option><option value="LI">
                                        Liechtenstein
                                    </option><option value="LT">
                                        Lithuania
                                    </option><option value="LU">
                                        Luxembourg
                                    </option><option value="MO">
                                        Macao
                                    </option><option value="MK">
                                        Macedonia
                                    </option><option value="MG">
                                        Madagascar
                                    </option><option value="MW">
                                        Malawi
                                    </option><option value="MY">
                                        Malaysia
                                    </option><option value="MV">
                                        Maldives
                                    </option><option value="ML">
                                        Mali
                                    </option><option value="MT">
                                        Malta
                                    </option><option value="MH">
                                        Marshall Islands
                                    </option><option value="MQ">
                                        Martinique
                                    </option><option value="MR">
                                        Mauritania
                                    </option><option value="MU">
                                        Mauritius
                                    </option><option value="YT">
                                        Mayotte
                                    </option><option value="MX">
                                        Mexico
                                    </option><option value="FM">
                                        Micronesia
                                    </option><option value="MD">
                                        Moldova
                                    </option><option value="MC">
                                        Monaco
                                    </option><option value="MN">
                                        Mongolia
                                    </option><option value="ME">
                                        Montenegro
                                    </option><option value="MS">
                                        Montserrat
                                    </option><option value="MA">
                                        Morocco
                                    </option><option value="MZ">
                                        Mozambique
                                    </option><option value="MM">
                                        Myanmar
                                    </option><option value="NA">
                                        Namibia
                                    </option><option value="NR">
                                        Nauru
                                    </option><option value="NP">
                                        Nepal
                                    </option><option value="NL">
                                        Netherlands
                                    </option><option value="AN">
                                        Netherlands Antilles
                                    </option><option value="NC">
                                        New Caledonia
                                    </option><option value="NZ">
                                        New Zealand
                                    </option><option value="NI">
                                        Nicaragua
                                    </option><option value="NE">
                                        Niger
                                    </option><option value="NG">
                                        Nigeria
                                    </option><option value="NU">
                                        Niue
                                    </option><option value="NF">
                                        Norfolk Island
                                    </option><option value="MP">
                                        Northern Mariana Islands
                                    </option><option value="NO">
                                        Norway
                                    </option><option value="OM">
                                        Oman
                                    </option><option value="PK">
                                        Pakistan
                                    </option><option value="PW">
                                        Palau
                                    </option><option value="PS">
                                        Palestinian Territory (Occupied)
                                    </option><option value="PA">
                                        Panama
                                    </option><option value="PG">
                                        Papua New Guinea
                                    </option><option value="PY">
                                        Paraguay
                                    </option><option value="PE">
                                        Peru
                                    </option><option value="PH">
                                        Philippines
                                    </option><option value="PN">
                                        Pitcairn
                                    </option><option value="PL">
                                        Poland
                                    </option><option value="PT">
                                        Portugal
                                    </option><option value="PR">
                                        Puerto Rico
                                    </option><option value="QA">
                                        Qatar
                                    </option><option value="RE">
                                        Reunion
                                    </option><option value="RO">
                                        Romania
                                    </option><option value="RU">
                                        Russian Federation
                                    </option><option value="RW">
                                        Rwanda
                                    </option><option value="BL">
                                        Saint Barthélemy
                                    </option><option value="SH">
                                        Saint Helena
                                    </option><option value="KN">
                                        Saint Kitts And Nevis
                                    </option><option value="LC">
                                        Saint Lucia
                                    </option><option value="MF">
                                        Saint Martin (French Part)
                                    </option><option value="PM">
                                        Saint Pierre And Miquelon
                                    </option><option value="VC">
                                        Saint Vincent And The Grenadines
                                    </option><option value="WS">
                                        Samoa
                                    </option><option value="SM">
                                        San Marino
                                    </option><option value="ST">
                                        Sao Tome And Principe
                                    </option><option value="SA">
                                        Saudi Arabia
                                    </option><option value="SN">
                                        Senegal
                                    </option><option value="RS">
                                        Serbia
                                    </option><option value="SC">
                                        Seychelles
                                    </option><option value="SL">
                                        Sierra Leone
                                    </option><option value="SG">
                                        Singapore
                                    </option><option value="BQ">
                                        Sint Eustatius And Saba Bonaire
                                    </option><option value="SX">
                                        Sint Maarten (Dutch Part)
                                    </option><option value="SK">
                                        Slovakia
                                    </option><option value="SI">
                                        Slovenia
                                    </option><option value="SB">
                                        Solomon Islands
                                    </option><option value="SO">
                                        Somalia
                                    </option><option value="ZA">
                                        South Africa
                                    </option><option value="GS">
                                        South Georgia And The South Sandwich Islands
                                    </option><option value="SS">
                                        South Sudan
                                    </option><option value="ES">
                                        Spain
                                    </option><option value="IC">
                                        Spain - Canary Islands
                                    </option><option value="EA">
                                        Spain - Ceuta and Melilla
                                    </option><option value="LK">
                                        Sri Lanka
                                    </option><option value="SD">
                                        Sudan
                                    </option><option value="SR">
                                        Suriname
                                    </option><option value="SJ">
                                        Svalbard And Jan Mayen
                                    </option><option value="SZ">
                                        Swaziland
                                    </option><option value="SE">
                                        Sweden
                                    </option><option value="CH">
                                        Switzerland
                                    </option><option value="SY">
                                        Syrian Arab Republic
                                    </option><option value="TW">
                                        Taiwan(Province Of China)
                                    </option><option value="TJ">
                                        Tajikistan
                                    </option><option value="TZ">
                                        Tanzania
                                    </option><option value="TH">
                                        Thailand
                                    </option><option value="TL">
                                        Timor-leste
                                    </option><option value="TG">
                                        Togo
                                    </option><option value="TK">
                                        Tokelau
                                    </option><option value="TO">
                                        Tonga
                                    </option><option value="TT">
                                        Trinidad And Tobago
                                    </option><option value="TN">
                                        Tunisia
                                    </option><option value="TR">
                                        Turkey
                                    </option><option value="TM">
                                        Turkmenistan
                                    </option><option value="TC">
                                        Turks And Caicos Islands
                                    </option><option value="TV">
                                        Tuvalu
                                    </option><option value="VI">
                                        U.S. Virgin Islands
                                    </option><option value="UG">
                                        Uganda
                                    </option><option value="UA">
                                        Ukraine
                                    </option><option value="AE">
                                        United Arab Emirates
                                    </option><option value="GB">
                                        United Kingdom
                                    </option><option value="XI">
                                        United Kingdom (Northern Ireland)
                                    </option><option value="US">
                                        United States
                                    </option><option value="UM">
                                        United States Minor Outlying Islands
                                    </option><option value="UY">
                                        Uruguay
                                    </option><option value="UZ">
                                        Uzbekistan
                                    </option><option value="VU">
                                        Vanuatu
                                    </option><option value="VA">
                                        Vatican City
                                    </option><option value="VE">
                                        Venezuela
                                    </option><option value="VN">
                                        Viet Nam
                                    </option><option value="WF">
                                        Wallis And Futuna
                                    </option><option value="EH">
                                        Western Sahara
                                    </option><option value="YE">
                                        Yemen
                                    </option><option value="ZM">
                                        Zambia
                                    </option><option value="ZW">
                                        Zimbabwe
                                    </option>
                                </select>
                                <select className='border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 w-1/2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6'>
                                    <option value="">State</option> <option value="AF">Afghanistan</option><option value="AX">Aland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua And Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BA">Bosnia And Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="VG">British Virgin Islands</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo</option><option value="CD">Congo (Democratic Republic)</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="HR">Croatia</option><option value="CU">Cuba</option><option value="CW">Curaçao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="CI">Côte Divoire</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island And Mcdonald Islands</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IR">Iran</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle Of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KP">Korea (Democratic Peoples Republic)</option><option value="KR">Korea (Republic)</option><option value="XK">Kosovo</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Lao (Peoples Democratic Republic)</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia</option><option value="MD">Moldova</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territory (Occupied)</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option><option value="RW">Rwanda</option><option value="BL">Saint Barthélemy</option><option value="SH">Saint Helena</option><option value="KN">Saint Kitts And Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin (French Part)</option><option value="PM">Saint Pierre And Miquelon</option><option value="VC">Saint Vincent And The Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome And Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="BQ">Sint Eustatius And Saba Bonaire</option><option value="SX">Sint Maarten (Dutch Part)</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia And The South Sandwich Islands</option><option value="SS">South Sudan</option><option value="ES">Spain</option><option value="IC">Spain - Canary Islands</option><option value="EA">Spain - Ceuta and Melilla</option><option value="LK">Sri Lanka</option><option value="SD">Sudan</option><option value="SR">Suriname</option><option value="SJ">Svalbard And Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="SY">Syrian Arab Republic</option><option value="TW">Taiwan(Province Of China)</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania</option><option value="TH">Thailand</option><option value="TL">Timor-leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad And Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks And Caicos Islands</option><option value="TV">Tuvalu</option><option value="VI">U.S. Virgin Islands</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="XI">United Kingdom (Northern Ireland)</option><option value="US">United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VA">Vatican City</option><option value="VE">Venezuela</option><option value="VN">Viet Nam</option><option value="WF">Wallis And Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option>
                                </select>
                            </div>
                            <input type="text" className="block w-full  border-0 py-2.5 pl-2 text-xs pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs  sm:text-sm sm:leading-6" placeholder="GSTIN"></input>
                            <button className='px-2 h-10 mt-5 flex items-center justify-center bottom-6 left-0 right-0 m-auto w-2/3  rounded-md w-full text-sm text-center font-bold border border-stroke border-slate-300 text-white' style={{ backgroundColor: 'rgb(3, 207, 101)' }} >
                                Update
                            </button>
                        </form>

                    </div>
                </div>
            </Modal>
            {/* adit button inner popup end*/}


        </>
    )
}

export default Subscription
