/*******************************

脚本功能：星题库——解锁会员
更新时间：2024-6-6
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

^https?:\/\/mb\.xinghengedu\.com\/api\/v5\.3\.0\/getUserByToken\.do url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/xingtiku.js


[mitm]
hostname = mb.xinghengedu.com

*******************************/

var body = $response.body.replace(/vip":"\w+"/g,'vip":"true"')
.replace(/name":"\w+"/g,'name":"永久会员"')
.replace(/vipType":"\d+"/g,'vipType":"3"')
.replace(/vipStatus":"\d+"/g,'vipStatus":"1"')
.replace(/endTime":"\d+"/g,'endTime":"999999999"')
.replace(/bindPhoneNumber":"\d+"/g,'bindPhoneNumber":"10086"')
$done({ body });
