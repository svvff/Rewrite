/*******************************

脚本功能：幕布——解锁会员
软件版本：2.32.3
更新时间：2024-7-27
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=幕布
#!desc=解锁会员

[rewrite_local]

^https:\/\/api2\.mubu\.com\/v3\/api\/user\/current_user url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/MuBu.js

[mitm] 

hostname = api2.mubu.com


*******************************/

var body = $response.body.replace(/vipEndDate":""/g,'vipEndDate":"99999999"')
.replace(/level":\d+/g,'level":1')
$done({ body });
