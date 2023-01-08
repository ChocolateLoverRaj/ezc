import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseString: UnparseNode<CoreNodeDatas[CoreNodeType.STRING]> = string => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.STRING_LITERAL
    },
    data: string
  }
}]

export default unparseString
