/*******************************

脚本功能：电子书包——解锁题目权限 + 解锁课程观看 + 解锁设备限制
更新时间：2026-5-9
版本：v2.0 (适配小火箭)
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************/

[rewrite_local]

#!name=电子书包
#!desc=解锁题目权限 + 解锁课程观看 + 解锁设备限制

# 合并所有需要改写的URL为一条规则（通配符*已用.*表示）
^https?:\/\/(exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category|api\.imed\.org\.cn\/(books\/findBookList|books\/getAllPaperExamListByProductId|api\/article\/findCurrentPage|books\/v2|bindDevice)|school\.mvwchina\.com\/shop\/section\/getSectionListInfo).* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

[mitm]
hostname = exampass.mvwchina.com, api.imed.org.cn, school.mvwchina.com

*******************************/

    /*******************************
脚本功能：电子书包——解锁题目权限 + 课程观看 + 设备限制
*******************************/

var obj = JSON.parse($response.body);

// 定义各功能对应的URL正则（只匹配路径部分，因为域名已在rewrite中限定）
const quiz = /exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category|api\.imed\.org\.cn\/(books\/findBookList|books\/getAllPaperExamListByProductId|api\/article\/findCurrentPage|books\/v2)/;
const course = /school\.mvwchina\.com\/shop\/section\/getSectionListInfo/;
const device = /api\.imed\.org\.cn\/bindDevice/;

// ① 解锁题目权限（递归修改JSON中所有需要改的字段）
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
    console.log("✅ 电子书包-题目权限：已解锁");
}
// ② 解锁课程观看
else if (course.test($request.url)) {
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
    console.log("✅ 电子书包-课程观看：已解锁");
}
// ③ 解锁设备限制
else if (device.test($request.url)) {
    if (obj && typeof obj === 'object' && obj.hasOwnProperty('result') && obj.result === false) {
        obj.result = true;
        console.log("✅ 电子书包-设备限制：已解锁");
    }
}

$done({ body: JSON.stringify(obj) });
