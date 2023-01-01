import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import UnparseToken from './UnparseToken'

const unparseNumberLiteral: UnparseToken<CoreTokenDatas[CoreTokenType.NUMBER_LITERAL]> =
  number => number.toString()

export default unparseNumberLiteral
