export function throttle(cb, delay) {
  let lastCall = 0

  return (...args) => {
    const now = Date.now()

    if (now - lastCall >= delay) {
      cb(...args)
      lastCall = now
    }
  }
}
