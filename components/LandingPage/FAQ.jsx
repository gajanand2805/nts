import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import SectionHeading from './common/SectionHeading'
const FAQ = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: t('landing_faq_activatemynumber_question'),
      answer: t('landing_faq_activatemynumber_answer'),
    },
    {
      question: t('landing_faq_deletemyWhatsAppnumber_question'),
      answer: t('landing_faq_deletemyWhatsAppnumber_answer'),
    },
    {
      question: t('landing_faq_finishedmy1000messages_question'),
      answer: t('landing_faq_finishedmy1000messages_answer'),
    },
    {
      question: t('landing_faq_youmeanbysaying1000messages_question'),
      answer: t('landing_faq_youmeanbysaying1000messages_answer'),
    },
    {
      question: t('landing_faq_Howmanychatbotchart_question'),
      answer: t('landing_faq_Howmanychatbotchart_answer'),
    },
    {
      question: t('landing_faq_blockmynumber_question'),
      answer: t('landing_faq_blockmynumber_answer'),
    },
    {
      question: t('landing_faq_muchyouchargeonmarketingcampaigns_question'),
      answer: t('landing_faq_muchyouchargeonmarketingcampaigns_answer'),
    },
    {
      question: t('landing_faq_youusemydata_question'),
      answer: t('landing_faq_youusemydata_answer'),
    },
  ]

  const toggleAccordion = (index) => {
    console.log(index)
    if (index === activeIndex) {
      setActiveIndex(null)
    } else {
      setActiveIndex(index)
    }
  }
  return (
    <div
      id="faq"
      className="relative z-30 flex flex-col items-center gap-10 mb-5 bg-white tablet:py-20 tablet:gap-10 tablet:px-12 laptop:px-12 laptopL:px-20 py-10  px-5 w-full font-josefinSans max-w-[1800px]">
      <SectionHeading heading={t('landing_faq_header')} />
      <div className="grid w-full grid-cols-1 place-items-center ">
        {faqs.map((faq, index) => (
          <div
            onClick={() => toggleAccordion(index)}
            key={index}
            className="w-full flex flex-col items-start cursor-pointer justify-start bg-white border-b-[3px] border-gray-300  px-4 py-5 gap-3 transition-all duration-300 ease-in-out max-w-4xl">
            <div className="flex items-center justify-center w-full gap-4">
              <h3 className="w-full font-bold tablet:text-2xl  text-[#626262] ">
                {faq.question}
              </h3>
              <button className="p-2 text-3xl rounded-full ">
                <FiChevronDown
                  className={`${
                    activeIndex === index && 'rotate-180'
                  } transition-all duration-300 ease-in-out`}
                />
              </button>
            </div>

            {activeIndex === index && (
              <p className="text-[#626262] text-xl">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
