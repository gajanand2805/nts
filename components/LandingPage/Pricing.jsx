import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Link from 'next/link'
import { ImCross } from 'react-icons/im'
import SectionHeading from './common/SectionHeading'
export const Pricing = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const Plans = [
    {
      name: 'Starter',
      cost: [149, 1490],
    },
    {
      name: 'Growth',
      cost: [349, 3490],
    },
    {
      name: 'Enterprise',
      cost: null,
    },
  ]
  const Features = [
    {
      title: t('pricing_plans_data_export'),
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_ai_analytics'),
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_green_tick'),
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_validate_as'),
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_sessions'),
      Starter: 1000,
      Growth: 1000,
    },
    {
      title: t('pricing_plans_agent'),
      Starter: 2,
      Growth: 6,
    },
    {
      title: t('pricing_plans__website_link_invoice'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_socialmedia_link_invoice'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_shortcuts'),
      // Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_agent_feedback'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_survey_form'),
      // Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_cart_remainder'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_marketing_campaigns'),
      // Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_special_agent'),
      // Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_order_updates'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_new_order_noti'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
    {
      title: t('pricing_plans_whatsapp_widgets'),
      Starter: 'Yes',
      Growth: 'Yes',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-start gap-8 pt-20 tablet:py-20 tablet:gap-20 tablet:px-12 laptopL:px-20 px-3 w-full max-w-[1800px]">
      <SectionHeading
        supHeading={t('pricing_plans_sup_heading')}
        heading={t('pricing_plans_heading')}
        subHeading={t('pricing_plans_heading_text')}
      />

      <table className="min-w-full text-xs font-josefinSans">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead className="border-b">
          <tr className="text-left rtl:text-right tabletS:text-center">
            <th className="font-semibold text-[#575757] text-lg tabletM:text-3xl tabletS:p-3 p-2">
              Service Offers
            </th>
            {Plans.map((plan, index) => {
              return (
                <th
                  key={`plan${index}`}
                  className="font-semibold tabletS:text-center text-left rtl:text-right text-[#575757] text-lg tabletM:text-3xl tabletS:p-3 p-2">
                  {plan.name}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {Features.map((feat, featIndex) => {
            return (
              <tr
                key={`row${featIndex}`}
                className="tabletM:text-lg text-[#959595]">
                <td className="p-2 text-left rtl:text-right tabletS:text-center tabletS:p-3">
                  {feat.title}
                </td>
                {Plans.map((plan, planIndex) => {
                  return (
                    <td
                      key={`cell${featIndex}${planIndex}`}
                      className="p-2 text-base text-center tabletS:p-3 ">
                      {plan.name === 'Enterprise' ? (
                        featIndex === 0 ? (
                          <Link href="/demo">
                            <h4 className="text-base tabletM:text-2xl font-bold text-[#575757] cursor-pointer">
                              {t('landing_services_contact')}
                            </h4>
                          </Link>
                        ) : (
                          ''
                        )
                      ) : feat[plan.name] ? (
                        feat[plan.name]
                      ) : (
                        <ImCross className="mx-auto text-red-500" />
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className=" tabletS:text-xl tabletS:text-center text-left rtl:text-right tabletS:p-3 p-2 font-bold text-[#575757]">
              Price Per Month
            </td>
            <td className=" tabletS:text-2xl text-center tabletS:p-3 p-2 font-bold text-[#575757]">
              149 SAR
            </td>
            <td className=" tabletS:text-2xl text-center tabletS:p-3 p-2 font-bold text-[#575757]">
              349 SAR
            </td>
          </tr>{' '}
          <tr>
            <td className=" tabletS:text-xl tabletS:text-center text-left rtl:text-right tabletS:p-3 p-2 font-bold text-[#575757]">
              Price Per Year
            </td>
            <td className=" tabletS:text-2xl text-center tabletS:p-3 p-2 font-bold text-[#575757]">
              1490 SAR
            </td>
            <td className=" tabletS:text-2xl text-center tabletS:p-3 p-2 font-bold text-[#575757]">
              3490 SAR
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="p-2 tabletS:p-3">
              <Link href="/auth?tab=signup">
                <button
                  className={`w-full py-3 z-20 font-medium rounded-md  cursor-pointer mt-auto ${'bg-Blue text-white hover:bg-[#275de6]'}`}
                  type="button">
                  {t && t('landing_pre_launch_button')}
                </button>
              </Link>
            </td>
            <td className="p-2 tabletS:p-3">
              <Link href="/auth?tab=signup">
                <button
                  className={`w-full py-3 z-20 font-medium rounded-md  cursor-pointer mt-auto ${'bg-Blue text-white hover:bg-[#275de6]'}`}
                  type="button">
                  {t && t('landing_pre_launch_button')}
                </button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
