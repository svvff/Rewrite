/*******************************
脚本功能：Anki记忆卡——解锁VIP会员 + 解除非会员限制
更新时间：2026-05-20
使用说明：Surge / Quantumult X 可直接使用
#!name=Anki解锁
#!desc=解锁永久VIP + 非会员数量限制

*******************************

[rewrite_local]
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/vipInfo$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/getInfo$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js

[mitm]
hostname = file.ankichinas.cn

*******************************/

var body = $response.body;
var url = $request.url;

// 处理 /user/vipInfo 接口
if (url.includes('/user/vipInfo')) {
    try {
        var obj = JSON.parse(body);
        if (obj.data) {
            if (obj.data.isVip !== true) obj.data.isVip = true;
            if (obj.data.isForever !== true) obj.data.isForever = true;
            if (obj.data.vipDay !== 99999) obj.data.vipDay = 99999;
            if (obj.data.expireDay !== "2099-12-31") obj.data.expireDay = "2099-12-31";
        }
        body = JSON.stringify(obj);
    } catch(e) {
        console.log("vipInfo 解析失败: " + e.message);
    }
}

// 处理 /user/getInfo 接口
if (url.includes('/user/getInfo')) {
    try {
        var obj = JSON.parse(body);
        if (obj.data) {
            // VIP 信息解锁
            if (obj.data.vip) {
                if (obj.data.vip.isForever !== true) obj.data.vip.isForever = true;
                if (obj.data.vip.openVip !== true) obj.data.vip.openVip = true;
                if (obj.data.vip.vipAvailable !== true) obj.data.vip.vipAvailable = true;
                if (obj.data.vip.vipEndAt !== "2099-12-31") obj.data.vip.vipEndAt = "2099-12-31";
            }
            // 非会员限制解锁（将数量上限改成极大值）
            if (obj.data.nonmember) {
                var limitFields = ['decksCount', 'notesCount', 'customStudy', 'exportCard'];
                for (var i = 0; i < limitFields.length; i++) {
                    var field = limitFields[i];
                    if (obj.data.nonmember[field] !== 999999) obj.data.nonmember[field] = 999999;
                }
                if (obj.data.nonmember.appDataSync !== true) obj.data.nonmember.appDataSync = true;
                if (obj.data.nonmember.batchCard !== true) obj.data.nonmember.batchCard = true;
                if (obj.data.nonmember.coverPic !== true) obj.data.nonmember.coverPic = true;
            }
        }
        body = JSON.stringify(obj);
    } catch(e) {
        console.log("getInfo 解析失败: " + e.message);
    }
}

$done({body});
