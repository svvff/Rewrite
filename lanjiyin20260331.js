/* **************************************************

 ❤️ 项目名称：蓝基因公益脚本
 💙 软件名称：蓝基因医学 
 💚 项目内容：
    完美解锁所有付费课程，无需购买点击即可观看，可正常缓存。
    解锁复试真题、专项真题等全部题库，词汇类除外。
 🩶 更新日期：2025-02-26 02:10:29
 
 💜 飞机频道：https://t.me/iosrxwy 
 💛 脚本作者：不愿透露姓名的路人甲
 
 🩵 使用声明：
 ❣️ 免费分享，仅供交流学习，严🈲转载与售卖!!
    本意是：让学医的穷学生获得更好的教育资源。
    有钱的请支持正版!! 严禁倒卖，严禁倒卖！！

 * ***************************************************

 [rewrite_local]
 ^https?:\/\/(?:edu|user)\.lezaitizhong\.com\/(shop|vod|tiku|classify|user(?:\/my)?)\/(?:goods|class_list|getclassifychapter|get_question_media|sheet|get_collection_list|get_course_info|get_cate_vod_list|getuserinfo|get_user_info|get_qtt_info|lecture(?:\/.*)?)(?:\/.*)? url script-response-body https://raw.githubusercontent.com/svvff/Rewrite/refs/heads/main/lanjiyin20260331.js

 [mitm]
 hostname = *.lezaitizhong.com

 * ****************************************************/

// ==================== 可读版解锁逻辑 ====================

let body = $response.body;
if (body) {
    try {
        let obj = JSON.parse(body);

        // 需要解锁的字段列表（根据蓝基因 API 常见字段）
        const vipFields = [
            'is_vip', 'vip', 'is_buy', 'is_pay', 'buy_status',
            'is_free', 'is_purchased', 'is_can_watch', 'is_can_download'
        ];
        const priceFields = [
            'price', 'vip_price', 'original_price', 'sell_price',
            'discount_price', 'market_price'
        ];

        // 递归遍历，修改所有匹配字段
        function unlock(data) {
            if (typeof data !== 'object' || data === null) return;
            for (let key in data) {
                if (vipFields.includes(key)) {
                    data[key] = true;
                } else if (priceFields.includes(key)) {
                    data[key] = 0;
                } else if (Array.isArray(data[key])) {
                    data[key].forEach(item => unlock(item));
                } else if (typeof data[key] === 'object') {
                    unlock(data[key]);
                }
            }
        }

        unlock(obj);
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 如果解析失败，原样返回
        $done({ body });
    }
} else {
    $done({});
}
