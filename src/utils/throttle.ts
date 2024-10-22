export const debounce = (callback: Function, ms: number) => {
  let timoutId: NodeJS.Timeout
  return function () {
    clearTimeout(timoutId)
    timoutId = setTimeout(() => {
      // @ts-ignore
      callback.apply(this, arguments)
    }, ms)
  }
}
