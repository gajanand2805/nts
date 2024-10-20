import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atelierForestLight,
  stackoverflowDark,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import PrimaryButton from '../UI/Button/PrimaryButton'
import SecondaryButton from '../UI/Button/SecondaryButton'

//
import { useRouter } from 'next/router'

import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalApiIntegrationContext } from '../../contexts/ApiIntegrationContext'
import CountryCodeOption from '../../static/CountryCodeOption'
import Dropdown from '../UI/Dropdown'

const Languages = [
  'NodeJS - Axios',
  'cURL',
  'Python - Requests',
  'JavaScript - Fetch',
  'Dart - http',
]
const CreateOrderSection = () => {
  const router = useRouter()
  const { selectedLang } = useGlobalAuthContext()
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    apiKey,
    setApiKey,
    orderId,
    setOrderId,
    Order,
    setOrder,
    api,
    setApi,
    date,
    setDate,
    init,
    setInit,
    codeLangSelection,
    setCodeLangSelection,
  } = useGlobalApiIntegrationContext()
  const { t } = useTranslation()
  const [topAleart, setTopAleart] = useState(null)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [showCustomiseModal, setShowCustomiseModal] = useState(false)
  const [selectedCodeLang, setSelectedCodeLang] = useState('NodeJS - Axios')
  const POST_CODE = [
    {
      lang: 'NodeJS - Axios',
      codeLang: 'javascript',
      code: `
var axios = require('axios');
var data = JSON.stringify({
"Contact": ${Order.Contact},
"Billing_Address":{
    "Address_line1": "${Order.Billing_Address.Address_line1}",
    "Address_line2": "${Order.Billing_Address.Address_line2}",
    "Address_line3": "${Order.Billing_Address.Address_line3}"
},
"Currency": "${Order.Currency}",
"Items": [${Order.Items.map((item) => {
        return `{
    "Description": "${item.Description}",
    "Unit_Price": ${item.Unit_Price}
    "Quantity": ${item.Quantity},
    "Discount": ${item.Discount},
    "Tax": ${item.Tax},
    "Total": ${item.Total},
    }`
      })}],
"Order_Date":"${date}",
"Order_ID":${Order.Order_ID},
"Shipping_Address":{
    "Address_line1": "${Order.Shipping_Address.Address_line1}",
    "Address_line2": "${Order.Shipping_Address.Address_line2}",
    "Address_line3": "${Order.Shipping_Address.Address_line3}"
},
"Total": ${Order.Total},
"Subtotal": ${Order.Subtotal},
"Shipping": ${Order.Shipping},
"Discount": ${Order.Discount},
"Tax": ${Order.Tax},
"lang": "${Order.lang}",
"Payment_Method":"${Order.Payment_Method}"

});

var config = {
method: 'post',
url: '${init}',
headers: { 
    'Authorization': 'Bearer ${apiKey}', 
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
curl --location --request POST '${init}' \
--header 'Authorization: Bearer ${apiKey}' \
--header 'Content-Type: application/json' \
--header 'accept: application/json' \
--data-raw '{
"Contact": ${Order.Contact},
"Billing_Address":{
    "Address_line1": "${Order.Billing_Address.Address_line1}",
    "Address_line2": "${Order.Billing_Address.Address_line2}",
    "Address_line3": "${Order.Billing_Address.Address_line3}"
},
"Currency":"${Order.Currency}",
"Items": [${Order.Items.map((item) => {
        return `{
        "Description": "${item.Description}",
        "Unit_Price": ${item.Unit_Price}
        "Quantity": ${item.Quantity},
        "Discount": ${item.Discount},
        "Tax": ${item.Tax},
        "Total": ${item.Total},
    }`
      })}],
"Order_Date":"${date}",
"Order_ID":${Order.Order_ID},
"Shipping_Address":{
    "Address_line1": "${Order.Shipping_Address.Address_line1}",
    "Address_line2": "${Order.Shipping_Address.Address_line2}",
    "Address_line3": "${Order.Shipping_Address.Address_line3}"
},
"Total": ${Order.Total},
"Subtotal": ${Order.Subtotal},
"Shipping": ${Order.Shipping},
"Discount": ${Order.Discount},
"Tax": ${Order.Tax},
"lang": "${Order.lang}",
"Payment_Method":"${Order.Payment_Method}"

}'
          `,
    },
    {
      lang: 'Python - Requests',
      codeLang: 'python',
      code: `
import requests
import json

url = "${init}"

payload = json.dumps({
"Contact": ${Order.Contact},
    "Billing_Address":{
    "Address_line1": "${Order.Billing_Address.Address_line1}",
    "Address_line2": "${Order.Billing_Address.Address_line2}",
    "Address_line3": "${Order.Billing_Address.Address_line3}"
    },
    "Currency": "${Order.Currency}",
    "Items": [${Order.Items.map((item) => {
        return `{
        "Description": "${item.Description}",
    "Unit_Price": ${item.Unit_Price}
    "Quantity": ${item.Quantity},
    "Discount": ${item.Discount},
    "Tax": ${item.Tax},
    "Total": ${item.Total},
    }`
      })}],
    "Order_Date":"${date}",
    "Order_ID":${Order.Order_ID},
    "Shipping_Address":{
    "Address_line1": "${Order.Shipping_Address.Address_line1}",
    "Address_line2": "${Order.Shipping_Address.Address_line2}",
    "Address_line3": "${Order.Shipping_Address.Address_line3}"
    },
    "Total": ${Order.Total},
    "Subtotal": ${Order.Subtotal},
    "Shipping": ${Order.Shipping},
    "Discount": ${Order.Discount},
    "Tax": ${Order.Tax},
    "lang": "${Order.lang}",
    "Payment_Method":"${Order.Payment_Method}"

})
headers = {
'Authorization': 'Bearer ${apiKey}',
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
myHeaders.append("Authorization", "Bearer ${apiKey}");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("accept", "application/json");

var raw = JSON.stringify({
"Contact": ${Order.Contact},
"Billing_Address":{
    "Address_line1": "${Order.Billing_Address.Address_line1}",
    "Address_line2": "${Order.Billing_Address.Address_line2}",
    "Address_line3": "${Order.Billing_Address.Address_line3}"
},
"Currency": "${Order.Currency}",
"Items": [${Order.Items.map((item) => {
        return `{
        "Description": "${item.Description}",
        "Unit_Price": ${item.Unit_Price}
        "Quantity": ${item.Quantity},
        "Discount": ${item.Discount},
        "Tax": ${item.Tax},
        "Total": ${item.Total},
    }`
      })}],
"Order_Date":"${date}",
"Order_ID":${Order.Order_ID},
"Shipping_Address":{
    "Address_line1": "${Order.Shipping_Address.Address_line1}",
    "Address_line2": "${Order.Shipping_Address.Address_line2}",
    "Address_line3": "${Order.Shipping_Address.Address_line3}"
},
"Total": ${Order.Total},
"Subtotal": ${Order.Subtotal},
"Shipping": ${Order.Shipping},
"Discount": ${Order.Discount},
"Tax": ${Order.Tax},
"lang": "${Order.lang}",
"Payment_Method":"${Order.Payment_Method}"

});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("${init}", requestOptions)
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
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json',
    'accept': 'application/json'
};
var request = http.Request('POST', Uri.parse('${init}'));
request.body = json.encode({
    "Contact": ${Order.Contact},
    "Billing_Address":{
        "Address_line1": "${Order.Billing_Address.Address_line1}",
        "Address_line2": "${Order.Billing_Address.Address_line2}",
        "Address_line3": "${Order.Billing_Address.Address_line3}"
    },
    "Currency": "${Order.Currency}",
    "Items": [${Order.Items.map((item) => {
        return `{
        "Description": "${item.Description}",
        "Unit_Price": ${item.Unit_Price}
        "Quantity": ${item.Quantity},
        "Discount": ${item.Discount},
        "Tax": ${item.Tax},
        "Total": ${item.Total},
        }`
      })}],
    "Order_Date":"${date}",
    "Order_ID":${Order.Order_ID},
    "Shipping_Address":{
        "Address_line1": "${Order.Shipping_Address.Address_line1}",
        "Address_line2": "${Order.Shipping_Address.Address_line2}",
        "Address_line3": "${Order.Shipping_Address.Address_line3}"
    },
    "Total": ${Order.Total},
    "Subtotal": ${Order.Subtotal},
    "Shipping": ${Order.Shipping},
    "Discount": ${Order.Discount},
    "Tax": ${Order.Tax},
    "lang": "${Order.lang}",
    "Payment_Method":"${Order.Payment_Method}"
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

  const testOrder = async () => {
    setTopAleart(null)
    if (isValidPhonenumber(Order.Contact)) {
      setIsApiLoading(true)
      var config = {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
      try {
        const res = await axios.post(
          api[0].EndPoint + '?demo=true',
          Order,
          config
        )
        console.log(res)

        if (res.data.Success) {
          setTopAleart({
            title: 'Success',
            message: 'Integration_message_OrderCreated',
          })
        } else {
          setTopAleart({
            title: 'Failed',
            message: 'Failed',
          })
        }
      } catch (err) {
        setTopAleart({ title: `Error code ${err?.response?.status}` })

        if (err?.response?.status == 403) {
          setTopAleart({
            ...topAleart,
            message: 'Integration_message_InvalidKey',
          })
        } else if (err?.response?.status == 402) {
          setTopAleart({ ...topAleart, message: 'Integration_message_InsBal' })
        } else if (err?.response?.status == 410) {
          setTopAleart({ ...topAleart, message: 'Integration_message_ExpSub' })
        } else if (err?.response?.status == 500) {
          setTopAleart({
            ...topAleart,
            message: 'Integration_message_OrderIdExist',
          })
        } else {
          setTopAleart({ ...topAleart, message: 'Integration_message_500' })
        }
        console.log(err)
      } finally {
        setIsApiLoading(false)
      }
    } else {
      setTopAleart({ message: 'Integration_message_EnterValidPhone' })
    }
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full gap-4 pt-14">
        <div className="flex flex-col items-center justify-between w-full gap-4 tabletS:flex-row">
          <p className="text-xl font-bold">
            1. {t('Integration_createorderendpoint')}
          </p>
          <div className="flex gap-3">
            <SecondaryButton
              handleClick={() =>
                router.push('/api_integration/customise_order')
              }
              text={t('Integration_customizeorder')}
            />
            <PrimaryButton
              isLoading={isApiLoading}
              disabled={isApiLoading}
              handleClick={testOrder}
              text={t('Integration_testorderapi')}
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

        <div className="flex flex-col gap-2 my-4">
          <p className="text-base font-semibold capitalize text-BlackSec">
            {t && t('Integration_whatsappphonenumber')}
          </p>
          <div
            className={`flex w-full overflow-hidden bg-transparent  border-collapse rounded-[10px]  border-Black/70 dark:border-White/70 ${selectedLang == 'ar' && 'flex-row-reverse'
              }`}>
            <select
              className={`w-44 bg-transparent text-sm ltr     p-2 bg-transparentpx-4 bg-white dark:bg-dBlack  dark:text-White dark:border-White/20 border-2 py-2 rounded-l-[10px] border-r-0 shadow-sm border-[BlackTer] text-Black outline-0 focus-visible:border-2`}
              onChange={(e) => {
                setCountryCode(e.target.value)
              }}
              value={countryCode}>
              <CountryCodeOption />
            </select>
            <input
              name="contact"
              id="contact"
              value={phoneNumber}
              type="phone"
              onChange={(e) => {
                if (!isNaN(e.target.value.trim())) {
                  setPhoneNumber(e.target.value.trim())
                }
              }}
              placeholder={t('Integration_phonenumber')}
              className={` w-full p-2 bg-transparentpx-4 bg-white dark:bg-dBlack  dark:text-White dark:border-White/20 dark:placeholder:text-White border-2 py-2 rounded-r-[10px] shadow-sm border-[BlackTer] text-Black outline-0 focus-visible:border-2   placeholder:text-BlackSec placeholder:text-[15px] ltr
          }`}
            />
          </div>
        </div>
        {/*  */}

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
          <div className="w-full h-full max-h-[500px] rounded-b-xl overflow-x-hidden ltr hidden dark:block">
            {POST_CODE.map((item) => {
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
          <div className="w-full h-full max-h-[500px] rounded-b-xl overflow-x-hidden ltr block dark:hidden">
            {POST_CODE.map((item) => {
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
    </>
  )
}

export default CreateOrderSection
