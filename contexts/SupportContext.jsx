import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { useGlobalAuthContext } from '../AuthContext'

const SupportContext = createContext()

const SupportProvider = ({ children }) => {
  //? router
  const router = useRouter()

  //? contexts
  const { isAccessToken, getCookie, wrapper, isLoading, setIsLoading } =
    useGlobalAuthContext()

  //? states
  const [initTickets, setInitTickets] = useState([])
  const [initTotalPages, setInitTotalPages] = useState(0)
  const [openTickets, setOpenTickets] = useState([])
  const [openTotalPages, setOpenTotalPages] = useState(0)
  const [closedTickets, setClosedTickets] = useState([])
  const [closedTotalPages, setClosedTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [isSupportLoading, setIsSupportLoading] = useState(false)
  const [isInspectTicketLoading, setIsInspectTicketLoading] = useState(false)
  const [addTicketLoading, setAddTicketLoading] = useState(false)
  //? functions
  const getTickets = (page = 1) => {
    setIsSupportLoading(true)
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/support/tickets?page=${page}`,
        config
      )
      .then((res) => {
        setInitTickets(res.data.init_tickets.tickets)
        setInitTotalPages(res.data.init_tickets.Total_Pages)
        setOpenTickets(res.data.open_tickets.tickets)
        setOpenTotalPages(res.data.open_tickets.Total_Pages)
        setClosedTickets(res.data.closed_tickets.tickets)
        setClosedTotalPages(res.data.closed_tickets.Total_Pages)
        setCurrentPage(res.data.Current_Page)
        setIsSupportLoading(false)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSupportLoading(false)
        setIsLoading(false)
      })
  }

  const psudoTickets = (page = 1) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/support/tickets?page=${page}`,
        config
      )
      .then((res) => {
        setInitTickets(res.data.init_tickets.tickets)
        setInitTotalPages(res.data.init_tickets.Total_Pages)
        setOpenTickets(res.data.open_tickets.tickets)
        setOpenTotalPages(res.data.open_tickets.Total_Pages)
        setClosedTickets(res.data.closed_tickets.tickets)
        setClosedTotalPages(res.data.closed_tickets.Total_Pages)
        setCurrentPage(res.data.Current_Page)
      })
      .catch((err) => console.log(err))
      .finally(() => { })
  }

  useEffect(() => {
    if (currentPage) {
      getTickets(currentPage)
    }
  }, [currentPage])

  const raiseTicket = async ({ topic, description }) => {
    setAddTicketLoading(true)
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/support/raise`,
        {
          topic,
          description,
        },
        config
      )
      psudoTickets()
    } catch (err) {
      console.log(err)
    } finally {
      setAddTicketLoading(false)
    }
  }

  const inspectTicket = async ({ ticket_id }) => {
    setIsInspectTicketLoading(true)
    const config = {
      headers: {
        accept: 'application/json',
        'ticket-id': ticket_id,
        Authorization: getCookie('access-token'),
      },
    }
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/support/inspect/ticket`,
        config
      )

      console.log('ticketid data:', data)
      return data
    } catch (err) {
      console.log(err)
    } finally {
      setIsInspectTicketLoading(false)
      setIsLoading(false)
    }
  }

  const changeStatus = async ({ ticket_id }) => {
    setIsSupportLoading(true)
    const config = {
      headers: {
        accept: 'application/json',
        'ticket-id': ticket_id,
        Authorization: getCookie('access-token'),
      },
    }
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/support/tickets/status`,
        config
      )
    } catch (err) {
      console.log(err)
    } finally {
      setIsSupportLoading(false)
      setIsLoading(false)
    }
  }

  console.log('support', isLoading)
  //? effects
  useEffect(() => {
    if (router.pathname === '/support' && isAccessToken) {
      getTickets()
    }
  }, [router.pathname, isAccessToken])

  return (
    <SupportContext.Provider
      value={{
        getTickets,
        initTickets,
        openTickets,
        closedTickets,
        isSupportLoading,
        setInitTickets,
        setOpenTickets,
        setClosedTickets,
        setInitTotalPages,
        setOpenTotalPages,
        setClosedTotalPages,
        raiseTicket,
        inspectTicket,
        changeStatus,
        initTotalPages,
        openTotalPages,
        closedTotalPages,
        currentPage,
        setCurrentPage,
        addTicketLoading,
      }}>
      {children}
    </SupportContext.Provider>
  )
}

export const useGlobalSupportContext = () => {
  return useContext(SupportContext)
}

export { SupportContext, SupportProvider }
