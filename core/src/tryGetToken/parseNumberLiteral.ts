import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import FloatType from '../parseNode/FloatType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'

const parseNumberLiteral: TryGetToken<CoreTokensWithData[CoreTokenType.NUMBER_LITERAL]> =
  async stream => {
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
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.NUMBER_LITERAL
        },
        data: {
          value: parseFloat(number),
          floatType: number.includes('.') ? FloatType.DOUBLE : undefined
        }
      },
      length: number.length
    }
  }

export default parseNumberLiteral
