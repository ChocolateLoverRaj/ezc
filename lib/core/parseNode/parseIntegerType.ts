import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import CoreTypeWithData from './CoreTypesWithData'
import CoreTypeType from './CoreTypeType'
import TryParseNode from './TryParseNode'

const parseIntegerType: TryParseNode<CoreNodesWithData[CoreNodeType.TYPE]> = async stream => {
  const iterator = stream[Symbol.asyncIterator]()
  const { value, done } = await iterator.next()
  if (done === true) return
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.INTEGER_TYPE)) return
  const typeData: CoreTypeWithData[CoreTypeType.INTEGER] = {
    type: {
      enum: CoreTypeType,
      id: CoreTypeType.INTEGER
    },
    data: (value as CoreTokensWithData[CoreTokenType.INTEGER_TYPE]).data
  }
  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.TYPE
      },
      data: typeData
    },
    length: 1
  }
}

export default parseIntegerType
