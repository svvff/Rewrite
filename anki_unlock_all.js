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
    if (body.data) {
        body.data.isVip = true;
        body.data.isForever = true;
        body.data.vipDay = 99999;
        body.data.expireDay = "2099-12-31";
    }
}

if (getInfo.test($request.url)) {
    if (body.data) {
        if (body.data.vip) {
            body.data.vip.isForever = true;
            body.data.vip.openVip = true;
            body.data.vip.vipAvailable = true;
            body.data.vip.vipEndAt = "2099-12-31";
        }
        if (body.data.nonmember) {
            body.data.nonmember.decksCount = 999999;
            body.data.nonmember.notesCount = 999999;
            body.data.nonmember.customStudy = 999999;
            body.data.nonmember.exportCard = 999999;
            body.data.nonmember.appDataSync = true;
            body.data.nonmember.batchCard = true;
            body.data.nonmember.coverPic = true;
        }
    }
}

$done({body : JSON.stringify(body)});
