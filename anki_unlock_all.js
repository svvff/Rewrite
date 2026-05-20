/*******************************

脚本功能：Anki中文网——解锁会员权限
软件版本：通用
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=Anki中文网解锁会员
#!desc=解锁Anki中文网会员、同步限制及功能解锁

[rewrite_local]
^https?:\/\/file\.ankichinas\.cn\/server\/api\/user\/(getInfo|vipInfo) url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/anki_unlock_all.js

[mitm]
hostname = file.ankichinas.cn

*******************************/

// 检查是否有响应体，没有则直接结束
if (typeof $response === "undefined" || !$response.body) {
$done({});
}

let body = JSON.parse($response.body);
const url = $request.url;

// 1. 修改用户信息接口 (getInfo)
if (url.indexOf("server/api/user/getInfo") !== -1) {
if (body.data) {
// 修改 VIP 核心字段
body.data.vip = {
"isForever": true,
"openVip": true,
"vipEndAt": "2099-01-01",
"vipAvailable": true
};

// 如果存在非会员限制字段，将其额度调高或优化
if (body.data.nonmember) {
body.data.nonmember = {
"appDataSync": true,
"decksCount": 99999,
"batchCard": true,
"coverPic": true,
"notesCount": 99999,
"customStudy": 99999,
"exportCard": 99999
};
}
}
}

// 2. 修改会员信息接口 (vipInfo)
if (url.indexOf("server/api/user/vipInfo") !== -1) {
if (body.data) {
body.data.isVip = true;
body.data.isForever = true;
body.data.vipDay = 99999;
body.data.expireDay = "2099-01-01";
body.data.totalSize = "999GB"; // 扩大同步盘空间显示
}
}

// 将修改后的对象序列化回字符串并返回
$done({ body: JSON.stringify(body) });    }
}

// 处理 /user/getInfo - 直接强制覆盖VIP和非会员限制字段
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
        // 手机号也可以改成任意值（如果你需要）
        // body.data.phone = "18888888888";
        // body.data.nickname = "永久会员";
    }
}

$done({body : JSON.stringify(body)});
