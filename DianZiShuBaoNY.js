/*************************************

项目名称：医学电子书包-定位南院
更新日期：202-6-8
使用声明：仅供参考，禁止转载与售卖！

**************************************

[rewrite_local]

#!name=医学电子书包
#!desc=定位南院

^https?://dualstack-restios.amap.com/v3/geocode/regeo url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/DianZiShuBaoNY.js

[mitm]
hostname = *restios.amap.com

*************************************/

var objc = JSON.parse($response.body);

objc = {
  "status": "1",
  "regeocode": {
    "addressComponent": {
      "streetNumber": {
        "number": "264号",
        "street": "民德路"
      },
      "country": "中国",
      "city": "南昌市",
      "province": "江西省",
      "adcode": "360102",
      "district": "东湖区",
      "citycode": "0791"
    },
    "aois": [
      {
        "name": "南昌市洪都中医院(南院)"
      }
    ],
    "pois": [
      {
        "name": "南昌市洪都中医院(南院)"
      }
    ]
  },
  "info": "OK",
  "infocode": "10000"
};

$done({body : JSON.stringify(objc)});
