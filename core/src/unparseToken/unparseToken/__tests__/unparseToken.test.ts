import CoreTokenType from '../../../CoreTokenType'
import coreInput from '../coreInput'
import unparseToken from '../unparseToken'

test('5', () => {
  expect(unparseToken(coreInput)({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.NUMBER_LITERAL
    },
    data: {
      value: 5,
      decimal: true
    }
  })).toBe('5')
})
