// ==UserScript==
// @name         百度网盘字幕位置调整
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  尝试将百度网盘视频字幕位置移动到视频底部居中
// @author       你自己
// @match        https://pan.baidu.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', function () {
        setTimeout(function () {
            var subtitleContainer = document.querySelector('.vp-video__subtitle-text');
            if (subtitleContainer) {
                subtitleContainer.style.position = 'absolute';
                subtitleContainer.style.bottom = '30px';
                // 使用flex布局使其居中
                subtitleContainer.style.display = 'flex';
                subtitleContainer.style.justifyContent = 'center';
                subtitleContainer.style.alignItems = 'center';
            }
        }, 2000);
    });
})();