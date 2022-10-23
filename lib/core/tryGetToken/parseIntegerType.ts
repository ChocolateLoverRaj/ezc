import TokenType from '../TokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'

const parseIntegerType: TryGetToken = async stream => {
  const iterator = charAsyncIterable(stream)[Symbol.asyncIterator]()
  {
    const { value, done } = await iterator.next()
    if (value !== 'i' || done === true) return
  }
  let number = ''
  while (true) {
    const { value, done } = await iterator.next()
    if (/\d/.test(value)) {
      number += value as string
    } else {
      break
    }
    if (done === true) {
      return
    }
  }
  if (number.length === 0) return
  return {
    token: {
      type: TokenType.INTEGER_TYPE,
      data: parseInt(number)
    },
    length: 1 + number.length
  }
}

export default parseIntegerType
