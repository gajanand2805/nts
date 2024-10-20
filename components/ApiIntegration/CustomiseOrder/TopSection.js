import React from 'react'
import { BiCheck } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'
const TopSection = ({ currentTab, setCurrentTab }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-start tabletM:flex-row tabletM:items-center justify-center mt-2 w-full gap-2 laptop:gap-10">
      {/* Billing Shipping */}
      <button
        onClick={() => setCurrentTab(0)}
        className="flex items-center gap-4">
        {/* check */}
        <div className="p-1 rounded-lg border-[1px] border-[#9498AE]">
          {currentTab == 0 ? (
            <p className="bg-Blue p-2 text-white rounded-lg">
              <BiCheck />
            </p>
          ) : (
            <div className="bg-[#9498AE]/50 p-4 rounded-lg" />
          )}
        </div>
        <p className="text-[#9498AE] font-semibold whitespace-nowrap">
          {t('Customise_order_section1')}
        </p>
      </button>
      {/*  */}
      <div className="hidden tabletM:flex items-center gap-2">
        <div className="w-1 h-1 bg-[#9498AE] rounded-full" />
        <div className="w-3 h-3 bg-[#9498AE] rounded-full" />
        <div className="w-2 h-2 bg-[#9498AE] rounded-full" />
        <div className="w-3 h-3 bg-[#9498AE] rounded-full" />
        <div className="w-1 h-1 bg-[#9498AE] rounded-full" />
      </div>
      {/*  */}
      {/* Add Items */}
      <button
        onClick={() => setCurrentTab(1)}
        className="flex items-center gap-4">
        {/* check */}
        <div className="p-1 rounded-lg border-[1px] border-[#9498AE]">
          {currentTab == 1 ? (
            <p className="bg-Blue p-2 text-white rounded-lg">
              <BiCheck />
            </p>
          ) : (
            <div className="bg-[#9498AE]/50 p-4 rounded-lg" />
          )}
        </div>
        <p className="text-[#9498AE] font-semibold whitespace-nowrap">
          {t('Customise_order_section2')}
        </p>
      </button>
      {/*  */}
      <div className="hidden tabletM:flex items-center gap-2">
        <div className="w-1 h-1 bg-[#9498AE] rounded-full" />
        <div className="w-3 h-3 bg-[#9498AE] rounded-full" />
        <div className="w-2 h-2 bg-[#9498AE] rounded-full" />
        <div className="w-3 h-3 bg-[#9498AE] rounded-full" />
        <div className="w-1 h-1 bg-[#9498AE] rounded-full" />
      </div>
      {/*  */}
      {/* Finance */}
      <button
        onClick={() => setCurrentTab(2)}
        className="flex items-center gap-4 ">
        {/* check */}
        <div className="p-1 rounded-lg border-[1px] border-[#9498AE]">
          {currentTab == 2 ? (
            <p className="bg-Blue text-white p-2 rounded-lg">
              <BiCheck />
            </p>
          ) : (
            <div className="bg-[#9498AE]/50 p-4 rounded-lg" />
          )}
        </div>
        <p className="text-[#9498AE] font-semibold whitespace-nowrap">
          {t('Customise_order_section3')}
        </p>
      </button>
      {/*  */}
    </div>
  )
}

export default TopSection
