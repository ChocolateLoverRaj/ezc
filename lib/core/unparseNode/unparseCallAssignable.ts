import { knit } from '@selrond/knit'
import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import IdentifierType from '../IdentifierType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPart from './UnparsedPart'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseCallAssignable: UnparseNode<CoreNodeDatas[CoreNodeType.CALL_ASSIGNABLE]> = (
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
        id: CoreKeyWord.CALL
      }
    }
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  {
    type: UnparsedPartType.NODE,
    data: returnType
  },
  {
    type: UnparsedPartType.SPACE,
    data: undefined
  },
  {
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
        id: CoreKeyWord.OPEN_PARENTHESIS
      }
    }
  },
  ...knit<UnparsedPart[]>(inputs.map(({ type, value }) => [{
    type: UnparsedPartType.NODE,
    data: type
  }, {
    type: UnparsedPartType.SPACE,
    data: undefined
  }, {
    type: UnparsedPartType.NODE,
    data: value
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
  }, {
    type: UnparsedPartType.SPACE,
    data: undefined
  }]).flat(),
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

export default unparseCallAssignable
