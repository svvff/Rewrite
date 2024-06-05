/*******************************

脚本功能：星题库——解锁会员
更新时间：2024-6-6
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

[rewrite_local]

^https://mb.xinghengedu.com/api/v5.3.0/getUserByToken.do url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/xingtiku.js


[mitm]
hostname = mb.xinghengedu.com

*******************************/
var objc = JSON.parse($response.body);
for (let datas of objc.data) {
  datas.vip = true;
}
for (let datas of objc.data) {
  datas.username = "永久会员";
}
for (let datas of objc.data) {
  datas.name = "永久会员";
}
for (let datas of objc.data) {
  datas.vipType = "3";
}
for (let datas of objc.data) {
  datas.vipStatus = "1";
}
for (let datas of objc.data) {
  datas.endTime = 999999999;
}
for (let datas of objc.data) {
  datas.bindPhoneNumber = "10086";
}
$done({
    body : JSON.stringify(objc)
});
