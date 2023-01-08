import CoreKeyWord from '../../CoreKeyWord'
import CoreTokenType from '../../CoreTokenType'
import IdentifierType from '../../IdentifierType'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'
import UnparsedPartType from '../UnparsedPartType'
import UnparseNode from '../UnparseNode'
import Input from './Input'
import { knit } from '@selrond/knit'

const unparseDeclare = (
  flagsToKeyWords: Input
): UnparseNode<CoreNodeDatas[CoreNodeType.DECLARE]> => ({ name, inputs, returnType }) => [
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
    data: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.IDENTIFIER
      },
      data: {
        name,
        type: IdentifierType.AT
      }
    }
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
  ...knit(
    inputs,
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
