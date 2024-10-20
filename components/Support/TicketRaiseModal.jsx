import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalSupportContext } from '../../contexts/SupportContext'
import Modal from '../Modal'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'
import Input from '../UI/Input'

export const TicketRaiseModal = ({ isOpenModal, setIsOpenModal }) => {
  //? contexts
  const { raiseTicket, isSupportLoading, addTicketLoading } =
    useGlobalSupportContext()
  const { t } = useTranslation()

  //? states
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({
    topicInputError: '',
    descriptionInputError: '',
  })

  //? functions
  const resetErrors = () => {
    setErrors({
      topicInputError: '',
      descriptionInputError: '',
    })
  }

  console.log(
    'topic: ',
    topic === '' ? true : false,
    'description: ',
    description
  )

  return (
    isOpenModal && (
      <Modal
        isVisible={isOpenModal}
        onClose={() => setIsOpenModal(false)}>
        <div className="flex flex-col bg-white dark:bg-bgBlack w-[90%] max-w-[400px] p-7 gap-2 rounded-2xl">
          <p className="font-bold text-lg text-center">
            {t('support_ticket_heading')}
          </p>
          <Input
            label={t('support_ticket_topic')}
            name={'topic'}
            placeholder={t('support_ticket_topic_placeholder')}
            onChange={(e) => {
              resetErrors()
              setTopic(e.target.value)
            }}
            value={topic}
            type={'text'}
            id={'topic'}
            error={errors.topicInputError}
          />
          <Input
            label={t('support_ticket_description')}
            name={'description'}
            placeholder={t('support_ticket_description_placeholder')}
            onChange={(e) => {
              resetErrors()
              setDescription(e.target.value)
            }}
            value={description}
            type={'text'}
            id={'description'}
            error={errors.descriptionInputError}
          />
          <div className="flex flex-row gap-4 w-full mt-5">
            <SecondaryButton
              text={t('support_ticket_cancel')}
              handleClick={async () => setIsOpenModal(false)}
              disabled={false}
              isLoading={false}
            />

            <PrimaryButton
              text={t('support_ticket_create')}
              handleClick={async () => {
                if (topic === '') {
                  setErrors((prevProps) => {
                    return {
                      ...prevProps,
                      topicInputError: t('support_error_topic_required'),
                    }
                  })
                }
                if (description === '') {
                  setErrors((prevProps) => {
                    return {
                      ...prevProps,
                      descriptionInputError: t(
                        'support_error_description_required'
                      ),
                    }
                  })
                } else {
                  await raiseTicket({ topic, description })
                  setIsOpenModal(false)
                }
              }}
              disabled={addTicketLoading}
              isLoading={addTicketLoading}
            />
          </div>
        </div>
      </Modal>
    )
  )
}
