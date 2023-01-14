import CoreTokenType from '../../CoreTokenType'
import parseIntegerType from '../parseIntegerType'

test('i1', async () => {
  await expect(parseIntegerType({
    async * [Symbol.asyncIterator] () {
      yield 'i1'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.INTEGER_TYPE
      },
      data: 1
    },
    length: 2
  })
})

test('i32', async () => {
  await expect(parseIntegerType({
    async * [Symbol.asyncIterator] () {
      yield 'i32'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.INTEGER_TYPE
      },
      data: 32
    },
    length: 3
  })
})
