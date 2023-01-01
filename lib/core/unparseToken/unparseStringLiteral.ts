import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import UnparseToken from './UnparseToken'

const unparseStringLiteral: UnparseToken<CoreTokenDatas[CoreTokenType.STRING_LITERAL]> = string =>
  `c"${[...string]
    .map(char => {
      if (char === '\\') {
        return '\\\\'
      }
      if (!/[\w\d! ]/.test(char)) {
        return `\\${Buffer.from([char.charCodeAt(0)]).toString('hex')}`
      }
      return char
    })
    .join('')}"`

export default unparseStringLiteral
