import { knit } from '@selrond/knit'
import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPart from './UnparsedPart'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseStructType: UnparseNode<CoreNodeDatas[CoreNodeType.STRUCT_TYPE]> = types => [
  {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.OPEN_CURLY_BRACKET
      }
    }
  },
  {
    type: UnparsedPartType.INDENT,
    data: undefined
  },
  ...knit<UnparsedPart[]>(types.map(type => [{
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.NODE,
    data: type
  }]), [{
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.COMMA
      }
    }
  }]).flat(),
  {
    type: UnparsedPartType.UNINDENT,
    data: undefined
  },
  {
    type: UnparsedPartType.NEW_LINE,
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
        id: CoreKeyWord.CLOSE_CURLY_BRACKET
      }
    }
  }
]

export default unparseStructType
