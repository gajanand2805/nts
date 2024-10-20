import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../Modal'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'

export const SupportFilterModal = ({
  filter,
  setFilter,
  isOpenModal,
  setIsOpenModal,
  selectedStatus,
  setSelectedStatus,
}) => {
  //? translation
  const { t } = useTranslation()

  //? states
  const [showDropdown, setShowDropdown] = useState(false)

  //? variables
  const statuses = ['init', 'open', 'closed']

  return (
    <Modal
      isVisible={isOpenModal}
      onClose={() => setIsOpenModal(false)}>
      <div className="flex flex-col gap-3 bg-white dark:bg-bgBlack w-[80%] max-w-[400px] p-7 rounded-xl">
        <div className="justify-between items-center flex">
          <p className="font-semibold text-xl">{t('support_filter')}</p>
          <button
            onClick={() => {
              setFilter({ status: '' })
              setSelectedStatus('')
            }}
            className="text-Blue text-sm">
            {t('support_reset')}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{t('support_status')}</p>
            <div className="relative flex flex-col items-start justify-center w-full">
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown)
                }}
                className="w-full capitalize bg-WhiteTer hover:bg-WhiteTer rounded-lg text-sm px-4 py-2.5 text-center inline-flex justify-between items-center dark:bg-dBlack dark:hover:bg-dBlack/90"
                type="button">
                {selectedStatus != '' ? selectedStatus : t('support_status')}
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {showDropdown && (
                <div className="z-10 absolute top-12 bg-white dark:bg-dBlack divide-y divide-gray-100 rounded-lg shadow-lg border dark:border-bgBlack w-full">
                  <ul className="py-2 text-sm text-gray-700 dark:text-[#353535]">
                    {statuses.map((stat) => {
                      return (
                        <li
                          onClick={() => {
                            setSelectedStatus(stat)
                            setShowDropdown(false)
                          }}
                          key={stat}>
                          <a
                            href="#"
                            className="block border-b dark:border-bgBlack px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-bgBlack dark:hover:text-white">
                            {stat}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <SecondaryButton
              handleClick={() => setIsOpenModal(false)}
              text={t('support_cancel')}
            />
            <PrimaryButton
              handleClick={() => {
                setFilter({
                  ...filter,
                  status: selectedStatus,
                })
                setIsOpenModal(false)
              }}
              text={t('support_apply')}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
