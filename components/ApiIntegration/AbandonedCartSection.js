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
import { IoClose } from 'react-icons/io5'
import { useGlobalAuthContext } from '../../AuthContext'
import { useGlobalApiIntegrationContext } from '../../contexts/ApiIntegrationContext'
import CountryCodeOption from '../../static/CountryCodeOption'
import Modal from '../Modal'
import { SubscriptionModal } from '../Subscription/SubscriptionModal'
import Dropdown from '../UI/Dropdown'
import Input from '../UI/Input'

const Languages = [
  'NodeJS - Axios',
  'cURL',
  'Python - Requests',
  'JavaScript - Fetch',
  'Dart - http',
]

const AbandonedCartSection = () => {
  const { selectedLang } = useGlobalAuthContext()
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    apiKey,
    templateLang,
    api,
    abandonedCart,
    redirectLink,
    setRedirectLink,
    haveAbandonedCartFeature,
  } = useGlobalApiIntegrationContext()
  const { t } = useTranslation()

  const [topAleart, setTopAleart] = useState(null)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [selectedCodeLang, setSelectedCodeLang] = useState('NodeJS - Axios')
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

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

  const abandonedCartApi = async () => {
    setTopAleart(null)
    if (!haveAbandonedCartFeature) {
      setShowSubscriptionModal(true)
      return
    }

    setIsApiLoading(true)
    var data = {
      country_code: countryCode,
      phone: phoneNumber,
      link: redirectLink,
      lang: templateLang,
    }
    var config = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    try {
      const res = await axios.post(api[2].EndPoint, data, config)

      if (res.data.Success) {
        setTopAleart({
          title: 'Success',
          message:
            'Abandoned cart API called successfully, check WhatsApp on the provided phone number.',
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
        <Modal
          isVisible={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}>
          <SubscriptionModal />
        </Modal>

        <p className="text-xl font-bold">
          3. {t('Integration_abandonecartendpoint')}
        </p>
        <div className="flex gap-3">
          <PrimaryButton
            disabled={isApiLoading}
            isLoading={isApiLoading}
            handleClick={abandonedCartApi}
            text={t('Integration_testabandonedcartapi')}
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
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-col w-full gap-2 my-4">
          <p className="text-base font-semibold text-BlackSec">
            {t('Integration_whatsappphonenumberabandonecart')}
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
        <Input
          label={t('Integration_redirectlink')}
          type="text"
          name="RedirectLink"
          id="RedirectLink"
          value={redirectLink}
          onChange={(e) => setRedirectLink(e.target.value)}
        />
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
        <div className="w-full h-full rounded-b-xl max-h-[500px] overflow-x-hidden ltr block dark:hidden">
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
    </div>
  )
}

export default AbandonedCartSection
