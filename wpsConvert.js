/*******************************

脚本功能：WPS——自动获取PDF转换结果
更新时间：2024-6-13
版本：12.3.0
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name= WPS
#!desc= 自动获取PDF转换结果

[rewrite_local]
^https:\/\/icdcapi.wps.cn/api/v5/query/* url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/wpsConvert.js

[mitm]
hostname = icdcapi.wps.cn

*******************************/

var objc = JSON.parse($response.body);

  if (objc.hasOwnProperty('result')) {
   let res = objc.result.result_files[0].url;
   $persistentStore.write(res, 'wps')
   $notification.post('转换结果', '转换成功', '请前往loon输入wps获取下载链接！');
  }

$done({
    body : JSON.stringify(objc)
});
