import KeyWord from '../../KeyWord'
import TokenType from '../../TokenType'
import parseKeyword from '../parseKeyword'

test('=', async () => {
  await expect(parseKeyword({
    async * [Symbol.asyncIterator] () {
      yield '='
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: TokenType,
        id: TokenType.KEY_WORD
      },
      data: KeyWord.EQUALS
    },
    length: 1
  })
})

test('ret', async () => {
  await expect(parseKeyword({
    async * [Symbol.asyncIterator] () {
      yield 'ret'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: TokenType,
        id: TokenType.KEY_WORD
      },
      data: KeyWord.RETURN
    },
    length: 3
  })
})

test('getelementptr', async () => {
  await expect(parseKeyword({
    async * [Symbol.asyncIterator] () {
      yield 'getelementptr'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: TokenType,
        id: TokenType.KEY_WORD
      },
      data: KeyWord.GET_ELEMENT_PTR
    },
    length: 'getelementptr'.length
  })
})

test("doesn't parse if trailing letters", async () => {
  await expect(parseKeyword({
    async * [Symbol.asyncIterator] () {
      // cspell:disable-next-line
      yield 'getelementptrabc'
    }
  })).resolves.toBeUndefined()
})