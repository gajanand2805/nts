import React from 'react'
import Input from '../../UI/Input'
import { useTranslation } from 'react-i18next'
import { useGlobalApiIntegrationContext } from '../../../contexts/ApiIntegrationContext'
const BillShippAddress = () => {
  const { t } = useTranslation()
  const { Order, setOrder } = useGlobalApiIntegrationContext()
  const customiseOrderHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    if (name === 'Billing_Address_Line1') {
      setOrder((obj) => {
        return {
          ...obj,
          Billing_Address: {
            ...obj.Billing_Address,
            Address_line1: e.target.value,
          },
        }
      })
    } else if (name === 'Billing_Address_Line2') {
      setOrder((obj) => {
        return {
          ...obj,
          Billing_Address: {
            ...obj.Billing_Address,
            Address_line2: e.target.value,
          },
        }
      })
    } else if (name === 'Billing_Address_Line3') {
      setOrder((obj) => {
        return {
          ...obj,
          Billing_Address: {
            ...obj.Billing_Address,
            Address_line3: e.target.value,
          },
        }
      })
    } else if (name === 'Shipping_Address_Line1') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping_Address: {
            ...obj.Shipping_Address,
            Address_line1: e.target.value,
          },
        }
      })
    } else if (name === 'Shipping_Address_Line2') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping_Address: {
            ...obj.Shipping_Address,
            Address_line2: e.target.value,
          },
        }
      })
    } else if (name === 'Shipping_Address_Line3') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping_Address: {
            ...obj.Shipping_Address,
            Address_line3: e.target.value,
          },
        }
      })
    } else if (name === 'Currency') {
      setOrder((obj) => {
        return {
          ...obj,
          Currency: e.target.value,
        }
      })
    } else if (name === 'Total') {
      setOrder((obj) => {
        return {
          ...obj,
          Total: e.target.value,
        }
      })
    } else if (name === 'Subtotal') {
      setOrder((obj) => {
        return {
          ...obj,
          Subtotal: e.target.value,
        }
      })
    } else if (name === 'Discount') {
      setOrder((obj) => {
        return {
          ...obj,
          Discount: e.target.value,
        }
      })
    } else if (name === 'Tax') {
      setOrder((obj) => {
        return {
          ...obj,
          Tax: e.target.value,
        }
      })
    } else if (name === 'Shipping') {
      setOrder((obj) => {
        return {
          ...obj,
          Shipping: e.target.value,
        }
      })
    }
  }
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col items-start justify-start w-full gap-4 p-8 rounded-standard bg-white dark:bg-bgBlack">
        <p>{t('Customise_order_billing')}</p>

        <div className="flex flex-col tabletM:flex-row w-full gap-4 tabletM:gap-10">
          <Input
            label={t('Customise_order_billing_line1')}
            type="text"
            name="Billing_Address_Line1"
            id="Billing_Address_Line1"
            value={Order.Billing_Address.Address_line1}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_billing_line1_placeholder')}
          />
          <Input
            label={t('Customise_order_billing_line2')}
            type="text"
            name="Billing_Address_Line2"
            id="Billing_Address_Line2"
            value={Order.Billing_Address.Address_line2}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_billing_line2_placeholder')}
          />
        </div>
        <div className="flex w-full gap-10">
          <Input
            label={t('Customise_order_billing_line3')}
            type="text"
            name="Billing_Address_Line3"
            id="Billing_Address_Line3"
            value={Order.Billing_Address.Address_line3}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_billing_line3_placeholder')}
          />
          <div className="w-full hidden tabletM:flex" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-4 p-8 rounded-standard bg-white dark:bg-bgBlack">
        <p>{t('Customise_order_shipping')}</p>

        <div className="flex flex-col tabletM:flex-row w-full gap-4 tabletM:gap-10">
          <Input
            label={t('Customise_order_shipping_line1')}
            type="text"
            name="Shipping_Address_Line1"
            id="Shipping_Address_Line1"
            value={Order.Shipping_Address.Address_line1}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_shipping_line1_placeholder')}
          />
          <Input
            label={t('Customise_order_shipping_line2')}
            type="text"
            name="Shipping_Address_Line2"
            id="Shipping_Address_Line2"
            value={Order.Shipping_Address.Address_line2}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_shipping_line2_placeholder')}
          />
        </div>
        <div className="flex w-full gap-10">
          <Input
            label={t('Customise_order_shipping_line3')}
            type="text"
            name="Shipping_Address_Line3"
            id="Shipping_Address_Line3"
            value={Order.Shipping_Address.Address_line3}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_shipping_line3_placeholder')}
          />
          <div className="w-full hidden tabletM:flex" />
        </div>
      </div>
    </div>
  )
}

export default BillShippAddress
