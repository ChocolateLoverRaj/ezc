import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import floatTypeToKeyWord from '../parseNode/floatTypeToKeyWord'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseFloatType: UnparseNode<CoreNodeDatas[CoreNodeType.FLOAT_TYPE]> = floatType => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: {
      enum: CoreKeyWord,
      id: floatTypeToKeyWord.get(floatType) as any
    }
  }
}]

export default unparseFloatType
