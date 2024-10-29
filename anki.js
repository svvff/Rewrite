/*******************************

脚本功能：Anki记忆卡——解锁会员+去除广告
更新时间：2024-10-29
版本:1.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

#!name=Anki记忆卡
#!desc=解锁会员+去除广告

^https?:\/\/api\.ankichinas\.com\/api\/v1\/(clouds\/current|users\/vipInfo) url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki.js

[mitm]
hostname = api.ankichinas.com

*******************************/

var objc = JSON.parse($response.body);

const ad = /clouds\/current/;
const vip = /users\/vipInfo/;

if(ad.test($request.url)){
  objc.date = {
    ...objc.data,
    "size": "无限储存", 
    "is_anonymous": true,
    "vip_end_time": 999999999
};
} 

if(vip.test($request.url)){
  objc.data = {
    ...objc.data,
    "is_vip": true, 
    "is_forever": true,
    "vip_day": 10086,
    "vip_expire_at": "永久会员"
};
}

$done({body : JSON.stringify(objc)});
