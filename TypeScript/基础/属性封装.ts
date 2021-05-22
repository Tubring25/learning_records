(function() {

  class Person {
    /**
     * 在属性前添加修饰符
     *    public 公共属性  可以在任意位置访问修改  默认
     *    private  私有属性  只能在当前类的内部修改
     *        通过在类中添加方法，使私有属性可以被外部访问
     *    protected  保护属性  只能在当前类及其子类中使用
     */
    _name: string
    private _age:number
    constructor(name: string, age: number) {
      this._name = name
      this._age = age
    }
    getAge () {
      return this._age
    }
    setAge(age:number) {
      this._age = age
    }


    // ts中设置getter方法的方式
    get name() {
      return this._name
    }
  }

  const per = new Person('person', 30)

  /**
   * 现在属性直接在对象中设置
   *    属性可以被任意修改，导致对象的数据变得不安全
   */
  per.name = 'person2'


  class C {
    // 可以直接将属性定义在构造函数中
    constructor(public name:string, public age:number) {}
  }
  const c = new C('12', 32)
  console.log(c.name)
})()