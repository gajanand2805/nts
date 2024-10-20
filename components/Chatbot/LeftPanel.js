import React, { useEffect } from 'react'
import { MdCancel } from 'react-icons/md'
import { useStoreApi, useReactFlow } from 'reactflow'
import { useEdges } from 'reactflow'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'
const LeftPanel = () => {
  const reactFlowInstance = useReactFlow()

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const edgesOnChange = useEdges()

  const { setEdges, edges, nodes } = useGlobalChatbotBuilderContext()

  useEffect(() => {
    console.log('edges on change', edgesOnChange)
    if (edgesOnChange.length > edges.length)
      setEdges([...edges, edgesOnChange[edgesOnChange.length - 1]])
  }, [edgesOnChange])

  return (
    <div className="flex flex-col w-full gap-4 rounded-sm shadow-md basis-1/4 bg-WhiteSec dark:bg-BlackSec">
      <div className="flex items-center justify-center w-full py-1 bg-Blue">
        <p className="font-medium text-center text-white">Components</p>
      </div>

      <div className="flex flex-col items-center justify-start w-full px-0 py-10 ">
        <div className="flex flex-col items-center ">
          <button
            className="px-6 py-3 text-white bg-blue-600"
            // onClick={() => console.log(edges)}
            onClick={() => console.log(nodes)}>
            Get Coordinates
          </button>
          <div
            className="flex flex-col gap-2 p-2 scale-90 border-2 rounded-sm border-black/30 dark:border-white/30"
            onDragStart={(event) => onDragStart(event, 'text')}
            draggable>
            <div className="flex gap-2">
              <input
                name="title"
                id="title"
                placeholder="Title"
                className="px-2 py-1 bg-white border border-blue-300 rounded-sm shadow-sm dark:bg-Black text-Black dark:text-White dark:border-White/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White"
              />
              <button className="px-1 text-white bg-red-600 rounded-sm">
                <MdCancel className="text-2xl" />
              </button>
            </div>

            <div>
              <textarea
                placeholder="Text"
                name="text"
                id="text"
                className="w-full px-2 py-1 bg-white border border-blue-300 rounded-sm shadow-sm dark:bg-Black text-Black dark:text-White dark:border-White/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
