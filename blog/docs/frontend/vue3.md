# Vue3 使用手册

## 1. Vue3简介

- 2020年9月18日，`Vue.js`发布版`3.0`版本，代号：`One Piece`(海贼王)
- 官方发版地址：Release v3.0.0 One Piece·vuejs/core

### 性能的提升

- 打包大小减少 `41%`
- 初次渲染快 `55%`，更新渲染快133%
- 内存减少 `54%`

### 源码的提升

- 使用`Proxy`代替`defineProperty`实现响应式
- 重写虚拟`Dom`的实现和`Tree-Shaking`

### 拥抱TypeScript

- `Vue3`可以更好的支持`TypeScript`

### 新的特性

- `Composition API`（组合API）
- 新的内置组件
- 新的生命周期钩子
- 移除`keyCode`支持作为`v-on`的修饰符

## 2. 创建Vue3工程

### 基于【vue-cli】创建

> 目前`vue-cli`已处于维护模式，官方推荐基于`Vite`创建项目

```bash
$ npm install -g @vue/cli
## 验证安装 应显示5.x.x
$ vue --version
## 创建项目
$ vue create my-project
## 进入配置选项，按需求选择
$ cd my-project
$ npm run serve
```

### 基于【vite】创建

vite是新一代前端构建工具（[官网地址](https://cn.vitejs.dev/)），vite优势：

- 轻量快速的热重载（HMR），能实现极速的服务启动
- 对TypeScript、JSX、CSS等支持开箱即用
- 真正的按需编译，不再等待整个应用编译完成
- 具体创建项目：

  ```bash
  $ npm create vue@latest
  ## 按照自己的情况配置
  $ cd <your-project-name>
  $ npm install
  $ npm run dev
  ```

## 3. Vue3 核心语法

## 4. 路由

## 5. pinia

### 搭建 pinia 环境

1. 安装 `$ npm install pinia -D`
2. 使用: `src/main.ts`

```ts
// 引入
import { createPinia } from 'pinia'
// 创建
const pinia = createPinia()
// 应用到项目
app.use(pinia)
```

### 存储-读取数据

1. `Store` 是一个保存：状态、业务逻辑的实体，每个组件都可以读取、写入它
2. 它有三个概念：`state`、`getter`、`action`,相当于组件中的：`data`、`computed`和`methods`
3. 编码：src/store/count.ts

   ```ts
   import { defineStore } from 'pinia'

   export const useCountStore = defineStore('count', {
     // 状态
     state() {
       return {
         num: 123
       }
     },
     // 动作
     action: {},
     // 计算
     getters: {}
   })
   ```

### 修改数据

1. 第一种修改方式，直接修改

```js
countStore.num = 888
```

2. 第二种修改方式，批量修改

```js
countStore.$patch({
  sum: 999,
  school: '北大'
})
```

3. 第三种修改方式：借助action修改（action中可以编写一些业务逻辑）

```ts
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  // 状态
  state() {
    return {
      num: 123
    }
  },
  // 动作
  action: {
    increment(value: number) {
      if (this.sum < 10) {
        this.sum += value
      }
    }
  },
  // 计算
  getters: {}
})
```

## 6. 组件通信

## 7. 其他API

### shallowRef 与 shallowReactive

#### `shallowRef`

1. 作用：创建一个响应式数据，但只对顶层属性进行响应式处理
2. 用法： `const myVar = shallowRef(initialValue)`
3. 特点：只跟踪引用值的变化，不关心值内部的属性变化

#### `shallowReactive`

1. 作用：创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式，对象内部的嵌套属性则不会变成响应式的
2. 用法：`const myObj = shallowReactive({...})`
3. 特点：对象的顶层属性是响应式的，但嵌套对象的属性不是

## 8. Vue3新组件
