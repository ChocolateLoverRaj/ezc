import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'
import TryParseNodeResult from './tryParseNodeResult/TryParseNodeResult'

const parseNumber: TryParseNode<CoreNodesWithData[CoreNodeType.NUMBER]> = async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()
  const error: TryParseNodeResult<CoreNodesWithData[CoreNodeType.NUMBER]> = {
    success: false,
    result: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.NUMBER
      },
      index: 0,
      message: 'Expected number literal',
      subAttempts: undefined
    }
  }
  if (done === true) return error
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.NUMBER_LITERAL)) {
    return error
  }
  return {
    success: true,
    result: {
      node: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.NUMBER
        },
        data: value.data as CoreTokenDatas[CoreTokenType.NUMBER_LITERAL]
      },
      length: 1
    }
  }
}

export default parseNumber
