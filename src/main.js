/**
 * @file 存储控制模块
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {
    // 引入一个依赖的模块，可以使用require( relative/top-level id ) 
    // var dependModule = require( './dependModule' );

    
    /**
     * 存储控制模块
     */
    var storage = {};
    
    // 本地存储，IE8+，FF3+，Opera10.5+，Chrome4+，Safari4+，iPhone2+，Android2+
    var local = require('./localStorage');

    // sessionStorage，在页面退出之前会一直保存
    var session = require('./sessionStorage');
    // cookie，不用说啥了，不建议使用
    var cookie = require('./cookieStorage');

    // flash存储，原来有跨浏览器使用的优点
    // 但是chrome自定义flash一出，就导致跨浏览器有问题了
    var flash = require('./flashStorage');

    // 本地数据库
    var sql = require('./sqlStorage');

    // 内存……
    var memory = require('./memoryStorage');

    // 进行默认的初始化处理，区分判断浏览器，返回一个最通用的存储形式
    storage.local = local;
    storage.session = session;
    storage.flash = flash;
    storage.sql = sql;
    storage.memory = memory;

    // return模块
    return storage;
} );
