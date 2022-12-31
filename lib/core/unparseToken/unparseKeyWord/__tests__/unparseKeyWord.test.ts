import CoreKeyWord from '../../../CoreKeyWord'
import CoreTokenType from '../../../CoreTokenType'
import coreInput from '../coreInput'
import unparseKeyWord from '../unparseKeyWord'

test('return', () => {
  expect(unparseKeyWord(coreInput)({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.RETURN
    }
  })).toBe('ret')
})

test('=', () => {
  expect(unparseKeyWord(coreInput)({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.EQUALS
    }
  })).toBe('=')
})
