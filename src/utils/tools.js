class Tools {
  constructor() {}
  throttle(fn, limit) {
    console.log('2222')
    let throttle = false
    console.log(throttle)
    // ...args由inputContent传入
    return function (...args) {
      const context = this
      if (!throttle) {
        throttle = true
        setTimeout(() => {
          // 接收传入参数
          fn.apply(context, args)
          throttle = false
        }, limit)
      }
    }
  }

  debounce(fn, delay) {
    let timeout
    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}
export const tools = new Tools()
