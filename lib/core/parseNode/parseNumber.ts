import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseNumber: TryParseNode<CoreNodesWithData[CoreNodeType.NUMBER]> = async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()
  if (done === true) return
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.NUMBER_LITERAL)) return
  return {
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

export default parseNumber
