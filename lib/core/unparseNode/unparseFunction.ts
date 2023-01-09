import { knit } from '@selrond/knit'
import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import IdentifierType from '../IdentifierType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPart from './UnparsedPart'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseFunction: UnparseNode<CoreNodeDatas[CoreNodeType.FUNCTION]> = (
  { name, inputs, blocks, returnType }
) => console.log(name, inputs) as unknown as false || [
  {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.DEFINE
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
  ...inputs.length > 0
    ? knit<UnparsedPart[]>(inputs.map(input => [{
      type: UnparsedPartType.NODE,
      data: input
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
    }]).flat()
    : [],
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
        id: CoreKeyWord.OPEN_CURLY_BRACKET
      }
    }
  },
  {
    type: UnparsedPartType.INDENT,
    data: undefined
  },
  {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  },
  ...knit<UnparsedPart>(blocks.map(block => ({
    type: UnparsedPartType.NODE,
    data: block
  })), {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }),
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

export default unparseFunction
