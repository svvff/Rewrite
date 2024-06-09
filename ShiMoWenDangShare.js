/*******************************

脚本功能：石墨文档——解锁分享权限
软件版本：3.17.26
更新时间：2024-6-9
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=石墨文档
#!desc=解锁分享权限 

[rewrite_local]

^https?://shimo.im/lizard-api/files/* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ShiMoWenDangShare.js

[mitm]
hostname = shimo.im

*******************************/

var body = $response.body;

body = body.replace(/"isEnterpriseLight":\w+/g, '"isEnterpriseLight":true')
.replace(/"isEnterprisePremium":\w+/g, '"isEnterprisePremium":true')
.replace(/"isPersonalPremium":\w+/g, '"isPersonalPremium":true')
.replace(/"isTrial":\w+/g, '"isTrial":true')
.replace(/"private"/g, '"editable"')
.replace(/"isWework":\s*false/g, '"isWework":true')
.replace(/"value":\w+/g, '"value":true')
.replace(/"isEnterprise":\s*false/g, '"isEnterprise":true')
.replace(/"isDingtalk":\s*false/g, '"isDingtalk":true')
.replace(/"isFreeEnterprise":\s*false/g, '"isFreeEnterprise":true');

$done({ body });
