import CoreTokenType from '../CoreTokenType'
import KeyWord from '../KeyWord'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'
import EnumItem from '../EnumItem'

const parsePointerType: TryParseNode<CoreNodesWithData[CoreNodeType.POINTER_TYPE]> = async stream => {
  const iterator = stream[Symbol.asyncIterator]()
  const { value, done } = await iterator.next()
  if (done === true) return
  if (!(
    value.type.enum === CoreTokenType &&
    value.type.id === CoreTokenType.KEY_WORD &&
    (value.data as EnumItem).enum === KeyWord &&
    (value.data as EnumItem).id === KeyWord.PTR)) {
    return
  }
  return {
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

export default parsePointerType
