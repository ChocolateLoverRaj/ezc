import CoreKeyWord from '../CoreKeyWord'
import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import reverseMap from '../../util/reverseMap/reverseMap'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import floatTypeToKeyWord from './floatTypeToKeyWord'
import TryParseNode from './TryParseNode'

const parseFloatType: TryParseNode<CoreNodesWithData[CoreNodeType.FLOAT_TYPE]> = async stream => {
  const { done, value } = await stream[Symbol.asyncIterator]().next()
  if (done === true) return
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
  const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
  if (data.enum !== CoreKeyWord) return
  const floatType = reverseMap(floatTypeToKeyWord).get(data.id)
  if (floatType === undefined) return

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.FLOAT_TYPE
      },
      data: floatType
    },
    length: 1
  }
}

export default parseFloatType
