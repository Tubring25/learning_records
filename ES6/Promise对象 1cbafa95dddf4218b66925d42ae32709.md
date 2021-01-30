# Promise对象

## 属性方法

- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.prototype.finally()

    `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

    `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果

- Promise.all()

    `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

    ```jsx
    const p = Promise.all([p1, p2, p3]);
    ```

    上面代码中，`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

    `p`的状态由`p1、p2、p3`决定，分成两种情况。

    （1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

    （2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。