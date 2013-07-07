/**
 * @file flash形式的本地存储
 	flash player 6开始，开发人员就已经可以在客户端存储数据了

 	它们最多只能使用 100 KB 的存储空间，除非客户同意分配更多的空间。

 	曾被用来当作跨浏览器的存储机制，但是当Chrome的自定义flash一出，就不行了
 */

define( function( require ) {

	if(!navigator.plugins["Shockwave Flash"]) {
		return {
			enabled: false
		};
	}

	var flashStorage = {
		_flash: null,
		init: function() {
			
		}
	};

} );

