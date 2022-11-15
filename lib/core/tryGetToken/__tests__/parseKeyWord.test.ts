import KeyWord from '../../KeyWord'
import TokenType from '../../TokenType'
import parseKeyword from '../parseKeyword'

test('=', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '='
  }
  await expect(parseKeyword(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.KEY_WORD,
      data: KeyWord.EQUALS
    },
    length: 1
  })
})

test('ret', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'ret'
  }
  await expect(parseKeyword(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.KEY_WORD,
      data: KeyWord.RETURN
    },
    length: 3
  })
})

test('getelementptr', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield 'getelementptr'
  }
  await expect(parseKeyword(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.KEY_WORD,
      data: KeyWord.GET_ELEMENT_PTR
    },
    length: 'getelementptr'.length
  })
})
