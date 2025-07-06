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

### 11. 实现 `EventEmitter` 发布订阅

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

### 12. 封装一个 `Ajax` 请求

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
