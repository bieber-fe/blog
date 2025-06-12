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

## 装饰器

::: tip 提醒
虽然 `TypeScript5.0` 中可以直接使用类装饰器，但为了确保其他装饰器可用，现阶段使用时，仍建议使用
`experimentalDecorators` 配置来开启装饰器支持，而且不排除在未来的版本中，官方会进一步调整装饰器的相关语法
:::

### 类装饰器

1. 基本语法

   > 类装饰器是一个应用在类声明上的函数，可以为类添加额外的功能，或添加额外的逻辑
   > :::details 基本语法

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
   > ::: details 应用举例

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
   > ::: details 关于返回值

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
   > :::details 应用举例

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
   > :::details 应用举例
   ```ts
    ...待补充
   ```
   :::
