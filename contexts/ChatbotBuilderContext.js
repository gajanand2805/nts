import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'

import axios from 'axios'
import { useGlobalAuthContext } from '../AuthContext'

const ChatbotBuilderContext = React.createContext()

const ChatbotBuilderProvider = ({ children }) => {
  //? router
  const router = useRouter()

  //? states

  const [nodes, setNodes] = useState([])
  const [backupResetData, setBackupResetData] = useState({
    nodes: [],
    edges: [],
  })
  const [edges, setEdges] = useState([])
  const [deployLoader, setDeployLoader] = useState(false)
  const [resetLoader, setResetLoader] = useState(false)
  const [emulatorLoading, setEmulatorLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const [isGreaterThenTen, setIsGreaterThenTen] = useState(false)
  const [connection, setConnection] = useState({
    source: false,
    target: false,
  })
  const [emulatedChats, setEmulatedChats] = useState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const reactFlowWrapper = useRef(null)

  //? context
  const { isAccessToken, getCookie, wrapper, setIsLoading, selectedLang } =
    useGlobalAuthContext()

  //? functions
  const getInitialData = async () => {
    try {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
        },
      }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Chatbot`,
        config
      )
      setNodes(res.data.nodes)
      setEdges(res.data.edges)
      setBackupResetData({ nodes: res.data.nodes, edges: res.data.edges })
      setIsLoading(false)
      setResetLoader(false)
    } catch (err) {
      setIsLoading(false)
      setResetLoader(false)
    }
  }

  const resetNodes = () => {
    // setResetLoader(true)

    setNodes(backupResetData.nodes)
    setEdges(backupResetData.edges)
  }

  const emulate = async (buttonText) => {
    setEmulatorLoading(true)
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: getCookie('access-token'),
        'Content-Type': 'application/json',
      },
    }
    const data = {
      nodes: nodes,
      edges: edges,
    }
    const res = await axios.post(
      buttonText
        ? `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Chatbot/emulate?language=${selectedLang}&button=${buttonText}`
        : `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Chatbot/emulate?language=${selectedLang}`,
      data,
      config
    )

    setEmulatedChats((prevProps) => {
      return [...prevProps, { ...res.data, align: 'left' }]
    })

    console.log(emulatedChats)
    setEmulatorLoading(false)
  }

  const resetEmulate = async () => {
    setEmulatedChats([])
    await emulate()
  }

  const deployNodes = async () => {
    setDeployLoader(true)
    try {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: getCookie('access-token'),
          'Content-Type': 'application/json',
        },
      }
      const data = {
        nodes: nodes,
        edges: edges,
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Chatbot/update`,
        data,
        config
      )
      //getInitialData()
      router.reload()
      //setInitialData(data);
    } catch (err) {
    } finally {
      setDeployLoader(false)
    }
  }

  const deleteNode = (id) => {
    console.log(id)
    const nodesAfterDelete = nodes.filter((node) => node.id != id)
    const edgesAfterDelete = edges.filter(
      (edge) => edge.source != id && edge.target != id
    )
    setNodes(nodesAfterDelete)
    setEdges(edgesAfterDelete)
  }

  const swapNodeToText = (id) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            enTitle: node.enTitle,
            enText: '',
            arTitle: node.arTitle,
            arText: '',
          },
          type: 'text',
        }
      }
      return node
    })
    setNodes(newNodes)
  }

  const swapNodeToAgent = (id) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            enTitle: node.enTitle,
            enText: '$AGENT',
            arTitle: node.arTitle,
            arText: '$AGENT',
          },
          type: 'agent',
        }
      }
      return node
    })
    setNodes(newNodes)
  }
  const swapNodeToLang = (id) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            enTitle: node.enTitle,
            enText: '$LANG',
            arTitle: node.arTitle,
            arText: '$LANG',
          },
          type: 'lang',
        }
      }
      return node
    })
    setNodes(newNodes)
  }
  const swapNodeToOrder = (id) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            enTitle: node.enTitle,
            enText: '$ORDER',
            arTitle: node.arTitle,
            arText: '$ORDER',
          },
          type: 'order',
        }
      }
      return node
    })
    setNodes(newNodes)
  }

  const removeEdgeOnCustomNode = (id) => {
    const edgesAfterDelete = edges.filter((edge) => edge.source != id)
    setEdges(edgesAfterDelete)
  }

  //? effects
  useEffect(() => {
    if (isAccessToken) {
      if (router.pathname == '/chatbot') {
        getInitialData()
      }
    }
  }, [router.pathname, isAccessToken])

  return (
    <ChatbotBuilderContext.Provider
      value={{
        deleteNode,
        nodes,
        setNodes,
        edges,
        setEdges,
        emulate,
        emulatedChats,
        setEmulatedChats,
        emulatorLoading,
        setEmulatorLoading,
        resetEmulate,
        resetNodes,
        deployNodes,
        deployLoader,
        resetLoader,
        isGreaterThenTen,
        setIsGreaterThenTen,
        removeEdgeOnCustomNode,
        connection,
        setConnection,

        swapNodeToAgent,
        swapNodeToLang,
        swapNodeToOrder,
        swapNodeToText,
        reactFlowInstance,
        setReactFlowInstance,
        reactFlowWrapper,
      }}>
      {children}
    </ChatbotBuilderContext.Provider>
  )
}

export const useGlobalChatbotBuilderContext = () => {
  return useContext(ChatbotBuilderContext)
}

export { ChatbotBuilderContext, ChatbotBuilderProvider }

