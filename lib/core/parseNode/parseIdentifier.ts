import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseIdentifier: TryParseNode<CoreNodesWithData[CoreNodeType.IDENTIFIER]> = async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()
  if (done === true) return
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.IDENTIFIER)) return
  const { name, type } = value.data as CoreTokenDatas[CoreTokenType.IDENTIFIER]
  return {
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

export default parseIdentifier
