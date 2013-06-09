/**
 * @file 本地存储
    IE8+，FF3+，Opera10.5+，Chrome4+，Safari4+，iPhone2+，Android2+
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {

    var $ = require('jquery');
    
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

    if($.browser.msie && parseFloat($.browser.version) < 8) {
        // 低版本的IE
        return require('./userDataStorage');
    }

    // 再判断一下是否支持，这时候如果再不支持的话，就悲剧了，使用flashStorage吧
    if(!window.localStorage) {
        return require('./flashStorage');
    }
    
    // 最后才是真正的localStorage的封装
    var storage = {};
    

    // return模块
    return storage;
} );
