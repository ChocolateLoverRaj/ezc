import IdentifierType from '../IdentifierType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPart from './UnparsedPart'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseBlock: UnparseNode<CoreNodeDatas[CoreNodeType.BLOCK]> = ({ name, instructions }) => [
  {
    type: UnparsedPartType.NODE,
    data: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.IDENTIFIER
      },
      data: {
        name,
        type: IdentifierType.BLOCK
      }
    }
  },
  {
    type: UnparsedPartType.INDENT,
    data: undefined
  },
  ...instructions.flatMap<UnparsedPart>(instruction => [{
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.NODE,
    data: instruction
  }]),
  {
    type: UnparsedPartType.UNINDENT,
    data: undefined
  }
]

export default unparseBlock
