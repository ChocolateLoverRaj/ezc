import CoreKeyWord from '../CoreKeyWord'
import CoreTokenType from '../CoreTokenType'
import reverseMap from '../../util/reverseMap/reverseMap'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import floatTypeToKeyWord from './floatTypeToKeyWord'
import TryParseNode from './TryParseNode'
import checkToken from './checkToken'
import EnumItem from '../EnumItem'
import TryParseNodeResult from './tryParseNodeResult/TryParseNodeResult'

const parseFloatType: TryParseNode<CoreNodesWithData[CoreNodeType.FLOAT_TYPE]> = async stream => {
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.FLOAT_TYPE
  }

  const message = 'Expected float type'
  const result = await checkToken(
    stream[Symbol.asyncIterator](),
    type,
    0,
    message,
    { enum: CoreTokenType, id: CoreTokenType.KEY_WORD })
  if (!result.success) return result
  const enumItem = result.result as EnumItem
  const error: TryParseNodeResult<CoreNodesWithData[CoreNodeType.FLOAT_TYPE]> = {
    success: false,
    result: {
      type,
      index: 0,
      message,
      subAttempts: undefined
    }
  }
  if (enumItem.enum !== CoreKeyWord) return error
  const floatType = reverseMap(floatTypeToKeyWord).get(enumItem.id)
  if (floatType === undefined) return error

  return {
    success: true,
    result: {
      node: {
        type,
        data: floatType
      },
      length: 1
    }
  }
}

export default parseFloatType
