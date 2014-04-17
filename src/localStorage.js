/**
 * @file storage的localStorage模式
 * 只支持IE8+，不再提供userData模拟
 * 扩展原因：默认的存储只支持字符串，在这里直接支持JSON
 * @author Leo Wang(leowang721@gmail.com)
 */

define(function (require) {

    var util = require('./util');

    /**
     * 获取浏览器的原生localStorage
     * @return {?(localStorage|globalStorage)}
     */
    function getStorage() {
        if (typeof window.localStorage == 'object') {
            return window.localStorage;
        } else if (typeof window.globalStorage == 'object') {
            return window.globalStorage[window.location.host];
        } else {
            return null;
        }
    }

    /**
     * 存储器实例
     * @type {?(localStorage|globalStorage)}
     */
    var storage = getStorage();

    // 如果不支持，会转为memory，并且标记supported状态为false
    if (!storage) {
        var fallback = require('./memory').createInstance();
        fallback.supported = false;
        return fallback;
    }

    /**
     * 存储控制器
     */
    var storageCtrl = {
        /**
         * 支持状态，到这里肯定是true
         * @type {boolean}
         */
        supported: true
    };

    // 扩展工具集
    $.extend(storageCtrl, util.getExtendedStorageMethods(storage));

    return storageCtrl;
});