import FloatType from '../../parseNode/FloatType'
import unparseNumberLiteral from '../unparseNumberLiteral'

test('-1.5', () => {
  expect(unparseNumberLiteral({
    value: -1.5,
    floatType: FloatType.FLOAT
  })).toBe('-1.5')
})

test('9', () => {
  expect(unparseNumberLiteral({
    value: 9,
    floatType: undefined
  })).toBe('9')
})

test('125.0', () => {
  expect(unparseNumberLiteral({
    value: 125,
    floatType: FloatType.FLOAT
  })).toBe('125.0')
})
