import TokenType from '../TokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'

const parseNumberLiteral: TryGetToken = async stream => {
  const iterable = charAsyncIterable(stream)
  let number = ''
  for await (const char of iterable) {
    if (char === '-' && number === '') {
      number += char
    } else if (/\d/.test(char)) {
      number += char
    } else if (number.length > 0 && !number.includes('.') && char === '.') {
      number += char
    } else {
      break
    }
  }
  if (number.length === 0) return
  // FIXME: Doesn't really check for errors like just '-' or '3.'
  return {
    token: {
      type: TokenType.NUMBER_LITERAL,
      data: parseFloat(number)
    },
    length: number.length
  }
}

export default parseNumberLiteral
