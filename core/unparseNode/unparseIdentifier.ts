import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseIdentifier: UnparseNode<CoreNodeDatas[CoreNodeType.IDENTIFIER]> = data => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.IDENTIFIER
    },
    data
  }
}]

export default unparseIdentifier
