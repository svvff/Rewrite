/*******************************

脚本功能：星题库——解锁会员
更新时间：2024-6-6
版本：5.33.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

^https?://mobile.xinghengclass.com/api/v5.3.0/getUserByToken.do url script-response-body
https://raw.githubusercontent.com/svvff/Rewrite/main/xingtiku.js

[mitm]
hostname = mobile.xinghengclass.com

*******************************/

var objc = JSON.parse($response.body);

objc.data = {
    ...objc.data,
    "vip": true,
    "vipType": "3",
    "bindPhoneNumber": "10086",
    "name": "永久会员",
    "endTime": 999999999,
    "vipStatus": "1",
    "username": "永久会员"
};

$done({body : JSON.stringify(objc)});
