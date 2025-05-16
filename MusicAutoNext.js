// ==UserScript==
// @name         百分比进度条自动切歌脚本
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  监听进度条宽度达到100%时自动切歌
// @author       Your Name
// @match        *://www.qqmp3.vip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 配置项
    const NEXT_BUTTON_ID = 'next-btn'; // 下一首按钮ID
    const PROGRESS_CLASS = 'progress'; // 进度条父类名
    const PROGRESS_BAR_SELECTOR = '.progress-bar'; // 进度条元素选择器（需根据实际调整）
    const COMPLETE_THRESHOLD = 99.5; // 完成阈值（%），避免浮点误差

    let lastProgress = 0; // 记录上一次进度值

    // 获取下一首按钮和进度条元素
    function getElements() {
        const nextBtn = document.getElementById(NEXT_BUTTON_ID);
        const progressBar = document.querySelector(`.${PROGRESS_CLASS} ${PROGRESS_BAR_SELECTOR}`);
        return { nextBtn, progressBar };
    }

    // 解析进度条宽度为百分比数值
    function getProgressPercentage(progressBar) {
        if (!progressBar) return 0;
        const width = window.getComputedStyle(progressBar).width;
        const percentage = parseFloat(width.replace('%', '')); // 提取数值部分
        return isNaN(percentage) ? 0 : percentage;
    }

    // 检查是否播放完毕
    function checkCompletion() {
        const { nextBtn, progressBar } = getElements();
        if (!nextBtn || !progressBar) return;

        const currentProgress = getProgressPercentage(progressBar);
        console.log(`当前进度：${currentProgress}%`);

        // 当进度超过阈值且上一次进度小于当前进度（避免倒退或重复触发）
        if (currentProgress >= COMPLETE_THRESHOLD && lastProgress < currentProgress) {
            console.log("歌曲播放完毕，触发下一首");
            triggerNextSong(nextBtn);
        }
        lastProgress = currentProgress;
    }

    // 触发点击下一首按钮
    function triggerNextSong(btn) {
        if (btn && btn.offsetWidth > 0 && btn.tagName === 'BUTTON') {
            btn.click();
            console.log("已点击下一首按钮");
        } else {
            console.error("下一首按钮不可用或不可见");
        }
    }

    // 初始化监听
    function init() {
        const { nextBtn } = getElements();
        if (!nextBtn) {
            console.error(`未找到下一首按钮（ID: ${NEXT_BUTTON_ID}）`);
            return;
        }

        // 每500毫秒检查一次进度（可调整间隔）
        setInterval(checkCompletion, 500);
        console.log("脚本已启动，正在监听进度条变化...");
    }

    init();
})();
