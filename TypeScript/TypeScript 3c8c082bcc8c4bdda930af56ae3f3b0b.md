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

## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```jsx
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```jsx
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// length不是string和number共有的属性
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型，赋值后再访问推断出的类型的属性，不会报错

## 对象的类型——接口

使用接口（Interfaces）来定义对象的类型

```tsx
interface People = {
	name: string,
	age: number,
}
let tom: People = {
	name: 'tom',
	age: 7,
}
```

赋值的时候，变量的形状必须和接口的形状保持一致。不能增加也不能减少

### 可选属性

```tsx
interface People = {
	name: string,
	age?: number,
}
```

变量赋值时。可选属性可不必赋值，但不能新增属性

### 任意属性

```tsx
interface People = {
	name: string,
	age?: number,
	[propName: string]: any;
}
```

一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

### 只读属性

```tsx
interface People = {
	readonly name: string,
	age?: number,
	[propName: string]: any;
}
```

## 数组的表示

```tsx
//「类型 + 方括号」表示法, 指定类型后，数组中不允许出现其他类型的值
let fibonacci: number[] = [1, 1, 2, 3, 5];
// 数组泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

```tsx
// 用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// any 在数组中的应用
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

## 函数的声明

ts中需要把函数的输入输出均表示出来，调用时，函数过多过少均不可

```tsx
function sum(x: number, y: number): number {
    return x + y;
}
```

### 函数表达式

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```tsx
let mySum = function (x: number, y: number): number {
    return x + y;
};

```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```tsx
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

### 接口定义函数的形状

```tsx
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

### 可选参数

用`?`表示可选参数，且可选参数后不能再定义必传参数

### 参数默认值

TypeScript 会将添加了默认值的参数识别为可选参数，但后面依然可以接必传参数

```tsx
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

### 剩余参数

用`...`表示，且必须是最后一个参数

```tsx
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
```

### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```tsx
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
// 我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。
```

## 类型断言

### 语法

```tsx
// 尽量使用第一种
值 as 类型
<类型>值
```

### 类型断言的用途

- **将一个联合类型断言为其中一个类型**

    ```tsx
    interface Cat {
        name: string;
        run(): void;
    }
    interface Fish {
        name: string;
        swim(): void;
    }

    function isFish(animal: Cat | Fish) {
        if (typeof animal.swim === 'function') {
            return true;
        }
        return false;
    }
    ```

    类型断言在编译时不会报错，但在运行时会报错

- **将一个父类断言为更加具体的子类**
- **将任何一个类型断言为 any**

    ```tsx
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }

    interface Cat {
        name: string;
        run(): void;
    }

    const tom = getCacheData('tom') as Cat;
    tom.run();

    ```

    上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。

## 声明文件

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件