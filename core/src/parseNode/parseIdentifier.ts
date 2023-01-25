import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'
import TryParseNodeResult from './tryParseNodeResult/TryParseNodeResult'

const parseIdentifier: TryParseNode<CoreNodesWithData[CoreNodeType.IDENTIFIER]> = async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()
  const error: TryParseNodeResult<CoreNodesWithData[CoreNodeType.IDENTIFIER]> = {
    success: false,
    result: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.IDENTIFIER
      },
      index: 0,
      message: 'Expected identifier token',
      subAttempts: undefined
    }
  }
  if (done === true) return error
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.IDENTIFIER)) {
    return error
  }
  const { name, type } = value.data as CoreTokenDatas[CoreTokenType.IDENTIFIER]
  return {
    success: true,
    result: {
      node: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.IDENTIFIER
        },
        data: {
          name,
          type
        }
      },
      length: 1
    }
  }
}

export default parseIdentifier
