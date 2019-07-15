export const unwrap = Symbol('unwrap')

export type SafeWrapper<T> = {
  [unwrap]: T;
}

type SafeProxy<T> = {
  [P in keyof T]: SafeProxy<T[P]> & (
    T[P] extends ((...args: any[]) => infer R)
      ? (...args: any[]) => SafeWrapper<R>
      : SafeWrapper<T[P]>
  )
}

export function Safe<T>(v: T): SafeProxy<T> {
  let curr = v
  const proxy: any = new Proxy(NeverFail, {
    apply(_, __, args) {
      typeof curr === 'function' && (curr = curr(...args))
      return proxy
    },
    get(_, prop) {
      let val: any
      switch (true) {
      case prop === unwrap:
        val = curr
        curr = v
        return val
      case prop === Symbol.toPrimitive: return () => Safe.name
      case curr == null: break
      default:
        val = (curr as any)[prop]
        if (typeof val === 'function') {
          curr = val.bind(curr)
        } else {
          curr = val
        }
        break
      }
      return proxy
    },
  })
  return proxy
}

export default Safe

/* istanbul ignore next */
function NeverFail() {}
