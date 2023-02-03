import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseArrayType: UnparseNode<CoreNodeDatas[CoreNodeType.ARRAY_TYPE]> = ({
  length,
  itemsType
}) => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.OPEN_BRACKET
    }
  }
}, {
  type: UnparsedPartType.NODE,
  data: {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.NUMBER
    },
    data: {
      value: length,
      floatType: undefined
    }
  }
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
      id: CoreKeyWord.X
    }
  }
}, {
  type: UnparsedPartType.SPACE,
  data: undefined
}, {
  type: UnparsedPartType.NODE,
  data: itemsType
}, {
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: CoreKeyWord.CLOSE_BRACKET
    }
  }
}]

export default unparseArrayType
