import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalApiIntegrationContext } from '../../contexts/ApiIntegrationContext'
import Modal from '../Modal'
import TokenModal from './TokenModal'

import { useClickAway } from '@uidotdev/usehooks'
import Image from 'next/image'
import Link from 'next/link'
import { IoMdCheckmark } from 'react-icons/io'
import { MdOutlineSyncAlt } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'
import SallaLogo from './assets/sallaLogo.jpeg'
import ShopifyLogo from './assets/shopifySmall.png'
import zidLogo from './assets/zidLogo.webp'

const Platform = () => {
  const { t } = useTranslation()
  const { orderId, setOrderId, apiKey, setApiKey, Order, setOrder, id, api } =
    useGlobalApiIntegrationContext()
  const { getCookie, wrapper } = useGlobalAuthContext()
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [topAleartMessage, setTopAleartMessage] = useState(null)

  const [showRevokeModal, setShowRevokeModal] = useState(false)
  const [showRegenerateModal, setShowRegenerateModal] = useState(false)

  function handle_error(code) {
    if (code === 401) {
      setTopAleartMessage({
        title: '401',
        message: 'Integration_message_401',
      })
    } else {
      setTopAleartMessage({
        title: '500',
        message: 'Integration_message_500',
      })
    }
  }

  const revoke = async (password) => {
    setTopAleartMessage(null)
    setIsApiLoading(true)
    let error = true
    const config = {
      headers: {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
        password: password,
      },
    }
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/API/key/regenerate/reset`,
        config
      )
      .catch((err) => {
        handle_error(err.response.status)
        error = false
      })
    error &&
      setTopAleartMessage({
        title: 'Integration_message_NewAPI',
        message: 'Integration_message_NewAPI',
      })
    setShowRevokeModal(false)
    setIsApiLoading(false)
  }

  const regenerate = async (password) => {
    setTopAleartMessage(null)
    setIsApiLoading(true)
    let error = true
    const config = {
      headers: {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
        password: password,
      },
    }
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/API/key/regenerate`,
        config
      )
      .catch((err) => {
        handle_error(err.response.status)
        error = false
      })
    error &&
      setTopAleartMessage({
        title: 'Integration_message_NewAPI',
        message: 'Integration_message_NewAPI',
      })
    setShowRegenerateModal(false)
    setIsApiLoading(false)
  }

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <Modal
        isVisible={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}>
        <TokenModal
          isApiLoading={isApiLoading}
          handleClick={revoke}
          onClose={() => setShowRevokeModal(false)}
          heading={t('Integration_revoke_modal_heading')}
          text={t('Integration_revoke_modal_text')}
        />
      </Modal>

      <Modal
        isVisible={showRegenerateModal}
        onClose={() => setShowRegenerateModal(false)}>
        <TokenModal
          isApiLoading={isApiLoading}
          handleClick={regenerate}
          onClose={() => setShowRegenerateModal(false)}
          heading={t('Integration_regenerate_modal_heading')}
          text={t('Integration_regenerate_modal_text')}
        />
      </Modal>

      {topAleartMessage && (
        <div className="flex flex-row justify-between w-full gap-2 px-4 py-2 bg-Green dark:bg-Green/60 rounded-xl">
          <p className="text-lg font-bold text-white ">
            {t(topAleartMessage?.message)} <br />
          </p>
          <button
            onClick={() => setTopAleartMessage(null)}
            className="rounded-[5px] text-2xl bg-black/50  text-white right-2">
            <IoClose />
          </button>
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-4 mobileL:grid-cols-2 laptopL:grid-cols-4 laptop:grid-cols-3">
        <SallaIntegrationCard
          apiKey={apiKey}
          id={id}
          isApiLoading={isApiLoading}
          setShowRegenerateModal={setShowRegenerateModal}
          setShowRevokeModal={setShowRevokeModal}
          setApiKey={setApiKey}
          isSubscribed={api[4]?.Salla_Sub}
        />
        <ShopifyIntegrationCard
          apiKey={apiKey}
          id={id}
          isApiLoading={isApiLoading}
          setShowRegenerateModal={setShowRegenerateModal}
          setShowRevokeModal={setShowRevokeModal}
          setApiKey={setApiKey}
        />
        <ZidIntegrationCard apiKey={apiKey}
          id={id}
          isApiLoading={isApiLoading}
          setShowRegenerateModal={setShowRegenerateModal}
          setShowRevokeModal={setShowRevokeModal}
          setApiKey={setApiKey}
          isSubscribed={api[5]?.Zid_Sub}
        />
        {/* <WixIntegrationCard
          apiKey={apiKey}
          id={id}
          isApiLoading={isApiLoading}
          setShowRegenerateModal={setShowRegenerateModal}
          setShowRevokeModal={setShowRevokeModal}
          setApiKey={setApiKey}
        />
        <WooCommerceIntegrationCard
          apiKey={apiKey}
          id={id}
          isApiLoading={isApiLoading}
          setShowRegenerateModal={setShowRegenerateModal}
          setShowRevokeModal={setShowRevokeModal}
          setApiKey={setApiKey}
        /> */}
      </div>
    </div>
  )
}

export default Platform

const SallaIntegrationCard = ({
  isSubscribed,
  id,
  apiKey,
  isApiLoading,
  setShowRevokeModal,
  setShowRegenerateModal,
  setApiKey,
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showSubManually, setShowSubManually] = useState(false)
  const optionsRef = useClickAway(() => {
    setShowOptions(false)
  })
  const { selectedLang } = useGlobalAuthContext()

  const { t } = useTranslation()

  return (
    <div className="border-[1px] p-3 gap-3 rounded-xl h-full border-BlackTer dark:border-White/20 flex flex-col items-start justify-between">
      <div className="flex flex-col items-start justify-start gap-3 pb-0">
        <div className="flex items-center justify-center gap-2">
          <div className="overflow-hidden rounded-lg">
            <div className="relative w-10 h-10">
              <Image
                src={SallaLogo}
                alt="Salla Logo in Invobot Integration"
                layout="fill"
              />
            </div>
          </div>
          <p className="font-bold">Salla</p>
        </div>
        <p className="h-full text-sm">{t('Integration_Salla_Description')}</p>
      </div>
      <div className="relative h-full w-full flex justify-between border-t-[1px] border-BlackTer dark:border-White/20 pt-2">
        {isSubscribed ? (
          <p className="flex items-center justify-center gap-2 px-2 py-1 text-sm font-semibold text-white transition-all duration-200 ease-out bg-green-500 rounded-md">
            <IoMdCheckmark />
            {t('Integration_Connected')}
          </p>
        ) : (
          <Link
            href={`https://accounts.salla.sa/oauth2/auth?scope=offline_access&response_type=code&client_id=da4ebceb0985dd818cf64264e77619da&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/salla/callback&state=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`}
            passHref>
            <button className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20 font-semibold flex items-center justify-center gap-2 hover:border-Blue hover:text-Blue transition-all duration-200 ease-out">
              <MdOutlineSyncAlt /> {t('Integration_Connect')}
            </button>
          </Link>
        )}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20">
          <SlOptions />
        </button>

        {showOptions && (
          <div
            ref={optionsRef}
            className={`absolute text-sm ${selectedLang === 'en' ? 'right-0' : 'left-0'} flex flex-col items-start justify-start gap-2 shadow-sm bg-white dark:bg-bgBlack top-10 border-[1px] rounded-xl border-BlackTer dark:border-White/20 hover:bg-Red hover:text-white`}>
            {isSubscribed ? (
              <Link
                href={`https://accounts.salla.sa/oauth2/auth?scope=offline_access&response_type=code&client_id=da4ebceb0985dd818cf64264e77619da&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/salla/unsubscribe&state=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`}
                passHref>
                <button className="px-3 py-1.5">
                  {t('Integration_Disconnect')}
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setShowSubManually(true)}
                className="px-3 py-1.5">
                {t('Integration_Connect_Manually')}
              </button>
            )}
          </div>
        )}
      </div>
      <Modal
        isVisible={showSubManually}
        onClose={() => setShowSubManually(false)}>
        {showSubManually && (
          <div className="w-full max-w-xl p-2">
            <div className="overflow-auto font-mono p-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2 gap-2 flex-col flex  placeholder:text-BlackSec text-sm  max-h-[80vh] overflow-y-auto">
              <p className="font-bold">Salla</p>

              <div className="flex flex-col items-start justify-start w-full gap-2 py-4 text-sm font-semibold font-openS">
                <div className="flex flex-col items-start w-full gap-1 ">
                  <label className="flex items-center gap-1 text-base capitalize text-BlackSec">
                    <span>{t && t('MerchantID')}</span>
                  </label>
                  <div className="w-full ">
                    <p className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]">
                      {id}
                    </p>
                  </div>
                </div>

                <div className="w-full text-sm ">
                  <Input
                    label={t('Integration_apikey')}
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t('Integration_apikey_textbox')}
                    enableDark={true}
                  />
                </div>

                <div className="flex flex-row items-center justify-end w-full gap-2 font-light">
                  <SecondaryButton
                    isLoading={isApiLoading}
                    disabled={isApiLoading}
                    handleClick={() => setShowRevokeModal(true)}
                    text={t('Integration_revoke')}
                  />
                  <PrimaryButton
                    isLoading={isApiLoading}
                    disabled={isApiLoading}
                    handleClick={() => setShowRegenerateModal(true)}
                    text={t('Integration_regenerate')}
                  />
                </div>
              </div>

              <p className="flex items-start justify-start w-full gap-2">
                <span>1.</span>
                Login to Salla, Navigate to Settings, Configure Webhooks, Create
                to Wehhooks
              </p>
              <p className="flex items-start justify-start w-full gap-2">
                <span>2.</span>
                Create Order Init Webhook, with following congiguration
                <br />
                Link ={' '}
                {`${process.env.NEXT_PUBLIC_API_DOMAIN}/Webhook/v1.0/salla/${id}`}
                <br />
                Name = Order_Init
                <br />
                Event_type = Request has been created
                <br />
                Version = v2
                <br />
                Http_Method = POST
                <br />
                Header = {`token : ${apiKey}`}
              </p>
              <p className="flex items-start justify-start w-full gap-2">
                <span>3.</span>
                Create Order Update Webhook, with following congiguration
                <br />
                Link ={' '}
                {`${process.env.NEXT_PUBLIC_API_DOMAIN}/Webhook/v1.0/salla/${id}`}
                <br />
                Name = Order_Update
                <br />
                Event_type = Request information has been updated
                <br />
                Version = v2
                <br />
                Http_Method = POST
                <br />
                Header = {`token : ${apiKey ?? 'API_KEY'}`}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
const ShopifyIntegrationCard = ({
  id,
  apiKey,
  isApiLoading,
  setShowRevokeModal,
  setShowRegenerateModal,
  setApiKey,
}) => {
  const [showSubManually, setShowSubManually] = useState(false)

  const { t } = useTranslation()
  return (
    <div className="border-[1px] p-3 gap-3 rounded-xl border-BlackTer dark:border-White/20 flex flex-col items-start justify-between">
      <div className="flex flex-col items-start justify-start gap-3 pb-0">
        <div className="flex items-center justify-center gap-2">
          <div className="rounded-lg bg-slate-200">
            <div className="relative w-10 h-10 ">
              <Image
                src={ShopifyLogo}
                alt="Salla Logo in Invobot Integration"
                layout="fill"
              />
            </div>
          </div>
          <p className="font-bold">Shopify</p>
        </div>
        <p className="text-sm">{t('Integration_Shopify_Description')}</p>
      </div>
      <div className="relative w-full flex justify-between border-t-[1px] border-BlackTer dark:border-White/20 pt-2">
        <button
          onClick={() => setShowSubManually(true)}
          className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20 font-semibold flex items-center justify-center gap-2 hover:border-Blue hover:text-Blue transition-all duration-200 ease-out">
          <MdOutlineSyncAlt /> {t('Integration_Connect_Manually')}
        </button>
      </div>
      <Modal
        isVisible={showSubManually}
        onClose={() => setShowSubManually(false)}>
        {showSubManually && (
          <div className="w-full max-w-xl p-2">
            <div className="overflow-auto font-mono p-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2 gap-2 flex-col flex  placeholder:text-BlackSec text-sm  max-h-[80vh] overflow-y-auto">
              <p className="font-bold">Shopify</p>

              <div className="flex flex-col items-start justify-start w-full gap-2 py-4 text-sm font-semibold font-openS">
                <div className="flex flex-col items-start w-full gap-1 ">
                  <label className="flex items-center gap-1 text-base capitalize text-BlackSec">
                    <span>{t && t('MerchantID')}</span>
                  </label>
                  <div className="w-full ">
                    <p className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]">
                      {id}
                    </p>
                  </div>
                </div>

                <div className="w-full text-sm ">
                  <Input
                    label={t('Integration_apikey')}
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t('Integration_apikey_textbox')}
                    enableDark={true}
                  />
                </div>

                <div className="flex flex-row items-center justify-end w-full gap-2 font-light">
                  <SecondaryButton
                    isLoading={isApiLoading}
                    disabled={isApiLoading}
                    handleClick={() => setShowRevokeModal(true)}
                    text={t('Integration_revoke')}
                  />
                  <PrimaryButton
                    isLoading={isApiLoading}
                    disabled={isApiLoading}
                    handleClick={() => setShowRegenerateModal(true)}
                    text={t('Integration_regenerate')}
                  />
                </div>
              </div>

              <p className="flex items-start justify-start w-full gap-2">
                <span>1.</span>
                {
                  'Login to Shopify -> Admin panel -> Settings -> Notifications -> Webhooks -> Create webhook'
                }
              </p>
              <p className="flex items-start justify-start w-full gap-2">
                <span>2.</span>
                Create Order Init Webhook, with following congiguration
                <br />
                Delivery URL ={' '}
                {`${process.env.NEXT_PUBLIC_API_DOMAIN
                  }/Webhook/v1.0/shopify/${id}?token=${apiKey ?? 'API_KEY'}`}
                <br />
                Name = Order_Init
                <br />
                Event_type = Order Created
                <br />
                Http_Method = POST
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

const ZidIntegrationCard = ({
  isSubscribed,
}) => {
  const { t } = useTranslation()
  const [showOptions, setShowOptions] = useState(false)
  const optionsRef = useClickAway(() => {
    setShowOptions(false)
  })
  const { selectedLang } = useGlobalAuthContext()

  return (
    <div className="border-[1px] p-3 gap-3 rounded-xl h-full border-BlackTer dark:border-White/20 flex flex-col items-start justify-between">
      <div className="flex flex-col items-start justify-start gap-3 pb-0">
        <div className="flex items-center justify-center gap-2">
          <div className="overflow-hidden rounded-lg">
            <div className="relative w-10 h-10">
              <Image
                src={zidLogo}
                alt="Zid Logo in Invobot Integration"
                layout="fill"
              />
            </div>
          </div>
          <p className="font-bold">Zid</p>
        </div>
        <p className="h-full text-sm">{t('Integration_Zid_Description')}</p>
      </div>
      <div className="relative h-full w-full flex justify-between border-t-[1px] border-BlackTer dark:border-White/20 pt-2">

        {isSubscribed ? (
          <p className="flex items-center justify-center gap-2 px-2 py-1 text-sm font-semibold text-white transition-all duration-200 ease-out bg-green-500 rounded-md">
            <IoMdCheckmark />
            {t('Integration_Connected')}
          </p>
        ) : (
          <Link
            href={`https://oauth.zid.sa/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZID_CLIENT_ID}`}
            passHref>
            <button className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20 font-semibold flex items-center justify-center gap-2 hover:border-Blue hover:text-Blue transition-all duration-200 ease-out">
              <MdOutlineSyncAlt /> {t('Integration_Connect')}
            </button>
          </Link>

        )}
        {isSubscribed && <button
          onClick={() => setShowOptions(!showOptions)}
          className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20">
          <SlOptions />
        </button>}

        {showOptions && isSubscribed && (
          <div
            ref={optionsRef}
            className={`absolute text-sm ${selectedLang === 'en' ? 'right-0' : 'left-0'} flex flex-col items-start justify-start gap-2 shadow-sm bg-white dark:bg-bgBlack top-10 border-[1px] rounded-xl border-BlackTer dark:border-White/20 hover:bg-Red hover:text-white`}>

            <Link
              href={`https://oauth.zid.sa/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZID_CLIENT_ID}`}
              passHref>
              <button className="px-3 py-1.5">
                {t('Integration_Disconnect')}
              </button>
            </Link>

          </div>
        )}


      </div>

    </div>
  )
}
// const WixIntegrationCard = ({
//   id,
//   apiKey,
//   isApiLoading,
//   setShowRevokeModal,
//   setShowRegenerateModal,
//   setApiKey,
// }) => {
//   const [showSubManually, setShowSubManually] = useState(false)
//   const { t } = useTranslation()

//   return (
//     <div className="border-[1px] p-3 gap-3 rounded-xl border-BlackTer dark:border-White/20 flex flex-col items-start justify-start">
//       <div className="flex flex-col items-start justify-start gap-3 pb-0">
//         <div className="flex items-center justify-center gap-2">
//           <div className="rounded-lg ">
//             <div className="relative w-10 h-10 ">
//               <Image
//                 src={WixLogo}
//                 alt="Salla Logo in Invobot Integration"
//                 layout="fill"
//               />
//             </div>
//           </div>
//           <p className="font-bold">Wix</p>
//         </div>
//         <p className="text-sm">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore,
//           quos.
//         </p>
//       </div>
//       <div className="relative w-full flex justify-between border-t-[1px] border-BlackTer dark:border-White/20 pt-2">
//         <button
//           onClick={() => setShowSubManually(true)}
//           className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20 font-semibold flex items-center justify-center gap-2 hover:border-Blue hover:text-Blue transition-all duration-200 ease-out">
//           <MdOutlineSyncAlt /> Connect Manually
//         </button>
//       </div>
//       <Modal
//         isVisible={showSubManually}
//         onClose={() => setShowSubManually(false)}>
//         {showSubManually && (
//           <div className="w-full max-w-xl p-2">
//             <div className="overflow-auto font-mono p-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2 gap-2 flex-col flex  placeholder:text-BlackSec text-sm  max-h-[80vh] overflow-y-auto">
//               <p className="font-bold">Wix</p>

//               <div className="flex flex-col items-start justify-start w-full gap-2 py-4 text-sm font-semibold font-openS">
//                 <div className="flex flex-col items-start w-full gap-1 ">
//                   <label className="flex items-center gap-1 text-base capitalize text-BlackSec">
//                     <span>{t && t('MerchantID')}</span>
//                   </label>
//                   <div className="w-full ">
//                     <p className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]">
//                       {id}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full text-sm ">
//                   <Input
//                     label={t('Integration_apikey')}
//                     type="text"
//                     name="apiKey"
//                     id="apiKey"
//                     value={apiKey}
//                     onChange={(e) => setApiKey(e.target.value)}
//                     placeholder={t('Integration_apikey_textbox')}
//                     enableDark={true}
//                   />
//                 </div>

//                 <div className="flex flex-row items-center justify-end w-full gap-2 font-light">
//                   <SecondaryButton
//                     isLoading={isApiLoading}
//                     disabled={isApiLoading}
//                     handleClick={() => setShowRevokeModal(true)}
//                     text={t('Integration_revoke')}
//                   />
//                   <PrimaryButton
//                     isLoading={isApiLoading}
//                     disabled={isApiLoading}
//                     handleClick={() => setShowRegenerateModal(true)}
//                     text={t('Integration_regenerate')}
//                   />
//                 </div>
//               </div>

//               <p className="flex items-start justify-start w-full gap-2">
//                 <span>1.</span>
//                 {
//                   'Login to Wix -> Admin panel -> Settings -> Notifications -> Webhooks -> Create webhook'
//                 }
//               </p>
//               <p className="flex items-start justify-start w-full gap-2">
//                 <span>2.</span>
//                 Create Order Init Webhook, with following congiguration
//                 <br />
//                 Delivery URL ={' '}
//                 {`${
//                   process.env.NEXT_PUBLIC_API_DOMAIN
//                 }/Webhook/v1.0/wix/${id}?token=${apiKey ?? 'API_KEY'}`}
//                 <br />
//                 Name = Order_Init
//                 <br />
//                 Event_type = Order Created
//                 <br />
//                 Http_Method = POST
//               </p>
//             </div>
//           </div>
//           //   </div>
//         )}
//       </Modal>
//     </div>
//   )
// }
// const WooCommerceIntegrationCard = ({
//   id,
//   apiKey,
//   isApiLoading,
//   setShowRevokeModal,
//   setShowRegenerateModal,
//   setApiKey,
// }) => {
//   const [showSubManually, setShowSubManually] = useState(false)
//   const { t } = useTranslation()

//   return (
//     <div className="border-[1px] p-3 gap-3 rounded-xl border-BlackTer dark:border-White/20 flex flex-col items-start justify-start">
//       <div className="flex flex-col items-start justify-start gap-3 pb-0">
//         <div className="flex items-center justify-center gap-2">
//           <div className="rounded-lg">
//             <div className="relative w-11 h-11 ">
//               <Image
//                 src={WooCommerceLogo}
//                 alt="Salla Logo in Invobot Integration"
//                 layout="fill"
//               />
//             </div>
//           </div>
//           <p className="font-bold">WooCommerce</p>
//         </div>
//         <p className="text-sm">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore,
//           quos.
//         </p>
//       </div>
//       <div className="relative w-full flex justify-between border-t-[1px] border-BlackTer dark:border-White/20 pt-2">
//         <button
//           onClick={() => setShowSubManually(true)}
//           className="px-2 py-1 text-sm rounded-md border-[1px] border-BlackTer dark:border-White/20 font-semibold flex items-center justify-center gap-2 hover:border-Blue hover:text-Blue transition-all duration-200 ease-out">
//           <MdOutlineSyncAlt /> Connect Manually
//         </button>
//       </div>
//       <Modal
//         isVisible={showSubManually}
//         onClose={() => setShowSubManually(false)}>
//         {showSubManually && (
//           <div className="w-full max-w-xl p-2">
//             <div className="overflow-auto font-mono p-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2 gap-2 flex-col flex  placeholder:text-BlackSec text-sm  max-h-[80vh] overflow-y-auto">
//               <p className="font-bold">WooCommerce</p>
//               <div className="flex flex-col items-start justify-start w-full gap-2 py-4 text-sm font-semibold font-openS">
//                 <div className="flex flex-col items-start w-full gap-1 ">
//                   <label className="flex items-center gap-1 text-base capitalize text-BlackSec">
//                     <span>{t && t('MerchantID')}</span>
//                   </label>
//                   <div className="w-full ">
//                     <p className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]">
//                       {id}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full text-sm ">
//                   <Input
//                     label={t('Integration_apikey')}
//                     type="text"
//                     name="apiKey"
//                     id="apiKey"
//                     value={apiKey}
//                     onChange={(e) => setApiKey(e.target.value)}
//                     placeholder={t('Integration_apikey_textbox')}
//                     enableDark={true}
//                   />
//                 </div>

//                 <div className="flex flex-row items-center justify-end w-full gap-2 font-light">
//                   <SecondaryButton
//                     isLoading={isApiLoading}
//                     disabled={isApiLoading}
//                     handleClick={() => setShowRevokeModal(true)}
//                     text={t('Integration_revoke')}
//                   />
//                   <PrimaryButton
//                     isLoading={isApiLoading}
//                     disabled={isApiLoading}
//                     handleClick={() => setShowRegenerateModal(true)}
//                     text={t('Integration_regenerate')}
//                   />
//                 </div>
//               </div>
//               <p className="flex items-start justify-start w-full gap-2">
//                 <span>1.</span>
//                 {
//                   'Login to Woocommerce -> Admin panel -> Settings -> Advanced -> Webhooks -> Add webhook'
//                 }
//               </p>
//               <p className="flex items-start justify-start w-full gap-2">
//                 <span>2.</span>
//                 Create Order Init Webhook, with following congiguration
//                 <br />
//                 Delivery URL ={' '}
//                 {`${
//                   process.env.NEXT_PUBLIC_API_DOMAIN
//                 }/Webhook/v1.0/woocommerce/${id}?token=${apiKey ?? 'API_KEY'}`}
//                 <br />
//                 Name = Order_Init
//                 <br />
//                 Event_type = Order Created
//                 <br />
//                 Http_Method = POST
//               </p>
//               <p className="flex items-start justify-start w-full gap-2">
//                 <span>3.</span>
//                 Create Order Update Webhook, with following congiguration
//                 <br />
//                 Delivery URL ={' '}
//                 {`${
//                   process.env.NEXT_PUBLIC_API_DOMAIN
//                 }/Webhook/v1.0/woocommerce/${id}?token=${apiKey ?? 'API_KEY'}`}
//                 <br />
//                 Name = Order_Update
//                 <br />
//                 Event_type = Order Updated
//                 <br />
//                 Http_Method = POST
//               </p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   )
// }
