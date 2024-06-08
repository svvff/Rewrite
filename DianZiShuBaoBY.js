/*************************************

项目名称：医学电子书包-定位北院
更新日期：202-6-8
使用声明：仅供参考，禁止转载与售卖！

**************************************

[rewrite_local]

#!name=医学电子书包
#!desc=定位北院

^https?://dualstack-restios.amap.com/v3/geocode/regeo url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/DianZiShuBaoBY.js

[mitm]
hostname = *restios.amap.com

*************************************/

var objc = JSON.parse($response.body);

objc = {
  "status": "1",
  "regeocode": {
    "addressComponent": {
      "streetNumber": {
        "number": "8号",
        "street": "杏林路"
      },
      "country": "中国",
      "city": "南昌市",
      "province": "江西省",
      "adcode": "360113",
      "district": "红谷滩区",
      "citycode": "0791"
    },
    "aois": [
      {
        "name": "南昌市洪都中医院(北院)"
      }
    ],
    "pois": [
      {
        "name": "南昌市洪都中医院(北院)"
      }
    ]
  },
  "info": "OK",
  "infocode": "10000"
};

$done({body : JSON.stringify(objc)});
