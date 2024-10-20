import React, { useState, useRef } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { Handle, Position, NodeToolbar } from 'reactflow'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const HomeComponent = ({ data, id }) => {
  //? contexts
  const { deleteNode, nodes, setNodes } = useGlobalChatbotBuilderContext()
  const { t } = useTranslation()
  //? states
  const [enTitle, setEnTitle] = useState(data.enTitle || data.arTitle || '')
  const [enText, setEnText] = useState(data.enText || data.arText || '')
  const [arTitle, setArTitle] = useState(data.arTitle || data.erTitle || '')
  const [arText, setArText] = useState(data.arText || data.enText || '')

  //? functions
  const handleSave = () => {
    const nodesWithoutCurrentNode = nodes.filter((node) => node.id != id)
    const currentNode = nodes.filter((node) => node.id == id)
    currentNode[0].data.enTitle = enTitle
    currentNode[0].data.enText = enText
    currentNode[0].data.arTitle = arTitle
    currentNode[0].data.arText = arText

    setNodes([...nodesWithoutCurrentNode, currentNode[0]])
    setEnTitle(data.enTitle || data.arTitle || '')
    setEnText(data.enText || data.arText || '')
    setArTitle(data.arTitle || data.enTitle || '')
    setArText(data.arText || data.enText || '')
  }

  return (
    <div className="flex flex-col gap-2 p-2 px-3 py-2 bg-white/70 border-2 rounded-md shadow-sm cursor-move dark:bg-black/70 border-White dark:border-bgBlack ">
      <div className="flex items-center justify-between gap-4 py-2 text-xl font-bold">
        <AiFillHome className="text-2xl text-green-700" />
        <p className="text-sm opacity-60">*Uneditable</p>
      </div>

      <textarea
        value={t('Chatbot_Menu')}
        maxLength={1024}
        placeholder="Text"
        name="text"
        id="text"
        className="w-full px-2 py-2 text-lg font-semibold bg-gray-200 border-2 rounded-sm shadow-sm border-White dark:border-bgBlack dark:bg-gray-900 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
      />

      <input
        maxLength={20}
        name="title"
        id="title"
        value={t('Track_Order')}
        placeholder="Title"
        className="w-full px-2 py-1 bg-white border-2 rounded-md shadow-sm border-White dark:border-bgBlack dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
      />
      <div className="relative w-full">
        <input
          maxLength={20}
          name="title"
          id="title"
          value={t('Customer_Support')}
          placeholder="Title"
          className="w-full px-2 py-1 bg-white border-2 rounded-md shadow-sm border-White dark:border-bgBlack dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
        />
        <Handle
          className="!w-4 !h-4 ring-[4px] ring-white !rounded-full !bg-Blue"
          type="source"
          isValidConnection={() => {
            false
          }}
          position={Position.Right}
          id="a"
        />
      </div>
      <input
        maxLength={20}
        name="title"
        id="title"
        value={t('Switch_Language')}
        placeholder="Title"
        className="w-full px-2 py-1 bg-white border-2 rounded-md shadow-sm border-White dark:border-bgBlack dark:bg-black/70 text-Black dark:text-White dark:border-White dark:border-bgBlack/70 outline-0 focus-visible:border-2 focus-visible:border-blue-300 placeholder:text-Black/70 dark:placeholder:text-White peer"
      />
    </div>
  )
}

HomeComponent.displayName = 'HomeComponent'

export default HomeComponent
