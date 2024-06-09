/*******************************

脚本功能：星题库——解锁会员
更新时间：2024-6-6
版本：5.33.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

#!name=星题库
#!desc=解锁会员

^https?:\/\/mobile\.xinghengclass\.com\/(api\/v5.3.0\/getUserByToken.do|mobileUser\/v2\/versionList.do|notification\/list.do) url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/XingTiku.js

[mitm]
hostname = mobile.xinghengclass.com

*******************************/

var objc = JSON.parse($response.body);

const ad = /notification\/list.do/;
const version = /mobileUser\/v2\/versionList.do/;
const vip = /api\/v5.3.0\/getUserByToken.do/;

if(ad.test($request.url)){
  objc.lists = {
  ...objc.lists,
  "imgUrl": "",
  "url": "",
  "content": "",
  "productType": ""
};
}

if(version.test($request.url)){
  objc[0] = {
    "apkName": "hello world!",
    "apkVersion": "1.00.0",
    "apkVersionCode": 10000,
    "apkVersionDesc": "版本拦截测试！",
    "apkVersionType": 1,
    "id": 1,
    "productType": "xingtiku_ios"
};
}

if(vip.test($request.url)){
  objc.data = {
    ...objc.data,
    "vip": true,
    "vipType": "3",
    "bindPhoneNumber": "10086",
    "name": "永久会员",
    "endTime": 999999999,
    "vipStatus": "1",
    "username": "永久会员"
};
}
/*
objc.data = {
    ...objc.data,
    "vip": true,
    "vipType": "3",
    "bindPhoneNumber": "10086",
    "name": "永久会员",
    "endTime": 999999999,
    "vipStatus": "1",
    "username": "永久会员"
};
*/
$done({body : JSON.stringify(objc)});
