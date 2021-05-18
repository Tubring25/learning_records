export {}
let str:string = 'hello'

let unkonw:unknown // unknow类型可以是任意  不能直接赋值给其他变量
let any:any // any类型可以是任意值  能直接赋值给其他变量，并且将其他变量变为any类型


// 类型断言
let s = str as string
s = <string>str

// void 表示空  空值
// never 表示没有值
function fn(): never {
  throw new Error('error')
}

// 对象
let obj: object // 一般不用
let o: {name: string, age?:number} // 定义时可以指定属性
let anyObj: {name: string, [propName: string]: any} //  可以添加任意属性的对象

/**
 * 设置函数的类型声明
 * 语法： (形参：类型...) => 返回值 
 */
let d: (a:string, b:number) => number


// string[] 表示字符串数组 number[]数值数组
// Array<string>  Array<number>

/**
 * 元组: 固定长度的数组
 */
let h: [string, string];

/**
 * enum 枚举
 */
enum Gender {
  Male,
  Female
}

let i: {name: string, gender: Gender}
i = {
  name: 'xx',
  gender: Gender.Male
}

// & 表示同时
let j: {name: string} & {age: number};

// 类型别名
type MyType = 1 | 2 |3 |4|5
let k: 1 | 2 |3 |4|5;
let m : MyType