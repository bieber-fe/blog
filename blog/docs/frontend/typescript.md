# TypeScript 使用手册

## 常用类型与语法

### interface(接口)

### 一些相似概念的区别

1. interface 与 type 的区别
   ::: tip

   - 相同点：`interface` 和 `type` 都可以用于定义**对象结构**，两者在许多场景中是可以互换的。
   - 不同点：
     - `interface`：更专注于定义对象和类的结构，支持**继承**、**合并**
     - `type`：可以定义**类型别名**、**联合类型**、**交叉类型**，但不支持继承和自动合并

   :::

   ::: details interface 和 type 都可以定义对象结构

   ```ts
   interface PersonInterface {
     name: string
     age: number
     speak(): void
   }

   type PersonType = {
     name: string
     age: number
     speak(): void
   }

   const p1: PersonInterface = {
     name: 'Tom',
     age: 19,
     speak() {
       console.log(this.name)
     }
   }
   const p2: PersonType = {
     name: 'Tom',
     age: 19,
     speak() {
       console.log(this.name)
     }
   }
   ```

   :::
   ::: details interface 可以集成、合并

   ```ts
   interface PersonInterface {
     name: string
     age: number
   }
   interface PersonInterface {
     speak: () => void
   }
   interface StudentInterface extends PersonInterface {
     grade: string // 年级
   }
   const student: StudentInterface = {
     name: '张三',
     age: 18,
     grade: '高二',
     speak() {
       console.log(this.name, this.age, this.grade)
     }
   }
   ```

   :::
   ::: details type的交叉类型

   ```ts
   // 使用 type 定义 Person 类型，并通过交叉类型实现属性的合并
   type PersonType = {
     name: string
     age: number
   } & {
     speak: () => void
   }
   // 使用 type 定义 Student 类型，并通过交叉类型继承 PersonType
   type StudentType = PersonType & {
     grade: string
   }
   const student: StudentType = {
     name: '张三',
     age: 18,
     grade: '高二',
     speak() {
       console.log(this.name, this.age, this.grade)
     }
   }
   ```

   :::

2. interface 与 抽象类的区别
   ::: tip

   - 相同点：都用于定义一个**类的格式**
   - 不同点：
     - 接口：**只能**描述结构，**不能**有任何**实现代码**，一个类可以实现多个接口
     - 抽象类：既可以包含**抽象方法**，也可以包含**具体方法**，一个类只能继承一个抽象类

   :::

   ::: details 一个类可以实现多个接口

   ```ts
   // FlyInterface接口
   interface FlyInterface {
     fly(): void
   }
   // SwimInterface接口
   interface SwimInterface {
     swim(): void
   }
   // Duck 类实现了 FlyInterface 和 SwimInterface 两个接口
   class Duck implements FlyInterface, SwimInterface {
     fly(): void {
       console.log('鸭子可以飞')
     }

     swim(): void {
       console.log('鸭子可以游泳')
     }
   }
   // 创建一个 Duck 实例
   const duck = new Duck()
   duck.fly() // 输出：鸭子可以飞
   duck.swim() // 输出：鸭子可以游泳
   ```

   :::

## 泛型

::: tip 概念
泛型允许我们在定义函数、类或接口时，使用类型参数来表示**未指定的类型**，这些参数在具体**使用时**，才被指定**具体的类型**

泛型能让同一段代码适用于多种类型，同时仍然保持类型的安全性
:::

举例：如下代码中`<T>`就是泛型（不一定非叫`T`），设置泛型后即可在函数中使用`T`来表示该类型

::: details 泛型函数

```ts
function logData<T>(data: T) {
  console.log(data)
}

logData<number>(100)
logData<string>('hello')
```

:::

::: details 泛型可以有多个

```ts
function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data1, data2)
  return Date.now() % 2 ? data1 : data2
}

logData<number, string>(100, 'hello')
logData<string, boolean>('ok', false)
```

:::

::: details 泛型接口

```ts
interface PersonInterface<T> {
  name: string
  age: number
  extraInfo: T
}

let p1: PersonInterface<string>
let p2: PersonInterface<number>

p1 = { name: '张三', age: 19, extraInfo: '一个好人' }
p2 = { name: '李四', age: 13, extraInfo: 350 }
```

:::

::: details 泛型约束

```ts
interface PersonInterface {
  name: string
  age: number
}

function logPerson<T extends PersonInterface>(info: T): void {
  console.log(`我叫${info.name}，今年${info.age}岁了`)
}

logPerson({ name: '张三', age: 19 })
```

:::

::: details 泛型类

```ts
class Person<T> {
  constructor(
    public name: string,
    public age: number,
    public extraInfo: T
  ) {}
  speak() {
    console.log(`我叫${this.name}，今年${this.age}岁了`)
    console.log(this.extraInfo)
  }
}

// 测试代码1
const p1 = new Person<number>('tom', 30, 240)
// 测试代码2
type JobInfo = {
  title: string
  company: string
}
const p2 = new Person<JobInfo>('tom', 30, { title: '研发总监', company: 'XXX科技公司' })
```

:::

## 类型声明文件

:::tip 说明
类型声明文件是 TypeScript 中的一种特殊文件，通常以 .d.ts 作为扩展名。

它的主要是作用是**为现有的Javascript代码提供类型信息**，使得TypeScript能够在使用这些Javascript库或模块时进行
**类型检查和提示**
:::

::: details demo.js

```js
export function add(a, b) {
  return a + b
}

export function mul(a, b) {
  return a * b
}
```

:::

::: details demo.d.ts 类型声明文件

```ts
declare function add(a: number, b: number): number
declare function mul(a: number, b: number): number

export { add, mul }
```

:::

::: details index.ts中引入

```ts
import { add, mul } from './demo.js'

console.log(add(1, 2))
console.log(mul(3, 4))
```

:::
