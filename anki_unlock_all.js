/*******************************

脚本功能：Anymo——解锁VIP会员 + 解除非会员限制
软件版本：1.0.0
更新时间：2026-05-20
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=Anymo解锁
#!desc=解锁永久VIP + 非会员数量限制

[rewrite_local]

^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/vipInfo$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/getInfo$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js

[mitm]
hostname = file.ankichinas.cn

*******************************/

var body = JSON.parse($response.body);

const vipInfo = /\/user\/vipInfo$/;
const getInfo = /\/user\/getInfo$/;

if (vipInfo.test($request.url)) {
    // 直接覆盖 data 字段
    body.data = {
        "pkg": [
            {
                "id": "unrestricted_date_vip",
                "money": 0,
                "desc": "永久会员",
                "desc2": "已解锁",
                "day": 99999,
                "size": 9999,
                "coin": 9999,
                "activityEndAt": "",
                "originMoney": 0
            }
        ],
        "isVip": true,
        "vipDay": 99999,
        "expireDay": "2099-12-31",
        "isForever": true,
        "useSize": "0B",
        "totalSize": "1024TB",
        "ambassador": null,
        "hongbao": null,
        "vipDiscount": {
            "enable": true,
            "yj": 0.01,
            "temp": 0.01,
            "testIp": []
        }
    };
}

if (getInfo.test($request.url)) {
    // 直接覆盖 data 字段
    body.data = {
        "phone": "18888888888",
        "nickname": "永久会员",
        "sign": "已解锁所有功能",
        "avatar": "https://anki-resource.oss-cn-shenzhen.aliyuncs.com/user/202605/301002/49479f918048c01506fa02e718c7e8f3.jpeg",
        "coin": 999999,
        "org": null,
        "vip": {
            "isForever": true,
            "openVip": true,
            "vipEndAt": "2099-12-31",
            "vipAvailable": true
        },
        "nonmember": {
            "appDataSync": true,
            "decksCount": 999999,
            "batchCard": true,
            "coverPic": true,
            "notesCount": 999999,
            "customStudy": 999999,
            "exportCard": 999999
        },
        "userId": "unlimited_user",
        "registerSuccess": 1
    };
}

$done({body : JSON.stringify(body)});
