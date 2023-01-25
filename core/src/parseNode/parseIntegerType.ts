import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import checkToken from './checkToken'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseIntegerType: TryParseNode<CoreNodesWithData[CoreNodeType.INTEGER_TYPE]> =
  async stream => {
    const type = {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    }
    const result = await checkToken(
      stream[Symbol.asyncIterator](),
      type,
      0,
      'Expected integer type',
      { enum: CoreTokenType, id: CoreTokenType.INTEGER_TYPE })
    if (!result.success) return result

    return {
      success: true,
      result: {
        node: {
          type,
          data: result.result as CoreTokenDatas[CoreTokenType.INTEGER_TYPE]
        },
        length: 1
      }
    }
  }

export default parseIntegerType
