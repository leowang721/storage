/**
 * @file storage's util
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {
    
    var util = {};

    function rand4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
    }
    /**
     * 获取一个唯一的guid
     */
    util.guid = function() {
        return (rand4() + rand4()
            + "-" + rand4()
            + "-" + rand4()
            + "-" + rand4()
            + "-" + rand4() + rand4() + rand4());
    };

    // return
    return util;
} );
