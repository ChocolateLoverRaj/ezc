import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import UnparseToken from './UnparseToken'

const unparseNumberLiteral: UnparseToken<CoreTokensWithData[CoreTokenType.NUMBER_LITERAL]> = (
  { data }
) => data.toString()

export default unparseNumberLiteral
