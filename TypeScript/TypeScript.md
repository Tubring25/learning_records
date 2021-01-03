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