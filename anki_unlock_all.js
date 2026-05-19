/*******************************
脚本功能：Anymo——解锁VIP会员 + 解除非会员限制
更新时间：2026-05-20
使用说明：Surge / Quantumult X 可直接使用
#!name=Anymo解锁
#!desc=解锁永久VIP + 非会员数量限制

*******************************

[rewrite_local]
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/vipInfo$ url script-response-body anki_unlock_all.js
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/getInfo$ url script-response-body anki_unlock_all.js

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
            // 强制开启VIP
            obj.data.isVip = true;
            obj.data.isForever = true;
            obj.data.vipDay = 99999;
            obj.data.expireDay = "2099-12-31";
        }
        body = JSON.stringify(obj);
    } catch(e) {}
}

// 处理 /user/getInfo 接口
if (url.includes('/user/getInfo')) {
    try {
        var obj = JSON.parse(body);
        if (obj.data) {
            // VIP 信息解锁
            if (obj.data.vip) {
                obj.data.vip.isForever = true;
                obj.data.vip.openVip = true;
                obj.data.vip.vipAvailable = true;
                obj.data.vip.vipEndAt = "2099-12-31";
            }
            // 非会员限制解锁（将数量上限改成极大值）
            if (obj.data.nonmember) {
                obj.data.nonmember.decksCount = 999999;
                obj.data.nonmember.notesCount = 999999;
                obj.data.nonmember.customStudy = 999999;
                obj.data.nonmember.exportCard = 999999;
                obj.data.nonmember.appDataSync = true;
                obj.data.nonmember.batchCard = true;
                obj.data.nonmember.coverPic = true;
            }
        }
        body = JSON.stringify(obj);
    } catch(e) {}
}

$done({body});
