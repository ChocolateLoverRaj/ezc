import CoreKeyWord from '../../CoreKeyWord'
import CoreTokenType from '../../CoreTokenType'
import EnumItem from '../../EnumItem'
import IdentifierType from '../../IdentifierType'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'
import UnparsedPart from '../UnparsedPart'
import UnparsedPartType from '../UnparsedPartType'
import UnparseNode from '../UnparseNode'
import Input from './Input'
import { knit } from '@selrond/knit'

const unparseDeclare = (
  flagsToKeyWords: Input
): UnparseNode<CoreNodeDatas[CoreNodeType.DECLARE]> => ({ name, type }) => [
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
    data: type.returnType
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
    type.inputTypes.map<UnparsedPart[]>(({ type, flags }) => knit(
      [
        {
          type: UnparsedPartType.NODE,
          data: type
        },
        ...flags.map<UnparsedPart>(flag => ({
          type: UnparsedPartType.TOKEN,
          data: {
            type: {
              enum: CoreTokenType,
              id: CoreTokenType.KEY_WORD
            },
            data: flagsToKeyWords.get(flag.enum)?.get(flag.id) as EnumItem
          }
        }))
      ],
      {
        type: UnparsedPartType.SPACE,
        data: undefined
      })
    ),
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
    ]).flat()
]

export default unparseDeclare
