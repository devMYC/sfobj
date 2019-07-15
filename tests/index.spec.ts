import Safe, { SafeWrapper, unwrap } from '../src/index'

test(Safe.name, () => {
  const obj = {
    a: 100,
    b: {
      c: [
        { d: 1e3 },
        { e: () => 1e4 },
      ],
    },
    f: null,
    g: undefined,
  }

  const safeObj = Safe(obj)

  expect(String(safeObj)).toBe(Safe.name)
  expect(safeObj.a[unwrap]).toBe(100)
  expect((safeObj.f as SafeWrapper<null>)[unwrap]).toBe(null)
  expect((safeObj.g as SafeWrapper<undefined>)[unwrap]).toBe(undefined)
  expect(safeObj.b.c[0].d[unwrap]).toBe(1e3)
  expect(safeObj.b.c[1].e()[unwrap]).toBe(1e4)
  expect((safeObj.b.c[100] as any).xx().yy.zz().or[1].whatever['key'][unwrap]).toBe(undefined)
})
