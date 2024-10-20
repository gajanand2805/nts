import React, { useEffect, useState } from 'react'
import { BiFilter } from 'react-icons/bi'
import PrimaryButton from '../UI/Button/PrimaryButton'
import Input from '../UI/Input'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FiSettings } from 'react-icons/fi'
import { IoMdSwap } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalAgentContext } from '../../contexts/AgentContext'
import { TimezoneOption } from '../../static/timezone'
import Modal from '../Modal'
import RefreshCounter from '../RefreshCounter'
import { SubscriptionModal } from '../Subscription/SubscriptionModal'
import ToggleButton from '../ToggleButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import AddAgentModal from './AddAgentModal'
import ConfigureAgent from './ConfigureAgent'
import FilterPopup from './FilterPopup'
import InspectPhoneModal from './InspectPhoneModal'
import QuickMessageModal from './QuickMessageModal'
import SingleAgentRow from './SingleAgentRow'

const MainAgentScreen = () => {
  //? router
  const router = useRouter()
  //? translation
  const { t } = useTranslation()
  //? context
  const { selectedLang } = useGlobalAuthContext()
  const {
    agents,
    alert,
    allowed,
    addAgentSupport,
    quickFeature,
    setAlert,
    starttime,
    setStarttime,
    endtime,
    setEndtime,
    timezone,
    setTimezone,
    support,
    supportLoader,
    fetchAgentData,
    toggle_support,
    updatetime,
    filter,
  } = useGlobalAgentContext()

  //? states
  const [showAddAgentModal, setShowAddAgentModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showAgent, setShowAgent] = useState(agents)
  const [filterText, setFilterText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [showQuickMessageModal, setShowQuickMessageModal] = useState(false)
  const [showInspectPhoneModal, setShowInspectPhoneModal] = useState(false)
  const [configureAgent, setConfigureAgent] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  //? effects
  useEffect(() => {
    if (!agents || !filter) {
      // Exit early if agents or filter is undefined or null
      return;
    }

    const filteredAgents = agents.filter(
      (agent) =>
        (agent.Status === filter?.status?.isActive || !agent.Status === filter?.status?.isNotActive) &&
        (agent.Service === filter?.service?.isEnabled || !agent.Service === filter?.service?.isDisabled)
    );

    if (filterText === '') {
      setShowAgent(filteredAgents);
    } else {
      const filteredAgent = filteredAgents.filter((agent) =>
        agent.Name?.toLowerCase().includes(filterText)
      );
      setShowAgent(filteredAgent);
    }
  }, [filterText, agents, filter]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 mt-10">
      {/*  */}
      <Modal
        isVisible={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}>
        <SubscriptionModal />
      </Modal>
      <div className="flex flex-col items-center justify-between w-full gap-4 tabletM:flex-row">
        <div className="flex flex-col items-center justify-center gap-4 tablet:flex-row ">
          <div className="flex items-center justify-center w-full gap-4">
            <div className="w-full py-0.5 px-1 bg-white dark:bg-bgBlack rounded">
              <RefreshCounter
                duration={30}
                fetchData={fetchAgentData}
              />
            </div>
            <input
              type="time"
              className="form-control dark:bg-bgBlack dark:text-White  block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              value={starttime}
              onChange={(e) => {
                setStarttime(e.target.value)
                starttime = e.target.value
                updatetime(e.target.value, endtime, timezone)
              }}
            />

            <p className="text-xl ">
              <IoMdSwap />
            </p>

            <input
              type="time"
              className="form-control dark:bg-bgBlack dark:text-White  block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              value={endtime}
              onChange={(e) => {
                setEndtime(e.target.value)
                endtime = e.target.value
                updatetime(starttime, e.target.value, timezone)
              }}
            />
          </div>

          <select
            className="form-control dark:bg-bgBlack dark:text-White   block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
            onChange={(e) => {
              setTimezone(e.target.value)
              timezone = e.target.value
              updatetime(starttime, endtime, e.target.value)
            }}
            value={timezone}>
            {TimezoneOption.map((item) => {
              return (
                <option
                  key={item.value}
                  value={item.value}>
                  {item.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-bgBlack px-4 py-2 rounded-[5px]">
          <p className="font-semibold"> {t('Agents_agentsupport')} </p>
          <ToggleButton
            small
            toggleHandler={toggle_support}
            toggleStatus={support}
            isLoading={supportLoader}
            selectedLang={selectedLang}
          />
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="flex flex-col justify-between w-full gap-4 tabletM:flex-row items-between">
        <div className="flex w-full gap-2">
          <div className="w-full max-w-xs">
            <Input
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder={t('Agents_searchhere')}
              name="Search"
              id="Search"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterActive(!filterActive)}
              className="border-2 py-2 rounded-[10px] shadow-sm border-BlackTer dark:border-White/20 dark:bg-bgBlackSec bg-white flex items-center gap-1 px-5 text-Blue font-bold">
              <BiFilter /> {t('Agents_filter')}
            </button>

            {/*  */}
          </div>
        </div>

        <div className="w-full tabletM:max-w-[200px] flex items-center gap-4">
          <PrimaryButton
            text={t('Agents_addagent')}
            handleClick={() => {
              addAgentSupport
                ? setShowAddAgentModal(true)
                : setShowSubscriptionModal(true)
            }}
          />
          <div className="relative h-full w-fit ">
            <SecondaryButton
              handleClick={() => setShowOptions(!showOptions)}
              className="flex flex-col group items-center h-full justify-center gap-1 p-2 rounded-[5px] bg-white dark:bg-bgBlack">
              <FiSettings className="text-lg" />
            </SecondaryButton>
            {showOptions && (
              <div
                className={`p-3 z-20 ${selectedLang == 'en' ? 'right-0' : 'right-0'
                  } flex flex-col items-center justify-center  rounded-[10px] bg-white shadow gap-4 dark:bg-bgBlack absolute top-14`}>
                <SecondaryButton
                  handleClick={() => {
                    if (quickFeature) {
                      setShowOptions(false)
                      setShowQuickMessageModal(true)
                    } else {
                      setShowSubscriptionModal(true)
                    }
                  }}
                  text={t('Agents_icon_quickmessages')}
                />
                <SecondaryButton
                  handleClick={() => {
                    setShowOptions(false)
                    setShowInspectPhoneModal(true)
                  }}
                  text={t('Agents_icon_inspectcontact')}
                />
                <SecondaryButton
                  handleClick={() => {
                    setShowOptions(false)
                    setConfigureAgent(true)
                  }}
                  text={t('Agents_icon_activeagents')}>
                  <FiSettings className="text-lg" />
                </SecondaryButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert?.success && (
        <div className="relative flex items-center w-full">
          <p className="w-full px-4 py-2 rounded-[10px] bg-Green/60 text-white text-lg font-semibold">
            {t(alert?.success)}
          </p>

          <button
            onClick={() => setAlert(null)}
            className="absolute p-1 rounded-[5px] text-2xl bg-black/50  text-white right-2">
            <IoClose />
          </button>
        </div>
        // <p className="w-full relative px-4 py-2 flex items-center rounded-[10px] bg-Green/60 text-white text-lg font-semibold">

        //     <span className="absolute right-0">
        //         <IoClose />
        //     </span>
        // </p>
      )}
      {alert?.error && (
        <div className="w-full px-4 py-2 rounded-[10px] bg-Red/60 relative z-10 gap-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-white ">{t(alert?.error)}</p>

          <button
            onClick={() => setAlert(null)}
            className="p-1 rounded-[5px] text-2xl bg-black/50  text-white right-2">
            <IoClose />
          </button>
        </div>
      )}
      {/*  */}

      <div className="relative w-full h-full overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full min-w-[1000px] h-full tabletM:min-w-[600px]  text-sm text-left text-gray-500 dark:text-gray-400 border-spacing-2">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-[#1B2431] dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bgBlack dark:focus:ring-offset-bgBlack focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-all-search"
                    className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start">
                {t('Agents_name')} {filterText && `filter:"${filterText}"`}
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-start">
                {t('Agents_status')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start">
                {t('Agents_action')}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {showAgent?.map((agent, i) => {
              return (
                <SingleAgentRow
                  agent={agent}
                  i={i}
                  key={i}
                />
              )
            })}
          </tbody>
        </table>
      </div>
      <Modal
        isVisible={showAddAgentModal}
        onClose={() => setShowAddAgentModal(false)}>
        <AddAgentModal onClose={() => setShowAddAgentModal(false)} />
      </Modal>
      <Modal
        isVisible={showQuickMessageModal}
        onClose={() => setShowQuickMessageModal(false)}>
        <QuickMessageModal onClose={() => setShowQuickMessageModal(false)} />
      </Modal>
      <Modal
        isVisible={showInspectPhoneModal}
        onClose={() => setShowInspectPhoneModal(false)}>
        <InspectPhoneModal onClose={() => setShowInspectPhoneModal(false)} />
      </Modal>
      <Modal
        isVisible={configureAgent}
        onClose={() => setConfigureAgent(false)}>
        <ConfigureAgent onClose={() => setConfigureAgent(false)} />
      </Modal>

      <Modal
        isVisible={filterActive}
        onClose={() => setFilterActive(false)}>
        <FilterPopup onClose={() => setFilterActive(false)} />
      </Modal>
    </div>
  )
}

export default MainAgentScreen
