/*************************************

项目名称：星题库-屏蔽更新弹窗
更新日期：2024-6-7
使用声明：仅供参考，禁止转载与售卖！

**************************************

[rewrite_local]
^https?://mobile.xinghengclass.com/mobileUser/v2/versionList.do
https://raw.githubusercontent.com/svvff/Rewrite/main/xingtikuversion.js

[mitm]
hostname = mobile.xinghengclass.com

*************************************/

var objc = JSON.parse($response.body);

objc[0] = {
    "apkName": "hello world!",
    "apkVersion": "5.36.0",
    "apkVersionCode": 53600,
    "apkVersionDesc": "版本拦截测试！",
    "apkVersionType": 1,
    "id": 966,
    "productType": "xingtiku_ios"
};

$done({body : JSON.stringify(objc)});
