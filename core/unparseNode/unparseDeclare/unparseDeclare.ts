import CoreKeyWord from '../../CoreKeyWord'
import CoreTokenType from '../../CoreTokenType'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'
import UnparsedPartType from '../UnparsedPartType'
import UnparseNode from '../UnparseNode'
import { knit } from '@selrond/knit'
import UnparsedPart from '../UnparsedPart'

const unparseDeclare: UnparseNode<CoreNodeDatas[CoreNodeType.DECLARE]> = (
  { name, inputs, returnType }
) => [
  {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.DECLARE
      }
    }
  }, {
    type: UnparsedPartType.SPACE,
    data: undefined
  }, {
    type: UnparsedPartType.NODE,
    data: returnType
  }, {
    type: UnparsedPartType.SPACE,
    data: undefined
  }, {
    type: UnparsedPartType.NODE,
    data: name
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.OPEN_PARENTHESIS
      }
    }
  },
  ...knit<UnparsedPart[]>(
    inputs.map(input => [{
      type: UnparsedPartType.NODE,
      data: input
    }]),
    [
      {
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
      }, {
        type: UnparsedPartType.SPACE,
        data: undefined
      }
    ]).flat(),
  {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.CLOSE_PARENTHESIS
      }
    }
  }
]

export default unparseDeclare
