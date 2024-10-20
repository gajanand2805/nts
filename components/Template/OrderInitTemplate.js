import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../../AuthContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import d from './assets/1.svg'

const OrderInitTemplate = ({ templateData }) => {
  const {
    selectedLang,
    isLoading,
    setIsLoading,
    getCookie,
    buisnessDetails,
    setProgressActive,
    setHeaderWarning,
    isAccessToken,
    wrapper,
  } = useGlobalAuthContext()
  const router = useRouter()
  const [header, setHeader] = useState({ en: '', ar: '' })
  const [footer, setFooter] = useState({ en: '', ar: '' })
  const [editMode, setEditMode] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const { t } = useTranslation()
  const setInitialHeaderAndFooter = () => {
    setHeader({
      ar: templateData?.ar?.order_init.data[
        templateData?.ar?.order_init.header
      ],
      en: templateData?.en?.order_init.data[
        templateData?.en?.order_init.header
      ],
    })

    setFooter({
      ar: templateData?.ar?.order_init.data[
        templateData?.ar?.order_init.footer
      ],
      en: templateData?.en?.order_init.data[
        templateData?.en?.order_init.footer
      ],
    })
  }

  useEffect(() => {
    setInitialHeaderAndFooter()
  }, [templateData])

  const updateTemplateHandler = async () => {
    const backupTemplateData = templateData
    if (buisnessDetails.Level < 2) {
      router.push('#header')
      setProgressActive(true)
      setHeaderWarning(true)
    } else {
      // setUpdateTemplateError('')
      // setUpdateTemplateSuccess('')
      const config = {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: getCookie('access-token'),
        },
      }
      const data = {
        Order_Push: {
          Header: {
            en: templateData?.en?.order_push.data[
              templateData?.en?.order_push.header
            ],
            ar: templateData?.ar?.order_push.data[
              templateData?.ar?.order_push.header
            ],
          },
          Footer: {
            en: templateData?.en?.order_push.data[
              templateData?.en?.order_push.footer
            ],
            ar: templateData?.ar?.order_push.data[
              templateData?.ar?.order_push.footer
            ],
          },
        },
        Order_Init: {
          Header: { en: header.en, ar: header.ar },
          Footer: { en: footer.en, ar: footer.ar },
        },
        Order_Commit: {
          Header: {
            en: templateData?.en?.order_commit.data[
              templateData?.en?.order_commit.header
            ],
            ar: templateData?.ar?.order_commit.data[
              templateData?.ar?.order_commit.header
            ],
          },
          Footer: {
            en: templateData?.en?.order_commit.data[
              templateData?.en?.order_commit.footer
            ],
            ar: templateData?.ar?.order_commit.data[
              templateData?.ar?.order_commit.footer
            ],
          },
        },
      }

      console.log(data)
      setIsApiLoading(true)

      try {
        const res = await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Template/Update`,
            data,
            config
          )
          .catch((err) => wrapper(err.response))
        console.log(res)

        // setUpdateTemplateSuccess(t && t('TempUpdated'))
      } catch (err) {
        console.log(err)
        // setUpdateTemplateError(err.response.data)
      } finally {
        setIsApiLoading(false)
        setEditMode(false)
      }
    }
  }

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center justify-start gap-5">
      <p className="text-lg font-bold text-BlackSec">
        {' '}
        {t('Template_orderinit')}{' '}
      </p>
      <div className="flex relative flex-col items-center justify-between w-full bg-white dark:bg-bgBlack rounded-[10px] p-4  h-full min-h-[700px]">
        <div className="flex flex-col items-start justify-start w-full gap-3">
          <Image
            src={d}
            width={400}
            height={220}
          />
          {selectedLang == 'en'
            ? templateData?.en?.order_init.data.map((item, i) => {
              return i == templateData?.en?.order_init.header ? (
                editMode === true ? (
                  <textarea
                    key={item}
                    name="orderInitHeader"
                    id="orderInitHeader"
                    className="w-full h-full p-1 border-[1px] rounded-lg bg-bgWhiteSec dark:bg-dBlack border-black/20"
                    value={header.en}
                    onChange={(e) =>
                      e.target.value.length > 0 &&
                      setHeader({
                        ...header,
                        en: e.target.value,
                      })
                    }></textarea>
                ) : (
                  <p
                    key={item}
                    className={`${(i == 0 || templateData.en.order_init.footer == i) &&
                      'font-bold'
                      }`}>
                    {header.en}
                  </p>
                )
              ) : i == templateData?.en?.order_init.footer ? (
                editMode === true ? (
                  <textarea
                    name="orderInitFooter"
                    id="orderInitFooter"
                    className="w-full h-full p-1 border-[1px] rounded-lg bg-bgWhiteSec dark:bg-dBlack border-black/20"
                    value={footer.en}
                    onChange={(e) =>
                      e.target.value.length > 0 &&
                      setFooter({
                        ...footer,
                        en: e.target.value,
                      })
                    }></textarea>
                ) : (
                  <p
                    key={item}
                    className={`${(i == 0 || templateData.en.order_init.footer == i) &&
                      'font-bold'
                      }`}>
                    {footer.en}
                  </p>
                )
              ) : (
                <p
                  key={item}
                  className={`${(i == 0 || templateData.en.order_init.footer == i) &&
                    'font-bold'
                    }`}>
                  {item}
                </p>
              )
            })
            : templateData?.ar?.order_init.data.map((item, i) => {
              return i == templateData?.ar?.order_init.header ? (
                editMode === true ? (
                  <textarea
                    key={item}
                    name="orderInitHeader"
                    id="orderInitHeader"
                    className="w-full h-full p-1 border-[1px] rounded-lg bg-bgWhiteSec dark:bg-dBlack border-black/20"
                    value={header.ar}
                    onChange={(e) =>
                      e.target.value.length > 0 &&
                      setHeader({
                        ...header,
                        ar: e.target.value,
                      })
                    }></textarea>
                ) : (
                  <p
                    key={item}
                    className={`${(i == 0 || templateData.ar.order_init.footer == i) &&
                      'font-bold'
                      }`}>
                    {header.ar}
                  </p>
                )
              ) : i == templateData?.ar?.order_init.footer ? (
                editMode === true ? (
                  <textarea
                    name="orderInitFooter"
                    id="orderInitFooter"
                    className="w-full h-full p-1 border-[1px] rounded-lg bg-bgWhiteSec dark:bg-dBlack border-black/20"
                    value={footer.ar}
                    onChange={(e) =>
                      e.target.value.length > 0 &&
                      setFooter({
                        ...footer,
                        ar: e.target.value,
                      })
                    }></textarea>
                ) : (
                  <p
                    key={item}
                    className={`${(i == 0 || templateData.ar.order_init.footer == i) &&
                      'font-bold'
                      }`}>
                    {footer.ar}
                  </p>
                )
              ) : (
                <p
                  key={item}
                  className={`${(i == 0 || templateData.ar.order_init.footer == i) &&
                    'font-bold'
                    }`}>
                  {item}
                </p>
              )
            })}
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-2">
          {templateData?.en?.order_init.button.map((item, i) => {
            return (
              <button
                key={i}
                className={`shadow-xs text-sm font-bold ${i == 0 && 'text-Blue'
                  } ${i == 0 && 'text-green-500'} ${i == 0 && 'text-red-500'
                  }  w-full py-1.5 rounded-[10px] border-[1px]`}>
                {item}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-3 px-8">
        {editMode == true ? (
          <>
            <PrimaryButton
              isLoading={isApiLoading}
              disabled={isApiLoading}
              handleClick={updateTemplateHandler}
              text={t('Template_update')}
            />
            <SecondaryButton
              handleClick={() => {
                setInitialHeaderAndFooter()
                setEditMode(false)
              }}
              text={t('Template_cancel')}
            />
          </>
        ) : (
          <PrimaryButton
            handleClick={() => {
              setEditMode(!editMode)
            }}
            text={t('Template_edit')}
          />
        )}
      </div>
    </div>
  )
}

export default OrderInitTemplate
