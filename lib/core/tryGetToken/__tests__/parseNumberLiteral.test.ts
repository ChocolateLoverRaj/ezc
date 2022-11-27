import CoreTokenType from '../../CoreTokenType'
import parseNumberLiteral from '../parseNumberLiteral'

test('123', async () => {
  await expect(parseNumberLiteral({
    async * [Symbol.asyncIterator] () {
      yield '123'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 123
    },
    length: 3
  })
})

test('3.0', async () => {
  await expect(parseNumberLiteral({
    async * [Symbol.asyncIterator] () {
      yield '3.0'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 3.0
    },
    length: 3
  })
})

test('-2', async () => {
  await expect(parseNumberLiteral({
    async * [Symbol.asyncIterator] () {
      yield '-2'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: -2
    },
    length: 2
  })
})

test('not a number', async () => {
  await expect(parseNumberLiteral({
    async * [Symbol.asyncIterator] () {
      yield 'c'
    }
  })).resolves.toBeUndefined()
})
