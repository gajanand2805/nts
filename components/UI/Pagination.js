import React from 'react'
// import { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useGlobalAuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
import PrimaryButton from './Button/PrimaryButton'
import SecondaryButton from './Button/SecondaryButton'

// const totalPages = 100
function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const { t } = useTranslation()
  // const [currentPage, setCurrentPage] = useState(1);
  const { selectedLang } = useGlobalAuthContext()
  return (
    <div
      className={`flex flex-row rounded-lg bg-white px-3 tabletM:px-5 py-3 dark:bg-bgBlack items-center justify-between w-full gap-3 ${
        selectedLang == 'ar' && 'flex-row-reverse'
      }`}>
      <div className="scale-90">
        <SecondaryButton
          disabled={false}
          isLoading={false}
          handleClick={() => {
            if (currentPage != 1) {
              setCurrentPage(currentPage - 1)
            }
          }}
          text={t && t('pagination_previous')}
          size="small"
          width="24"
        />
      </div>
      <p className="text-sm font-semibold">
        {t('pagination_page')} {currentPage} {t('pagination_page_of')}{' '}
        {totalPages}
      </p>

      <div className="scale-90">
        <PrimaryButton
          disabled={false}
          isLoading={false}
          handleClick={() => {
            if (currentPage != totalPages) {
              setCurrentPage(currentPage + 1)
            }
          }}
          text={t && t('pagination_next')}
          size="small"
          width="24"
        />
      </div>
    </div>
  )
}

export default Pagination
