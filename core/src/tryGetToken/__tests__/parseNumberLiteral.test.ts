import CoreTokenType from '../../CoreTokenType'
import FloatType from '../../parseNode/FloatType'
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
      data: {
        value: 123,
        floatType: undefined
      }
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
      data: {
        value: 3.0,
        floatType: FloatType.DOUBLE
      }
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
      data: {
        value: -2,
        floatType: undefined
      }
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
