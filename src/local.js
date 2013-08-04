/**
 * @file localStorage存储控制模块
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {

    // 支持localStorage，则默认使用localStorage
    if(window.localStorage) {
        return require('./local/localStorage');
    }
    else {
        // 如果是IE …… 并且还不支持localStorage
        // IE5.5 ~ IE7
        if(window.navigator.userAgent.indexOf('MSIE') > -1) {
            // 使用userData
            return require('./local/userData');
        }
        else {
            // 可能是低版本的其他浏览器，那么判断，是否支持flash
            // 需要注意的是IE已经判断过了，再低于5.5就不管了
            if(navigator.plugins["Shockwave Flash"]) {
                return require('./local/flash');
            }
            else {
                return {
                    enabled: false
                }
            }
        }
    }
    
} );