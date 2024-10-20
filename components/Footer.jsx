import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BsSend } from 'react-icons/bs'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'
import logoLight from '../Logo/logo_landscape_light.svg'
export const Footer = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [text, setText] = useState()
  async function handleSend() {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(email)) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v1.0/subscribe/newsletter`,
          {},
          {
            headers: {
              email,
            },
          }
        )
        setText(t('Subscription_transaction_success'))
      } else {
        alert(t('Agent_error_add_valid'))
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="z-[40] flex items-center justify-center w-full bg-white font-josefinSans border-Blue border-t-4 ">
      <div className="flex w-full max-w-[1800px] relative justify-between bg-white px-5 tablet:px-12 laptop:px-12 laptopL:px-20 pt-12  pb-5 laptop:pt-20">
        <div className="flex flex-col w-full space-y-5 laptop:space-y-12">
          <div className=" space-y-12 tablet:space-y-0 grid grid-cols-4 gap-6 justify-center laptop:justify-between place-items-center">
            <div className="flex  flex-col col-span-4 laptop:col-span-1  items-center laptop:items-start w-full space-y-2   tabelt:rtl:items-end">
              <div className="w-40 cursor-pointer hover:animate-pulse">
                <Image
                  src={logoLight}
                  objectFit="contain"
                  alt="logo"
                />
              </div>
              <p className="max-w-sm text-sm font-semibold text-center tablet:max-w-none tablet:text-left tablet:rtl:text-right">
                <Trans i18nKey="landing_heading">
                  Conquer <strong>Customer Service</strong> & Boost Sales with
                  Shoponcell, Whatsapp CRM for <strong>E-commerce</strong>
                </Trans>
              </p>
            </div>
            <div className="flex flex-col col-span-2 laptop:col-span-1 space-y-3">
              <p className="font-bold">{t('landing_footer_invobot')}</p>
              <Link href="/pricing">{t('navbar_pricing')}</Link>
              <Link href="/docs">{t('navbar_docs')}</Link>
              <Link href="/privacy">{t('landing_footer_privacypolicy')}</Link>
            </div>

            <div className="flex flex-col col-span-2 laptop:col-span-1 space-y-3">
              <p className="font-bold">{t('landing_footer_links')}</p>
              <Link href="/#services">{t('landing_footer_service')}</Link>
              <Link href="/#features">{t('landing_footer_features')}</Link>
              <Link href="/demo">{t('landing_footer_demo')}</Link>
            </div>
            <div className="flex flex-col col-span-4 laptop:col-span-1 items-center laptop:items-start  gap-4 w-full">
              <h3 className="font-bold">{t('subscribe_newsletter')} </h3>
              <div className="flex bg-Blue rounded-xl w-full max-w-[600px] px-4 text-xl text-white items-center">
                {text ? (
                  <span className="w-full py-4 text-sm min-w-[188px]">
                    {text}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="bg-transparent py-4 outline-none placeholder:text-white/50  w-full  text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('Auth_email_input_box')}
                  />
                )}
                <button onClick={handleSend}>
                  <BsSend />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-4 border-t pt-4 items-center justify-center space-y-3 tablet:flex-row tablet:justify-between">
            <div className="flex flex-wrap justify-center space-x-1 text-sm font-semibold">
              <span>{t('landing_footer_copyright')}</span>
              <Link href={'/'}>
                <span className="text-Blue hover:underline">Shoponcell</span>
              </Link>
              <span>{t('landing_footer_allrightsreserved')}</span>
            </div>
            <div className="flex  gap-5 text-[#C1C1C1] text-2xl  ">
              {/* <p className="font-bold">{t('landing_footer_connect')}</p> */}

              <Link href="javascript:void(0)">
                <a
                  // target="_blank"
                  className="flex items-center gap-2">
                  <FaFacebookF className="w-5 h-5" />
                  {/* <p>{t('landing_footer_facebook')} </p> */}
                </a>
              </Link>

              <Link href="javascript:void(0)">
                <a
                  // target="_blank"
                  className="flex items-center gap-2">
                  <FaTwitter className="w-5 h-5" />{' '}
                  {/* {t('Profile_additional_info_socialmedia_twitter')} */}
                </a>
              </Link>
              <Link href="javascript:void(0)">
                <a
                  // target="_blank"
                  className="flex items-center gap-2">
                  <MdMail className="w-5 h-5" />{' '}
                  {/* {t('landing_footer_mail')} */}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
