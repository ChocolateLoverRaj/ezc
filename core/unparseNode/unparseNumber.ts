import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseNumber: UnparseNode<CoreNodeDatas[CoreNodeType.NUMBER]> = data => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.NUMBER_LITERAL
    },
    data
  }
}]

export default unparseNumber
