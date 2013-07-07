/**
 * @file 存储控制模块
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {
        
    // 本地存储，IE8+，FF3+，Opera10.5+，Chrome4+，Safari4+，iPhone2+，Android2+
    var local = require('./local');

    // userData Storage for IE
    var userData = require('./userData');

    // flash Storage
    var flash = require('./flash');

    // cookie
    var cookie = require('./cookie');

    // 进行默认的初始化处理，返回一个最通用的存储形式
    // 在此，使用了能力检测，而不是浏览器检测
    // 并且，这里默认返回的是持久化的存储方式
    // 如果是非持久化的，可以直接去使用 storage/session

    if(local.enabled) {
        return local;
    }
    else {
        return session;
    }
} );
