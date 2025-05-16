// ==UserScript==
// @name         循环监听进度条自动切歌
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  持续监听进度条，支持多首歌曲循环切歌
// @author       Your Name
// @match        *://www.qqmp3.vip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 配置项
    const NEXT_BUTTON_ID = 'next-btn';
    const PROGRESS_CLASS = 'progress';
    const PROGRESS_BAR_SELECTOR = '.progress-bar'; // 进度条子元素选择器
    const COMPLETE_THRESHOLD = 99.5; // 完成阈值（%）
    let isProcessing = false; // 防止重复触发标志

    // 重置状态
    function resetState() {
        isProcessing = false;
        lastProgress = 0;
    }

    let lastProgress = 0; // 记录上一次进度值

    // 获取元素
    function getElements() {
        const nextBtn = document.getElementById(NEXT_BUTTON_ID);
        const progressBar = document.querySelector(`.${PROGRESS_CLASS} ${PROGRESS_BAR_SELECTOR}`);
        return { nextBtn, progressBar };
    }

    // 解析进度百分比
    function getProgressPercentage(progressBar) {
        if (!progressBar) return 0;
        const width = window.getComputedStyle(progressBar).width;
        return parseFloat(width.replace('%', '')) || 0;
    }

    // 检查播放完成并触发切歌
    function checkAndTrigger() {
        const { nextBtn, progressBar } = getElements();
        if (!nextBtn || !progressBar) return;

        const currentProgress = getProgressPercentage(progressBar);
        console.log(`当前进度：${currentProgress.toFixed(1)}%`);

        // 达到阈值且未在处理中
        if (currentProgress >= COMPLETE_THRESHOLD && !isProcessing && lastProgress < currentProgress) {
            isProcessing = true; // 锁定处理状态
            console.log("开始触发下一首...");
            triggerNextSong(nextBtn);
            resetState(); // 触发后重置状态，等待下一次播放
        }
        lastProgress = currentProgress;
    }

    // 触发下一首并重置进度
    function triggerNextSong(btn) {
        if (btn && btn.offsetWidth > 0) {
            btn.click();
            console.log("下一首已点击，等待新歌曲加载...");
            // 延迟重置状态，避免立即检测到旧进度
            setTimeout(() => resetState(), 1000); 
        } else {
            console.error("下一首按钮不可用");
            resetState(); // 出错时强制重置
        }
    }

    // 初始化监听
    function init() {
        const { nextBtn } = getElements();
        if (!nextBtn) {
            console.error(`未找到按钮：${NEXT_BUTTON_ID}`);
            return;
        }

        // 每秒检查一次进度（可调整为更频繁或更稀疏）
        setInterval(checkAndTrigger, 1000);
        console.log("循环监听已启动，持续检测进度条变化...");
    }

    init();
})();
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
