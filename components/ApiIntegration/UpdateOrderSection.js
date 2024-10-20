import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atelierForestLight,
  stackoverflowDark,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import PrimaryButton from '../UI/Button/PrimaryButton'

//

import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { AiFillCaretDown } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalApiIntegrationContext } from '../../contexts/ApiIntegrationContext'
import Dropdown from '../UI/Dropdown'

const Languages = [
  'NodeJS - Axios',
  'cURL',
  'Python - Requests',
  'JavaScript - Fetch',
  'Dart - http',
]

const ORDER_STATUS = [
  'Packed',
  'Shipped',
  'Reached Nearest Hub',
  'Out For Delivery',
  'Delivered',
  'Cancelled',
  'Returned',
  'Replaced',
  'Refunded',
]

const UpdateOrderSection = () => {
  const {
    buisnessDetails,
    getCookie,
    headerWarning,
    setHeaderWarning,
    setProgressActive,
    isAccessToken,
    selectedLang,
    wrapper,
  } = useGlobalAuthContext()
  const {
    apiKey,
    setApiKey,
    orderId,
    setOrderId,
    statusInput,
    setStatusInput,
    Order,
    setOrder,
    api,
    setApi,
    update,
    setUpdate,
  } = useGlobalApiIntegrationContext()
  const { t } = useTranslation()
  const [date, setDate] = useState('')
  const [init, setInit] = useState('')
  // const [update, setUpdate] = useState('')

  // const [statusInput, setStatusInput] = useState('Shipped')

  //
  const [topAleart, setTopAleart] = useState(null)
  const [showDropdownStatus, setShowDropdownStatus] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [selectedCodeLang, setSelectedCodeLang] = useState('NodeJS - Axios')

  const UPDATE_CODE = [
    {
      lang: 'NodeJS - Axios',
      codeLang: 'javascript',
      code: `
var axios = require('axios');
var data = JSON.stringify({
  "State": ${statusInput},
  "State_ar": ${statusInput}(ar),
  "Order_ID": ${Order.Order_ID}
});

var config = {
  method: 'post',
  url: '${update}',
  headers: { 
    'Authorization': '"Bearer ${apiKey}"', 
    'Content-Type': 'application/json', 
    'accept': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});         
          `,
    },
    {
      lang: 'cURL',
      codeLang: 'bash',
      code: `
curl --location --request POST '${update}' \
--header 'Authorization: "Bearer ${apiKey}"' \
--header 'Content-Type: application/json' \
--header 'accept: application/json' \
--data-raw '{
    "State" : ${statusInput},
    "State_ar": ${statusInput}(ar), 
    "Order_ID":${Order.Order_ID}
}'
      `,
    },
    {
      lang: 'Python - Requests',
      codeLang: 'python',
      code: `
import requests
import json

url = "${update}"

payload = json.dumps({
  "State": ${statusInput},
  "State_ar": ${statusInput}(ar),
  "Order_ID": ${Order.Order_ID}
})
headers = {
  'Authorization': '"Bearer ${apiKey}"',
  'Content-Type': 'application/json',
  'accept': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
          `,
    },
    {
      lang: 'JavaScript - Fetch',
      codeLang: 'javascript',
      code: `
var myHeaders = new Headers();
myHeaders.append("Authorization", "\"Bearer ${apiKey}\"");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("accept", "application/json");

var raw = JSON.stringify({
  "State": ${statusInput},
  "State_ar": ${statusInput}(ar),
  "Order_ID": ${Order.Order_ID}
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("${update}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
          `,
    },
    {
      lang: 'Dart - http',
      codeLang: 'dart',
      code: `
var headers = {
  'Authorization': '"Bearer ${apiKey}"',
  'Content-Type': 'application/json',
  'accept': 'application/json'
};
var request = http.Request('POST', Uri.parse('${update}'));
request.body = json.encode({
  "State": ${statusInput},
  "State_ar": ${statusInput}(ar),
  "Order_ID": ${Order.Order_ID}
});
request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

if (response.statusCode == 200) {
  print(await response.stream.bytesToString());
}
else {
  print(response.reasonPhrase);
}
          
          `,
    },
  ]

  function isValidPhonenumber(value) {
    let val = value.trim()
    let check1 = !(val == '' || isNaN(val))
    let check2 = val.length > 6 && val.length < 16
    return check1 && check2
  }

  const updateOrder = async () => {
    setTopAleart(null)
    setIsApiLoading(true)
    var data = {
      State: statusInput,
      State_ar: statusInput + '(ar)',
      Order_ID: Order.Order_ID,
    }

    var config = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    try {
      const res = await axios.post(api[1].EndPoint + '?demo=true', data, config)

      if (res.data.Success) {
        setTopAleart({
          title: 'Success',
          message: 'Integration_message_OrderStatus',
        })
      } else {
        setTopAleart({
          title: 'Failed',
          message: 'Failed',
        })
      }
    } catch (err) {
      console.log(err)

      setTopAleart({ title: `Error ${err.response.status}` })

      if (err.response.status == 403) {
        setTopAleart({
          ...topAleart,
          message: t && t('Integration_message_InvalidKey'),
        })
      } else if (err.response.status == 402) {
        setTopAleart({
          ...topAleart,
          message: t && t('Integration_message_InsBal'),
        })
      } else if (err?.response?.status == 410) {
        setTopAleart({
          ...topAleart,
          message: t && t('Integration_message_ExpSub'),
        })
      } else if (err.response.status == 500) {
        setTopAleart({
          ...topAleart,
          message: t && t('Integration_message_OrderIdNot'),
        })
      } else {
        setTopAleart({
          ...topAleart,
          message: t && t('Integration_message_500'),
        })
      }
    } finally {
      setIsApiLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4 pt-14">
      <div className="flex flex-col items-center justify-between w-full gap-4 tabletS:flex-row">
        <p className="text-xl font-bold">
          2. {t('Integration_updateorderendpoint')}
        </p>
        <div className="flex gap-3">
          <PrimaryButton
            disabled={isApiLoading}
            isLoading={isApiLoading}
            handleClick={updateOrder}
            text={t('Integration_testupdateapi')}
          />
        </div>
      </div>
      {topAleart && (
        <div className="flex flex-row justify-between w-full gap-2 px-4 py-2 bg-Green dark:bg-Green/60 rounded-xl">
          <p className="text-lg font-bold text-white ">
            {t(topAleart?.message)} <br />
          </p>
          <button
            onClick={() => setTopAleart(null)}
            className="rounded-[5px] text-2xl bg-black/50  text-white right-2">
            <IoClose />
          </button>
        </div>
      )}

      <div className="w-full my-4">
        <p className="text-lg font-semibold">
          {t && t('Integration_orderstatus')}
        </p>
        <div className="relative flex items-center w-full">
          <input
            name="statusInput"
            id="statusInput"
            value={statusInput}
            type="phone"
            onChange={(e) => setStatusInput(e.target.value)}
            // placeholder="Contact"
            className={`p-2 bg-transparent w-full border-2  dark:bg-dBlack  dark:text-White dark:border-White/20 border-BlackTer outline-0 focus-visible:border-blue-500 dark:focus-visible:border-blue-500 placeholder:text-Black/70 dark:placeholder:text-White/70 py-2 rounded-[10px] shadow-sm
        }`}
          />
          <button
            onClick={() => setShowDropdownStatus(!showDropdownStatus)}
            className={`absolute text-2xl ${selectedLang == 'ar' ? 'left-2' : 'right-2'
              }`}>
            <AiFillCaretDown
              className={`transition-all duration-300 ${showDropdownStatus && 'rotate-180'
                }`}
            />
          </button>
          {showDropdownStatus && (
            <ul className="absolute left-0 right-0 flex flex-col rounded-xl font-semibold text-center  border-Black dark:bg-bgBlack border-[1px] border-black/10 dark:border-white/10 shadow dark:text-White bg-white text-Black  top-14 ">
              {ORDER_STATUS.map((item) => {
                return (
                  <li
                    key={item}
                    className="py-3 border-b-[1px] dark:border-White/20 border-Black/20 rounded-xl dark:hover:bg-bgBlackSec/60 hover:bg-bgWhiteSec/60  cursor-pointer  "
                    onClick={(e) => {
                      setStatusInput(e.target.innerText)
                      setShowDropdownStatus(false)
                    }}>
                    {item}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start w-full ">
        <div className="hidden tabletS:flex  justify-between w-full bg-gray-300 rounded-t-xl dark:bg-[#1B2431] ">
          {Languages.map((item) => {
            return (
              <button
                onClick={() => setSelectedCodeLang(item)}
                key={item}
                className={` ${selectedCodeLang == item
                    ? 'bg-WhiteSec dark:bg-bgBlackSec'
                    : ''
                  } ${'NodeJS - Axios' == item
                    ? selectedLang == 'en'
                      ? 'rounded-tl-xl'
                      : 'rounded-tr-xl'
                    : ''
                  } ${'Dart - http' == item
                    ? selectedLang == 'en'
                      ? 'rounded-tr-xl'
                      : 'rounded-tl-xl'
                    : ''
                  }   px-3 py-2 w-full hover:bg-WhiteSec dark:hover:bg-bgBlackSec`}>
                {item}
              </button>
            )
          })}
        </div>
        <div className="flex tabletS:hidden  justify-between w-full bg-gray-300 rounded-xl dark:bg-[#1B2431] ">
          <Dropdown
            value={selectedCodeLang}
            onSelect={(lang) => setSelectedCodeLang(lang)}
          />
        </div>
        <div className="w-full h-full rounded-b-xl max-h-[500px] overflow-x-hidden ltr hidden dark:block">
          {UPDATE_CODE.map((item) => {
            if (selectedCodeLang == item.lang)
              return (
                <SyntaxHighlighter
                  lineProps={{
                    style: {
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                    },
                  }}
                  wrapLines={true}
                  language={item.codeLang}
                  style={stackoverflowDark}
                  key={item.lang}>
                  {item.code}
                </SyntaxHighlighter>
              )
          })}
        </div>
        <div className="w-full h-full rounded-b-xl max-h-[500px] overflow-x-hidden ltr block dark:hidden">
          {UPDATE_CODE.map((item) => {
            if (selectedCodeLang == item.lang)
              return (
                <SyntaxHighlighter
                  lineProps={{
                    style: {
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                    },
                  }}
                  wrapLines={true}
                  language={item.codeLang}
                  style={atelierForestLight}
                  key={item.lang}>
                  {item.code}
                </SyntaxHighlighter>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default UpdateOrderSection
