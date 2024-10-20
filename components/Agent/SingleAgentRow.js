import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCheck } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { RxCross2 } from 'react-icons/rx'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import Modal from '../Modal'
import Input from '../UI/Input'
import RemoveAgentModal from './RemoveAgentModal'
import DeleteSvg from './assets/Delete.svg'
import EditSvg from './assets/Edit.svg'

const SingleAgentRow = ({ agent, i }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { agents, setAgents, alert, setAlert } = useGlobalAgentContext()
  const { getCookie } = useGlobalAuthContext()
  const [editMode, setEditMode] = useState(false)
  const [removeActive, setRemoveActive] = useState(false)
  const [isRenameApiLoading, setIsRenameApiLoading] = useState(false)
  const [renameName, setRenameName] = useState(agent?.Name)
  const [error, setError] = useState(null)
  const [encodedEmail, setEncodedEmail] = useState(window.btoa(agent.Email))

  const renameAgentHandler = async () => {
    setAlert(null)
    if (renameName.length < 3) {
      setError({
        renameNameError: 'Agent_error_rename_size',
      })
    } else {
      setIsRenameApiLoading(true)
      try {
        const config = {
          headers: {
            accept: 'application/json',
            Authorization: getCookie('access-token'),
          },
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/section/Agent/rename`,
          { Agent_Email: agent.Email, Agent_Name: renameName },
          config
        )
        setAgents([
          ...agents.slice(0, i),
          {
            ...agents[i],
            Name: renameName,
          },
          ...agents.slice(i + 1),
        ])
      } catch (err) {
        setAlert({ error: 'Agent_error_rename_general' })
        console.log(err)
      } finally {
        setIsRenameApiLoading(false)
        setEditMode(false)
      }
    }
  }

  return (
    <>
      <tr
        key={i}
        className="bg-white w-full border-b rounded-md dark:bg-bgBlack/60 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dBlack/60">
        <td className="w-4 p-4 ">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bgBlack dark:focus:ring-offset-bgBlack focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checkbox-table-search-1"
              className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="justify-start items-start">
            {editMode ? (
              <Input
                id="renameName"
                name="renameName"
                onChange={(e) => setRenameName(e.target.value)}
                placeholder={t('Agents_addagent_name')}
                value={renameName}
                error={t(error?.renameNameError)}
              />
            ) : (
              <div
                onClick={() => router.push(`/agents/${encodedEmail}`)}
                className="text-base cursor-pointer font-semibold text-start">
                {agent.Name}
              </div>
            )}
            <div className="font-normal text-gray-500 text-start">
              {agent.Email}
            </div>
          </div>
        </th>
        <td className="px-6 py-4 ">
          <div className="flex items-center gap-2">
            <div
              className={`${agent.Status == true && agent.Task == true && 'bg-yellow-500'
                } ${agent.Status == false && 'bg-red-500'} ${agent.Status == true && agent.Task == false && 'bg-green-500'
                } w-2.5 h-2.5 rounded-full`}></div>
            {agent.Status == true && agent.Task == true && 'Busy'}{' '}
            {agent.Status == false && 'Offline'}{' '}
            {agent.Status == true && agent.Task == false && 'Online'}{' '}
          </div>
        </td>
        <td className="px-6 py-4">
          {editMode ? (
            <div className="flex items-center gap-5">
              <button
                className="text-2xl text-Green"
                onClick={renameAgentHandler}>
                {isRenameApiLoading ? (
                  <div className="w-5 h-5 border-t-[1px] rounded-full animate-spin transition-all duration-300 border-Blue" />
                ) : (
                  <BiCheck />
                )}
              </button>

              <button
                className="text-2xl text-Red"
                onClick={() => {
                  setEditMode(false)
                  setRenameName(agent?.Name)
                  setError(null)
                }}>
                <RxCross2 />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-5">
                <button
                  className="flex text-2xl pb-1 items-center"
                  onClick={() => router.push(`/agents/${encodedEmail}`)}>
                  <CgProfile />
                </button>
                <button onClick={() => setRemoveActive(true)}>
                  <Image
                    src={DeleteSvg}
                    alt="delete agent"
                  />
                </button>

                <button onClick={() => setEditMode(true)}>
                  <Image
                    src={EditSvg}
                    alt="Edit agent"
                  />
                </button>
                <button
                  className={`relative border-[1px]  rounded-full p-1 group ${agent?.Service
                    ? 'border-Green'
                    : 'border-black/50 dark:border-white/50'
                    }`}>
                  {agent?.Service ? (
                    <>
                      <div className="w-3 h-3 rounded-full bg-Green/60"></div>
                      <p className="absolute left-0 p-1 font-bold text-white top-7 bg-Green/60 rounded-[5px] hidden group-hover:flex">
                        Enabled
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 rounded-full bg-black/50 dark:bg-white/50"></div>
                      <p className="absolute left-0 p-1 font-bold text-white top-7 bg-Red/60 rounded-[5px] hidden group-hover:flex">
                        Disabled
                      </p>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </td>
      </tr>

      {/* Remove Modal */}
      <Modal
        isVisible={removeActive}
        onClose={() => setRemoveActive(false)}>
        <RemoveAgentModal
          index={i}
          email={agent.Email}
          name={agent.Name}
          onClose={() => setRemoveActive(false)}
        />
      </Modal>
    </>
  )
}

export default SingleAgentRow
