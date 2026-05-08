/*******************************

脚本功能：电子书包——解锁题目权限 + 解锁课程观看 + 解锁设备限制
更新时间：2026-5-9
版本：1.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************/

#!name=电子书包
#!desc=解锁题目权限 + 解锁课程观看 + 解锁设备限制

[rewrite_local]
^https?:\/\/(exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category|api\.imed\.org\.cn\/(books\/findBookList|books\/getAllPaperExamListByProductId|api\/article\/findCurrentPage|books\/v2|bindDevice)|school\.mvwchina\.com\/shop\/section\/getSectionListInfo).* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

[mitm]
hostname = exampass.mvwchina.com, api.imed.org.cn, school.mvwchina.com

*******************************/

    /*******************************
电子书包——解锁题目权限 + 课程观看 + 设备限制
*******************************/

var objc = JSON.parse($response.body);

// 判断 URL 属于哪个功能
var url = $request.url;

// 1. 解锁题目权限（包含 exampass 或 api.imed.org.cn 除 bindDevice 外的几个接口）
if (url.indexOf('exampass.mvwchina.com') !== -1 ||
    (url.indexOf('api.imed.org.cn') !== -1 && url.indexOf('/bindDevice') === -1)) {
    // 递归修改所有匹配的字段（与阿里云盘修改 features 数组类似）
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
    modifyQuiz(objc);
    console.log("电子书包-题目权限：已解锁");
}
// 2. 解锁课程观看
else if (url.indexOf('school.mvwchina.com/shop/section/getSectionListInfo') !== -1) {
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
    modifyCourse(objc);
    console.log("电子书包-课程观看：已解锁");
}
// 3. 解锁设备限制
else if (url.indexOf('api.imed.org.cn/bindDevice') !== -1) {
    if (objc && typeof objc === 'object' && objc.hasOwnProperty('result') && objc.result === false) {
        objc.result = true;
        console.log("电子书包-设备限制：已解锁");
    }
}

$done({ body: JSON.stringify(objc) });
