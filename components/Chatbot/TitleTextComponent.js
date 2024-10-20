import { uniqueId } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillHome } from 'react-icons/ai'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { HiShoppingCart } from 'react-icons/hi'
import { IoLanguage } from 'react-icons/io5'
import { MdDeleteOutline, MdSupportAgent, MdSwapCalls } from 'react-icons/md'
import { Handle, NodeToolbar, Position } from 'reactflow'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'
const idAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

const TitleTextComponent = ({ data, id, type }) => {
  const { selectedLang } = useGlobalAuthContext()
  // const handleStyle = { left: 10 };
  // const { project } = useReactFlow()

  const {
    deleteNode,
    nodes,
    setNodes,
    isGreaterThenTen,
    removeEdgeOnCustomNode,
    edges,
    setEdges,
    connection,
    setConnection,
    swapNodeToAgent,
    swapNodeToOrder,
    swapNodeToLang,
    reactFlowInstance,
    reactFlowWrapper,
  } = useGlobalChatbotBuilderContext()
  const { t } = useTranslation()

  const [enTitle, setEnTitle] = useState(data.enTitle)
  const [enText, setEnText] = useState(data.enText)
  const [arTitle, setArTitle] = useState(data.arTitle)
  const [arText, setArText] = useState(data.arText)
  const [enTextErrorActive, setEnTextErrorActive] = useState(false)
  const [arTextErrorActive, setArTextErrorActive] = useState(false)
  const [textActive, setTextActive] = useState(true)

  const [showOptions, setShowOptions] = useState(false)
  const [showSwapOptions, setShowSwapOptions] = useState(false)
  const yPos = useRef(0)
  useEffect(() => {
    setEnTitle(data.enTitle)
    setEnText(data.enText)
    setArTitle(data.arTitle)
    setArText(data.arText)
    if (
      data.enText != '$AGENT' &&
      data.enText != '$ORDER' &&
      data.enText != '$LANG'
    ) {
      setTextActive(true)
    } else setTextActive(false)
  }, [data])

  const handle = () => {
    const nodesWithoutCurrentNode = nodes.filter((node) => node.id != id)
    const currentNode = nodes.filter((node) => node.id == id)
    currentNode[0].data.enTitle = enTitle
    currentNode[0].data.enText = enText
    currentNode[0].data.arTitle = arTitle
    currentNode[0].data.arText = arText
    setNodes([...nodesWithoutCurrentNode, currentNode[0]])
  }

  useEffect(() => {
    const nodesWithoutCurrentNode = nodes.filter((node) => node.id != id)
    const currentNode = nodes.filter((node) => node.id == id)
    currentNode[0].data.enText = enText
    setNodes([...nodesWithoutCurrentNode, currentNode[0]])
  }, [enText])

  useEffect(() => {
    const nodesWithoutCurrentNode = nodes.filter((node) => node.id != id)
    const currentNode = nodes.filter((node) => node.id == id)
    currentNode[0].data.arText = arText
    setNodes([...nodesWithoutCurrentNode, currentNode[0]])
  }, [arText])

  const enTextChangeHandler = (e) => {
    setEnText(e.target.value)
    if (enText.length === 1024) {
      setEnTextErrorActive(true)
    } else {
      setEnTextErrorActive(false)
    }
  }
  const arTextChangeHandler = (e) => {
    setArText(e.target.value)
    console.log(arText.length)
    if (arText.length === 1024) {
      setArTextErrorActive(true)
    } else {
      setArTextErrorActive(false)
    }
  }

  const isValidConnection = (connection) => {
    console.log(textActive)
    return textActive
  }

  const sourceClickHandler = () => {
    setShowOptions(!showOptions)
    console.log('sourceHandlerClicked', id)
    setConnection({
      source: id,
      target: false,
    })
  }
  const targetClickHandler = () => {
    if (connection.source) {
      console.log('targetHandlerClicked')
      setConnection({ ...connection, target: id })
      console.log('setting edges with uid')
      setEdges([
        ...edges,
        {
          ...connection,
          target: id,
          type: 'buttonedge',
          id: `e${edges.length + 1}`,
          sourceHandle: uniqueId(),
        },
      ])
      console.log('setting uniqueId')
    }
  }

  const getNodeByEdgeTarget = (target) => {
    // nodes[edge?.target]?.data?.enTitle
    const node = nodes.filter((node) => node.id === target)
    // console.log('target node', target, node)
    return node
  }

  const changeEnTitle = (e, target) => {
    const newNodes = nodes.map((node) => {
      if (node.id === target) {
        let data = node.data
        data.enTitle = e.target.value
        return { ...node, data: data }
      }
      return node
    })
    setNodes(newNodes)
  }

  const changeArTitle = (e, target) => {
    const newNodes = nodes.map((node) => {
      if (node.id === target) {
        let data = node.data
        data.arTitle = e.target.value
        return { ...node, data: data }
      }
      return node
    })
    setNodes(newNodes)
  }

  function getSmallestMissingId(arr) {
    arr.sort((a, b) => a.id - b.id) // Sort the array of objects by the id attribute
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id != i) {
        console.log('si', arr, i)
        return i // Return the first missing id
      }
    }
    console.log('si', arr.length)
    return arr.length // Return the next id if all ids are present
  }
  const addTextNodeOnClick = useCallback(() => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()

    const newNodeId = String(Number(getSmallestMissingId(nodes)))
    const type = 'text'
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top + yPos.current,
    })

    let newNode = {
      id: newNodeId,
      type,
      position,
      data: {
        enTitle: '',
        enText: '',
        arTitle: '',
        arText: '',
      },
      // sourcePosition: 'bottom',
    }

    console.log('targetHandlerClicked')
    setNodes([...nodes, newNode])
    setEdges([
      ...edges,
      {
        source: id,
        target: newNodeId,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
    ])
    console.log(
      'Edge',
      {
        ...connection,
        target: id,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
      'NODE',
      newNode
    )
    setShowOptions(false)
    console.log('New node added on click')
    yPos.current += 100
  }, [reactFlowInstance, nodes])
  const addAgentNodeOnClick = useCallback(() => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    const newNodeId = String(Number(getSmallestMissingId(nodes)))
    const type = 'agent'

    let newNode = {
      id: newNodeId,
      type,
      position,
      data: {
        enTitle: '',
        enText: '$AGENT',
        arTitle: '',
        arText: '$AGENT',
      },
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])

    setEdges([
      ...edges,
      {
        source: id,
        target: newNodeId,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
    ])
    console.log(
      'Edge',
      {
        ...connection,
        target: id,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
      'NODE',
      newNode
    )
    yPos.current += 100
    setShowOptions(false)
    console.log('New node added on click')
  }, [nodes, reactFlowInstance])

  const addOrderNodeOnClick = useCallback(() => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })
    const newNodeId = String(Number(getSmallestMissingId(nodes)))
    const type = 'order'

    let newNode = {
      id: newNodeId,
      type,
      position,
      data: {
        enTitle: '',
        enText: '$ORDER',
        arTitle: '',
        arText: '$ORDER',
      },
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])

    setEdges([
      ...edges,
      {
        source: id,
        target: newNodeId,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
    ])
    console.log(
      'Edge',
      {
        ...connection,
        target: id,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
      'NODE',
      newNode
    )
    yPos.current += 100
    setShowOptions(false)
    console.log('New node added on click')
  }, [nodes, reactFlowInstance])
  const addLangNodeOnClick = useCallback(() => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })
    const newNodeId = String(Number(getSmallestMissingId(nodes)))
    const type = 'lang'

    let newNode = {
      id: newNodeId,
      type,
      position,
      data: {
        enTitle: '',
        enText: '$LANG',
        arTitle: '',
        arText: '$LANG',
      },
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])

    setEdges([
      ...edges,
      {
        source: id,
        target: newNodeId,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
    ])
    console.log(
      'Edge',
      {
        ...connection,
        target: id,
        type: 'buttonedge',
        id: `e${edges.length + 1}`,
        sourceHandle: uniqueId(),
      },
      'NODE',
      newNode
    )

    yPos.current += 100
    setShowOptions(false)
    console.log('New node added on click')
  }, [nodes, reactFlowInstance])

  const swapNode = (id) => {
    const newNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            enTitle: 'Other issue',
            enText: '$AGENT',
            arTitle: 'قضية أخرى',
            arText: '$AGENT',
          },
          type: 'agent',
        }
      }
      return node
    })
    setNodes(newNodes)
  }
  return (
    <div className={`${id === 0 ? 'hidden' : 'block'}`}>
      <NodeToolbar
        position={Position.Left}
        className="flex items-center justify-center gap-2">
        <div
          className={`flex flex-col items-center justify-center gap-2 ${id == 1 ? 'hidden' : 'block'
            } `}
          onMouseEnter={() => setShowSwapOptions(true)}
          onMouseLeave={() => setShowSwapOptions(false)}>
          {showSwapOptions ? (
            <>
              <button
                onClick={() => swapNodeToAgent(id)}
                style={{ bottom: '0px' }}
                className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                <MdSwapCalls className="opacity-70" />
                <MdSupportAgent />
              </button>
              <button
                onClick={() => swapNodeToOrder(id)}
                style={{ bottom: '0px' }}
                className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                <MdSwapCalls className="opacity-70" />
                <HiShoppingCart />
              </button>
              <button
                onClick={() => swapNodeToLang(id)}
                style={{ bottom: '0px' }}
                className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                <MdSwapCalls className="opacity-70" />
                <IoLanguage />
              </button>
            </>
          ) : (
            <button
              // onClick={() => swapNode(id)}
              style={{ bottom: '0px' }}
              className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
              <MdSwapCalls />
            </button>
          )}
        </div>
        <button
          onClick={() => deleteNode(id)}
          style={{ bottom: '0px' }}
          className={`p-1 text-base text-white bg-red-500 rounded-md ${id == 1 ? 'hidden' : 'block'
            }`}>
          <MdDeleteOutline />
        </button>
      </NodeToolbar>
      <NodeToolbar
        isVisible={showOptions}
        position={Position.Right}
        nodeId={id}
        className="flex flex-col items-center justify-center gap-3 ">
        <button
          onClick={addTextNodeOnClick}
          className="p-1.5 text-sm text-white hover:scale-110 duration-200 transition-all ease-in-out bg-green-600 rounded-md ">
          <BsFillChatLeftTextFill />
        </button>
        <button
          onClick={addAgentNodeOnClick}
          className="p-1 text-base text-white transition-all duration-200 ease-in-out bg-blue-600 rounded-md hover:scale-110 ">
          <MdSupportAgent />
        </button>
        <button
          onClick={addOrderNodeOnClick}
          className="p-1 text-base text-white transition-all duration-200 ease-in-out bg-teal-700 rounded-md hover:scale-110 ">
          <HiShoppingCart />
        </button>
        <button
          onClick={addLangNodeOnClick}
          className="p-1 text-base text-white transition-all duration-200 ease-in-out bg-teal-700 rounded-md hover:scale-110 ">
          <IoLanguage />
        </button>
      </NodeToolbar>
      {/* </div> */}
      <Handle
        //     // onClickCapture={(e) => startClickHandler()}
        onClick={targetClickHandler}
        className={`!w-4 !h-4 ring-[4px] ring-white !rounded-full !bg-Blue ${isGreaterThenTen && '!bg-red-500'
          } ${id == 1 ? 'hidden' : 'block'}`}
        type="target"
        isValidConnection={(r) => {
          r.target != '2'
        }}
        position={Position.Left}
      />
      <div className="flex flex-col gap-2 p-2 px-3 py-2 border-2 rounded-md shadow-sm cursor-move bg-white/70 dark:bg-black/70 border-White dark:border-bgBlack ">
        <p
          className={`flex items-center justify-start gap-4 py-2 text-xl font-bold uppercase ${id == 1 ? 'hidden' : 'block'
            }`}>
          <BsFillChatLeftTextFill className="text-2xl text-green-700" />
        </p>
        <p
          className={`flex items-center justify-start gap-4 py-2 text-xl font-bold uppercase ${id != 1 ? 'hidden' : 'block'
            }`}>
          <AiFillHome className="text-2xl text-green-700" />
        </p>
        {selectedLang == 'en' ? (
          <div className="relative flex items-start justify-start w-full">
            <textarea
              value={enText}
              onChange={enTextChangeHandler}
              maxLength={1024}
              placeholder="Text"
              name="text"
              // rows={3}
              // id={edge.targetHandle}
              id="text"
              className="w-full px-2 py-2 text-lg font-semibold bg-gray-200 border-2 rounded-sm shadow-sm border-White dark:border-bgBlack dark:bg-gray-900 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
            />
            <p
              className={`absolute peer-focus:flex hidden items-center justify-center w-9 h-7 text-sm font-semibold rounded-sm -left-12
                        ${enTextErrorActive ? 'bg-red-500/50' : 'bg-blue-500/50'
                }`}>
              {1024 - enText.length >= 0 ? 1024 - enText.length : 0}
            </p>
          </div>
        ) : (
          <>
            <textarea
              value={arText}
              onChange={arTextChangeHandler}
              maxLength={1024}
              placeholder="Text"
              name="text"
              rows={3}
              id="text"
              className="w-full px-2 py-1 bg-white border-2 rounded-sm shadow-sm border-White dark:border-bgBlack dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
            />
            <p
              className={`absolute peer-focus:flex hidden items-center justify-center w-9 h-7 text-sm font-semibold rounded-sm -left-12
                      top-8  ${arTextErrorActive ? 'bg-red-500/50' : 'bg-blue-500/50'
                }`}>
              {1024 - arText.length >= 0 ? 1024 - arText.length : 0}
            </p>
          </>
        )}
        <div className="flex flex-col items-center justify-center gap-1">
          {edges?.map((edge, i) => {
            return (
              edge?.source == id && (
                <div
                  key={i}
                  className="relative w-full">
                  {selectedLang == 'en' ? (
                    <input
                      maxLength={20}
                      name="title"
                      id="title"
                      value={
                        getNodeByEdgeTarget(edge?.target)[0]?.data?.enTitle
                      }
                      // value={enTitle}
                      onChange={(e) => changeEnTitle(e, edge?.target)}
                      placeholder="Title"
                      className="w-full px-2 py-1 bg-white border-2 rounded-md shadow-sm border-White dark:border-bgBlack dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
                    />
                  ) : (
                    <input
                      maxLength={20}
                      name="title"
                      id="title"
                      value={
                        getNodeByEdgeTarget(edge?.target)[0]?.data?.arTitle
                      }
                      // value={arTitle}
                      onChange={(e) => changeArTitle(e, edge?.target)}
                      placeholder="Title"
                      className="w-full px-2 py-1 bg-white border-2 rounded-md shadow-sm border-White dark:border-bgBlack dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
                    />
                  )}
                  <Handle
                    // onClickCapture={(e) => endClickHandler()}
                    // onClick={sourceClickHandler}
                    className="!w-4 !h-4 ring-[3px] ring-white !rounded-full !bg-Blue "
                    type="source"
                    position={Position.Right}
                    id={edge.sourceHandle}
                    isConnectable={false}

                  // isValidConnection={returnNotValidConnection}
                  // isValidConnection={isValidConnection}
                  ></Handle>
                </div>
              )
            )
          })}
          <div className="relative w-full h-10 py-1 pl-2 bg-white border-2 rounded-md shadow-sm border-White dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 peer">
            <p className="font-bold capitalize text-Blue">Add Option</p>

            <Handle
              // isConnectable={true  }
              onClick={sourceClickHandler}
              // onClickCapture={(e) => endClickHandler()}
              className="font-black text-2xl text-white  !right-1 flex items-center justify-center !w-8 !h-8 !rounded-md !bg-Blue "
              type="source"
              position={Position.Right}
              id="a"
            // isValidConnection={isValidConnection}
            >
              +
            </Handle>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleTextComponent
