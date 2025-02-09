/*******************************

脚本功能：蓝基因——解锁会员
软件版本：1.0.16
更新时间：2024-6-2
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=饭卡
#!desc=解锁余额

[rewrite_local]
https://
^https?:\/\/service\.ghzb\.jxyunge\.com\/api\/member\/detail url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/FanKaHD.js

[mitm]
hostname = service.ghzb.jxyunge.com

*******************************/

var body = $response.body;

body = body.replace(/"money":\d+/g,'"money":"999"');

$done({ body });