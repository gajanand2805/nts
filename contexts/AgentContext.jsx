import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalAuthContext } from '../AuthContext'
const AgentContext = React.createContext()

const AgentProvider = ({ children }) => {
  const { isAccessToken, getCookie, setIsLoading, wrapper } =
    useGlobalAuthContext()
  const { t } = useTranslation()
  const router = useRouter()
  const [agents, setAgents] = useState([])
  const [quickActive, setQuickActive] = useState(false)
  const [addQuickActive, setAddQuickActive] = useState(false)
  const [quickData, setQuickData] = useState(null)
  const [quickMessageKey, setQuickMessageKey] = useState('')
  const [quickMessageValue, setQuickMessageValue] = useState('')
  const [quickAddApiLoading, setQuickAddApiLoading] = useState(false)
  const [addApiLoading, setAddApiLoading] = useState(false)
  const [inspectPhoneNo, setInspectPhoneNo] = useState('')
  const [addActive, setAddActive] = useState(false)
  const [removeActive, setRemoveActive] = useState(false)
  const [inspectActive, setInspectActive] = useState(false)
  const [addName, setAddName] = useState('')
  const [addEmail, setAddEmail] = useState('')
  const [addPassword, setAddPassword] = useState('')
  const [removeEmail, setRemoveEmail] = useState('')
  const [removePassword, setRemovePassword] = useState('')
  const [addAgentSuccessMessage, setAddAgentSuccessMessage] = useState('')
  const [addAgentErrorMessage, setAddAgentErrorMessage] = useState('')
  const [removeAgentSuccessMessage, setRemoveAgentSuccessMessage] = useState('')
  const [renameAgentSuccessMessage, setRenameAgentSuccessMessage] = useState('')
  const [removeAgentErrorMessage, setRemoveAgentErrorMessage] = useState('')
  const [renameAgentErrorMessage, setRenameAgentErrorMessage] = useState('')
  const [isAgentChecked, setIsAgentChecked] = useState(false)
  const [countryCode, setCountryCode] = useState('966')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [starttime, setStarttime] = useState('00:00')
  const [endtime, setEndtime] = useState('00:00')
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [support, setSupport] = useState(true)
  const [supportLoader, setSupportLoader] = useState(false)
  const [flag, setFlag] = useState(true)
  const [flagEmail, setFlagEmail] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [messageTitle, setMessageTitle] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [show, setShow] = useState(false)
  const [isError, setIsError] = useState('')
  const [page, setpage] = useState(false)
  const [quickFeature, setQuickFeature] = useState(false)
  const [addAgentSupport, setAddAgentSupport] = useState(false)
  const [configureAgentsActive, setConfigureAgentsActive] = useState(false)
  const [agentConfigureIsLoading, setAgentConfigureIsLoading] = useState(false)
  let success = true
  const [changedAgentConfig, setChangedAgentConfig] = useState(1)
  const [allowed, setAllowed] = useState(0)

  const [alert, setAlert] = useState({ success: '', error: '' })
  const [filter, setFilter] = useState({
    status: {
      isActive: false,
      isNotActive: false,
    },
    service: {
      isEnabled: false,
      isDisabled: false,
    },
  })

  useEffect(() => {
    console.log(agents)
  }, [agents])

  async function loadData() {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }
    success = true
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent`,
        config
      )
      .catch((err) => wrapper(err.response))
      .catch((e) => {
        success = false
      })
    if (success) {
      await setStarttime(res.data?.Support_Time?.Start)
      await setEndtime(res.data?.Support_Time?.End)
      await setTimezone(res.data?.Support_Time?.Time_Zone)
      await setSupport(res.data?.Support)
      await setAgents(res.data?.Agent_Data)
      await setQuickData(res.data?.Quick)
      await setQuickFeature(res.data?.Quick_Feature)
      await setAddAgentSupport(res.data?.Add_Agent)
      await setAllowed(res.data?.Allowed)
      setIsLoading(false)
    }
  }

  async function psudoloadData() {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }
    success = true
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent`,
        config
      )
      .catch((err) => wrapper(err.response))
      .catch((e) => {
        success = false
      })
    if (success) {
      setStarttime(res.data?.Support_Time?.Start)
      setEndtime(res.data?.Support_Time?.End)
      setTimezone(res.data?.Support_Time?.Time_Zone)
      setSupport(res.data?.Support)
      setAgents(res.data?.Agent_Data)
      setQuickData(res.data?.Quick)
      setQuickFeature(res.data?.Quick_Feature)
      setAddAgentSupport(res.data?.Add_Agent)
      setAllowed(res.data?.Allowed)
    }
  }

  useEffect(() => {
    if (isAccessToken) {
      if (router.pathname == '/agents') {
        loadData()
        setpage(true)
      } else {
        setpage(false)
      }
    }
  }, [router.pathname, isAccessToken])

  useEffect(() => {
    setInspectPhoneNo(countryCode + phoneNumber.trim())
  }, [countryCode, phoneNumber])

  useEffect(() => {
    if (!isAgentChecked) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [isAgentChecked])

  async function fetchAgentData(fun) {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
      },
    }
    try {
      if (router.pathname === '/agents' && page) {
        success = true
        const res = await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent`,
            config
          )
          .catch((err) => wrapper(err.response))
          .catch((e) => {
            success = false
          })
        if (success) {
          setStarttime(res.data.Support_Time.Start)
          setEndtime(res.data.Support_Time.End)
          setTimezone(res.data.Support_Time.Time_Zone)
          setAgents(res.data.Agent_Data)
          setQuickData(res.data?.Quick)
        }
      }
    } catch (err) {
      console.log(err)
      //kjj
    } finally {
      //fun()
    }
  }

  const updateQuick = async (arr) => {
    setAlert(null)
    setQuickAddApiLoading(true)
    const data = arr
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/update_quick`,
        { Quick: data },
        config
      )
      setAlert({ success: 'Quick message added' })
    } catch (err) {
    } finally {
      setQuickMessageKey('')
      setQuickMessageValue('')
      setQuickAddApiLoading(false)
    }
  }

  const updatetime = async (x, y, z) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/support_time/update`,
        { Start: x, End: y, Time_Zone: z },
        config
      )
    } catch (err) {
    } finally {
      //pass
    }
  }

  const toggle_support = async () => {
    setSupportLoader(true)
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/Support/Toggle`,
        {},
        config
      )
      setSupport(res.data.Status)
      setSupportLoader(false)
    } catch (err) {
      setSupportLoader(false)
    } finally {
      //pass
    }
  }

  useEffect(() => {
    if (quickData === null) {
      fetchAgentData(() => {
        setIsAgentChecked(true)
      })
    }
  }, [quickData])

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const addAgentHandler = async () => {
    if (addPassword < 1) {
      setAddAgentErrorMessage(t && t('enterpassword'))
    } else if (addName.trim().length < 3) {
      setAddAgentErrorMessage(t && t('selectedLang'))
    } else if (!validateEmail(addEmail)) {
      console.log(addEmail)

      setAddAgentErrorMessage('Enter a valid email!')
    } else {
      setAddAgentErrorMessage('')
      setAddApiLoading(true)
      try {
        const config = {
          headers: {
            accept: 'application/json',
            Password: addPassword,
            Authorization: getCookie('access-token'),
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/add`,
          { Agent_Email: addEmail, Agent_Name: addName },
          config
        )
        console.log(res)
        if (res.data.Status == true) {
          setRemoveAgentErrorMessage('')
          setRemoveAgentSuccessMessage('')
          setRenameAgentSuccessMessage('')
          setAddAgentErrorMessage('')
          setAddAgentSuccessMessage(t && t('AgentInvite'))
          // setAddAgentSuccessMessage(Translation.AgentInvite[selectedLang]);
          setShow(true)
          setIsError(false)
          setMessageTitle('Success!')
          setMessageContent(t && t('AgentInvite'))
        } else {
          setAddAgentSuccessMessage('')
        }
      } catch (err) {
        //TODO: Show proper error message. Currently only displaying success message. Display error message when the request fails.
        console.log(err)
        setShow(true)
        setIsError(true)
        setMessageTitle(`Error code ${err.response.status}`)
        if (err.response.status == 401) setMessageContent('Incorrect password!')
        else if (err.response.status == 409)
          setMessageContent('E-mail already exists')
        else setMessageContent('Unknown Error')
      } finally {
        setAddApiLoading(false)
        setAddName('')
        setAddEmail('')
        setAddPassword('')
        setAddActive(false)
      }
    }
  }

  const name_dynamic = async (text) => {
    if (text.trim().length >= 3) {
      setFlag(true)
    } else {
      setFlag(false)
    }
    setAddName(text)
  }

  const email_dynamic = async (text) => {
    if (validateEmail(text)) {
      setFlagEmail(true)
    } else {
      setFlagEmail(false)
    }
    setAddEmail(text)
  }

  const serviceUpdate = async (data) => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/service/update`,
        data,
        config
      )

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AgentContext.Provider
      value={{
        email_dynamic,
        flagEmail,
        setFlagEmail,
        quickActive,
        setQuickActive,
        addQuickActive,
        setAddQuickActive,
        quickData,
        setQuickData,
        quickMessageKey,
        setQuickMessageKey,
        quickMessageValue,
        setQuickMessageValue,
        quickAddApiLoading,
        setQuickAddApiLoading,
        addApiLoading,
        setAddApiLoading,
        inspectPhoneNo,
        setInspectPhoneNo,
        addActive,
        setAddActive,
        removeActive,
        setRemoveActive,
        inspectActive,
        setInspectActive,
        addName,
        setAddName,
        addEmail,
        setAddEmail,
        addPassword,
        setAddPassword,
        removeEmail,
        setRemoveEmail,
        removePassword,
        setRemovePassword,
        addAgentSuccessMessage,
        setAddAgentSuccessMessage,
        addAgentErrorMessage,
        setAddAgentErrorMessage,
        removeAgentSuccessMessage,
        setRemoveAgentSuccessMessage,
        renameAgentSuccessMessage,
        setRenameAgentSuccessMessage,
        removeAgentErrorMessage,
        setRemoveAgentErrorMessage,
        renameAgentErrorMessage,
        setRenameAgentErrorMessage,
        isAgentChecked,
        setIsAgentChecked,
        countryCode,
        setCountryCode,
        phoneNumber,
        setPhoneNumber,
        starttime,
        setStarttime,
        endtime,
        setEndtime,
        timezone,
        setTimezone,
        support,
        setSupport,
        supportLoader,
        setSupportLoader,
        agents,
        setAgents,
        flag,
        setFlag,
        quickFeature,
        setQuickFeature,
        addAgentSupport,
        setAddAgentSupport,
        configureAgentsActive,
        setConfigureAgentsActive,
        agentConfigureIsLoading,
        setAgentConfigureIsLoading,
        changedAgentConfig,
        setChangedAgentConfig,
        addAgentHandler,
        fetchAgentData,
        updateQuick,
        updatetime,
        toggle_support,
        name_dynamic,
        showPass,
        setShowPass,
        show,
        setShow,
        messageContent,
        messageTitle,
        isError,
        validateEmail,
        serviceUpdate,
        allowed,
        setIsError,
        setMessageTitle,
        setMessageContent,
        psudoloadData,
        loadData,
        alert,
        setAlert,
        filter,
        setFilter,
      }}>
      {children}
    </AgentContext.Provider>
  )
}

export const useGlobalAgentContext = () => {
  return useContext(AgentContext)
}

export { AgentContext, AgentProvider }
