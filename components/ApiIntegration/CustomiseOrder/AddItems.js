import React from 'react'
import Input from '../../UI/Input'
import { useTranslation } from 'react-i18next'
import { useGlobalApiIntegrationContext } from '../../../contexts/ApiIntegrationContext'
import PrimaryButton from '../../UI/Button/PrimaryButton'
const AddItems = () => {
  const { t } = useTranslation()
  const { Order, setOrder } = useGlobalApiIntegrationContext()

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4 p-8 rounded-standard bg-white dark:bg-bgBlack	">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xl font-semibold">{t('Customise_order_items')}</p>
        <div>
          <PrimaryButton
            handleClick={() => {
              setOrder((obj) => {
                let it = [...obj.Items]
                it.push({
                  Description: 'Enter Description',
                  Quantity: '',
                  Shipping: '',
                  Tax: '',
                  Unit_Price: '',
                })
                return {
                  ...obj,
                  Items: it,
                }
              })
            }}
            text={t && t('Customise_order_add_item')}
          />
        </div>
      </div>

      {/*  */}
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full min-w-[1200px] tabletM:min-w-[600px] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-bgBlackSec dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_product')}
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_quantity')}
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_unit_price')}
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_discount')}
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_tax')}
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_total')}
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                {t('Customise_order_action')}
              </th>
            </tr>
          </thead>
          <tbody>
            {Order.Items.map((item, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-dBlack/60 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dBlack">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Input
                      // label={t && t('description')}
                      type="text"
                      name={`Description`}
                      id={`Description`}
                      value={Order.Items[i].Description}
                      // value={Order}
                      onChange={(e) =>
                        setOrder((obj) => {
                          let it = [...obj.Items]

                          it[i].Description = e.target.value
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }
                      placeholder="Product Name"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Input
                      // label={t && t('Quantity')}
                      type="number"
                      name={`Quantitity${i}`}
                      id={`Quantitity${i}`}
                      value={Order.Items[i].Quantity}
                      // value={Order}
                      onChange={(e) =>
                        setOrder((obj) => {
                          let it = [...obj.Items]

                          it[i].Quantity = e.target.value
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }
                      placeholder={t && t('Quantity')}
                    />
                    {/* <div className="flex items-center space-x-3">
                                            <button
                                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                <span className="sr-only">
                                                    Quantity button
                                                </span>
                                                <svg
                                                    className="w-4 h-4"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <div>
                                                <input
                                                    type="number"
                                                    id="first_product"
                                                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="1"
                                                    required
                                                />
                                            </div>
                                            <button
                                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                <span className="sr-only">
                                                    Quantity button
                                                </span>
                                                <svg
                                                    className="w-4 h-4"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div> */}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Input
                      // label={t && t('unitPrice')}
                      type="number"
                      name={`UnitPrice${i}`}
                      id={`UnitPrice${i}`}
                      value={Order.Items[i].Unit_Price}
                      // value={Order}
                      onChange={(e) =>
                        setOrder((obj) => {
                          let it = [...obj.Items]

                          it[i].Unit_Price = e.target.value
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }
                      placeholder={t && t('unitPrice')}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Input
                      // label={t && t('Discount')}
                      type="number"
                      name={`Discount${i}`}
                      id={`Discount${i}`}
                      value={Order.Items[i].Discount}
                      // value={Order}
                      onChange={(e) =>
                        setOrder((obj) => {
                          let it = [...obj.Items]

                          it[i].Discount = e.target.value
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }
                      placeholder={t && t('Discount')}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Input
                      // label={t && t('Tax')}
                      type="number"
                      name={`Tax${i}`}
                      id={`Tax${i}`}
                      value={Order.Items[i].Tax}
                      // value={Order}
                      onChange={(e) =>
                        setOrder((obj) => {
                          let it = [...obj.Items]

                          it[i].Tax = e.target.value
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }
                      placeholder={t && t('Tax')}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Input
                      // label={t && t('OrderTotal')}
                      type="number"
                      name={`TotaL${i}`}
                      id={`TotaL${i}`}
                      value={Order.Items[i].Total}
                      // value={Order}
                      onChange={(e) =>
                        setOrder((obj) => {
                          let it = [...obj.Items]

                          it[i].Total = e.target.value
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }
                      placeholder={t && t('OrderTotal')}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => {
                        setOrder((obj) => {
                          let it = [...obj.Items]
                          it.splice(i, 1)
                          return {
                            ...obj,
                            Items: it,
                          }
                        })
                      }}
                      className="font-medium text-red-600 cursor-pointer dark:text-red-500 hover:underline">
                      {t('Customise_order_remove')}
                    </a>
                  </td>
                </tr>
              )
            })}

            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Imac 27"
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <button
                                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">
                                            Quantity button
                                        </span>
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                    <div>
                                        <input
                                            type="number"
                                            id="second_product"
                                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="1"
                                            required
                                        />
                                    </div>
                                    <button
                                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">
                                            Quantity button
                                        </span>
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                $2499
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Remove
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                Iphone 12
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <button
                                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">
                                            Quantity button
                                        </span>
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                    <div>
                                        <input
                                            type="number"
                                            id="third_product"
                                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="1"
                                            required
                                        />
                                    </div>
                                    <button
                                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                    >
                                        <span className="sr-only">
                                            Quantity button
                                        </span>
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                $999
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Remove
                                </a>
                            </td>
                        </tr> */}
          </tbody>
        </table>
      </div>
      {/*  */}
    </div>
  )
}

export default AddItems
