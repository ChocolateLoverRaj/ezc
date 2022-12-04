import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseIntegerType: TryParseNode<CoreNodesWithData[CoreNodeType.INTEGER_TYPE]> =
  async stream => {
    const iterator = stream[Symbol.asyncIterator]()
    const { value, done } = await iterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.INTEGER_TYPE)) return
    return {
      node: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.INTEGER_TYPE
        },
        data: (value as CoreTokensWithData[CoreTokenType.INTEGER_TYPE]).data
      },
      length: 1
    }
  }

export default parseIntegerType
