(function() {

  /**
   * 以abstract开头的类为抽象类
   *    不能用来创建对象
   *    抽象类为专门用来被继承的类 
   */
  abstract class Animal{
    name:string
    age:number
    constructor(name:string, age: number) {
      console.log(this)
      this.name = name
      this.age = age
    }

    /**
     * 定义抽象方法
     * 抽象方法使用abstract开头，且没有方法体
     * 只能定义在抽象类中，子类必须对抽象方法进行重写
     */
    abstract sayHellow():void
  }


  class Dog extends Animal{
    // 如果子类显示写了contructor，则需要调用super
    constructor(name:string, age:number) {
      super(name, age)

    }
    sayHellow() {
      console.log(this.name)
    }
  }
  let dog = new Dog('doge', 3)
  

})()