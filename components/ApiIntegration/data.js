export const ORDER = {
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
  Order_ID: orderId,
  Order_Date: date,
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
  lang: selectedLang == 'en' ? 'en' : 'hi',
  Payment_Method: 'Prepaid',
}

export const POST_CODE = [
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
    "Order_ID":${'Order.Order_ID'},
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
      'Authorization': 'Bearer ${inputTokken}', 
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
  --header 'Authorization: Bearer ${inputTokken}' \
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
    "Order_ID":${'Order.Order_ID'},
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
      "Order_ID":${'Order.Order_ID'},
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
    'Authorization': 'Bearer ${inputTokken}',
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
  myHeaders.append("Authorization", "Bearer ${inputTokken}");
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
    "Order_ID":${'Order.Order_ID'},
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
        'Authorization': 'Bearer ${inputTokken}',
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
        "Order_ID":${'Order.Order_ID'},
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

export const UPDATE_CODE = [
  {
    lang: 'NodeJS - Axios',
    codeLang: 'javascript',
    code: `
      var axios = require('axios');
      var data = JSON.stringify({
        "State": ${'statusInput'},
        "State_ar": ${'statusInput'}(ar),
        "Order_ID": ${'Order.Order_ID'}
      });
      
      var config = {
        method: 'post',
        url: '${update}',
        headers: { 
          'Authorization': '"Bearer ${inputTokken}"', 
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
--header 'Authorization: "Bearer ${inputTokken}"' \
--header 'Content-Type: application/json' \
--header 'accept: application/json' \
--data-raw '{
    "State" : ${'statusInput'},
    "State_ar": ${'statusInput'}(ar), 
    "Order_ID":${'Order.Order_ID'}
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
  "State": ${'statusInput'},
  "State_ar": ${'statusInput'}(ar),
  "Order_ID": ${'Order.Order_ID'}
})
headers = {
  'Authorization': '"Bearer ${inputTokken}"',
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
      myHeaders.append("Authorization", "\"Bearer ${inputTokken}\"");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("accept", "application/json");
      
      var raw = JSON.stringify({
        "State": ${'statusInput'},
        "State_ar": ${'statusInput'}(ar),
        "Order_ID": ${'Order.Order_ID'}
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
        'Authorization': '"Bearer ${inputTokken}"',
        'Content-Type': 'application/json',
        'accept': 'application/json'
      };
      var request = http.Request('POST', Uri.parse('${update}'));
      request.body = json.encode({
        "State": ${'statusInput'},
        "State_ar": ${'statusInput'}(ar),
        "Order_ID": ${'Order.Order_ID'}
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
