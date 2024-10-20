import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atelierForestLight,
  stackoverflowDark,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { useGlobalAuthContext } from '../../../../AuthContext'
import Dropdown from '../../../UI/Dropdown'

const Languages = [
  'NodeJS - Axios',
  'cURL',
  'Python - Requests',
  'JavaScript - Fetch',
  'Dart - http',
]

const AbandonedCartCode = () => {
  const [selectedCodeLang, setSelectedCodeLang] = useState('NodeJS - Axios')
  const { selectedLang } = useGlobalAuthContext()
  const date = new Date().toISOString()
  const [Order, setOrder] = useState({
    Contact: '',
    Billing_Address: {
      Address_line1: 'House 30, Maathar street',
      Address_line2: 'Buraydah',
      Address_line3: 'Al Qasim Province',
    },
    Currency: 'SAR',
    Items: [
      {
        Description: 'LRD diode',
        Unit_Price: 200,
        Quantity: 2,
        Discount: 40,
        Tax: 20,
        Total: 392,
      },
      {
        Description: 'arduino pro mini',
        Unit_Price: 100,
        Quantity: 1,
        Discount: 40,
        Tax: 20,
        Total: 2460,
      },
    ],
    Order_ID: '12345',
    Order_Date: '12 December',
    Shipping_Address: {
      Address_line1: 'House 16, Maathar street',
      Address_line2: 'Buraydah',
      Address_line3: 'Al Qasim Province',
    },
    // "Currency": "INR",
    Total: 620,
    Subtotal: 520,
    Shipping: 22,
    Discount: 20,
    Tax: 50,
    lang: selectedLang == 'en' ? 'en' : 'ar',
    Payment_Method: 'Prepaid',
  })

  const abandonedCart =
    'https://api.invobot.net/Integration/v1.0/abandoned/(Merchant_ID)'
  const apiKey = 'API_KEY'
  const countryCode = '+91'
  const phoneNumber = '8888888888'
  const redirectLink = 'www.google.com'
  const templateLang = 'EN'

  const ABANDONED_CART_CODE = [
    {
      lang: 'NodeJS - Axios',
      codeLang: 'javascript',
      code: `
  var axios = require('axios');
  var data = JSON.stringify({
    "country_code": ${countryCode},
    "phone": ${phoneNumber},
    "link": "${redirectLink}",
    "lang": "${templateLang}"
  });

  var config = {
    method: 'post',
    url: '${abandonedCart}',
    headers: { 
      'accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': "Bearer ${apiKey}"
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
  curl --location --request POST '${abandonedCart}' \
  --header 'accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: "Bearer ${apiKey}"' \
  --data-raw '{
      "country_code": ${countryCode},
      "phone": ${phoneNumber},
      "link": "${redirectLink}",
      "lang": "${templateLang}"
  }'
          `,
    },
    {
      lang: 'Python - Requests',
      codeLang: 'python',
      code: `
  import requests
  import json

  url = "${abandonedCart}"

  payload = json.dumps({
    "country_code": ${countryCode},
    "phone": ${phoneNumber},
    "link": "${redirectLink}",
    "lang": "${templateLang}"
  })
  headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer ${apiKey}"
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
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer ${apiKey}");

  var raw = JSON.stringify({
    "country_code": ${countryCode},
    "phone": ${phoneNumber},
    "link": "${redirectLink}",
    "lang": "${templateLang}"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("${abandonedCart}", requestOptions)
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
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer ${apiKey}"
  };
  var request = http.Request('POST', Uri.parse('${abandonedCart}'));
  request.body = json.encode({
    "country_code": ${countryCode},
    "phone": ${phoneNumber},
    "link": "${redirectLink}",
    "lang": "${templateLang}"
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

  return (
    <div className="flex flex-col items-start w-full ">
      <div className="hidden tabletS:flex  justify-between w-full bg-gray-300 rounded-t-xl dark:bg-[#1B2431] ">
        {Languages.map((item) => {
          return (
            <button
              onClick={() => setSelectedCodeLang(item)}
              key={item}
              className={` ${selectedCodeLang == item ? 'bg-WhiteSec dark:bg-bgBlackSec' : ''
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
        {ABANDONED_CART_CODE.map((item) => {
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
        {ABANDONED_CART_CODE.map((item) => {
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
  )
}

export default AbandonedCartCode
