/**
 * @file 本地存储
    IE8+，FF3+，Opera10.5+，Chrome4+，Safari4+，iPhone2+，Android2+
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {
    
    /**
     * 本地存储
        顶替了cookie的东西

        cookie太小了，并且有限制：
            IE6每域名20个
            每个4KB
        localStorage限制为5MB，但是在有些浏览器下很慢，例如opera……

        接口：
            localStorage.getItem(key):获取指定key本地存储的值 
            localStorage.setItem(key,value)：将value存储到key字段 
            localStorage.removeItem(key):删除指定key本地存储的值 
            localStorage.clear():清空

        localStorage存储的值都是字符串类型

        localStorage还提供了一个storage事件，在存储的值改变后触发

        浏览器差异：
        1. 数字索引
            FF下可以这么设置，但是不能直接localStorage[5]来读，即使是'5'
            获取的时候可以localStorage.getItem(5);
        2. 不存在的索引
            如果是 localStorage['sth']：
                FF返回null，其他浏览器返回undefined
            如果是 localStorage.getItem('sth')：
                Chr和FF返回null，其他浏览器返回undefined
        3. FF不支持file://协议下的localStorage

     */
    

    if(!window.localStorage) {
        return {
            enabled: false
        }
    }

    var storage = {
        enabled: true
    };

    var _store = window.localStorage;

    /**
     * 获取指定key本地存储的值
     */
    storage.getItem = function(key) {
        var val = _store.getItem(key);
        /**
         * 不存在的索引
            如果是 localStorage['sth']：
                FF返回null，其他浏览器返回undefined
            如果是 localStorage.getItem('sth')：
                Chr和FF返回null，其他浏览器返回undefined

            这里进行了统一封装：返回null
         */
        if('undefined' === typeof val) {
            return null;
        }

        return val;
    };

    /**
     * 将value存储到key字段
     */
    storage.setItem = function(key, val) {
        _store.setItem(key, val);
        if('function' === typeof this.onstorage) {
            this.onstorage.call(this, 'set', key, val);
        }
        return _store;
    };

    /**
     * 删除指定key本地存储的值
     */
    storage.removeItem = function(key) {
        _store.removeItem(key);
        if('function' === typeof this.onstorage) {
            this.onstorage.call(this, 'remove', key);
        }
        return _store;
    };

    /**
     * 清空
     */
    storage.clear = function() {
        _store.clear();
        if('function' === typeof this.onstorage) {
            this.onstorage.call(this, 'clear');
        }
        return _store;
    };

    /**
     * 
        localStorage还提供了一个storage事件，在存储的值改变后触发
        
        在firefox和chrome中存储和读取都是正常的
        但是对storage事件的触发似乎有点问题
        自身页面进行setItem后没有触发window的storage事件
        但是同时访问A.html和B.html
        在A页面中进行 setItem能触发B页面中window的storage事件
        同样的在B页面中进行setItem能触发A页面中window的storage事件. 
        在IE9中, 页面自身的设值能触发当前页面的storage事件
        同样当前页面的设值能触发同一“起源”下其他页面window的storage事件
        
        因此，这个东西在这里进行了一次封装，不再使用window.storage事件
        而是自身的
     */
    storage.onstorage = null;

    // return模块
    return storage;
} );