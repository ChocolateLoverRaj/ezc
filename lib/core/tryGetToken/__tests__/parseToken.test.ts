import CoreTokensWithData from '../../CoreTokensWithData'
import KeyWord from '../../KeyWord'
import TokenType from '../../TokenType'
import TokenWithData from '../../TokenWithData'
import charAsyncIterable from '../charAsyncIterable'
import coreTryers from '../coreTryers'
import parseToken from '../parseToken'
import TryGetToken from '../TryGetToken'

test('string', async () => {
  await expect(parseToken(coreTryers)({
    async * [Symbol.asyncIterator] () {
      yield 'c"Hello world!"'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: TokenType,
        id: TokenType.STRING_LITERAL
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
        enum: TokenType,
        id: TokenType.NUMBER_LITERAL
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
        enum: TokenType,
        id: TokenType.KEY_WORD
      },
      data: KeyWord.RETURN
    },
    length: 4
  })
})

test('custom tryer', async () => {
  const parseLeftArrow: TryGetToken<CoreTokensWithData[TokenType.KEY_WORD]> = async stream => {
    // eslint-disable-next-line no-unreachable-loop
    for await (const char of charAsyncIterable(stream)) {
      if (char === '<') {
        return {
          token: {
            type: {
              enum: TokenType,
              id: TokenType.KEY_WORD
            },
            data: KeyWord.RETURN
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
        enum: TokenType,
        id: TokenType.KEY_WORD
      },
      data: KeyWord.RETURN
    },
    length: 1
  })
})
