/*************************************

项目名称：哔哩哔哩-去除开屏广告
更新日期：2024-6-19
使用声明：仅供参考，禁止转载与售卖！

**************************************

[rewrite_local]

#!name=哔哩哔哩
#!desc=屏蔽首次启动广告弹窗

^https?://​​​a​​​p​​​p​​​.​​​b​​​i​​​l​​​i​​​b​​​i​​​l​​​i​​​.​​​c​​​o​​​m​​​/​​​x​​​/​​​v​​​2​​​​/(​​​f​​​e​​​e​​​d​​​\/​​​i​​​n​​​d​​​e​​​x*|s​​​p​​​l​​​a​​​s​​​h\​​​/​​​s​​​h​​​o​​​w*) url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/BiliBiliAds.js

[mitm]
hostname = a​​​p​​​p​​​.​​​b​​​i​​​l​​​i​​​b​​​i​​​l​​​i​​​.​​​c​​​o​​​m​​​

*************************************/

var objc = JSON.parse($response.body);

const ad = /f​​​e​​​e​​​d​​​\/​​​i​​​n​​​d​​​e​​​x*/;
const ads = /s​​​p​​​l​​​a​​​s​​​h\​​​/​​​s​​​h​​​o​​​w*/;

if(ad.test($request.url)){
  objc.lists = {

};
}

if(ads.test($request.url)){
  objc[0] = {

};
}

$done({body : JSON.stringify(objc)});
