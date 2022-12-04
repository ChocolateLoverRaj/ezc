import OpenCloseType from '../../OpenCloseType'
import CoreTokenType from '../../CoreTokenType'
import parseOpenClose from '../parseOpenClose'
import arrayToAsyncIterable from '../../arrayToAsyncIterable'

test('(', async () => {
  await expect(parseOpenClose({
    async * [Symbol.asyncIterator] () {
      yield '('
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.OPEN_CLOSE
      },
      data: {
        type: OpenCloseType.PARENTHESIS,
        close: false
      }
    },
    length: 1
  })
})

test(')', async () => {
  await expect(parseOpenClose({
    async * [Symbol.asyncIterator] () {
      yield ')'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.OPEN_CLOSE
      },
      data: {
        type: OpenCloseType.PARENTHESIS,
        close: true
      }
    },
    length: 1
  })
})

test('[', async () => {
  await expect(parseOpenClose({
    async * [Symbol.asyncIterator] () {
      yield '['
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.OPEN_CLOSE
      },
      data: {
        type: OpenCloseType.BRACKET,
        close: false
      }
    },
    length: 1
  })
})

test(',', async () => {
  await expect(parseOpenClose(arrayToAsyncIterable([',']))).resolves.toBeUndefined()
})
