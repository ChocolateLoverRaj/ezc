import KeyWord from '../../KeyWord'
import TokenType from '../../TokenType'
import parseToken from '../parseToken'

test('string', async () => {
  await expect(parseToken({
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
  await expect(parseToken({
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
  await expect(parseToken({
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
