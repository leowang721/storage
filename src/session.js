/**
 * @file sessionStorage存储控制模块
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {

    // 支持sessionStorage，则默认使用localStorage
    if(window.sessionStorage) {
        return require('./session/sessionStorage');
    }
    // 没有使用cookie
    else {
        return require('./session/memory');
    }

} );