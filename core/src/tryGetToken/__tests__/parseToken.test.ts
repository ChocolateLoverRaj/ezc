import CoreTokensWithData from '../../CoreTokensWithData'
import CoreKeyWord from '../../CoreKeyWord'
import CoreTokenType from '../../CoreTokenType'
import charAsyncIterable from '../charAsyncIterable'
import coreTryers from '../coreTryers'
import parseToken from '../parseToken'
import TryGetToken from '../TryGetToken'
import arrayToAsyncIterable from 'util/dist/arrayToAsyncIterable/arrayToAsyncIterable.js'

test('string', async () => {
  await expect(parseToken(coreTryers)({
    async * [Symbol.asyncIterator] () {
      yield 'c"Hello world!"'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.STRING_LITERAL
      },
      data: 'Hello world!'
    },
    length: 'c"Hello world!"'.length
  })
})

test('leading space', async () => {
  await expect(parseToken(coreTryers)({
    async * [Symbol.asyncIterator] () {
      yield ' 34'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 34
    },
    length: 3
  })
})

test('leading newline', async () => {
  await expect(parseToken(coreTryers)({
    async * [Symbol.asyncIterator] () {
      yield '\nret'
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
    length: 4
  })
})

test('custom tryer', async () => {
  const parseLeftArrow: TryGetToken<CoreTokensWithData[CoreTokenType.KEY_WORD]> = async stream => {
    // eslint-disable-next-line no-unreachable-loop
    for await (const char of charAsyncIterable(stream)) {
      if (char === '<') {
        return {
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
        }
      }
      return
    }
  }
  await expect(parseToken([parseLeftArrow])({
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

test('empty chunk', async () => {
  await expect(parseToken(coreTryers)(arrayToAsyncIterable(['', ',']))).resolves.toEqual({
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
