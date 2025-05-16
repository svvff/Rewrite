// ==UserScript==
// @name         自动播放音乐
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  实现QQMP3网站歌曲无限自动播放下一首
// @author       Your Name
// @match        *://www.qqmp3.vip/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 配置项
    const NEXT_BUTTON_ID = 'next-btn';
    const PROGRESS_CLASS = 'progress';
    const PROGRESS_BAR_SELECTOR = '.progress-bar'; 
    const COMPLETE_THRESHOLD = 99.5; 

    let lastProgress = 0; 
    let isProcessing = false; 
    let userInteracted = false; 

    function resetState() {
        isProcessing = false;
        lastProgress = 0;
    }

    function getElements() {
        const nextBtn = document.getElementById(NEXT_BUTTON_ID);
        const progressBar = document.querySelector(`.${PROGRESS_CLASS} ${PROGRESS_BAR_SELECTOR}`);
        return { nextBtn, progressBar };
    }

    function getProgressPercentage(progressBar) {
        if (!progressBar) return 0;
        const width = window.getComputedStyle(progressBar).width;
        return parseFloat(width.replace('%', '')) || 0;
    }

    function checkAndTrigger() {
        if (!userInteracted) return; 

        const { nextBtn, progressBar } = getElements();
        if (!nextBtn ||!progressBar) return;

        const currentProgress = getProgressPercentage(progressBar);
        console.log(`当前进度：${currentProgress.toFixed(1)}%`);

        if (currentProgress >= COMPLETE_THRESHOLD &&!isProcessing && lastProgress < currentProgress) {
            isProcessing = true; 
            console.log("开始触发下一首...");
            triggerNextSong(nextBtn);
            resetState(); 
        }
        lastProgress = currentProgress;
    }

    function triggerNextSong(btn) {
        if (btn && btn.offsetWidth > 0) {
            btn.click();
            console.log("下一首已点击，等待新歌曲加载...");
            setTimeout(() => resetState(), 1000); 
        } else {
            console.error("下一首按钮不可用");
            resetState(); 
        }
    }

    function init() {
        const { nextBtn } = getElements();
        if (!nextBtn) {
            console.error(`未找到按钮：${NEXT_BUTTON_ID}`);
            return;
        }

        document.addEventListener('click', function () {
            if (!userInteracted) {
                userInteracted = true;
                console.log("用户已进行交互，开始自动播放监听");
            }
        });

        setInterval(checkAndTrigger, 1000); 
        console.log("脚本已启动，等待用户交互...");
    }

    init();
})();
