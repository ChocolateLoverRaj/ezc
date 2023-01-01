import unparseIntegerType from '../unparseIntegerType'

test('i1', () => {
  expect(unparseIntegerType(1)).toBe('i1')
})

test('i32', () => {
  expect(unparseIntegerType(32)).toBe('i32')
})
