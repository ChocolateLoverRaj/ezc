import CoreTokenType from '../CoreTokenType'
import TryGetToken from './TryGetToken'
import charAsyncIterable from './charAsyncIterable'
import CoreTokensWithData from '../CoreTokensWithData'

const parseStringLiteral: TryGetToken<CoreTokensWithData[CoreTokenType.STRING_LITERAL]> =
  async stream => {
    const iterator = charAsyncIterable(stream)[Symbol.asyncIterator]()
    {
      const { value, done } = await iterator.next()
      if (value !== 'c' || done === true) return
    }
    {
      const { value, done } = await iterator.next()
      if (value !== '"' || done === true) return
    }
    let string = ''
    let result: IteratorResult<string, any>
    do {
      result = await iterator.next()
      const { value: char } = result as IteratorReturnResult<string>
      // No escaping with \ yet
      if (char === '"') {
        return {
          token: {
            type: {
              enum: CoreTokenType,
              id: CoreTokenType.STRING_LITERAL
            },
            data: string
          },
          // c"string"
          length: 3 + string.length
        }
      } else {
        string += char
      }
    } while (result.done !== true)
    return undefined
  }

export default parseStringLiteral
