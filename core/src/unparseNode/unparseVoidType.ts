import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseVoidType: UnparseNode<CoreNodeDatas[CoreNodeType.VOID_TYPE]> = () => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.VOID
    }
  }
}]

export default unparseVoidType
