import IdentifierType from '../../IdentifierType'
import CoreTokenType from '../../CoreTokenType'
import parseIdentifier from '../parseIdentifier'

test('@0', async () => {
  await expect(parseIdentifier({
    async * [Symbol.asyncIterator] () {
      yield '@0'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.IDENTIFIER
      },
      data: {
        type: IdentifierType.AT,
        name: '0'
      }
    },
    length: 2
  })
})

test('@main', async () => {
  await expect(parseIdentifier({
    async * [Symbol.asyncIterator] () {
      yield '@main'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.IDENTIFIER
      },
      data: {
        type: IdentifierType.AT,
        name: 'main'
      }
    },
    length: 5
  })
})

test('%0', async () => {
  await expect(parseIdentifier({
    async * [Symbol.asyncIterator] () {
      yield '%0'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.IDENTIFIER
      },
      data: {
        type: IdentifierType.PERCENT,
        name: '0'
      }
    },
    length: 2
  })
})
