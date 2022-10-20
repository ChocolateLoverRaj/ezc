import TokenType from '../../TokenType'
import parseStringLiteral from '../parseStringLiteral'

test('string', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'c"Hello world!"'
  }
  await expect(parseStringLiteral(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.STRING_LITERAL,
      data: 'Hello world!'
    },
    length: 'c"Hello world!"'.length
  })
})

test('unclosed string', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'c"Hello world!'
  }
  await expect(parseStringLiteral(getAsyncIterable())).resolves.toBeUndefined()
})

test("just 'c'", async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'c'
  }
  await expect(parseStringLiteral(getAsyncIterable())).resolves.toBeUndefined()
})
