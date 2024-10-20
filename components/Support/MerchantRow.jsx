import { useRouter } from 'next/router'
import { BsArrowRightShort } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

export const MerchantRow = ({
  date_time,
  status,
  merchant_counter,
  support_counter,
  topic,
  ticket_id,
  merchant_id,
}) => {
  //? router
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <tr
      key={ticket_id}
      className="bg-white border-b rounded-md dark:bg-bgBlack/60 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dBlack/60">
      <td className="px-6 py-4">
        <p className="text-center capitalize">
          {topic.trim() == '' ? '-' : topic}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center items-center">
          <p
            className={`flex text-sm capitalize justify-center items-center border rounded-full px-3 py-1  ${
              status === 'open'
                ? 'text-green-500 border-green-500'
                : status === 'closed'
                  ? 'text-red-500 border-red-500'
                  : status === 'init'
                    ? 'text-Blue border-Blue'
                    : ''
            }`}>
            {status}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 flex justify-center">
        <div className="w-6 h-6 flex justify-center items-center">
          <p className="p-1">{support_counter}</p>
        </div>
      </td>
      <td className="px-6 py-4 ">
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              router.push(`/support/${ticket_id}`)
            }}
            className="flex relative items-center justify-center group text-Blue gap-0 text-center">
            <span className="">{t('support_view')}</span>
            <BsArrowRightShort className="h-6 w-6 absolute duration-300 -right-5 group-hover:-right-6" />
          </button>
        </div>
      </td>
    </tr>
  )
}
