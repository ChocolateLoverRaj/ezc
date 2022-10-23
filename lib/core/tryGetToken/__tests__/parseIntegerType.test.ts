import TokenType from '../../TokenType'
import parseIntegerType from '../parseIntegerType'

test('i1', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'i1'
  }
  await expect(parseIntegerType(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.INTEGER_TYPE,
      data: 1
    },
    length: 2
  })
})

test('i32', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'i32'
  }
  await expect(parseIntegerType(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.INTEGER_TYPE,
      data: 32
    },
    length: 3
  })
})
