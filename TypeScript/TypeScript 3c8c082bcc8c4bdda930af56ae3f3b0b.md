# TypeScript

# 基础

## 原始数据类型

JS中类型分为：原始数据类型和对象类型

原始数据类型分为：布尔型、数值、字符串、`null`、`undefined` 和ES6中新增的`Symbol`、`BigInt`

### 布尔值

在TypeScript中，使用`boolean`定义布尔值：

```tsx
let isDone: boolean = false

// 使用new Boolean()创建的不是布尔类型，而是对象类型
let createdByNewBoolean: boolean = new Boolean(1); // 报错 

// 直接调用Boolean也可以返回boolean类型
let createdByBoolean: boolean = Boolean(1)
```

### **空值**

JS中没有空值的概念，在TS中，可以用`void`表示没有任何返回值的函数

```tsx
function alertName(): void {
    alert('My name is Tom');
}
```

### Null 和 Undefined

在TS中可以用`null`和`undefined`定义原始数据类型，与`void`的区别是：`undefined`类型的变量可以赋值给`number`类型的变量，而`void`类型的变量不能赋值给`number`类型的变量

## 任意值

任意值（Any）用来表示允许赋值为任意类型。

普通类型在赋值时改变类型是不允许的

在任意值上访问任何属性都是允许的

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

## 类型推论

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

```tsx
// 报错
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 相当于
let myFavoriteNumber: string = 'seven'
myFavoriteNumber = 7
```