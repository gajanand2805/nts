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

const CreateOrderCode = () => {
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

  const init = 'https://api.invobot.net/Integration/v1.0/order/(Merchant_ID)'
  const apiKey = 'API_KEY'

  const POST_CODE = [
    {
      lang: 'NodeJS - Axios',
      codeLang: 'javascript',
      code: `
    var axios = require('axios');
    var data = JSON.stringify({
    "Contact": "${Order.Contact}",
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
  )
}

export default CreateOrderCode
