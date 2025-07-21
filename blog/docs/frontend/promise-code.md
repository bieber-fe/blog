# Promise 相关方法实现

### 1. 实现符合 Promise/A+ 规范的Promise

::: details 代码实现

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #result = undefined
  #handlers = []

  constructor(executor) {
    const resolve = (value) => {
      this.#changeState(FULFILLED, value)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeState(state, val) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = val
    this.#run()
  }

  // 是否为Promise
  #isPromiseLike(value) {
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      return typeof value.then === 'function'
    }
    return false
  }

  // 执行函数放入微队列
  #runMicroTask(func) {
    // node 环境
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func)
    }
    // 浏览器环境
    else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func)
      const textNode = document.createTextNode('1')
      ob.observe(textNode, {
        characterData: true
      })
      textNode.data = '2'
    }
    // 其他环境
    else {
      setTimeout(func, 0)
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result)
        return
      }
      try {
        const x = callback(this.#result)
        if (this.#isPromiseLike(x)) {
          x.then(resolve, reject)
        } else {
          reject(x)
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  #run() {
    if (this.#state === PENDING) return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject })
      this.#run()
    })
  }
}

// 测试示例
const p1 = new MyPromise((resolve, reject) => {
  console.log('resolve')
  setTimeout(() => {
    resolve(123)
  }, 1000)
})
p1.then(
  (res) => {
    console.log('then 完成1', res)
    return new MyPromise((resolve, reject) => {
      reject(456)
    })
  },
  (err) => {
    console.log('catch 失败1', err)
  }
).then(
  (res) => {
    console.log('then 完成2', res)
  },
  (err) => {
    console.log('catch 失败2', err)
  }
)
```

:::

### 2. 实现promise.all

```js
Promise._all = function (promises) {
  promises = [...promises]
  return new Promise((resolve, reject) => {
    const result = []
    if (promises.length === 0) resolve(result)

    let count = 0
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((res) => {
          result[index] = res
          count++
          if (count === promises.length) {
            resolve(result)
          }
        })
        .catch(reject)
    })
  })
}
```
