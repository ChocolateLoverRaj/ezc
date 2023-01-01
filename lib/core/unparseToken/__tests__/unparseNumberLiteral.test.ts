import CoreTokenType from '../../CoreTokenType'
import unparseNumberLiteral from '../unparseNumberLiteral'

test('-1.5', () => {
  expect(unparseNumberLiteral({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.NUMBER_LITERAL
    },
    data: -1.5
  })).toBe('-1.5')
})

test('9', () => {
  expect(unparseNumberLiteral({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.NUMBER_LITERAL
    },
    data: 9
  })).toBe('9')
})
