import KeyWord from '../../KeyWord'
import TokenType from '../../TokenType'
import parseToken from '../parseToken'

test('string', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'c"Hello world!"'
  }
  await expect(parseToken(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.STRING_LITERAL,
      data: 'Hello world!'
    },
    length: 'c"Hello world!"'.length
  })
})

test('leading space', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield ' 34'
  }
  await expect(parseToken(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.NUMBER_LITERAL,
      data: 34
    },
    length: 3
  })
})

test('leading newline', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '\nret'
  }
  await expect(parseToken(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.KEY_WORD,
      data: KeyWord.RETURN
    },
    length: 4
  })
})
