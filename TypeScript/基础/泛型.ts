// function fn(a:number):number {
//   return a
// }

/**
 * 在定义函数或类时，如果类型不明确，即可使用泛型
 */

function fn<T>(a: T): T {
  return a
}

fn(10) // 不指定泛型, ts对类型自动推断
fn<string>('123') // 指定泛型。

function fn2<T, K>(a:T, b:K):T {
  return a
}
fn2<number, string>(123,'111')

interface Inter{
  length: number
}
// T extends Inter 表示泛型T必须是Inter的实现类（子类）
function fn3<T extends Inter>(a: T): number{
  return a.length
}
fn3('1111')

class MyClass<T> {
  name: T
  constructor(name: T) {
    this.name = name
  }
}

const mc = new MyClass<string>('myname')