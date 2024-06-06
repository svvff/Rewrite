/*******************************

脚本功能：星题库——解锁会员
更新时间：2024-6-6
版本：5.33.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

https://mobile.xinghengclass.com/api/v5.3.0/getUserByToken.do url script-response-body
https://raw.githubusercontent.com/svvff/Rewrite/main/xingtiku.js

[mitm]
hostname = mobile.xinghengclass.com

*******************************/
var objc = JSON.parse($response.body);
    objc.data = {    
    "img": "default",
    "code": 1,
    "gender": 1,
    "everstarName": "星恒",
    "agentTel": "4008079767",
    "agentQq": "",
    "videoSource": 0,
    "integral": 0.0,
    "id": 11000630560,
    "serverPhone": "4008079767",
    "vip": true,
    "key": "",
    "info": "让我们一起加油做题吧~",
    "qq": "",
    "dedicated": 0,
    "agentAddress": "",
    "agentName": "",
    "vipType": "3",
    "bindPhoneNumber": "10086",
    "cs": "694947160",
    "phone": "4008079767",
    "name": "永久会员",
    "endTime": 999999999,
    "vipStatus": "1",
    "crmName": "",
    "username": "永久会员"
  }
$done({body : JSON.stringify(objc)});
