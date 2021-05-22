// 使用class来定义类
/**
 * 类中主要包含两个部分：
 *    属性
 *    方法
 */
class Person {
  // 定义实例属性   即创建实例后才能使用 new创建
  name:string = 'xx'
  readonly name2:string = 'xxx' // 只读属性  不可修改
  // 静态属性：在属性前使用static关键字定义的属性
  static age: number = 10
  static readonly age2:number = 10 // 静态只读属性

  // 定义方法
  sayHello() {}
  static sayHellow2() {}
}

let per = new Person()

console.log(per.name)
console.log(Person.age)

class Dog {
  name: string
  age: number
  bark() {
    alert('123')
  }

  // 构造函数   在对象创建时调用
  constructor(name:string, age: number) {
    // 在实例方法中，this就表示当前的实例
    // 在构造函数中当前对象就是当前新建的对象
    // 可以通过this向当前新建的对象中添加属性
    console.log(this)
    this.name = name
    this.age = age
  }
}
const dog = new Dog('doge', 2)