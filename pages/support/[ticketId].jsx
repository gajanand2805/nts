import MainScreenWrapper from '../../components/MainScreenWrapper'
import Loader from '../../components/Loader'
import { useGlobalAuthContext } from '../../AuthContext'
import { ChatUI } from '../../components/SupportChatbox/ChatUI'
import { useGlobalSupportContext } from '../../contexts/SupportContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RefreshCounter from '../../components/RefreshCounter'
import ToggleButton from '../../components/ToggleButton'
import { useTranslation } from 'react-i18next'

export default function Ticket() {
  //? contexts
  const { isLoading, selectedLang, isAccessToken } = useGlobalAuthContext()
  const { inspectTicket, changeStatus, isSupportLoading } =
    useGlobalSupportContext()
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  //? router
  const router = useRouter()
  const { query } = router

  useEffect(() => {
    if (router.isReady) {
      ;(async () => {
        setData(await inspectTicket({ ticket_id: query.ticketId }))
      })()
    }
  }, [query, router.isReady])

  return (
    <MainScreenWrapper
      backLink="/support"
      backText={t('support_navbar_heading')}
      screenHeader={t('ticket_heading')}
      headerItem={
        <div className="flex items-center gap-7">
          <div className="h-full mb-5">
            <RefreshCounter
              duration={10}
              fetchData={async () =>
                setData(await inspectTicket({ ticket_id: query.ticketId }))
              }
            />
          </div>
          {data && data.status !== 'init' && (
            <div className="flex flex-col items-center gap-1 font-semibold">
              <ToggleButton
                isLoading={isSupportLoading}
                selectedLang={selectedLang}
                small={false}
                toggleStatus={data.status === 'open' ? true : false}
                toggleHandler={async () => {
                  await changeStatus({ ticket_id: query.ticketId })
                  setData(await inspectTicket({ ticket_id: query.ticketId }))
                }}
              />

              <span
                className={`text-sm font-bold ${
                  data.status === 'open' ? 'text-Green/70' : 'text-BlackSec'
                }`}>
                {data.status === 'open' ? t('ticket_open') : t('ticket_close')}{' '}
              </span>
            </div>
          )}
        </div>
      }>
      {isLoading || isSupportLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div className="flex flex-col h-[70vh] gap-5 w-full">
          {data && (
            <ChatUI
              data={data}
              setData={setData}
              fetchTicket={async () =>
                setData(await inspectTicket({ ticket_id: query.ticketId }))
              }
              conversations={data.conversation}
              state={data.status}
            />
          )}
        </div>
      )}
    </MainScreenWrapper>
  )
}
