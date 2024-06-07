/*******************************

脚本功能：蓝基因——解锁会员
软件版本：1.0.16
更新时间：2024-6-2
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=蓝基因
#!desc=解锁会员

[rewrite_local]

^https?:\/\/.*\.lanjiyin\.com\.cn url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/lanjiyin.js

[mitm]
hostname = *.lanjiyin.com.cn

*******************************/

var body = $response.body.replace(/is_unlock":"0"/g,'is_unlock":"1"')
.replace(/is_free":"\d"/g,'is_free":"1"')
.replace(/is_show":"\d"/g,'is_show":"1"')
.replace(/is_see":"\d+"/g,'is_see":"1"')
$done({ body });
