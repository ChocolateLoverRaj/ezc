import IdentifierType from '../../IdentifierType'
import TokenType from '../../TokenType'
import parseIdentifier from '../parseIdentifier'

test('@0', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '@0'
  }
  await expect(parseIdentifier(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.IDENTIFIER,
      data: {
        type: IdentifierType.AT,
        name: '0'
      }
    },
    length: 2
  })
})

test('@main', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '@main'
  }
  await expect(parseIdentifier(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.IDENTIFIER,
      data: {
        type: IdentifierType.AT,
        name: 'main'
      }
    },
    length: 5
  })
})

test('%0', async () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * getAsyncIterable () {
    yield '%0'
  }
  await expect(parseIdentifier(getAsyncIterable())).resolves.toEqual({
    token: {
      type: TokenType.IDENTIFIER,
      data: {
        type: IdentifierType.PERCENT,
        name: '0'
      }
    },
    length: 2
  })
})
