/*******************************

脚本功能：电子书包——解锁题目权限 + 解锁课程观看 + 解锁设备限制
更新时间：2026-5-9
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************/

[rewrite_local]

#!name=电子书包
#!desc=解锁题目权限 + 解锁课程观看 + 解锁设备限制

# 解锁题目权限（5个URL，通配符*已转义为.*）
^https?:\/\/exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/books\/findBookList.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/books\/getAllPaperExamListByProductId.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/api\/article\/findCurrentPage.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/books\/v2.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

# 解锁课程观看
^https?:\/\/school\.mvwchina\.com\/shop\/section\/getSectionListInfo.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

# 解锁设备限制
^https?:\/\/api\.imed\.org\.cn\/bindDevice.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

[mitm]
hostname = exampass.mvwchina.com, api.imed.org.cn, school.mvwchina.com

*******************************/

    /*******************************
电子书包——解锁题目权限 + 课程观看 + 设备限制
*******************************/

var obj = JSON.parse($response.body);

const quiz = /exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category|api\.imed\.org\.cn\/(books\/findBookList|books\/getAllPaperExamListByProductId|api\/article\/findCurrentPage|books\/v2)/;
const course = /school\.mvwchina\.com\/shop\/section\/getSectionListInfo/;
const device = /api\.imed\.org\.cn\/bindDevice/;

if (quiz.test($request.url)) {
    function modifyQuiz(obj) {
        if (!obj || typeof obj !== 'object') return;
        for (var key in obj) {
            var val = obj[key];
            if (key === 'isFreeTrial' && val === 0) obj[key] = 1;
            if (key === 'shelfStatus' && (val === 1 || val === '1')) obj[key] = "0";
            if (key === 'isBuy' && val === 0) obj[key] = 1;
            if (key === 'isRetail' && val === 0) obj[key] = 1;
            if (key === 'studyStatus' && val === 0) obj[key] = 1;
            if (key === 'hideUnpurchased' && val === 1) obj[key] = 0;
            if (key === 'buyStatus' && val === 0) obj[key] = 1;
            if (typeof val === 'object') modifyQuiz(val);
        }
    }
    modifyQuiz(obj);
    console.log("✅ 题目权限已解锁");
} else if (course.test($request.url)) {
    function modifyCourse(obj) {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) modifyCourse(obj[i]);
            return;
        }
        if (obj.hasOwnProperty('free') && obj.free === 2) obj.free = 1;
        if (obj.hasOwnProperty('freeTime') && obj.freeTime === 0) obj.freeTime = 2147483647;
        else if (!obj.hasOwnProperty('freeTime') && obj.hasOwnProperty('free')) obj.freeTime = 2147483647;
        for (var key in obj) {
            if (typeof obj[key] === 'object') modifyCourse(obj[key]);
        }
    }
    modifyCourse(obj);
    console.log("✅ 课程观看已解锁");
} else if (device.test($request.url)) {
    if (obj && typeof obj === 'object' && obj.hasOwnProperty('result') && obj.result === false) {
        obj.result = true;
        console.log("✅ 设备限制已解锁");
    }
}

$done({ body: JSON.stringify(obj) });
