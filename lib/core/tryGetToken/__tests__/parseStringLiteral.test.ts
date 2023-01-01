import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import CoreTokenType from '../../CoreTokenType'
import parseStringLiteral from '../parseStringLiteral'

test('string', async () => {
  await expect(parseStringLiteral({
    async * [Symbol.asyncIterator] () {
      yield 'c"Hello world!\\00"'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.STRING_LITERAL
      },
      data: `Hello world!${String.fromCharCode(0)}`
    },
    length: 'c"Hello world!\\00"'.length
  })
})

test('unclosed string', async () => {
  await expect(parseStringLiteral({
    async * [Symbol.asyncIterator] () {
      yield 'c"Hello world!'
    }
  })).resolves.toBeUndefined()
})

test("just 'c'", async () => {
  await expect(parseStringLiteral({
    async * [Symbol.asyncIterator] () {
      yield 'c'
    }
  })).resolves.toBeUndefined()
})

test('actual \\', async () => {
  await expect(parseStringLiteral(arrayToAsyncIterable([
    'c"\\\\"'
  ]))).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.STRING_LITERAL
      },
      data: '\\'
    },
    length: 'c"\\\\"'.length
  })
})
