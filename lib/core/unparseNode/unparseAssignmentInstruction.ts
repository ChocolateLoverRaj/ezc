import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseAssignmentIntruction:
UnparseNode<CoreNodeDatas[CoreNodeType.ASSIGNMENT_INSTRUCTION]> = (
  { assignable, identifier }
) => [{
  type: UnparsedPartType.NODE,
  data: identifier
}, {
  type: UnparsedPartType.SPACE,
  data: undefined
}, {
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.EQUALS
    }
  }
}, {
  type: UnparsedPartType.SPACE,
  data: undefined
}, {
  type: UnparsedPartType.NODE,
  data: assignable
}]

export default unparseAssignmentIntruction
