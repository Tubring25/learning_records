(function() {

  // 描述一个对象类型
  type myType = {
    name:string,
    age:number
  }

  /**
   * 接口用来定义  类的结构,
   *    定义类中应该包含的属性和方法
   *     也可以当作类型声明使用
   *    可以重复声明，如果重复声明，则所有属性合并
   *    接口只定义结构，不考虑实际值，不能定义实际方法，所有方法均为抽象方法
   */
  interface myInterface {
    name: string,
    sayHellow():void
  }
  /**
   * 定义类时，可以使类去实现一个接口
   *    实现接口：使类满足接口的要求
   */
  class myClass implements myInterface {
    constructor(name:string) {
      this.name = name
    }
    name: string
    sayHellow(): void {
      console.log(123123)
      throw new Error("Method not implemented.")
    }

  }
})()