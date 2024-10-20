import { useState } from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import Loader from '../../components/Loader'
import MainScreenWrapper from '../../components/MainScreenWrapper'
import { MerchantRow } from '../../components/Support/MerchantRow'
import { useGlobalSupportContext } from '../../contexts/SupportContext'
import { TicketRaiseModal } from '../../components/Support/TicketRaiseModal'
import { BiFilter } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'
import { SupportFilterModal } from '../../components/Support/SupportFilterModal'
import Pagination from '../../components/UI/Pagination'

export default function Support() {
  //? translations
  const { t } = useTranslation()

  //? contexts
  const { isLoading, isAccessToken } = useGlobalAuthContext()
  const {
    initTickets,
    openTickets,
    closedTickets,
    isSupportLoading,
    initTotalPages,
    setCurrentPage,
    openTotalPages,
    closedTotalPages,
    currentPage,
  } = useGlobalSupportContext()

  //? states
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [filter, setFilter] = useState({
    status: '',
  })
  const [selectedStatus, setSelectedStatus] = useState('')

  return (
    <MainScreenWrapper
      screenHeader={t('support_navbar_heading')}
      primaryText={t('support_raise_ticket')}
      primaryHandleClick={() => setIsOpenModal(true)}>
      {isLoading || isSupportLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col w-full gap-5">
          <button
            onClick={() => setIsFilterActive(!isFilterActive)}
            className="border-2 py-2 w-min rounded-[10px] shadow-sm border-BlackTer dark:border-White/20 dark:bg-bgBlackSec bg-white flex items-center gap-1 px-5 text-Blue font-bold">
            <BiFilter /> {t('support_filter')}
          </button>
          {isOpenModal && (
            <TicketRaiseModal
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          )}
          <div className="relative w-full h-full overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full min-w-[1000px] h-full tabletM:min-w-[600px]  text-sm text-left border-spacing-2">
              <thead className="text-gray-700  bg-gray-50 dark:bg-[#1B2431] dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="p-4 text-center">
                    {t('support_topic')}
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-center">
                    {t('support_status')}
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-center">
                    {t('support_unread')}
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-center">
                    {t('support_action')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {initTickets
                  .filter((item) =>
                    filter.status ? item.status === filter.status : true
                  )
                  .map((initTicket) => {
                    return (
                      <MerchantRow
                        date_time={initTicket.date_time}
                        status={initTicket.status}
                        merchant_counter={initTicket.Merchant_counter}
                        support_counter={initTicket.support_counter}
                        topic={initTicket.topic}
                        ticket_id={initTicket.Ticket_ID}
                        merchant_id={initTicket.Merchant_ID}
                        key={initTicket.Merchant_ID}
                      />
                    )
                  })}
                {openTickets
                  .filter((item) =>
                    filter.status ? item.status === filter.status : true
                  )
                  .map((openTicket) => {
                    return (
                      <MerchantRow
                        date_time={openTicket.date_time}
                        status={openTicket.status}
                        merchant_counter={openTicket.Merchant_counter}
                        support_counter={openTicket.support_counter}
                        topic={openTicket.topic}
                        ticket_id={openTicket.Ticket_ID}
                        merchant_id={openTicket.Merchant_ID}
                        key={openTicket.Merchant_ID}
                      />
                    )
                  })}
                {closedTickets
                  .filter((item) =>
                    filter.status ? item.status === filter.status : true
                  )
                  .map((closedTicket) => {
                    return (
                      <MerchantRow
                        date_time={closedTicket.date_time}
                        status={closedTicket.status}
                        merchant_counter={closedTicket.Merchant_counter}
                        support_counter={closedTicket.support_counter}
                        topic={closedTicket.topic}
                        ticket_id={closedTicket.Ticket_ID}
                        merchant_id={closedTicket.Merchant_ID}
                        key={closedTicket.Merchant_ID}
                      />
                    )
                  })}
                {/* initTotalPages,
        openTotalPages,
        closedTotalPages,
        currentPage, */}
              </tbody>
            </table>
          </div>
          {initTotalPages > 1 && (
            <div className="w-full">
              <Pagination
                currentPage={currentPage}
                totalPages={initTotalPages}
                setCurrentPage={setCurrentPage}></Pagination>
            </div>
          )}
          {isFilterActive && (
            <SupportFilterModal
              filter={filter}
              setFilter={setFilter}
              isOpenModal={isFilterActive}
              setIsOpenModal={setIsFilterActive}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          )}
        </div>
      )}
    </MainScreenWrapper>
  )
}
