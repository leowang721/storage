/**
 * @file storage的公共工具集
 * @author Leo Wang(leowang721@gmail.com)
 */

define(function (require) {

    /**
     * 基础toString方法
     */
    function toString(target) {
        return Object.prototype.toString.call(target);
    }

    /**
     * 是否是IE8，IE8下配置一下强制写入数据
     * 这里使用了特性判断，判断IE8及之前版本
     * @type {boolean}
     */
    var isIE8 = typeof window.document.createElement != 'function';

    var util = {

        /**
         * 扩展webstorage方法
         * @param {localStorage|sessionStorage} storage 实例
         * @returns {Object} 扩展后的工具集
         */
        getExtendedStorageMethods: function (storage) {
            var methods = {

                /**
                 * 获取数据
                 * @param {string} key 键
                 */
                getItem: function (key) {
                    var value = null;
                    try {
                        value = JSON.parse(storage.getItem(key));
                    } catch (e) { }

                    return value;
                },

                /**
                 * 设置数据
                 * @param {string} key 键
                 * @param {*} value 值
                 * @returns {*} 返回新值
                 */
                setItem: function (key, value) {
                    if (typeof key != 'string' || !key) {
                        throw new Error('错误的storage.setItem使用，非法键值');
                    }

                    // IE8是异步写入的，这是为了消除那小小的延迟特性
                    if (isIE8) {
                        storage.begin();
                        storage.setItem(key, JSON.stringify(value));
                        storage.commit();
                    } else {
                        storage.setItem(key, JSON.stringify(value));
                    }

                    return storage.getItem(key);
                },

                /**
                 * 更新数据
                 * @param {string} key 键
                 * @param {*} value 要更新的值
                 * @returns {*} 返回新值
                 */
                updateItem: function (key, value) {
                    if (typeof key != 'string' || !key) {
                        throw new Error('错误的storage.updateItem使用，'
                            + '非法键值');
                    }
                    var origValue = methods.getItem(key);
                    if (toString(origValue) !== toString(value)) {
                        methods.setItem(key, value);
                        return;
                    }

                    if ($.isArray(value) || $.isPlainObject(value)) {
                        methods.setItem(key, $.extend(true, origValue, value));
                    } else {
                        methods.setItem(key, value);
                    }
                    return methods.getItem(key);
                },

                /**
                 * 删除数据
                 * @param {string} key 键
                 */
                removeItem: function (key) {
                    storage.removeItem(key);
                },

                /**
                 * 清空数据
                 */
                clear: function () {
                    storage.clear();
                }
            };

            return methods;
        }
    };

    return util;
});