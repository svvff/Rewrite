const fetch = require('node-fetch');
const cheerio = require('cheerio');

// 要获取的链接
const url = 'https://github.com/abshare/abshare.github.io/blob/main/README.md';

// 函数用于获取链接内容并解析
async function getLinkContent() {
    try {
        const response = await fetch(url);
        const html = await response.text();

        const $ = cheerio.load(html);

        // 查找包含 "免费iOS小火箭订阅链接" 的内容，然后获取其后面的链接
        const targetText = '免费iOS小火箭订阅链接';
        const element = $(`:contains("${targetText}")`);
        if (element.length > 0) {
            const link = element.next('a').attr('href');
            if (link) {
                // 处理相对链接，转换为绝对链接
                const baseUrl = 'https://github.com';
                const fullLink = link.startsWith('http')? link : baseUrl + link;

                // 再次获取链接内容
                const secondResponse = await fetch(fullLink);
                const secondContent = await secondResponse.text();

                console.log('第二个链接的文本内容:', secondContent);
            } else {
                console.log('未找到对应的链接');
            }
        } else {
            console.log('未找到包含指定文本的元素');
        }
    } catch (error) {
        console.error('发生错误:', error);
    }
}

getLinkContent();
