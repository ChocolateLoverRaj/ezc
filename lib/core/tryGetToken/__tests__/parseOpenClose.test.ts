import OpenCloseType from '../../OpenCloseType'
import TokenType from '../../TokenType'
import parseOpenClose from '../parseOpenClose'

test('(', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '('
  }
  await expect(parseOpenClose(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.OPEN_CLOSE,
      data: {
        type: OpenCloseType.PARENTHESIS,
        close: false
      }
    },
    length: 1
  })
})

test(')', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield ')'
  }
  await expect(parseOpenClose(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.OPEN_CLOSE,
      data: {
        type: OpenCloseType.PARENTHESIS,
        close: true
      }
    },
    length: 1
  })
})

test('[', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '['
  }
  await expect(parseOpenClose(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.OPEN_CLOSE,
      data: {
        type: OpenCloseType.BRACKET,
        close: false
      }
    },
    length: 1
  })
})
