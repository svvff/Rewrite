/*******************************

脚本功能：阿里云盘——解锁高清画质+倍速播放
更新时间：2024-6-6
版本：5.33.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

^https:\/\/api\.alipan\.com\/business\/v1\.0\/users\/feature\/list$ url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/AliYun.js

[mitm]
hostname = api.alipan.com

*******************************/

var objc = JSON.parse($response.body);

for (let feature of objc.features) {
  feature.trialDuration = 999999999;
}
for (let feature of objc.features) {
  feature.trialStartTime = 0;
}
for (let feature of objc.features) {
  feature.trialStatus = "allowTrial";
}
for (let feature of objc.features) {
  feature.intercept = false;
}
let parentIndex = -1;
for (let i = 0; i < objc.features.length; i++) {
  if (objc.features[i].hasOwnProperty('features')) {
    for (let feature of objc.features[i].features) {
    feature.intercept = false;
    }
    for (let feature of objc.features[i].features) {
    feature.trialStatus = "allowTrial";
    }
    parentIndex = i;
    break;
  }
}
if (parentIndex!== -1) {
  console.log(`名为“features”的属性父特征的数组下标为: ${parentIndex}`);
} else {
  console.log('未找到名为“features”的属性父特征');
}

$done({
    body : JSON.stringify(objc)
});
