/*******************************

脚本功能：拼多多——去除app底部视频红点
软件版本：6.86.0
更新时间：2024-6-9
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=拼多多
#!desc=去除app底部视频红点

[rewrite_local]

^https?:\/\/api-shb1.pinduoduo.com/api/light/live_tab/query/live_red_dot$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/PDDRedDot.js

[mitm]
hostname = *shb1.pinduoduo.com

*******************************/

var body = $response.body;

body = body.replace(/"has_red_dot":\w+/g, '"has_red_dot":false')
.replace(/"number":\d+/g, '"number":0')
.replace(/"red_packet_author_red_dot_count":\d+/g, '"red_packet_author_red_dot_count":0')
.replace(/"red_dot_time_ms":\w+/g, '"red_dot_time_ms":null');

$done({ body });
