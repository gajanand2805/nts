import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { HiShoppingCart } from 'react-icons/hi'
import { IoLanguage } from 'react-icons/io5'
import { MdDeleteOutline, MdSupportAgent, MdSwapCalls } from 'react-icons/md'
import { Handle, NodeToolbar, Position } from 'reactflow'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalChatbotBuilderContext } from '../../contexts/ChatbotBuilderContext'
const idAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

const LanguageNodeComponent = ({ data, id }) => {
  const { selectedLang } = useGlobalAuthContext()
  const {
    deleteNode,
    isGreaterThenTen,
    edges,
    setEdges,
    connection,
    setConnection,
    swapNodeToOrder,
    swapNodeToAgent,
    swapNodeToText,
  } = useGlobalChatbotBuilderContext()
  const { t } = useTranslation()

  const sourceClickHandler = () => {
    console.log('sourceHandlerClicked')
    setConnection({
      source: id,
      target: false,
    })
  }
  const targetClickHandler = () => {
    if (connection.source) {
      console.log('targetHandlerClicked')
      setConnection({ ...connection, target: id })
      console.log('setting edges')
      setEdges([
        ...edges,
        {
          ...connection,
          target: id,
          type: 'buttonedge',
          id: `e${edges.length + 1}`,
        },
      ])
    }
  }
  const [showSwapOptions, setShowSwapOptions] = useState(false)
  return (
    <div className={`${id === 2 ? 'hidden' : 'block'} `}>
      <div className="relative">
        <NodeToolbar
          // isVisible={data.toolbarVisible}
          // style={{ bottom: '0px' }}
          position={Position.Left}
          className="flex items-center justify-center gap-2">
          <div
            className="flex flex-col items-center justify-center gap-2"
            onMouseEnter={() => setShowSwapOptions(true)}
            onMouseLeave={() => setShowSwapOptions(false)}>
            {showSwapOptions ? (
              <>
                <button
                  onClick={() => swapNodeToText(id)}
                  style={{ bottom: '0px' }}
                  className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                  <MdSwapCalls className="opacity-70" />
                  <BsFillChatLeftTextFill />
                </button>

                <button
                  onClick={() => swapNodeToOrder(id)}
                  style={{ bottom: '0px' }}
                  className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                  <MdSwapCalls className="opacity-70" />
                  <HiShoppingCart />
                </button>
                <button
                  onClick={() => swapNodeToAgent(id)}
                  style={{ bottom: '0px' }}
                  className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                  <MdSwapCalls className="opacity-70" />
                  <MdSupportAgent />
                </button>
              </>
            ) : (
              <button
                onClick={() => swapNode(id)}
                style={{ bottom: '0px' }}
                className="flex items-center justify-center gap-1 p-1 text-lg text-white bg-gray-900 rounded-md shadow-md ">
                <MdSwapCalls />
              </button>
            )}
          </div>
          <button
            onClick={() => deleteNode(id)}
            style={{ bottom: '0px' }}
            className="p-1 text-base text-white bg-red-500 rounded-md ">
            <MdDeleteOutline />
          </button>
        </NodeToolbar>
      </div>
      <Handle
        //     // onClickCapture={(e) => startClickHandler()}
        onClick={targetClickHandler}
        className={`!w-5 !h-5 !rounded-full !bg-[#5784f7] ${isGreaterThenTen && '!bg-red-500'
          }`}
        type="target"
        isValidConnection={(r) => {
          r.target != '2'
        }}
        position={Position.Left}
      />
      <div className="flex items-center justify-center gap-5 px-6 py-5 bg-white border-2 rounded-md shadow-md cursor-move dark:bg-black/70 border-White dark:border-bgBlack ">
        <IoLanguage className="text-6xl" />
        <div className="flex flex-col items-start justify-start">
          <p className="flex items-center justify-start gap-2 text-xl font-bold uppercase">
            {t("Subscription_subscription_language")}
          </p>
          <p className="max-w-[160px] text-lg text-left">
            {t("Chatbot_triggers_lang_select")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LanguageNodeComponent
