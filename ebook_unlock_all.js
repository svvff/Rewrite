/*******************************

脚本功能：电子书包——题目权限 + 课程观看 + 设备限制
更新时间：2026-05-09
使用说明：Surge / Quantumult X 可直接使用

*******************************

[rewrite_local]

^https?:\/\/exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/books\/findBookList.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/books\/getAllPaperExamListByProductId.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/api\/article\/findCurrentPage.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/books\/v2.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/school\.mvwchina\.com\/shop\/section\/getSectionListInfo.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
^https?:\/\/api\.imed\.org\.cn\/bindDevice.* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

[mitm]

hostname = exampass.mvwchina.com, api.imed.org.cn, school.mvwchina.com

*******************************/

var body = $response.body;
var url = $request.url;

const exercise = /exampass\.mvwchina\.com\/api\/examinationexercise\/apis\/exercises\/v2\/exercise\/list\/category|api\.imed\.org\.cn\/books\/findBookList|api\.imed\.org\.cn\/books\/getAllPaperExamListByProductId|api\.imed\.org\.cn\/api\/article\/findCurrentPage|api\.imed\.org\.cn\/books\/v2/;

const section = /school\.mvwchina\.com\/shop\/section\/getSectionListInfo/;

const bindDevice = /api\.imed\.org\.cn\/bindDevice/;

if (exercise.test(url)) {
  body = body
    .replace(/"isFreeTrial"\s*:\s*0\b/g, '"isFreeTrial":1')
    .replace(/"shelfStatus"\s*:\s*"?1"?\b/g, '"shelfStatus":"0"')
    .replace(/"isBuy"\s*:\s*0\b/g, '"isBuy":1')
    .replace(/"isRetail"\s*:\s*0\b/g, '"isRetail":1')
    .replace(/"studyStatus"\s*:\s*0\b/g, '"studyStatus":1')
    .replace(/"hideUnpurchased"\s*:\s*1\b/g, '"hideUnpurchased":0')
    .replace(/"buyStatus"\s*:\s*0\b/g, '"buyStatus":1');
}

if (section.test(url)) {
  var objc = JSON.parse(body);

  function modifyFields(obj) {
    if (!obj || typeof obj !== "object") return;

    if (Array.isArray(obj)) {
      obj.forEach(item => modifyFields(item));
      return;
    }

    if (obj.hasOwnProperty("free") && obj.free === 2) {
      obj.free = 1;
    }

    if (obj.hasOwnProperty("freeTime") && obj.freeTime === 0) {
      obj.freeTime = 2147483647;
    } else if (!obj.hasOwnProperty("freeTime") && obj.hasOwnProperty("free")) {
      obj.freeTime = 2147483647;
    }

    for (let key in obj) {
      if (typeof obj[key] === "object") {
        modifyFields(obj[key]);
      }
    }
  }

  modifyFields(objc);
  body = JSON.stringify(objc);
}

if (bindDevice.test(url)) {
  body = body.replace(
    /"result"\s*:\s*false\b/g,
    '"result":true'
  );
}

$done({ body });
