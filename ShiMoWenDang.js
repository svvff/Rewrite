/*******************************

脚本功能：石墨文档——解锁会员
软件版本：3.17.26
更新时间：2024-6-10
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=石墨文档
#!desc=解锁会员

[rewrite_local]

^https?:\/\/shimo\.im\/lizard-api\/(users\/me|files\/*) url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ShiMoWenDang.js

[mitm]
hostname = shimo.im

*******************************/

var body = JSON.parse($response.body);

const vipa = /users\/me?/;
const vipb = /files\/*/;

if(vipa.test($request.url)){
  body.accountMetadata = {
    "isExpired": false,    
    "isDingtalk": true,    
    "isWework": true,
    "isEnterprise": true,    
    "isFreeEnterprise": true,    
    "expiredAt": {    
      "seconds":2099090900,
      "nanos": 527990712     
    },    
    "isTrial": false,   
    "isPersonalPremium": true,
    "isEnterprisePremium": true, 
    "isEnterpriseLight": true, 
    "editionId": 6  
  };
}
if(vipb.test($request.url)){
  body = {
    ...body,
    "shareMode": "editable",
    "user": {    "id": 88888888,     "name": "",     "avatar": "https://as.smgv.cn/static/unmd5/default-avatar-moke.2.png",     "email": "10086@163.com",     "accountMetadata": {      "isExpired": false,       "isDingtalk": true,       "isWework": true,       "isEnterprise": true,       "isFreeEnterprise": true,       "expiredAt": {        "seconds": 2099090900,         "nanos": 131380889       },       "isTrial": false,       "isPersonalPremium": true,       "isEnterprisePremium": true,       "isEnterpriseLight": true,       "startedAt": {        "seconds": -62135596800       },       "editionId": 6,       "lastMembershipExpiredAt": {        "seconds": -62135596800       },       "lastMembershipEditionId": 0     }   }
  };
}

$done({body : JSON.stringify(body)});
