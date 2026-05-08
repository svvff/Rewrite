/*

脚本功能：电子书包——解锁题目权限 + 课程观看 + 设备限制
使用声明：仅供学习交流

*/

#!name=电子书包
#!desc=解锁题目权限 + 课程观看 + 设备限制

[rewrite_local]
^https?://exampass\.mvwchina\.com/api/examinationexercise/apis/exercises/v2/exercise/list/category url script-response-body ebook.js
^https?://api\.imed\.org\.cn/books/findBookList.* url script-response-body ebook.js
^https?://api\.imed\.org\.cn/books/getAllPaperExamListByProductId.* url script-response-body ebook.js
^https?://api\.imed\.org\.cn/api/article/findCurrentPage.* url script-response-body ebook.js
^https?://api\.imed\.org\.cn/books/v2.* url script-response-body ebook.js
^https?://school\.mvwchina\.com/shop/section/getSectionListInfo.* url script-response-body ebook.js
^https?://api\.imed\.org\.cn/bindDevice.* url script-response-body ebook.js

[mitm]
hostname = exampass.mvwchina.com, api.imed.org.cn, school.mvwchina.com

let body = $response.body;
if (typeof body !== "string") body = body.toString();
let url = $request.url;

if (url.includes("exampass.mvwchina.com") || (url.includes("api.imed.org.cn") && !url.includes("/bindDevice"))) {
    let newBody = body;
    newBody = newBody.replace(/"isFreeTrial":0/g, '"isFreeTrial":1');
    newBody = newBody.replace(/"shelfStatus":1/g, '"shelfStatus":"0"');
    newBody = newBody.replace(/"shelfStatus":"1"/g, '"shelfStatus":"0"');
    newBody = newBody.replace(/"isBuy":0/g, '"isBuy":1');
    newBody = newBody.replace(/"isRetail":0/g, '"isRetail":1');
    newBody = newBody.replace(/"studyStatus":0/g, '"studyStatus":1');
    newBody = newBody.replace(/"hideUnpurchased":1/g, '"hideUnpurchased":0');
    newBody = newBody.replace(/"buyStatus":0/g, '"buyStatus":1');
    if (newBody !== body) body = newBody;
} else if (url.includes("school.mvwchina.com/shop/section/getSectionListInfo")) {
    try {
        let obj = JSON.parse(body);
        let changed = false;
        function fix(obj) {
            if (!obj || typeof obj !== "object") return;
            if (Array.isArray(obj)) { obj.forEach(fix); return; }
            if (obj.free === 2) { obj.free = 1; changed = true; }
            if (obj.freeTime === 0) { obj.freeTime = 2147483647; changed = true; }
            if (obj.hasOwnProperty("free") && !obj.hasOwnProperty("freeTime")) {
                obj.freeTime = 2147483647;
                changed = true;
            }
            for (let k in obj) if (typeof obj[k] === "object") fix(obj[k]);
        }
        fix(obj);
        if (changed) body = JSON.stringify(obj);
    } catch(e) {}
} else if (url.includes("api.imed.org.cn/bindDevice")) {
    let newBody = body.replace(/"result":false/g, '"result":true');
    if (newBody !== body) body = newBody;
}
$done({ body });
