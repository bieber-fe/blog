# 手写代码

### 1. 实现一个 `instanceof` 函数

```js
function _instanceof(obj, fn) {
  let proto = obj.__proto__
  if (proto) {
    return proto === fn.prototype ? true : _instanceof(proto, fn)
  }
  return false
}
```

### 2. 实现一个 `deepClone` 深拷贝

```js
function deepClone(target, hash = new WeakMap()) {
  if (target === null) return target
  if (typeof target !== 'object') return target
  if (typeof target === Date) return new Date(target)
  if (typeof target === RegExp) return new RegExp(target)
  if (hash.has(target)) return hash.get(target)

  const cloneTarget = Array.isArray(target) ? [] : {}
  hash.set(target, cloneTarget)
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(target[key], hash)
    }
  }
  return cloneTarget
}
```

### 3. 实现一个 `new` 操作符

```js
function _new(fn, ...args) {
  let obj = Object.create(fn.prototype)
  let result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

### 4. 实现一个 `call` 函数

```js
Function.prototype._call = function (context, ...args) {
  // 类型检查
  if (typeof this !== 'function') {
    throw new TypeError('调用对象必须为函数')
  }

  // 处理context默认值
  const ctx = context || window
  // 创建唯一属性避免污染
  const _fn = Symbol('fn')
  ctx[_fn] = this
  // 执行函数并处理参数
  let result = ctx[_fn](...args)
  // 删除临时属性
  delete ctx[_fn]
  return result
}
```

### 5. 实现一个 `apply` 函数

```js
Function.prototype._apply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('调用对象必须为函数')
  }

  const ctx = context || window
  const _fn = Symbol('fn')
  ctx[_fn] = this
  let result = arguments[1] ? ctx[_fn](arguments[1]) : ctx[_fn]()
  delete ctx[_fn]
  return result
}
```

### 6. 实现一个 `bind` 函数

```js
Function.prototype._bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('调用对象必须为函数')
  }

  const ctx = context || window
  let fn = this
  let args = Array.prototype.slice.call(arguments, 1)
  const bound = function () {
    const allArgs = args.concat(Array.prototype.slice.call(arguments, 1))
    // 处理new调用情况
    if (this instanceof bound) {
      return new fn(...allArgs)
    }
    // 处理普通调用
    return fn.apply(ctx, allArgs)
  }
  // 维护原型链
  if (fn.prototype) {
    bound.prototype = Object.create(fn.prototype)
  }
  return bound
}
```

### 7. 实现一个 `debounce` 防抖函数

```js
/**
 * 防抖函数
 * @param {Function} fn 目标函数
 * @param {number} wait 延迟时间（毫秒）
 * @param {boolean} immediate 是否立即执行
 * @return {Function} 返回防抖处理后的函数
 */

function debounce(fn, wait = 300, immediate = false) {
  let timer = null
  let result
  const debounced = function (...args) {
    const that = this
    // 清除已有定时器
    if (timer) clearTimeout(timer)
    // 立即执行模式
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) result = fn.apply(that, args)
    }
    // 延迟执行模式
    else {
      timer = setTimeout(() => {
        fn.apply(that, args)
      }, wait)
    }
    return result
  }
}

// 添加取消功能
debounce.cancel = function (debounceFn) {
  if (debounceFn && debounceFn.timer) {
    clearTimeout(debounceFn.timer)
    debounceFn.timer = null
  }
}
```

### 8. 实现一个 `throttler` 节流函数

```js
function throttler(fn, wait = 300) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
```

### 9. 实现一个 `uniqueArray` 数组去重

```js
// 方法1:
function uniqueArray(arr) {
  return [...new Set(arr)]
}

// 方法2:
function uniqueArray(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

// 方法3:
function uniqueArray(arr) {
  return arr.reduce((pre, cur) => {
    return pre.include(cur) ? pre : [...pre, cur]
  }, [])
}
```

### 10. 实现一个 `flat` 数组扁平化

```js
Array.prototype._flat = function (deep = 1) {
  let arr = this
  if (deep < 1) return
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? cur._flat(deep - 1) : cur)
  }, [])
}
```

### 11. 实现一个可迭代的对象

```js
const CountIoN = {
  [Symbol.iterator]() {
    let current = 1
    const max = 5
    return {
      next() {
        if (current <= max) {
          return { value: current++, done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }
}

// 测试
for (const num of CountIoN) {
  console.log(num) // 输出：1，2，3，4，5
}
```

### 12. 实现继承

:::details 寄生组合继承

```js
function Parent(name) {
  this.name = name
  return this
}

Parent.prototype.getName = function () {
  return this.name
}
Parent.prototype.info = {
  male: 'man'
}

function Children(age, name) {
  Parent.call(this, name)
  this.age = age
}

Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children

// 示例
const child1 = new Children(1, 'Tom')
const child2 = new Children(2, 'Jact')

console.log(child1.name)
console.log(child2.name)
console.log(child2.info)
console.log(child2.getName())
```

:::

:::details ES6 Class类继承

```js
class Parent {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class Children extends Parent {
  constructor(age, name) {
    super(name)
    this.age = age
  }

  getInfo() {
    return `${this.name}-${this.age}`
  }
}

// 示例
const child = new Children(12, 'Jack')
console.log(child.getName())
console.log(child.getInfo())
```

:::

### 13. 实现 `sleep` 函数

```js
function sleep(delay) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay)
    })
  }
}

// 测试
let promise = new Promise(function (rs, rj) {
  console.log('do something')
  rs()
})
  .then(sleep(2000))
  .then(function () {
    console.log('after sleep 2000')
  })
```

### 14. 实现带 取消功能的`sleep` 函数

> 实现原理：利用Promise.race方法不管哪个promise先执行完promise都fulfilled的特点，中途调用sleep.cancel()
> 方法提前完成另外一个promise，从而使原本需要异步执行的promise失效

```js
function sleep(delay) {
  let _cancel = null
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('这是正常的结果')
    }, delay)
  })
  const p2 = new Promise((resolve, reject) => {
    // 这里是cancel方法
    _cancel = function () {
      resolve('这是取消的resolve结果')
    }
  })
  const race = Promise.race([p1, p2])
  // 返回结果上绑定一个cancel方法
  race.cancel = _cancel
  return race
}

// 测试
const p = sleep(5000)
p.then((res) => {
  console.log(res)
})
p.cancel()
```

### 14. 函数柯里化

```js
const currying = (fn, ...args) => {
  return (...subArgs) => {
    const allArgs = [...args, ...subArgs]
    if (allArgs.length < fn.length) {
      return currying(fn, ...allArgs)
    } else {
      return fn(...allArgs)
    }
  }
}

// 测试
const sum = (a, b, c, d) => a + b + c + d
console.log(currying(sum, 1)(2)(3, 4))
```

### 15. 实现一个 `compose` 组合函数

```js
const _compose = (...fns) => {
  return (...args) => {
    return fns.reduceRight(
      (pre, cur) => {
        return cur(pre)
      },
      ...args
    )
  }
}

// 测试
const add = (x) => x + 1
const double = (x) => x * 2
console.log(_compose(double, add)(5))
```

### 16. 惰性函数

> 惰性函数就是解决每次都要进行判断的这个问题

```js
// 简化写法
function addEvent(type, el, fn) {
  // 问题在于每当使用一次 addEvent 时都会进行一次判断。
  if (window.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn)
  }
}

// 利用惰性函数
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false)
    }
  } else if (window.attachEvent) {
    addEvent = function (type, el, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
}

// 也可以使用闭包
var addEvent = (function () {
  if (window.addEventListener) {
    return function (type, el, fn) {
      el.addEventListener(type, fn, false)
    }
  } else if (window.attachEvent) {
    return function (type, el, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
})()
```

### 17. 实现 `JSONP`

```js
// 生成随机回调函数名
function generateCallbackName() {
  return 'jsonp_' + Math.random().toString(36).substr(2)
}

// JSONP请求函数
function jsonp(url, callback) {
  const callbackName = generateCallbackName()
  // 创建全局回调函数
  window[callbackName] = function (data) {
    callback(data)
    delete window[callbackName]
    document.body.removeChild(script)
  }

  // 创建script标签
  const script = document.createElement('script')
  script.src = `${url}?callback=${callbackName}`
  document.body.appendChild(script)
}

// 使用示例
jsonp('http://localhost:8000/api', function (data) {
  console.log('收到数据:', data)
})
```

### 18. 图片懒加载

```js
// <img src="./load.png" data-src="" />
function _observerImg() {
  // 获取所有的图片元素
  let imgList = document.getElementsByTagName('img')
  let observer = new IntersectionObserver((list) => {
    // 回调是数组
    list.forEach((item) => {
      // 判断元素是否出现在视口
      if (item.intersectionRatio > 0) {
        item.target.src = item.target.getAttribute('data-src')
        // 设置src属性后，停止监听
        observer.unobserve(item.target)
      }
    })
  })

  // 监听每个img元素
  for (let i = 0; i < imgList.length; i++) {
    observer.observer(imgList[i])
  }
}
```

### 19. 判断元素是否达到可视区域

:::details 方法一

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      console.log('在可视区域')
    } else {
      console.log('不在')
    }
  })
})

// 示例
const targetElement = document.querySelector('#myElement')
observer.observe(targetElement)
```

:::

:::details 方法二

```js
function isInViewport(element) {
  const clientHeight = window.innerHeight || document.documentElement.clientHeight
  const offsetTop = element.offsetTop
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  console.log(offsetTop, scrollTop, clientHeight)
  if (offsetTop - scrollTop <= clientHeight) {
    console.log('进入可视区域')
  }
}

// 示例
const targetElement = document.querySelector('.name04')

let ticking = false
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isInViewport(targetElement)
      ticking = false
    })
    ticking = true
  }
})
```

:::

### 20. 封装一个 `Ajax` 请求

```js
function ajax(options) {
  const xhr = new XMLHttpRequest()

  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'
  options.timeout = options.timeout || 10000

  const params = formatParams(options.data)
  let timer

  // 格式化参数
  function formatParams(data) {
    let arr = []
    for (let name in data) {
      arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`)
    }
    return arr.join('&')
  }

  // 返回 Promise 对象

  return new Promise((resolve, reject) => {
    // GET请求处理
    if (options.type === 'GET') {
      xhr.open('GET', options.url + '?' + params, true)
      xhr.send(null)
    }
    // POST请求处理
    else if (options.type === 'POST') {
      xhr.open('POST', options.url)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') // 设置请求头
      xhr.send(params)
    }
    // 超时处理
    timer = setTimeout(() => {
      xhr.abort()
      reject(new Error('请求超时'))
    }, options.timeout)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        clearTimeout(timer)
        const status = xhr.status
        if (status >= 200 && status < 300) {
          let response = xhr.responseText
          if (options.dataType === 'json') {
            try {
              response = JSON.parse(response)
            } catch (e) {
              reject(new Error('JSON解析失败'))
            }
          }
          resolve(response)
        }
      } else {
        reject(new Error(`请求失败：${status}`))
      }
    }
  })
}
```

### 21. 实现 `EventEmitter` 发布订阅

```js
class EventEmitter {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  on(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
  }

  // 取消订阅
  off(eventName, cb) {
    if (!this.events[eventName]) return
    if (!cb) {
      this.events[eventName] = null
    }
    this.events[eventName].filter((fn) => fn !== cb)
  }

  // 发布事件
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      throw new Error(`${eventName} event is not registered`)
    }
    this.events[eventName].forEach((fn) => fn(...args))
  }

  // 一次性订阅
  once(eventName, cb) {
    const func = (...args) => {
      cb.apply(this, args)
      this.off(eventName, func)
    }
    this.on(eventName, func)
  }
}
```
