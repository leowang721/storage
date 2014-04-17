storage
=======

storage是一个简单的通用存储控制模块，当前支持localStorage、sessionStorage、内存

主要特性：

+ CommonJS/AMD模式调用
+ 支持localStorage、sessionStorage、memory模式
+ 针对localStorage和sessionStorage提供了JSON支持
+ 所有模式的调用均为统一方式

- [Start](#start)
- [Usage](#usage)

## Start
可以直接在CommonJS/AMD的模块定义环境下使用

```javascript
var localStorage = require('storage/localStorage');
localStorage.getItem('sth');
localStorage.setItem('sth', { name: 'Leo' });
localStorage.updateItem('sth', { sex: 'male' });
```

## Usage

### 公共方法

#### getItem

获取某个键值对应的数据

```javascript
/**
 * getItem
 * @param {string} key
 * @return {*} 
 */
```

不限定只返回`string`类型的数据，而是setItem时传入的数据。

_TODO_：特殊类型例如`NaN`以及空字符串等尚待确认。

#### setItem

设置某个键值对应的数据，如果已经有值，会被直接覆盖

```javascript
/**
 * setItem
 * @param {string} key
 * @param {*} value 
 * @return {*} 
 */
```

不限定只能配置基础数据，会自动进行JSON.stringify处理

_TODO_: cache最大化，写入延迟化

#### updateItem

数据更新

针对于Object类型的更新处理

也可用于：如果有值则更新，无则设置的初始化行为

```javascript
/**
 * updateItem
 * @param {string} key
 * @param {*} value 
 * @return {*} 
 */
```

特性：

- 如果`newValue`与`oldValue`类型不相同，则直接是setItem行为
- 如果`newValue`与`oldValue`类型相同
    - 如果是`Array`或者`PlainObject`，则直接更新数据
    - 否则是setItem行为

#### removeItem

删除一条键值对应的数据

#### clear

清空所有的存储数据