import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseIntegerType: UnparseNode<CoreNodeDatas[CoreNodeType.INTEGER_TYPE]> = data => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.INTEGER_TYPE
    },
    data
  }
}]

export default unparseIntegerType
