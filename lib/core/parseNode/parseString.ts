import CoreTokenType from '../CoreTokenType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseString: TryParseNode<CoreNodesWithData[CoreNodeType.STRING]> = async stream => {
  const iterator = stream[Symbol.asyncIterator]()
  const { value, done } = await iterator.next()
  if (done === true) return
  if (!(
    value.type.enum === CoreTokenType &&
    value.type.id === CoreTokenType.STRING_LITERAL)) {
    return
  }
  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.STRING
      },
      data: value.data as string
    },
    length: 1
  }
}

export default parseString
