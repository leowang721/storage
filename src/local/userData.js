/**
 * @file 微软为IE专门在系统中开辟的一块存储空间，所以说只支持Windows+IE的组合

    在XP下，一般位于C:\Documents and Settings\用户名\UserData，
    有些时候会在C:\Documents and Settings\用户名\Application Data\Microsoft\Internet Explorer\UserData。
    在Vista下，位于C:\Users\用户名\AppData\Roaming\Microsoft\Internet Explorer\UserData；

    单个文件的大小限制是128KB，一个域名下总共可以保存1024KB的文件，文件个数应该没有限制。
    在受限站点里这两个值分别是64KB和640KB，所以如果考虑到各种情况的话，单个文件最好能控制64KB以下

    基本语法 :
    XML: <Prefix: CustomTag id=sID style=”behavior:url(‘#default#userData’)” />
    HTML: <ELEMENT style=”behavior:url(‘#default#userData’)” id=sID> 
    Script:
    object.style.behavior = “url(‘#default#userData’)”
    object.addBehavior (“#default#userData”) 

    属性:
    expires 设置或者获取 userData behavior 保存数据的失效日期。
    XMLDocument 获取 XML 的引用。 

    方法:
    getAttribute() 获取指定的属性值。
    load(object) 从 userData 存储区载入存储的对象数据。
    removeAttribute() 移除对象的指定属性。
    save(object) 将对象数据存储到一个 userData 存储区。
    setAttribute() 设置指定的属性值。 


    要使用userData存储功能，必须先建立一个HTML标签，
    然后将behavior:url(‘#default#userData’)样式属性加上去，
    等于说userData是寄存于HTML标签的，当然不是所有标签都是可以的，仅限于部分标签。
    要了解更多的信息可以访问MSDN的《userData Behavior》
    http://msdn.microsoft.com/zh-cn/vstudio/ms531424

 * @author Leo Wang(wangkemiao@baidu.com)
 */

define( function ( require ) {
    // 引入一个依赖的模块，可以使用require( relative/top-level id ) 
    // var dependModule = require( './dependModule' );

    
    /**
     * 微软为IE专门在系统中开辟的一块存储空间，所以说只支持Windows+IE的组合
        实际上我们不应该直接使用它
        它只不过是在低版本IE的顶替localStorage的方案而已
     */
    var userData = {
        data : null,
        name : location.hostname,
        init:function(){
            if (!userData.data) {
                try {
                    userData.data = document.createElement('input');
                    userData.data.type = "hidden";
                    userData.data.style.display = "none";
                    userData.data.addBehavior("#default#userData");
                    document.body.appendChild(userData.data);
                    var expires = new Date();
                    expires.setDate(expires.getDate()+365);
                    userData.data.expires = expires.toUTCString();
                }
                catch(e) {
                    return false;
                }
            }
            return true;
        }
    };

    var storage = {
        enabled : true,
        onstorage : null,
        getItem : function(key) {
            if(userData.init()){
                userData.data.load(userData.name);
                return userData.data.getAttribute(key);
            }
        },
        setItem : function(key, value) {
            if(userData.init()){
                userData.data.load(userData.name);
                userData.data.setAttribute(key, value);
                userData.data.save(userData.name);
                if('function' === typeof this.onstorage) {
                    this.onstorage.call(this, 'set', key, value);
                }
            }
        },
        removeItem : function(key) {
            if(userData.init()){
                userData.data.load(userData.name);
                userData.data.removeAttribute(key);
                userData.data.save(userData.name);
            }
            if('function' === typeof this.onstorage) {
                this.onstorage.call(this, 'remove', key);
            }
        },
        clear: function() {
            if('function' === typeof this.onstorage) {
                this.onstorage.call(this, 'clear');
            }
        }
    };

    // return模块
    return storage;
} );
