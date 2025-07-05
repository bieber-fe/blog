# Promise 相关方法实现

### 1. 实现符合 Promise/A+ 规范的Promise

::: details 代码实现

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #value = undefined
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

  #changeState(state, res) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#value = res
    this.#run()
  }

  // 判断是否为promise
  #isPromiseLike(value) {
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      return typeof value.then === 'function'
    }
    return false
  }

  // 放入微队列加载
  #runMicroTask(func) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      // node 环境
      process.nextTick(func)
    } else if (typeof MutationObserver === 'function') {
      // 浏览器环境
      const ob = new MutationObserver(func)
      const textNode = document.createTextNode('1')
      ob.observe(textNode, {
        characterData: true
      })
      textNode.data = '2'
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
      const { resolve, reject, onFulfilled, onRejected } = this.#handlers.shift()
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        resolve,
        reject,
        onFulfilled,
        onRejected
      })
      this.#run()
    })
  }
}
```

:::
