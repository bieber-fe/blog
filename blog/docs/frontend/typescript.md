# TypeScript 使用手册

## 编译TypeScript

:::tip
浏览器不能直接运行 TypeScript 代码，需要编译为 JavaScript 再交由浏览器解析器执行
:::

### 命令行编译

- 全局安装 TypeScript
  ```bash
  $ npm install typescript -g
  ```
- 使用命令编译.ts文件
  ```bash
  $ tsc demo.ts
  ```

### 自动化编译

- 创建 TypeScript 编译控制文件
  ```bash
  $ tsc --init
  ```
- 监视目录中的.ts文件变化
  ```bash
  $ tsc --watch
  ```
- 小优化，当编译出错时不生产.js文件
  ```bash
  $ tsc --noEmitOnError --watch
  ```

## 常用类型与语法

### any

`any`的含义是任意类型，一旦将变量类型限制为`any`，那就意味着**放弃了**对该变量的类型检查

```ts
// 明确的表示a的类型是 any 【显式的any】
let a = any
a = 100
a = false
a = '你好'
// 没有明确表示b的类型是 any 【隐式的any】
let b
b = 100
b = false
b = '你好'
```

### unknown

`unknown` 的含义是：**未知类型**

1. `unknown` 可以理解为一个类型安全的`any`，适用于：不确定数据的具体类型

   ```ts
   // 设置a的类型为unknown
   let a: unknown
   a = 100
   a = false
   a = '你好'
   // 设置x的数据类型为string
   let x: string
   x = a // 警告：不能将类型unknown分配给类型string
   ```

2. `unknown` 会强制开发者在使用之前进行类型检查，从而提供更强的类型安全性

   ```ts
   let a: unknown
   a = 'hello'

   // 第一种方式：加类型判断
   if (typeof a === 'string') {
     x = a
     console.log(x)
   }
   // 第二种方式：加断言
   x = a as string
   // 第三种方式：加断言
   x = <string>a
   ```

3. 读取`any`类型数据的任何属性都不会报错，而`unknown`正好与之相反

   ```ts
   let str1: any
   str1 = 'hello'
   str1.toUpperCase() // 无警告

   let str2: unknown
   str2 = 'hello'
   str2.toUpperCase() // 警告：“str2”的类型为“未知”
   ```

### never

`never` 的含义是：任何值都不是，简言之就是不能有值，`undefined`、`null`、`""`、`0`都不行！

1. 几乎不用`never`去直接限制变量，因为没有意义，例如：
   ```ts
   // 指定a的类型为never，那就意味着a以后不能存任何的数据了
   let a: never
   // 以下对a的所有赋值都会有警告
   a = 1
   a = true
   a = null
   a = undefined
   ```
2. `never` 一般是TypeScript主动推断出来的，例如：

   ```ts
   // 指定a的类型为string
   let a: string
   // 给a设置值

   if (typeof a === 'string') {
     console.log(a.toUpperCase())
   } else {
     console.log(a) // TS会推断出此处的a是never，因为没有任何一个值符合此处的逻辑
   }
   ```

3. `never` 也可用于限制函数的返回值
   ```ts
   function throwError(str: string): never {
     throw new Error('程序异常退出：' + str)
   }
   ```

### void

1. void 通常用于函数返回值声明，含义：【函数不返回任何值，调用者也不应依赖其返回值进行任何操作】

   ```ts
   function logMessage(msg: string): void {
     console.log(msg)
   }
   logMessage('你好')
   ```

   > [!TIP] 注意
   > 编码者没有编写 `return` 去指定函数的返回值，所以 `logMessage` 函数是没有显式返回值的，但会有一个
   > 隐式返回值，就是`undefined`；即：虽然函数返回类型为`void`，但也可以接受`undefined`的，简单记：
   > **`undefined`是`void`可以接受的一种“空”**

2. 以下写法均符合规范
   ```ts
   function logMessage1(msg: string): void {
     console.log(msg)
   }
   function logMessage2(msg: string): void {
     console.log(msg)
     return
   }
   function logMessage3(msg: string): void {
     console.log(msg)
     return undefined
   }
   ```
3. 那限制函数返回值时，是不是undefined和void就没区别呢？<br />有区别：**【返回值类型为void的函数，调用者不应
   依赖其返回值进行任何操作！】<br />** 对比如下代码：

   ```ts
   function logMessage(msg: string): void {
     console.log(msg)
   }
   let result = logMessage('你好')
   if (result) {
     // 此行报错，无法测试“void”类型的表达式的真实性
     console.log('logMessage有返回值')
   }
   ```

   ```ts
   function logMessage(msg: string): undefined {
     console.log(msg)
   }
   let result = logMessage('你好')
   if (result) {
     // 此行无警告
     console.log('logMessage有返回值')
   }
   ```

   :::tip 总结

   若函数返回类型为void，那么：

   1. 从语法上讲：函数是可以返回`undefined`的，至于显式返回，还是隐式返回，这无所谓！
   2. 从语义上讲：函数调用者不应关心函数返回的值，也不应依赖返回值进行任何操作！即使返回了`undefined`值

   :::

### object

> 关于 `object` 与 `Object`，实际开发中用的相对较少，因为范围太大了

:::details 声明对象类型

1.  实际开发中，限制一般对象，通常使用以下形式

    ```ts
    // 限制person1对象必须有name属性，age为可选属性
    let person1: { name: string; age?: number }
    // 含义同上，也能用分号分隔
    let person2: { name: string; age?: number }
    // 含义同上，也能用换行分隔
    let person3: {
      name: string
      age?: number
    }
    ```

2.  索引签名：允许定义对象可以具有任意数量的属性，这些属性的键和类型是可变的，常用于：描述类型不确定的属性（具有动态属性的对象）

    ```ts
    // 限制person对象必须有name属性，可选age属性但值必须是数字，同时可以有任意数量，任意类型的属性
    let person: {
      name: string
      age?: number
      [key: string]: any // 索引签名，完全可以不用key这个单词，换成其他的也可以
    }
    // 赋值合法
    person = {
      name: 'bieber',
      age: 19,
      gender: '男'
    }
    ```

:::

:::details 声明函数类型

```ts
let count: (a: number, b: number) => number

count = function (x, y) {
  return x + y
}
```

- Typescript 中的 `=>` 在函数类型声明时表示函数类型，描述其参数类型和返回类型
- JavaScript 中的 `=>` 是一种定义函数的语法，是具体的函数实现
- 函数类型声明还可以使用：接口、自定义类型等方式。
  :::

:::details 声明数组类型

```ts
let arr1: string[]
let arr2: Array<number> // 泛型

arr1 = ['a', 'b', 'c']
arr2 = [100, 200]
```

:::

### tuple

:::tip
元组（tuple）是一种特殊的**数组类型**，可以存储固定数量的元素，并且每个元素的类型是已知的且可以不同。元组用于精确描述一组值的类型。`？`表示可选元素。
:::

```ts
// 第一个元素必须是 string 类型，第二个必须是 number 类型
let arr1: [string, number]
// 第一个元素必须是 number 类型，第二个元素可选，如果有，必须是 boolean 类型
let arr2: [number, boolean?]
// 第一个元素必须是 number 类型，后面的元素可以是任意数量的 string 类型
let arr3: [number, ...string[]]

// 可以赋值
arr1 = ['hello', 123]
arr2 = [100, false]
arr2 = [200]
arr3 = [100, 'hello', 'world']
arr3 = [300]

// 不可以赋值, arr1声明时是两个元素，赋值的是三个
arr1 = ['hello', 123, false]
```

### enum

> 枚举（enum）可以定义一组命名常量，它能增强代码的可读性，也让代码更好维护

如下代码：这种情况是适合用枚举

```ts
function walk(str: string) {
  if (str === 'up') {
    console.log('向【上】走')
  } else if (str === 'down') {
    console.log('向【下】走')
  } else if (str === 'left') {
    console.log('向【左】走')
  } else if (str === 'right') {
    console.log('向【右】走')
  }
}

walk('up')
walk('down')
walk('left')
walk('right')
```

1. 数字枚举

   > 数字枚举一种常见的枚举类型，其成员的值会**自动递增**，且数字枚举还具备**反向映射**的特点，
   > 在下面代码的打印中，可以发现：可以通过**值**来获取对于的枚举**成员名称**

   ```ts
   enum Direction {
     Up,
     Down,
     Left,
     Right
   }

   console.log(Direction)
   // 输出： {0:"up", 1:"Down", 2:"Left", 3:"Right",Up:0,Donw:1,Left:2,Right:3}
   console.log(Direction.Down)
   ```

   优化例子中的代码

   ```ts
   enum Direction {
     Up,
     Down,
     Left,
     Right
   }
   function walk(n: Direction) {
     if (n === Direction.Up) {
       console.log('向【上】走')
     } else if (n === Direction.Down) {
       console.log('向【下】走')
     } else if (n === Direction.Left) {
       console.log('向【左】走')
     } else if (n === Direction.Right) {
       console.log('向【右】走')
     }
   }
   // 执行
   walk(Direction.Right)
   ```

2. 字符串枚举

   > 枚举成员的值是字符串，但没有了**反向映射**的特点

   ```ts
   enum Direction{
     Up = "up"
     Down = "down"
     Left = "left"
     Right = "right"
   }
   ```

3. 常量枚举

   > 官方描述：常量枚举是一种特殊枚举类型，它使用const 关键字定义，在编译时会被**内联**，**避免**生成一些**额外**的代码。

   ```ts
   // const 很关键
   const enum Direction {
     Up,
     Down,
     Left,
     Right
   }

   console.log(Direction.Up)
   ```

### type

> type 可以为任意类型创建别名，让代码更简洁，可读性更强，同时能更方便的进行类型复用和扩展

1. 基本用法

   类型别名使用`type`关键字定义，`type`后跟类型名称，例如下面代码中`num`时类型别名

   ```ts
   type num = number

   let price: num
   price = 100
   ```

2. 联合类型

   联合类型时一种高级类型，它表示一个值可以是几种不同类型之一

   ```ts
   type Status = number | string
   type Gender = '男' | '女'

   function printStatus(status: Status) {
     console.log(status)
   }

   function logGender(str: Gender) {
     console.log(str)
   }

   printStatus(404)
   printStatus('200')

   logGender('男')
   logGender('女')
   ```

3. 交叉类型

   交叉类型允许将多个类型合并为一个类型，合并后的类型将拥有所有被合并类型的成员。交叉类型通常用于对象类型

   ```ts
   // 面积
   type Area = {
     height: number
     width: number
   }

   type Address = {
     num: number // 楼号
     cell: number // 单元号
     room: string //房间号
   }

   type House = Area & Address

   const house: House = {
     height: 100,
     width: 100,
     num: 3,
     cell: 4,
     room: '702'
   }
   ```

### 属性修饰符

|   修饰符    |   含义   |                   具体规则                   |
| :---------: | :------: | :------------------------------------------: |
|  `public`   |  公开的  | 可以被：**类内部**、**子类**、**类外部**访问 |
| `protected` | 受保护的 |       可以被：**类内部**、**子类**访问       |
|  `private`  |  私有的  |            可以被：**类内部**访问            |
| `readonly`  | 只读属性 |                 属性无法修改                 |

### abstract（抽象类）

:::tip 概念理解
抽象类**不能实例化**，其意义是**可以被继承**，抽象类里可以有**普通方法**，也可以有**抽象方法**
:::

通过一下场景，理解抽象类：

> 定义一个抽象类 Package，表示所有包裹的基本结构，任何包裹都有重要属性 weight，包裹都需要计算运费。
> 但不同类型的包裹，（如：标准速度、特快专递）都有不同的运费计算方式，因此用于计算运费的 calculate 方法
> 是一个抽象方法，必须有具体的子类来实现

:::details Package 类

```ts
abstract class Package {
  // 构造方法
  constructor(public weight: number) {}
  // 抽象方法
  abstract calculate(): number
  // 具体方法
  printpackage() {
    console.log(`包裹重量为：${this.weight}kg，运费为：${this.calculate()}元`)
  }
}
```

:::

:::details StandardPackage 类（标准包裹）

```ts
class StandardPackage extends Package {
  constructor(
    weight: number,
    public unitPrice: number
  ) {
    super(weight)
  }
  calculate(): number {
    return this.weight * this.unitPrice
  }
}

const s1 = new StandardPackage(10, 5)
s1.printpackage()
```

:::

:::details ExpressPackage 类（特快包裹）

```ts
class ExpressPackage extends Package {
  constructor(
    weight: number,
    public unitPrice: number,
    public additional: number
  ) {
    super(weight)
  }
  calculate(): number {
    if (this.weight > 10) {
      return 10 * this.unitPrice + (this.weight - 10) * this.additional
    } else {
      return this.weight * this.unitPrice
    }
  }
}

const e1 = new ExpressPackage(13, 8, 2)
e1.printpackage()
```

:::

:::tip 总结：何时使用抽象类？

1. 定义通用接口：为一组相关的类定义通用的行为（方法或属性）时
2. 提供基础实现：在抽象类中提供某些方法或为其提供基础实现，这样派生类就可以继承这些实现
3. 确保关键实现：强制派生类实现一些关键行为
4. 共享代码和逻辑：当多个类需要共享部分代码时，抽象类可以避免代码重复
   :::

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

## 装饰器

::: tip 提醒
虽然 `TypeScript5.0` 中可以直接使用类装饰器，但为了确保其他装饰器可用，现阶段使用时，仍建议使用
`experimentalDecorators` 配置来开启装饰器支持，而且不排除在未来的版本中，官方会进一步调整装饰器的相关语法
:::

### 类装饰器

1. 基本语法

   > 类装饰器是一个应用在类声明上的函数，可以为类添加额外的功能，或添加额外的逻辑

   :::details 基本语法

   ```ts
   function Demo(target: Function) {
     console.log(target)
   }

   @Demo // 与Demo(Person)等价
   class Person {
     constructor(
       public name: string,
       public age: number
     ) {}
   }
   ```

   :::

2. 应用举例

   > 需求：定义一个装饰器，实现 Person 实例调用 toString 时返回 JSON.stringify 的执行结果

   ::: details 应用举例

   ```ts
   // 使用装饰器重写toString方法 + 封闭其原型对象
   function CustomString(target: Function) {
     // 向被装饰类的原型上添加自定义的 toString 方法
     target.prototype.toString = function () {
       return JSON.stringify(this)
     }
     // 封闭其原型对象，禁止随意操作其原型对象
     Object.seal(target.prototype)
   }

   @CustomString
   class Person {
     constructor(
       public name: string,
       public age: number
     ) {}
     speak() {
       console.log('你好！')
     }
   }

   const p1 = new Person('bieber', 10)
   console.log(p1.toString())
   ```

   :::

3. 关于返回值

   > [!TIP] 关于
   > 类装饰器有返回值：若类装饰器返回一个新的类，那这个新类将**替换**掉被装饰的类 <br>
   > 类装饰器无返回值：若类装饰器无返回值或返回 undefined，那被装饰的类**不会**被替换

   ::: details 关于返回值

   ```ts
   function demo(target: Function) {
     // 装饰器有返回值时，该返回值会替换被装饰的类
     return class {
       test() {
         console.log(200)
         console.log(300)
         console.log(400)
       }
     }
   }

   @demo
   class Person {
     test() {
       console.log(100)
     }
   }

   console.log(Person)
   ```

   :::

4. 关于构造类型
   ::: details 仅声明构造类型

   ```ts
   /*
     new        表示：该类型是可以用new操作符调用
     ...args    表示：构造器可以接受【任意数量】的参数
     any[]      表示：构造器可以接受【任意类型】的参数
     {}         表示：返回类型是对象（非null、非undefined的对象）
   */

   type Constructor = new (...args: any[]) => {}
   function test(fn: Constructor) {}

   class Person {}
   test(Person)
   ```

   :::
   ::: details 声明构造类型 + 指定静态属性

   ```ts
   type Constructor = {
     new (...args: any[]): {}
     wife: string
   }

   // 需求是fn得是一个类
   function test(fn: Constructor) {}

   class Person {
     static wife: string
   }
   test(Person)
   ```

   :::

5. 替换被装饰的类
   对于高级一些的装饰器，不仅仅是覆盖一个原型上的方法，还要有更多功能，例如添加新的方法和状态

   > 需求：设计一个 LogTime 装饰器，可以给实例添加一个属性，用于记录实例对象的创建时间，再添加一个方法用于读取创建时间

   ```ts
   type Constructor = new (...args: any[]) => {}

   interface Person {
     getTime(): void
   }

   function LogTime<T extends Constructor>(target: T) {
     return class extends target {
       createdTime: Date
       constructor(...args: any[]) {
         super(...args)
         this.createdTime = new Date()
       }
       getTime() {
         console.log(`该对象的创建时间是：${this.createdTime}`)
       }
     }
   }

   @LogTime
   class Person {
     constructor(
       public name: string,
       public age: number
     ) {}
     speak() {
       console.log('你好啊！')
     }
   }

   const p1 = new Person('bieber', 10)
   console.log(p1)
   console.log(p1.getTime())
   ```

### 装饰器工厂

装饰器工厂是一个返回装饰器函数的函数，可以为装饰器添加参数，可以更灵活地控制装饰器的行为。

> 需求：定义一个LogInfo类装饰器工厂，实现Person实例可以调用到introduce方法，且introduce中输出内容的次数，
> 由LogInfo接收的参数决定。

```ts
interface Person {
  introduce(): void
}

// 装饰器工厂
function LogInfo(n: number) {
  // 返回装饰器
  return function (target: Function) {
    target.prototype.introduce = function () {
      for (let i = 0; i < n; i++) {
        console.log(`我的名字：${this.name}，我的年龄：${this.age}`)
      }
    }
  }
}

@LogInfo(3)
class Person {
  constructor(
    public name: string,
    public age: number
  ) {}
  speak() {
    console.log('你好呀！')
  }
}

const p1 = new Person('bieber', 19)
p1.introduce()
```

### 装饰器组合

装饰器可以组合使用，执行顺序为：先【由上到下】的执行所有的装饰器工厂，依次获取到装饰器，然后再【由下到上】执行所有的装饰器
:::details 装饰器组合--执行顺序

```ts
// 装饰器
function test1(target: Function) {
  console.log('test1')
}
// 装饰器工厂
function test2() {
  console.log('test2工厂')
  return function (target: Function) {
    console.log('test2')
  }
}
// 装饰器工厂
function test3() {
  console.log('test3工厂')
  return function (target: Function) {
    console.log('test3')
  }
}
// 装饰器
function test4(target: Function) {
  console.log('test4')
}

@test1
@test2()
@test3()
@test4
class Person {}
```

:::
:::details 装饰器组合--应用

```ts
interface Person {
  introduce(): void
  getTime(): void
}
// 装饰器
function CustomString(target: Function) {
  target.prototype.toString = function () {
    return JSON.stringify(this)
  }
  Object.seal(target.prototype)
}
// 装饰器工厂
function LogInfo(n: number) {
  // 返回装饰器
  return function (target: Function) {
    target.prototype.introduce = function () {
      for (let i = 0; i < n; i++) {
        console.log(`我的名字：${this.name}，我的年龄：${this.age}`)
      }
    }
  }
}
// 装饰器
type Constructor = new (...args: any[]) => {}

function LogTime<T extends Constructor>(target: T) {
  return class extends target {
    createdTime: Date
    constructor(...args: any[]) {
      super(...args)
      this.createdTime = new Date()
    }
    getTime() {
      console.log(`该对象的创建时间是：${this.createdTime}`)
    }
  }
}

@CustomString
@LogInfo(5)
@LogTime
class Person {
  constructor(
    public name: string,
    public age: number
  ) {}
  speak() {
    console.log('你好呀！')
  }
}

const p1 = new Person('bieber', 19)
p1.speak()
console.log(p1.toString())
p1.introduce()
console.log(p1.getTime())
```

:::

### 属性装饰器

1. 基本语法

   ```ts
   /* 
      参数说明：
      target：对于静态属性来说值是类，对于实例属性来说值是类的原型对象
      propertyKey：属性名
    */

   function Demo(target: object, propertyKey: string) {
     console.log(target, propertyKey)
   }

   class Person {
     @Demo name: string
     @Demo age: number
     @Demo static school: string
     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }
   }
   const p1 = new Person('bieber', 19)
   ```

2. 关于属性遮蔽

   > 在如下代码中：当构造器中的 `this.age = age` 试图在实例上赋值时，实际上是调用了原型上age属性的set方法

   ```ts
   class Person {
     constructor(
       public name: string,
       public age: number
     ) {}
   }

   let value = 90
   // 使用defineProperty给Person原型添加age属性，并配置对应的get与set
   Object.defineProperty(Person.prototype, 'age', {
     get() {
       return value
     },
     set(val) {
       value = val
     }
   })
   const p1 = new Person('bieber', 19)
   console.log(p1.age) // 18
   console.log(Person.prototype.age) // 18
   ```

3. 应用举例

   > 需求：定义一个 `State` 属性装饰器，来监视属性的修改

   ```ts
   function State(target: object, propertyKey: string) {
     const key = `__${propertyKey}`
     Object.defineProperty(target, propertyKey, {
       get() {
         return this[key]
       },
       set(newValue) {
         console.log(`${propertyKey}的最新值为：${newValue}`)
         this[key] = newValue
       },
       enumerable: true,
       configurable: true
     })
   }

   class Person {
     name: string
     @State age: number
     constructor(name: string, age: number) {
       this.name = name
       this.age = age
     }
   }

   const p1 = new Person('bieber', 19)
   const p2 = new Person('李四', 20)
   p1.age = 30
   p2.age = 40
   console.log(p1, p2)
   ```

### 方法装饰器

1. 基本语法

   ```ts
   /* 
      参数说明：
        target：对于静态方法来说值是类，对于实例方法来说值是原型对象
        propertyKey：方法的名称
        descriptor：方法的描述对象，其中value属性是被装饰的方法
    */

   function Demo(target: any, propertyKey: any, descriptor: any) {
     console.log(target)
     console.log(propertyKey)
     console.log(descriptor)
   }

   class Person {
     constructor(
       public name: string,
       public age: number
     ) {}
     @Demo
     speak() {
       console.log(`你好，我的名字是：${this.name},我的年龄是${this.age}`)
     }
     @Demo
     static isAdult(age: number) {
       return age >= 18
     }
   }
   ```

2. 应用举例

   > 需求：<br /> 1.定义一个 Logger 方法装饰器，用于在方法执行前和方法后，均追加一些额外逻辑 <br /> 2.定义一个 Validate 方法装饰器，用于验证数据

   :::details 应用举例

   ```ts
   function Logger(target: object, propertyKey: string, descriptor: PropertyDecorator) {
     // 存储原始方法
     const originnal = descriptor.value
     // 替换原始函数
     descriptor.value = function (...args: any[]) {
       console.log(`${propertyKey}开始执行.....`)
       const result = originnal.call(this, ...args)
       console.log(`${propertyKey}结束执行.....`)
       return result
     }
   }

   class Person {
     constructor(
       public name: string,
       public age: number
     ) {}
     @Logger speak() {
       console.log(`你好，我的名字是${this.name}，我的年龄是${this.age}`)
     }
     static isAdult(age: number) {
       return age >= 18
     }
   }
   const p1 = new Person('bieber', 18)
   p1.speak()
   ```

   :::

### 访问器装饰器

1. 基本语法

   ```ts
   /* 
      参数说明：
        target：对于实例访问器来说值是【所属类的原始对象】，对于静态访问器来说值是【所属类】
        propertyKey：访问器的名称
        descriptor：描述对象
    */

   function Demo(target: object, propertyKey: string, descriptor: PropertyDecorator) {
     console.log(target)
     console.log(propertyKey)
     console.log(descriptor)
   }

   class Person {
     @Demo
     get address() {
       return '北京朝阳区朝阳路'
     }
     @Demo
     static get country() {
       return '中国'
     }
   }
   ```

2. 应用举例

   > 需求：对 `Weather` 类的 `temp` 属性的set 访问器进行限制，设置的最低温度 -50，最高温度 50

   :::details 应用举例

   ```ts
   function RangeValidate(min: number, max: number) {
     return function (target: object, propertyKey: string, descriptor: PropertyDecorator) {
       const originalSetter = descriptor.set
       descriptor.set = function (value: number) {
         if (value < min || value > max) {
           throw new Error(`${propertyKey}的值应该在${min}到${max}之间！`)
         }
         if (originalSetter) {
           originalSetter.call(this, value)
         }
       }
     }
   }

   class Weather {
     private _temp: number
     constructor(_temp: number) {
       this._temp = _temp
     }
     @RangeValidate(-50, 50)
     set temp(value) {
       this._temp = value
     }
     get temp() {
       return this._temp
     }
   }
   ```

   :::

### 参数装饰器

1. 基本语法

   ```ts
   /* 
      参数说明：
        target：
          1. 如果修饰的是【实例方法】的参数，target是类的【原型对象】
          2. 如果修饰的是【静态方法】的参数，target是【类】
        propertyKey：参数所在方法的名称
        parameterIndex：参数在函数参数列表中的索引，从0开始
    */

   function Demo(target: object, propertyKey: string, parameterIndex: number) {
     console.log(target)
     console.log(propertyKey)
     console.log(parameterIndex)
   }

   // 类定义
   class Person {
     constructor(public name: string) {}
     speak(@Demo message1: any, message2: any) {
       console.log(`${this.name}想对你说：${message1},${message2}`)
     }
   }
   ```

2. 应用举例

   > 需求：定义方法装饰器 `Validate`，同时搭配参数装饰器 `NotNumber`，来对 `speak` 方法的参数类型进行限制

   :::details 应用举例

   ```ts
    ...待补充
   ```

   :::
