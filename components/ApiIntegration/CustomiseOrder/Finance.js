import React from 'react'
import Input from '../../UI/Input'
import { useTranslation } from 'react-i18next'
import { useGlobalApiIntegrationContext } from '../../../contexts/ApiIntegrationContext'
const Finance = () => {
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
        <p>{t('Customise_order_finance')}</p>

        <div className="flex flex-col tabletM:flex-row w-full gap-4 tabletM:gap-10">
          <Input
            label={t('Customise_order_finance_currency')}
            type="text"
            name="Currency"
            id="Currency"
            value={Order.Currency}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_finance_currency_placeholder')}
          />
          <Input
            label={t('Customise_order_finance_total')}
            type="number"
            name="Total"
            id="Total"
            value={Order.Total}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_finance_total_placeholder')}
          />
        </div>
        <div className="flex flex-col tabletM:flex-row w-full gap-4 tabletM:gap-10">
          <Input
            label={t('Customise_order_finance_subtotal')}
            type="number"
            name="Subtotal"
            id="Sutotal"
            value={Order.Subtotal}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_finance_subtotal_placeholder')}
          />
          <Input
            label={t('Customise_order_finance_discount')}
            type="number"
            name="Discount"
            id="Discount"
            value={Order.Discount}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_finance_discount_placeholder')}
          />
        </div>
        <div className="flex flex-col tabletM:flex-row w-full gap-4 tabletM:gap-10">
          <Input
            label={t('Customise_order_finance_tax')}
            type="number"
            name="Tax"
            id="Tax"
            value={Order.Tax}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_finance_tax_placeholder')}
          />
          <Input
            label={t('Customise_order_finance_shipping')}
            type="number"
            name="Shipping"
            id="Shipping"
            value={Order.Shipping}
            onChange={customiseOrderHandler}
            placeholder={t('Customise_order_finance_shipping_placeholder')}
          />
        </div>
        <div className="flex flex-col tabletM:flex-row w-full gap-4 tabletM:gap-10">
          <div className="flex flex-col items-start w-full gap-1 ">
            <label
              htmlFor="PaymentMethod"
              className="text-base font-semibold capitalize text-BlackSec">
              {t('Customise_order_finance_paymethod')}
            </label>
            <select
              name="PaymentMethod"
              id="PaymentMethod"
              value={Order.Payment_Method}
              type="text"
              onChange={(e) =>
                setOrder((obj) => {
                  return {
                    ...obj,
                    Payment_Method: e.target.value,
                  }
                })
              }
              className={`px-4 bg-white w-full 
                                dark:bg-dBlack  dark:text-White dark:border-White/20 dark:placeholder:text-White'
                             border-2 py-2 rounded-[10px] shadow-sm border-BlackTer text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px]  `}>
              <option
                className="dark:bg-Black"
                value="">
                {t('Customise_order_finance_paymethod_none')}
              </option>
              <option
                className="dark:bg-Black"
                value="Prepaid">
                {t('Customise_order_finance_paymethod_prepaid')}
              </option>
              <option
                className="dark:bg-Black"
                value="Postpaid">
                {t('Customise_order_finance_paymethod_postpaid')}
              </option>
            </select>
          </div>
          <div className="w-full hidden tabletM:flex" />
        </div>
      </div>
    </div>
  )
}

export default Finance
