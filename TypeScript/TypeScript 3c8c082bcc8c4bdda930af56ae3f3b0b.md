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

全局变量的声明文件主要有以下几种语法：

- `[declare var](https://ts.xcatliu.com/basics/declaration-files.html#declare-var)` 声明全局变量
- `[declare function](https://ts.xcatliu.com/basics/declaration-files.html#declare-function)` 声明全局方法
- `[declare class](https://ts.xcatliu.com/basics/declaration-files.html#declare-class)` 声明全局类
- `[declare enum](https://ts.xcatliu.com/basics/declaration-files.html#declare-enum)` 声明全局枚举类型
- `[declare namespace](https://ts.xcatliu.com/basics/declaration-files.html#declare-namespace)` 声明（含有子属性的）全局对象
- `[interface` 和 `type`](https://ts.xcatliu.com/basics/declaration-files.html#interface-he-type) 声明全局类型

全局变量只能定义类型，不能用来定义具体的实现

# 进阶

## 类型别名

类型别名用来给一个类型起个新名字。

## 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```tsx
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

## 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

```tsx

let tom: [string, number] = ['Tom', 25];

let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

//当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
tom = ['Tom']; // 报错
```

## 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```tsx
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

### 手动赋值

```tsx
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
//未手动赋值的枚举项会接着上一个枚举项递增。
console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
//递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了。
```

手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：

```tsx
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
```

### 常数项和计算所得项

```tsx
enum Color {Red, Green, Blue = "blue".length};

// 如果计算所得项后面是未手动赋值的项，那么它就会因为无法获得初始值而报错
enum Color {Red = "red".length, Green, Blue};
// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

### 常数枚举

常数枚举是使用 `const enum` 定义的枚举类型

假如包含了计算成员，则会在编译阶段报错

### 外部枚举

外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型

也可以使用`declare const enum`

## 类

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

当构造函数修饰为 `private` 时，该类不允许被继承或者实例化

```tsx
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack'); // 报错
```

### 参数属性

修饰符和`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

```tsx
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

**readonly**

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

```tsx
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```tsx
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

**抽象类**

`abstract` 用于定义抽象类和其中的抽象方法。

抽象类是不允许被实例化的

抽象类中的抽象方法必须被子类实现

### 类的类型

给类加上 TypeScript 的类型很简单，与接口类似：

```tsx
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

## 类与接口

### 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。

```tsx
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}

// 一个类可以实现多个接口
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

### 接口继承接口

接口与接口之间可以是继承关系：

```
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}
```

### 接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：

```tsx
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```tsx
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 T 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

```tsx
// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```tsx
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```