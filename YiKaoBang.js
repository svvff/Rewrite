/*******************************

脚本功能：医考帮——去除强制更新
软件版本：理论通用
更新时间：2025-1-30
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=医考帮
#!desc=去除强制更新

[rewrite_local]
https://
^https?:\/\/api\.yikaobang\.com\.cn/index.php\/version\/version\/check url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/YiKaoBang.js

[mitm]
hostname = *.yikaobang.com.cn

*******************************/

var body = $response.body;

body = body.replace(/"app_store_version":\d+/g,'"app_store_version":"1000"')
.replace(/"is_force":\d/g,'"is_force":"0"');

$done({ body });