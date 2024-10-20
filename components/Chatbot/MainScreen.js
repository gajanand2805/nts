import { uniqueId } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiReset } from 'react-icons/bi'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { HiShoppingCart } from 'react-icons/hi'
import { IoIosRocket } from 'react-icons/io'
import { IoLanguage } from 'react-icons/io5'
import { MdSupportAgent } from 'react-icons/md'
import ReactFlow, {
  Background,
  Controls,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'
import PrimaryButton from '../UI/Button/PrimaryButton'
import AgentNodeComponent from './AgentNodeComponent'
import ButtonEdge from './ButtonEdge.js'
import HomeComponent from './HomeComponent'
import LanguageNodeComponent from './LanguageNodeComponent'
import TitleTextComponent from './TitleTextComponent'
import TrackOrderNodeComponent from './TrackOrderNodeComponent'

const nodeTypes = {
  text: TitleTextComponent,
  Home: HomeComponent,
  agent: AgentNodeComponent,
  lang: LanguageNodeComponent,
  order: TrackOrderNodeComponent,
}
const edgeTypes = {
  buttonedge: ButtonEdge,
}
export const MainScreen = () => {
  //? react-flow
  const { project } = useReactFlow()

  //? refs
  // const reactFlowWrapper = useRef(null)
  const connectingNodeId = useRef(null)
  const yPos = useRef(-148)

  //? translations
  const { t } = useTranslation()

  //? states
  const [allowNewNodeOnEdgeDrop, setAllowNewNodeOnEdgeDrop] = useState(true)
  // const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [buttonText, setButtonText] = useState(null)

  //? contexts
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    emulate,
    resetNodes,
    deployNodes,
    deployLoader,
    resetLoader,
    isGreaterThenTen,
    setIsGreaterThenTen,
    reactFlowInstance,
    setReactFlowInstance,
    reactFlowWrapper,
  } = useGlobalChatbotBuilderContext()
  const { setSelectedLang, selectedLang, getCookie } = useGlobalAuthContext()

  //? functions
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    [setNodes]
  )

  const edgeOptions = {
    animated: true,
    style: {
      stroke: '#5784f7',
    },
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [setEdges]
  )

  const onConnect = useCallback(
    (params) => {
      if (isGreaterThenTen == false && allowNewNodeOnEdgeDrop == true) {
        setEdges((eds) => addEdge({ ...params, type: 'buttonedge' }, eds))
      }
    },
    [setEdges, isGreaterThenTen, allowNewNodeOnEdgeDrop]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      let newNode = {}

      if (type == 'text') {
        newNode = {
          id: String(Number(getSmallestMissingId(nodes))),
          type,
          position,
          data: {
            enTitle: '',
            enText: '',
            arTitle: '',
            arText: '',
          },
          sourcePosition: 'bottom',
        }
      } else if (type == 'agent') {
        newNode = {
          id: String(Number(getSmallestMissingId(nodes))),
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
      } else if (type == 'order') {
        newNode = {
          id: String(Number(getSmallestMissingId(nodes))),
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
      } else if (type == 'lang') {
        newNode = {
          id: String(Number(getSmallestMissingId(nodes))),
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
      }

      setNodes([...nodes, newNode])
    },
    [reactFlowInstance, nodes, setNodes]
  )

  const isAllowedNewNodeOnDrop = (id) => {
    // setAllowNewNodeOnEdgeDrop(false);
    const node = nodes?.find((node) => node.id == id)
    if (
      node?.data.enText == '$AGENT' ||
      node?.data.enText == '$ORDER' ||
      node?.data.enText == '$LANG'
    ) {
      setAllowNewNodeOnEdgeDrop(false)
    } else {
      setAllowNewNodeOnEdgeDrop(true)
    }
  }

  const onConnectStart = useCallback(
    (_, { nodeId, handleType }) => {
      isAllowedNewNodeOnDrop(nodeId)
      console.log('onConnectStart')
      connectingNodeId.current = nodeId
      let count = 0
      edges.forEach((edge) => {
        edge.source == nodeId && count++
      })
      count >= 10 ? setIsGreaterThenTen(true) : setIsGreaterThenTen(false)
    },
    [
      edges,
      isGreaterThenTen,
      allowNewNodeOnEdgeDrop,
      isAllowedNewNodeOnDrop,
      setIsGreaterThenTen,
    ]
  )

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane')
      const targetIsSourceHandle = event.target.classList.contains(
        'react-flow__handle-right'
      )

      if (targetIsPane) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect()

        //! Only for node type text. For other type id will be diff and determining type will be tough

        if (!isGreaterThenTen && allowNewNodeOnEdgeDrop == true) {
          const id = String(Number(getSmallestMissingId(nodes)))
          let newNode = {}

          newNode = {
            id,
            type: 'text',
            position: project({
              x: event.clientX - left - 75,
              y: event.clientY - top,
            }),
            data: {
              enTitle: '',
              enText: '',
              arTitle: '',
              arText: '',
            },
            sourcePosition: 'bottom',
          }

          setNodes([...nodes, newNode])
          setEdges((eds) =>
            eds.concat({
              id,
              source: connectingNodeId.current,
              target: id,
              type: 'buttonedge',
              sourceHandle: uniqueId(),
            })
          )
        }
      }
      // if (targetIsSourceHandle) {
      //   // console.log('SRC', event.srcElement.dataset.nodeid)
      //   console.log('Target', event)

      //   const id = String(Number(getSmallestMissingId(nodes)))

      //   setEdges((eds) =>
      //     eds.concat({
      //       id,
      //       target: connectingNodeId.current,
      //       source: event.srcElement.dataset.nodeid,
      //       type: 'buttonedge',
      //       sourceHandle: uniqueId(),
      //     })
      //   )
      // }
      setIsGreaterThenTen(false)
    },
    [project, nodes, isGreaterThenTen, allowNewNodeOnEdgeDrop]
  )

  const addTextNodeOnClick = useCallback(() => {
    yPos.current += 50
    const type = 'text'
    const position = {
      x: 367,
      y: yPos.current,
    }

    let newNode = {
      id: String(Number(getSmallestMissingId(nodes))),
      type,
      position,
      data: {
        enTitle: '',
        enText: '',
        arTitle: '',
        arText: '',
      },
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])
    console.log('New node added on click')
  }, [nodes])
  const addAgentNodeOnClick = useCallback(() => {
    yPos.current += 50
    const type = 'agent'
    const position = {
      x: 367,
      y: yPos.current,
    }

    let newNode = {
      id: String(Number(getSmallestMissingId(nodes))),
      type,
      position,
      data: {},
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])
    console.log('New agent node added on click')
  }, [nodes])
  const addLanguageNodeOnClick = useCallback(() => {
    yPos.current += 50
    const type = 'lang'
    const position = {
      x: 367,
      y: yPos.current,
    }

    let newNode = {
      id: String(Number(getSmallestMissingId(nodes))),
      type,
      position,
      data: {},
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])
    console.log('New lang node added on click')
  }, [nodes])

  const addOrderNodeOnClick = useCallback(() => {
    yPos.current += 50
    const type = 'order'
    const position = {
      x: 367,
      y: yPos.current,
    }

    let newNode = {
      id: String(Number(getSmallestMissingId(nodes))),
      type,
      position,
      data: {},
      sourcePosition: 'bottom',
    }
    setNodes([...nodes, newNode])
    console.log('New node added on click')
  }, [nodes])

  return (
    <main className="flex items-center justify-center w-full h-[74vh]">
      <div className="flex flex-col rounded-2xl shadow-md bg-transparent w-full h-[74vh]">
        <div className="flex flex-row justify-center w-full h-full">
          <div
            ref={reactFlowWrapper}
            className="w-[90vw] h-[74vh] border-2  border-white dark:border-bgBlack rounded-2xl relative">
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={edgeOptions}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              edgeTypes={edgeTypes}
              onDragOver={onDragOver}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              disableKeyboardA11y={true}
              fitView
              className="h-full bg-White dark:bg-dBlack rounded-2xl">
              <Background />
              <Panel
                position="top-start"
                className="flex flex-col gap-2">
                <PrimaryButton
                  disabled={deployLoader}
                  isLoading={deployLoader}
                  handleClick={() => {
                    deployNodes()
                  }}
                  text={
                    <div className="flex flex-row items-center gap-2">
                      <>{t("Chatbot_deploy")}</> <IoIosRocket />
                    </div>
                  }
                  size="small"
                />

                <PrimaryButton
                  disabled={resetLoader}
                  isLoading={resetLoader}
                  handleClick={() => {
                    resetNodes()
                  }}
                  text={
                    <div className="flex flex-row items-center gap-2">
                      <> {t('Chatbot_reset')} </>
                      <BiReset />
                    </div>
                  }
                  size="small"
                />

                <button
                  onClick={addTextNodeOnClick}
                  className="w-fit px-4 py-2 gap-3 text-base font-bold text-Blue rounded-lg bg-transparent border-[1.5px] border-Blue flex items-center justify-center  transition-all duration-300 disabled:opacity-60"
                  onDragStart={(event) => onDragStart(event, 'text')}
                  draggable>
                  <BsFillChatLeftTextFill />
                </button>

                <button
                  onClick={addAgentNodeOnClick}
                  className="w-fit px-4 py-2 gap-3 text-base font-bold text-Blue rounded-lg bg-transparent border-[1.5px] border-Blue flex items-center justify-center  transition-all duration-300 disabled:opacity-60"
                  onDragStart={(event) => onDragStart(event, 'agent')}
                  draggable>
                  <MdSupportAgent />
                </button>
                <button
                  onClick={addLanguageNodeOnClick}
                  className="w-fit px-4 py-2 gap-3 text-base font-bold text-Blue rounded-lg bg-transparent border-[1.5px] border-Blue flex items-center justify-center  transition-all duration-300 disabled:opacity-60"
                  onDragStart={(event) => onDragStart(event, 'lang')}
                  draggable>
                  <IoLanguage />
                </button>
                <button
                  onClick={addOrderNodeOnClick}
                  className="w-fit px-4 py-2 gap-3 text-base font-bold text-Blue rounded-lg bg-transparent border-[1.5px] border-Blue flex items-center justify-center  transition-all duration-300 disabled:opacity-60"
                  onDragStart={(event) => onDragStart(event, 'order')}
                  draggable>
                  <HiShoppingCart />
                </button>
              </Panel>
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </main>
  )
}
