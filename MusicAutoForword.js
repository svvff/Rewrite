// ==UserScript==
// @name         音乐网站自动切歌（播放结束触发）
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  监听音频结束事件，自动切换下一首
// @author       Your Name
// @match        *://music.example.com/* // 替换为目标网站
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 存储已监听的音频元素，避免重复绑定事件
    const listenedAudios = new Set();

    // 查找并监听所有音频元素的播放结束事件
    function monitorAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        for (const audio of audioElements) {
            if (!listenedAudios.has(audio)) {
                audio.addEventListener('ended', handleAudioEnd);
                listenedAudios.add(audio);
            }
        }
    }

    // 处理音频结束事件：触发切歌
    function handleAudioEnd() {
        console.log("检测到歌曲播放结束");
        const nextButton = findNextSongButton();
        if (nextButton) {
            try {
                // 模拟点击前确保按钮可见且可点击
                if (nextButton.offsetWidth > 0 && nextButton.offsetHeight > 0) {
                    nextButton.click();
                    console.log("已触发下一首");
                } else {
                    console.log("下一首按钮不可见，跳过");
                }
            } catch (error) {
                console.error("切歌失败:", error);
            }
        } else {
            console.log("未找到下一首按钮，尝试重新查找");
            setTimeout(findNextSongButton, 1000); // 延迟重试
        }
    }

    // 查找下一首按钮（需根据网站调试选择器）
    function findNextSongButton() {
        // 示例选择器（请替换为目标网站实际选择器）
        return document.querySelector(
            'button[class*="next-song"],' + // 类名包含"next-song"的按钮
            'button[aria-label="下一首"],' + // 无障碍标签为"下一首"的按钮
            'i[class*="icon-next"]' // 图标类名包含"next"的元素（如FontAwesome图标）
        );
    }

    // 初始化：页面加载时绑定事件，并定时检查新音频元素（应对动态加载）
    function init() {
        monitorAudioElements();
        // 每隔2秒检查是否有新音频元素加载（如滚动加载或AJAX加载）
        setInterval(monitorAudioElements, 2000);
    }

    // 立即执行初始化
    init();
})();
