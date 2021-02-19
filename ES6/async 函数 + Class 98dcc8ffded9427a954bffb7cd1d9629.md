# async 函数 + Class

# async 函数

async 函数是Generator的语法糖

async 函数有多种使用形式。

```jsx
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

# Class

### constructor 方法

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

### 类的实例

使用`new`命令。如果不加`new`，会报错。

实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。

### 属性表达式

```jsx
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

### Class 表达式

```jsx
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// Me只能在Class内部使用，如果没有用到Me，可以直接定义
const MyClass = class { ... }

// 立即执行的class
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

### 注意

- Class内部默认为严格模式
- 不存在变量提升
- 具有`name` 属性
- Generator 方法

    如果某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数。

    ```jsx
    class Foo {
      constructor(...args) {
        this.args = args;
      }
      * [Symbol.iterator]() {
        for (let arg of this.args) {
          yield arg;
        }
      }
    }

    for (let x of new Foo('hello', 'world')) {
      console.log(x);
    }
    // hello
    // world
    ```

- this 指向

    类的方法内部如果含有`this`，它默认指向类的实例

## 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

# Class 的继承

## super 关键字

第一种情况，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

```jsx
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

`super`虽然代表了父类A的构造函数，但是返回的是子类B的实例，即`super`内部的`this`指的是B的实例，因此`super()`在这里相当于`A.prototype.constructor.call(this)`。

第二种情况，`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```jsx
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```