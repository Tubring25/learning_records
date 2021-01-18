# 解构赋值

### **数组解构赋值**

1. **基本用法**

```jsx
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third] = ["foo", "bar", "baz"];
let [head, ...tail] = [1, 2, 3, 4];
let [x, y, ...z] = ['a'];

```

解构不成功时输出undefined

等号右边如果不是数组或可遍历结构会报错

2. **默认值**

解构赋值可设置默认值, 默认值可引用解构赋值的其他变量,但该变量需提前声明

### 对象的解构赋值

- 简介

数组的元素是按照顺序排列,变量的取值取决于它的位置. 但对象的属性没有次序,变量需与属性同名

变量与属性名不一致时, 需写成

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };

冒号左边为属性名,右边为被赋值的变量名

- 默认值

对象的解构赋值也可以设置默认值

1. 注意点
    1. 如果将一个已声明的变量解构赋值,需使用括号包裹, 防止js将其理解为一个代码块

let x; ({x} = {x: 1});

1. 解构赋值允许等号左边只有大括号不放置任何变量名
2. 数组的本质是特殊的对象,可以对数组进行对象属性的解构

let arr = [1, 2, 3]; let {0 : first, [arr.length - 1] : last} = arr; first // 1 last // 3

1. 字符串的解构赋值

字符串会被转换成一个类似数组的对象, 类数组对象含有 length 属性, 可对此属性进行解构赋值

1. 数值和布尔值的解构赋值

let {toString: s} = 123; s === Number.prototype.toString // true

let {toString: s} = true; s === Boolean.prototype.toString // true

如果右边是数值或者布尔值, 会先转成对象再进行解构赋值

数值和布尔值都具有 toString 属性

undefined和null无法转化为对象, 在等号右边时会报错

1. 函数参数的解构赋值

函数的参数也可以解构赋值, 且可以对参数设置默认值

function add([x, y]){ return x + y; }

[[1, 2], [3, 4]].map(([a, b]) => a + b);

1. 用途
    1. 交换变量的值

[x, y] = [y, x];

1. 从函数返回多个值
2. 解构赋值可将参数与变量名对应
3. 提取json中的数据
4. 指定参数的默认值
5. 遍历map结构
6. 输入模块的指定方法

const { SourceMapConsumer, SourceNode } = require("source-map");