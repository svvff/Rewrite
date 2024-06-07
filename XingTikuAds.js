/*************************************

项目名称：星题库-去广告
更新日期：2024-6-6
使用声明：仅供参考，禁止转载与售卖！

**************************************

#!name=星题库
#!desc=去除首次启动广告

[rewrite_local]
^https?://mobile.xinghengclass.com/notification/list.do url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/XingTikuAds.js

[mitm]
hostname = mobile.xinghengclass.com

*************************************/

var objc = JSON.parse($response.body);

objc.lists = {
  ...objc.lists,
  "imgUrl": "",
  "url": "",
  "content": "",
  "productType": "",
};

$done({body : JSON.stringify(objc)});
