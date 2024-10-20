import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDelete } from 'react-icons/ai'
import { useGlobalAuthContext } from '../AuthContext'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import Modal from '../components/Modal'
import { SubscriptionModal } from '../components/Subscription/SubscriptionModal'
import ToggleButton from '../components/ToggleButton'
import PrimaryButton from '../components/UI/Button/PrimaryButton'
import SecondaryButton from '../components/UI/Button/SecondaryButton'
import { InfoButton } from '../components/UI/InfoButton'
import Input from '../components/UI/Input'

const Subscription = () => {
  //? context
  const {
    isLoading,
    setIsLoading,
    getCookie,
    isAccessToken,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()

  //? translation
  const { t } = useTranslation()

  //? states
  const [BotToggle, setBotToggle] = useState(false)
  const [questions, setQuestions] = useState([])
  const [botToggleLoader, setBotToggleLoader] = useState(false)
  const [Loaderx, setLoaderx] = useState(false)
  const [res, setRes] = useState(false)
  const [constraint, setconstraint] = useState(false)
  const [id, setid] = useState('')
  const [haveFeature, setHaveFeature] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [isQuestionToggleLoading, setIsQuestionToggleLoading] = useState(false)

  //? router
  const router = useRouter()
  const { locale, locales, asPath } = useRouter()

  //? functions
  const alpha = () => {
    setRes(true)
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/form`
    )
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
      },
    })
      .then((res) => wrapper(res))
      .then((data) => {
        console.log(data)
        setHaveFeature(data.Have_Feature)
        setBotToggle(data.Form)
        setQuestions(data.Questions)
        setRes(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const toggle_form = () => {
    setBotToggleLoader(true)
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/form/toggle`
    )
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
      },
    })
      .then((res) => wrapper(res))
      .then((data) => {
        setBotToggle(data.Status)
        setBotToggleLoader(false)
      })
      .catch((r) => { })
  }

  const update_form = () => {
    setLoaderx(true)
    let url = new URL(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/form/update`
    )
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ Questions: questions }),
      headers: {
        Authorization: getCookie('access-token'),
        'Content-type': 'application/json',
      },
    })
      .then((res) => wrapper(res))
      .then((data) => {
        setLoaderx(false)
      })
      .catch((r) => { })
  }

  const add_question = () => {
    let newArr = [...questions]
    newArr.push({
      Question: '',
      Option: false,
      Options: [],
    })
    setQuestions(newArr)
  }

  const rem_question = (index) => {
    let newArr = [...questions]
    newArr.splice(index, 1)
    setQuestions(newArr)
  }

  const edit_question = (index, text) => {
    let newArr = [...questions]
    newArr[index].Question = text
    setQuestions(newArr)
  }

  const add_option = (index) => {
    let newArr = [...questions]
    newArr[index].Options.push('')
    setQuestions(newArr)
  }

  const rem_option = (index, option_index) => {
    let newArr = [...questions]
    newArr[index].Options.splice(option_index, 1)
    setQuestions(newArr)
  }

  const edit_option = (index, option_index, text) => {
    if (text.length < 25) {
      let newArr = [...questions]
      newArr[index].Options[option_index] = text
      setQuestions(newArr)
    }
  }

  const toggle = (index) => {
    let newArr = [...questions]
    let option = questions[index].Option
    newArr[index].Option = !option
    newArr[index].Options = !option ? [''] : []
    setQuestions(newArr)
  }

  //? effects
  useEffect(() => {
    try {
      document.getElementById(id).focus()
    } catch { }
    let length = questions.length
    let flag = false

    if (length == 0) {
      flag = true
    } else {
      for (let i = 0; i < length; i++) {
        if (questions[i].Question.length == 0) {
          flag = true
          break
        } else {
          if (questions[i].Option) {
            if (questions[i].Options.length == 0) {
              flag = true
              break
            } else {
              for (let j = 0; j < questions[i].Options.length; j++) {
                if (questions[i].Options[j].length == 0) {
                  flag = true
                  break
                }
              }
            }
          }
        }
      }
    }
    setconstraint(flag)
  }, [questions])

  useEffect(() => {
    if (isAccessToken) {
      setIsLoading(true)
      let url = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/form`
      )
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: getCookie('access-token'),
          'Content-type': 'application/json',
        },
      })
        .then((res) => wrapper(res))
        .then((data) => {
          console.log(data)
          setHaveFeature(data.Have_Feature)
          setBotToggle(data.Form)
          setQuestions(data.Questions)
          setIsLoading(false)
        })
        .catch((r) => { })
    }
  }, [isAccessToken])

  const formQuestionToggle = async (questionIndex) => {
    const tempQuestionsArray = [...questions]
    tempQuestionsArray[questionIndex].Enabled =
      !tempQuestionsArray[questionIndex].Enabled
    setQuestions(tempQuestionsArray)
    try {
      setIsQuestionToggleLoading(true)
      const config = {
        headers: {
          Authorization: getCookie('access-token'),
        },
      }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/form/question/toggle?question_index=${questionIndex}`,
        config
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    } finally {
      setIsQuestionToggleLoading(false)
    }
  }

  return (
    <MainScreenWrapper screenHeader={t('Form_heading')}>
      {isLoading || !isAccessToken ? (
        <Loader flag={isAccessToken} />
      ) : (
        <div
          className={`relative grow flex flex-col justify-center h-full text-Black dark:text-white`}>
          <Modal
            isVisible={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}>
            <SubscriptionModal />
          </Modal>
          <main className="flex flex-col items-center w-full h-full">
            <div className="flex items-center justify-center w-full grid-rows-1 justify-items-stretch ">
              <div className="flex flex-col items-center w-full ">
                <div
                  className={`flex flex-row justify-between items-end w-full h-full gap-4 py-4 px-4 rounded-xl dark:bg-bgBlack bg-white`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-sm font-semibold opacity-80 whitespace-nowrap">
                        {t && t('Form_heading')}
                      </p>{' '}
                      <p className="text-sm font-semibold opacity-80 whitespace-nowrap">
                        {BotToggle && haveFeature
                          ? t && t('Form_form_on')
                          : t && t('Form_form_off')}
                      </p>
                      <InfoButton text={t('Form_info')} />
                    </div>

                    <ToggleButton
                      toggleHandler={() => {
                        haveFeature
                          ? toggle_form()
                          : setShowSubscriptionModal(true)
                      }}
                      toggleStatus={BotToggle && haveFeature}
                      isLoading={botToggleLoader}
                      selectedLang={selectedLang}
                    />
                  </div>

                  <div className="flex flex-row gap-2">
                    <SecondaryButton
                      handleClick={() => router.push('/form/analytics')}
                      text={t && t('Form_analytics')}
                      size="small"
                    />
                    <PrimaryButton
                      disabled={constraint}
                      isLoading={Loaderx}
                      handleClick={() => update_form()}
                      text={t && t('update')}
                      size="small"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center w-full gap-4 p-0 mt-4 mb-4">
                  {questions.map((key, index) => {
                    return (
                      <div
                        key={index}
                        className="flex dark:bg-bgBlack bg-white  rounded-xl border-0 border-White dark:border-dBlack p-4  flex-col gap-2 w-[100%]">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col gap-2 mobileL:items-center mobileL:gap-8 dark:text-gray-100 mobileL:flex-row">
                            <div className="inline-flex items-center gap-2 cursor-pointer">
                              <span
                                className={`text-sm font-bold whitespace-nowrap ${key.Option ? 'text-customGray' : 'text-Blue'
                                  }`}>
                                {t('Form_text')}
                              </span>

                              <ToggleButton
                                toggleHandler={() => toggle(index)}
                                toggleStatus={key.Option}
                                isLoading={false}
                                selectedLang={selectedLang}
                                small={true}
                              />

                              <span
                                className={`text-sm font-bold whitespace-nowrap ${key.Option ? 'text-Blue' : 'text-customGray'
                                  }`}>
                                {t('Form_options')}
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-2 cursor-pointer ">
                              <span
                                className={`text-sm font-bold whitespace-nowrap ${key.Enabled ? 'text-customGray' : 'text-Blue'
                                  }`}>
                                {t('Agents_filter_disabled')}
                              </span>
                              <ToggleButton
                                toggleHandler={() => formQuestionToggle(index)}
                                toggleStatus={key.Enabled}
                                isLoading={isQuestionToggleLoading}
                                selectedLang={selectedLang}
                                small={true}
                              />
                              <span
                                className={`text-sm font-bold whitespace-nowrap ${key.Enabled ? 'text-Blue' : 'text-customGray'
                                  }`}>
                                {t('Agents_filter_enabled')}
                              </span>
                            </div>
                          </div>

                          <button
                            className="flex items-center gap-2 self-justify-end"
                            onClick={() => rem_question(index)}>
                            <AiOutlineDelete
                              color="red"
                              className="w-5 h-5 hover:scale-90"
                            />
                          </button>
                        </div>
                        <Input
                          label={
                            <span className="flex items-center justify-center gap-2">
                              <span>
                                {t('Form_question') + ' ' + (index + 1)}
                              </span>
                              {/* <button
                                onClick={() => formQuestionToggle(index)}
                                disabled={isQuestionToggleLoading}
                                className={`flex items-center justify-center p-0.5 border-[1px] border-customGray rounded-full ${
                                  isQuestionToggleLoading && 'opacity-80'
                                }`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    key.Enabled ? 'bg-Green' : 'bg-customGray'
                                  }`}
                                ></span>
                              </button> */}
                            </span>
                          }
                          type="text"
                          value={key.Question}
                          id={index}
                          onChange={(e) => edit_question(index, e.target.value)}
                        />

                        {key.Options.map((k, i) => {
                          return (
                            <div
                              key={index + 'o' + i}
                              className="flex flex-row items-end gap-2">
                              <button
                                className="flex items-center gap-2 pb-4 self-justify-end"
                                onClick={() => rem_option(index, i)}>
                                <AiOutlineDelete
                                  color="red"
                                  className="w-5 h-5 hover:scale-90"
                                />
                              </button>

                              <Input
                                label={t && t('Form_option') + ' ' + (i + 1)}
                                type="text"
                                value={k}
                                id={i}
                                onChange={(e) =>
                                  edit_option(index, i, e.target.value)
                                }
                              />
                            </div>
                          )
                        })}

                        <div className="flex flex-row justify-end">
                          {key.Option && key.Options.length < 9 ? (
                            <SecondaryButton
                              handleClick={() => add_option(index)}
                              text="+"
                              size="small"
                              width="[40%]"
                              height="fit"
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    )
                  })}

                  <div className="flex flex-row dark:bg-bgBlack bg-white  rounded-xl border-0 border-White dark:border-dBlack p-4  gap-2 w-[100%]">
                    <SecondaryButton
                      disabled={res}
                      isLoading={res}
                      handleClick={() => alpha()}
                      text={t('Form_button_reset')}
                      size="small"
                    />
                    <PrimaryButton
                      handleClick={() => add_question()}
                      text={'+ ' + (t && t('Form_question'))}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </MainScreenWrapper>
  )
}

export default Subscription
