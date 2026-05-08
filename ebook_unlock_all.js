#!name=电子书包-解锁合集
#!desc=解锁题目权限、课程观看、设备限制

[script]
电子书包-功能解锁 = type=response-pattern, pattern=^https:\/\/exampass\.mvwchina\.com, requires-body=1, script-path=https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
电子书包-功能解锁 = type=response-pattern, pattern=^https:\/\/api\.imed\.org\.cn, requires-body=1, script-path=https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js
电子书包-功能解锁 = type=response-pattern, pattern=^https:\/\/school\.mvwchina\.com, requires-body=1, script-path=https://raw.githubusercontent.com/svvff/Rewrite/main/ebook_unlock_all.js

[mitm]
hostname = exampass.mvwchina.com, api.imed.org.cn, school.mvwchina.com

/*
#!name=电子书包-功能解锁合集
#!desc=解锁题目权限、课程观看、设备限制
*/

function unlockQuiz(body) {
    let modified = body;
    modified = modified.replace(/"isFreeTrial"\s*:\s*0\b/g, '"isFreeTrial":1');
    modified = modified.replace(/"shelfStatus"\s*:\s*"?1"?\b/g, '"shelfStatus":"0"');
    modified = modified.replace(/"isBuy"\s*:\s*0\b/g, '"isBuy":1');
    modified = modified.replace(/"isRetail"\s*:\s*0\b/g, '"isRetail":1');
    modified = modified.replace(/"studyStatus"\s*:\s*0\b/g, '"studyStatus":1');
    modified = modified.replace(/"hideUnpurchased"\s*:\s*1\b/g, '"hideUnpurchased":0');
    modified = modified.replace(/"buyStatus"\s*:\s*0\b/g, '"buyStatus":1');
    return modified;
}

function unlockCourse(body) {
    try {
        let json = JSON.parse(body);
        let modified = false;

        function modifyFields(obj) {
            if (!obj || typeof obj !== 'object') return;
            if (Array.isArray(obj)) {
                obj.forEach(item => modifyFields(item));
                return;
            }
            let objModified = false;
            if (obj.hasOwnProperty('free') && obj.free === 2) {
                obj.free = 1;
                objModified = true;
            }
            if (obj.hasOwnProperty('freeTime') && obj.freeTime === 0) {
                obj.freeTime = 2147483647;
                objModified = true;
            } else if (!obj.hasOwnProperty('freeTime') && obj.hasOwnProperty('free')) {
                obj.freeTime = 2147483647;
                objModified = true;
            }
            if (objModified) modified = true;
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                    modifyFields(obj[key]);
                }
            }
        }

        modifyFields(json);
        if (modified) {
            return JSON.stringify(json);
        }
        return null;
    } catch (e) {
        return null;
    }
}

function unlockDevice(body) {
    let modified = body.replace(/"result"\s*:\s*false\b/g, '"result":true');
    return modified !== body ? modified : null;
}

let url = $request.url;
let body = $response.body;

if (typeof body !== 'string') {
    if (body && typeof body.toString === 'function') {
        body = body.toString();
    } else {
        $done({});
    }
}

let modifiedBody = null;

if (url.includes('exampass.mvwchina.com') || url.includes('api.imed.org.cn')) {
    modifiedBody = unlockQuiz(body);
    if (modifiedBody) console.log("🎉 电子书包-题目权限: 解锁成功");
} else if (url.includes('school.mvwchina.com/shop/section/getSectionListInfo')) {
    modifiedBody = unlockCourse(body);
    if (modifiedBody) console.log("🎉 电子书包-课程观看: 解锁成功");
} else if (url.includes('api.imed.org.cn/bindDevice')) {
    modifiedBody = unlockDevice(body);
    if (modifiedBody) console.log("🎉 电子书包-设备限制: 解锁成功");
}

if (modifiedBody) {
    $done({ body: modifiedBody });
} else {
    $done({});
}
