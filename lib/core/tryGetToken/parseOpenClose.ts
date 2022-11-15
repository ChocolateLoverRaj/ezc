import OpenCloseType from '../OpenCloseType'
import TokenType from '../TokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'

const parseOpenClose: TryGetToken = async stream => {
  const { value, done } = await charAsyncIterable(stream)[Symbol.asyncIterator]().next()
  if (done === true) return
  const char = value[0]
  const chars: Record<string, OpenCloseType> = {
    '()': OpenCloseType.PARENTHESIS,
    '[]': OpenCloseType.BRACKET,
    '{}': OpenCloseType.CURLY_BRACKET
  }
  const index = Object.keys(chars).flatMap(openClose => [...openClose]).join('').indexOf(char)
  if (index !== -1) {
    const remainder = index % 2
    return {
      token: {
        type: TokenType.OPEN_CLOSE,
        data: {
          type: Object.values(chars)[(index - remainder) / 2],
          close: Boolean(remainder)
        }
      },
      length: 1
    }
  }
}

export default parseOpenClose
