import CoreKeyWord from '../../../CoreKeyWord'
import coreInput from '../coreInput'
import unparseKeyWord from '../unparseKeyWord'

test('return', () => {
  expect(unparseKeyWord(coreInput)({
    enum: CoreKeyWord,
    id: CoreKeyWord.RETURN
  })).toBe('ret')
})

test('=', () => {
  expect(unparseKeyWord(coreInput)({
    enum: CoreKeyWord,
    id: CoreKeyWord.EQUALS
  })).toBe('=')
})
