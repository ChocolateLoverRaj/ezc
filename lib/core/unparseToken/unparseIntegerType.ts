import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import UnparseToken from './UnparseToken'

const unparseIntegerType: UnparseToken<CoreTokenDatas[CoreTokenType.INTEGER_TYPE]> = (
  number
) => `i${number}`

export default unparseIntegerType
