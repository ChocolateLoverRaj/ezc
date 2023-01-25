import CoreTokenType from '../CoreTokenType'
import CoreKeyWord from '../CoreKeyWord'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'
import EnumItem from '../EnumItem'
import TryParseNodeResult from './tryParseNodeResult/TryParseNodeResult'

const parsePointerType: TryParseNode<CoreNodesWithData[CoreNodeType.POINTER_TYPE]> =
  async stream => {
    const iterator = stream[Symbol.asyncIterator]()
    const { value, done } = await iterator.next()
    const error: TryParseNodeResult<CoreNodesWithData[CoreNodeType.POINTER_TYPE]> = {
      success: false,
      result: {
        type: { enum: CoreNodeType, id: CoreNodeType.POINTER_TYPE },
        index: 0,
        message: 'Expected ptr keyword',
        subAttempts: undefined
      }
    }
    if (done === true) return error
    if (!(
      value.type.enum === CoreTokenType &&
    value.type.id === CoreTokenType.KEY_WORD &&
    (value.data as EnumItem).enum === CoreKeyWord &&
    (value.data as EnumItem).id === CoreKeyWord.PTR)) {
      return error
    }
    return {
      success: true,
      result: {
        node: {
          type: {
            enum: CoreNodeType,
            id: CoreNodeType.POINTER_TYPE
          },
          data: undefined
        },
        length: 1
      }
    }
  }

export default parsePointerType
