import TokenType from '../../TokenType'
import parseNumberLiteral from '../parseNumberLiteral'

test('123', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '123'
  }
  await expect(parseNumberLiteral(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.NUMBER_LITERAL,
      data: 123
    },
    length: 3
  })
})

test('3.0', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '3.0'
  }
  await expect(parseNumberLiteral(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.NUMBER_LITERAL,
      data: 3.0
    },
    length: 3
  })
})

test('-2', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '-2'
  }
  await expect(parseNumberLiteral(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.NUMBER_LITERAL,
      data: -2
    },
    length: 2
  })
})

test('not a number', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'c'
  }
  await expect(parseNumberLiteral(getAsyncIterable())).resolves.toBeUndefined()
})
