import TokenType from '../../TokenType'
import parseStringLiteral from '../parseStringLiteral'

test('string', async () => {
  await expect(parseStringLiteral({
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

test('unclosed string', async () => {
  await expect(parseStringLiteral({
    async * [Symbol.asyncIterator] () {
      yield 'c"Hello world!'
    }
  })).resolves.toBeUndefined()
})

test("just 'c'", async () => {
  await expect(parseStringLiteral({
    async * [Symbol.asyncIterator] () {
      yield 'c'
    }
  })).resolves.toBeUndefined()
})