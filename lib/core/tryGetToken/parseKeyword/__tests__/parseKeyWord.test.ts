import CoreKeyWord from '../../../CoreKeyWord'
import CoreTokenType from '../../../CoreTokenType'
import parseKeyword from '../parseKeyword'
import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreInput from '../coreInput'

test('=', async () => {
  // console.log(coreInput)
  await expect(parseKeyword(coreInput)({
    async * [Symbol.asyncIterator] () {
      yield '='
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.EQUALS
      }
    },
    length: 1
  })
})

test('ret', async () => {
  await expect(parseKeyword(coreInput)({
    async * [Symbol.asyncIterator] () {
      yield 'ret'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.RETURN
      }
    },
    length: 3
  })
})

test('getelementptr', async () => {
  await expect(parseKeyword(coreInput)({
    async * [Symbol.asyncIterator] () {
      yield 'getelementptr'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.GET_ELEMENT_PTR
      }
    },
    length: 'getelementptr'.length
  })
})

test("doesn't parse if trailing letters", async () => {
  await expect(parseKeyword(coreInput)({
    async * [Symbol.asyncIterator] () {
      // cspell:disable-next-line
      yield 'getelementptrabc'
    }
  })).resolves.toBeUndefined()
})

describe('custom options', () => {
  test('custom single char keyword', async () => {
    await expect(parseKeyword(new Map([
      ['<', {
        enum: CoreKeyWord,
        id: CoreKeyWord.RETURN
      }]
    ]))({
      async * [Symbol.asyncIterator] () {
        yield '<'
      }
    })).resolves.toEqual({
      token: {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: CoreKeyWord,
          id: CoreKeyWord.RETURN
        }
      },
      length: 1
    })
  })
})

test(',', async () => {
  await expect(parseKeyword(coreInput)(
    arrayToAsyncIterable([',']))).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.COMMA
      }
    },
    length: 1
  })
})

test('empty chunk', async () => {
  await expect(parseKeyword(coreInput)(arrayToAsyncIterable(['', ','])))
    .resolves.toEqual({
      token: {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: CoreKeyWord,
          id: CoreKeyWord.COMMA
        }
      },
      length: 1
    })
})
