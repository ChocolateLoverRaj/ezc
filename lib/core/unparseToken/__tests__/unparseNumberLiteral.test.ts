import unparseNumberLiteral from '../unparseNumberLiteral'

test('-1.5', () => {
  expect(unparseNumberLiteral(-1.5)).toBe('-1.5')
})

test('9', () => {
  expect(unparseNumberLiteral(9)).toBe('9')
})
