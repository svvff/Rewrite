/*************************************

项目名称：蓝基因-屏蔽广告
更新日期：2024-6-7
使用声明：仅供参考，禁止转载与售卖！

**************************************

[rewrite_local]

#!name=蓝基因
#!desc=屏蔽首次启动广告弹窗

^https?://https://tk.lanjiyin.com.cn/ad/getAdList url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/LanJiyinAds.js

[mitm]
hostname = tk.lanjiyin.com.cn

*************************************/

var objc = JSON.parse($response.body);

objc = {

};

$done({body : JSON.stringify(objc)});
