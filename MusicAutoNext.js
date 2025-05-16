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
