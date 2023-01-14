import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseReturnInstruction: UnparseNode<CoreNodeDatas[CoreNodeType.RETURN_INSTRUCTION]> = (
  { type, value }
) => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.RETURN
    }
  }
}, {
  type: UnparsedPartType.SPACE,
  data: undefined
}, {
  type: UnparsedPartType.NODE,
  data: type
}, {
  type: UnparsedPartType.SPACE,
  data: undefined
}, {
  type: UnparsedPartType.NODE,
  data: value
}]

export default unparseReturnInstruction
