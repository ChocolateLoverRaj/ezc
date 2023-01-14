import unparseStringLiteral from '../unparseStringLiteral'

test('abc', () => {
  expect(unparseStringLiteral('abc')).toBe('c"abc"')
})

test('\\', () => {
  expect(unparseStringLiteral('\\')).toBe('c"\\\\"')
})

test('\\x00', () => {
  expect(unparseStringLiteral('\x00')).toBe('c"\\00"')
})

test('Hello World!\\x00', () => {
  expect(unparseStringLiteral('Hello World!\x00')).toBe('c"Hello World!\\00"')
})

test('"', () => {
  expect(unparseStringLiteral('"')).toBe('c"\\22"')
})
