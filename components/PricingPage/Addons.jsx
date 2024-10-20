import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeading from '../../components/LandingPage/common/SectionHeading'

const Addons = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-start gap-12 pt-20 tablet:py-20 tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 px-5 w-full max-w-[1800px]">
      <SectionHeading
        heading={t('pricing_addons_heading')}
        subHeading={t('pricing_addons_subheading')}
      />
      <div className="flex justify-center w-full gap-6">
        <table className="w-full max-w-lg table-auto font-josefinSans">
          <thead className="border-b-[1px] border-x-customGray mb-2">
            <tr>
              <th className="pb-4 font-bold text-2xl text-[#575757] text-left ">
                {t('pricing_addons_service_offer')}
              </th>
              <th className="pb-4 font-bold text-2xl text-[#575757] text-left ">
                {t('pricing_addons_price')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-6 pb-3 text-[#959595] text-base ">
                1 {t('Subscription_subscription_agents')}
              </td>
              <td className="pt-6 pb-3 text-xl font-bold ">25 SAR</td>
            </tr>
            <tr>
              <td className="py-3 text-[#959595] text-base ">
                {t('pricing_plans__website_link_invoice')}
              </td>
              <td className="py-3 text-xl font-bold ">25 SAR</td>
            </tr>
            <tr>
              <td className="py-3 text-[#959595] text-base ">
                {t('pricing_plans_socialmedia_link_invoice')}
              </td>
              <td className="py-3 text-xl font-bold ">25 SAR</td>
            </tr>
            <tr>
              <td className="py-3 text-[#959595] text-base ">
                {t('pricing_addons_short_cuts')}
              </td>
              <td className="py-3 text-xl font-bold ">31 SAR</td>
            </tr>
            <tr>
              <td className="py-3 text-[#959595] text-base ">
                {t('pricing_addons_survey')}
              </td>
              <td className="py-3 text-xl font-bold ">50 SAR</td>
            </tr>
            <tr>
              <td className="py-3 text-[#959595] text-base ">
                1000 {t('Subscription_subscription_sessions')}
              </td>
              <td className="py-3 text-xl font-bold ">99 SAR</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Addons
