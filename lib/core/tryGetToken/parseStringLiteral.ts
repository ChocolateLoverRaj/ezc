import CoreTokenType from '../CoreTokenType'
import TryGetToken from './TryGetToken'
import charAsyncIterable from './charAsyncIterable'
import CoreTokensWithData from '../CoreTokensWithData'

const parseStringLiteral: TryGetToken<CoreTokensWithData[CoreTokenType.STRING_LITERAL]> =
  async stream => {
    let length = 0
    const iterator = charAsyncIterable(stream)[Symbol.asyncIterator]()
    {
      const { value, done } = await iterator.next()
      if (value !== 'c' || done === true) return
      length++
    }
    {
      const { value, done } = await iterator.next()
      if (value !== '"' || done === true) return
      length++
    }
    let string = ''
    let result: IteratorResult<string, any>
    do {
      result = await iterator.next()
      const { value: char } = result as IteratorReturnResult<string>
      // No escaping with \ yet
      if (char === '"') {
        length++
        return {
          token: {
            type: {
              enum: CoreTokenType,
              id: CoreTokenType.STRING_LITERAL
            },
            data: string
          },
          length
        }
      } else if (char === '\\') {
        length++
        const { value: hex0, done: done0 } = await iterator.next()
        if (done0 === true) return
        length++
        const { value: hex1, done: done1 } = await iterator.next()
        if (done1 === true) return
        length++
        const charCode = parseInt(hex0 + hex1, 16)
        string += String.fromCharCode(charCode)
      } else {
        string += char
        length++
      }
    } while (result.done !== true)
    return undefined
  }

export default parseStringLiteral
