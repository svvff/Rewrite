/*******************************

脚本功能：Anymo——解锁VIP会员 + 解除非会员限制
更新时间：2026-05-20
版本：1.0.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

#!name=Anymo解锁
#!desc=解锁永久VIP + 非会员数量限制

^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/vipInfo$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/getInfo$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js

[mitm]
hostname = file.ankichinas.cn

*******************************/

var objc = JSON.parse($response.body);

const vipInfo = /file\.ankichinas\.cn\/server\/api\/user\/vipInfo/;
const getInfo = /file\.ankichinas\.cn\/server\/api\/user\/getInfo/;

if (vipInfo.test($request.url)) {
    if (objc.data) {
        objc.data.isVip = true;
        objc.data.isForever = true;
        objc.data.vipDay = 99999;
        objc.data.expireDay = "2099-12-31";
    }
}

if (getInfo.test($request.url)) {
    if (objc.data) {
        if (objc.data.vip) {
            objc.data.vip.isForever = true;
            objc.data.vip.openVip = true;
            objc.data.vip.vipAvailable = true;
            objc.data.vip.vipEndAt = "2099-12-31";
        }
        if (objc.data.nonmember) {
            objc.data.nonmember.decksCount = 999999;
            objc.data.nonmember.notesCount = 999999;
            objc.data.nonmember.customStudy = 999999;
            objc.data.nonmember.exportCard = 999999;
            objc.data.nonmember.appDataSync = true;
            objc.data.nonmember.batchCard = true;
            objc.data.nonmember.coverPic = true;
        }
    }
}

$done({body : JSON.stringify(objc)});
