/*******************************

脚本功能：拼多多——去除app底部消息红点
软件版本：6.86.0
更新时间：2024-6-9
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！

*******************************

#!name=拼多多
#!desc=去除app底部消息红点

[rewrite_local]

^https?:\/\/api-shb1.pinduoduo.com/api/light/live_tab/query/live_red_dot url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/main/PDDRedDot.js

[mitm]
hostname = *shb1.pinduoduo.com

*******************************/

var objc = JSON.parse($response.body);

objc = {
  "success": true,
  "error_code": 1000000,
  "result": {
    "red_dot_result_list": [
      {
        "red_dot_type": 2,
        "biz_type": 2,
        "has_red_dot": false,
        "number": 0,
        "red_dot_time_ms": null,
        "ext": {
          "simple_msg": [
            {
              "type": 19,
              "count": 0
            }
          ],
          "red_dot_time_ms": null
        },
        "sub_red_dot_list": [
          {
            "red_dot_type": 2,
            "sub_biz_type": 8,
            "has_red_dot": false,
            "number": 0,
            "red_dot_time_ms": null,
            "clear_type": 1,
            "ext": {
              "platform_type": 8,
              "count": 0,
              "red_dot_time_ms": null,
              "red_packet_author_red_dot_count": 0
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 0,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {
              "platform_type": 0,
              "simple_msg": [
                {
                  "type": 19,
                  "count": 0
                }
              ],
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 3,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 2,
            "ext": {
              "platform_type": 3,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 5,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {
              "platform_type": 5,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 6,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {
              "platform_type": 6,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 9,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {
              "platform_type": 9,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 10,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 2,
            "ext": {
              "platform_type": 10,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 11,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {}
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 12,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {
              "platform_type": 12,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 13,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 2,
            "ext": {
              "platform_type": 13,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 14,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 2,
            "ext": {
              "platform_type": 14,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 15,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 1,
            "ext": {
              "platform_type": 15,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 16,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 2,
            "ext": {
              "platform_type": 16,
              "count": 0,
              "red_dot_time_ms": null
            }
          },
          {
            "red_dot_type": 2,
            "sub_biz_type": 17,
            "has_red_dot": false,
            "number": 0,
            "clear_type": 2,
            "ext": {
              "platform_type": 17,
              "count": 0,
              "red_dot_time_ms": null
            }
          }
        ]
      }
    ],
    "user_type": 1,
    "disabled": true,
    "server_time_ms": null
  }
};

$done({body : JSON.stringify(objc)});
