/*******************************

脚本功能：石墨文档——解锁会员
软件版本：3.17.26
更新时间：2024-6-10
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=石墨文档
#!desc=解锁会员

[rewrite_local]

^https?:\/\/shimo\.im\/lizard-api\/(users|files\/*)\/me url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ShiMoWenDang.js

[mitm]
hostname = shimo.im

*******************************/

var body = JSON.parse($response.body);

const vipa = /users/;
const vipb = /files\/*/;

if(vipa.test($request.url)){
  body.accountMetadata = {
  "isExpired": false,
    
    "isDingtalk": true, 
    
    "isWework": true, 
    
    "isEnterprise": true, 
    
    "isFreeEnterprise": true,
    
    "expiredAt": { 
      
      "seconds": 2099090900,  
      
      "nanos": 607982830 
    
    }, 
    
    "isTrial": true, 
    
    "isPersonalPremium": true,   
    
    "isEnterprisePremium": true, 
    
    "isEnterpriseLight": true,  
    
    "editionId": 6 
  };
body.membership = {
      "accountTypeExpiredAt": "0001-01-01T00:00:00.000Z",  
  
  "accountType": "personal_premium",  
  
  "accountTypeCreatedAt": "0001-01-01T00:00:00.000Z",    
  
  "isEnterprisePremium": true,   
  
  "isExpired": false,  
  
  "isNewDing": false   
   };
}
if(vipb.test($request.url)){
  body = {
    ...body,
    "shareMode": "editable"
  };
  
}
$done({body : JSON.stringify(body)});
/*
body = body.replace(/"isEnterpriseLight":\w+/g, '"isEnterpriseLight":true');
body = body.replace(/"isEnterprisePremium":\w+/g, '"isEnterprisePremium":true');
body = body.replace(/"isPersonalPremium":\w+/g, '"isPersonalPremium":true');
body = body.replace(/"isTrial":\w+/g, '"isTrial":true');
body = body.replace(/"isWework":\s*false/g, '"isWework":true');
// 是否为企业
body = body.replace(/"isEnterprise":\s*false/g, '"isEnterprise":true');
body = body.replace(/"isDingtalk":\s*false/g, '"isDingtalk":true');
body = body.replace(/"isFreeEnterprise":\s*false/g, '"isFreeEnterprise":true');

$done({ body });
*/
