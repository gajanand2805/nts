import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalApiIntegrationContext } from '../../contexts/ApiIntegrationContext'
import Modal from '../Modal'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'
import TokenModal from './TokenModal'

const TopSectionApiIntegration = () => {
  const { t } = useTranslation()
  const { orderId, setOrderId, apiKey, setApiKey, Order, setOrder, id } =
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
        <div className="w-full bg-Green dark:bg-Green/60 gap-2 py-2 px-4 rounded-xl flex flex-row justify-between">
          <p className=" text-white font-bold text-lg">
            {t(topAleartMessage?.message)} <br />
          </p>
          <button
            onClick={() => setTopAleartMessage(null)}
            className="rounded-[5px] text-2xl bg-black/50  text-white right-2">
            <IoClose />
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-between w-full gap-3 tabletS:flex-row">
        <div className="w-full max-w-sm ">
          <Input
            label={t('Integration_orderid')}
            type="text"
            name="orderId"
            id="orderId"
            value={Order.Order_ID}
            onChange={(e) => {
              setOrder((obj) => {
                return {
                  ...obj,
                  Order_ID: e.target.value,
                }
              })
            }}
            placeholder={t('Integration_orderid')}
            // error = '',
            enableDark={true}
          />
        </div>
        <div className="w-full max-w-sm ">
          <Input
            label={t('Integration_apikey')}
            type="text"
            name="apiKey"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={t('Integration_apikey_textbox')}
            // error = '',
            enableDark={true}
          />
        </div>
      </div>

      <div className="flex flex-col tablet:flex-row w-full items-center justify-between gap-2">
        <div className="flex flex-col items-start w-full gap-1 ">
          <label className="text-base flex items-center gap-1 font-semibold capitalize text-BlackSec">
            <span>{t && t('MerchantID')}</span>
          </label>
          <div className="w-full max-w-sm ">
            <p className="px-4 bg-white w-full dark:bg-dBlack  dark:text-White  dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]">
              {id}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <SecondaryButton
            isLoading={isApiLoading}
            disabled={isApiLoading}
            handleClick={() => setShowRevokeModal(true)}
            text={t('Integration_revoke')}
            width="fit"
          />
          <PrimaryButton
            isLoading={isApiLoading}
            disabled={isApiLoading}
            handleClick={() => setShowRegenerateModal(true)}
            text={t('Integration_regenerate')}
            width="fit"
          />
        </div>
      </div>
    </div>
  )
}

export default TopSectionApiIntegration
