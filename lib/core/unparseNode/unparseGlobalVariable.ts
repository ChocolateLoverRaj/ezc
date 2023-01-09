import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import ConstantOrGlobal from '../parseNode/ConstantOrGlobal'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

// FIXME: No align
const unparseGlobalVariable: UnparseNode<CoreNodeDatas[CoreNodeType.GLOBAL_VARIABLE]> = (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  { constantOrGlobal, identifier, type, unnamed_addr, value }
) => [
  {
    type: UnparsedPartType.NODE,
    data: identifier
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  {
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
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  // FIXME: Other linkage than private
  {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.PRIVATE
      }
    }
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  ...unnamed_addr
    ? [{
        type: UnparsedPartType.TOKEN,
        data: {
          type: {
            enum: CoreTokenType,
            id: CoreTokenType.KEY_WORD
          },
          data: {
            enum: CoreKeyWord,
            id: CoreKeyWord.UNNAMED_ADDR
          }
        }
      }, {
        type: UnparsedPartType.SPACE,
        data: undefined
      }]
    : ([] as any),
  {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: constantOrGlobal === ConstantOrGlobal.CONSTANT
          ? CoreKeyWord.CONSTANT
          : CoreKeyWord.GLOBAL
      }
    }
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  {
    type: UnparsedPartType.NODE,
    data: type
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  {
    type: UnparsedPartType.NODE,
    data: value
  }
]

export default unparseGlobalVariable
