import CoreTokenType from '../CoreTokenType'
import KeyWord from '../KeyWord'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import CoreTypeWithData from './CoreTypesWithData'
import CoreTypeType from './CoreTypeType'
import TryParseNode from './TryParseNode'
import EnumItem from '../EnumItem'

const parseIntegerType: TryParseNode<CoreNodesWithData[CoreNodeType.TYPE]> = async stream => {
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
  const typeData: CoreTypeWithData[CoreTypeType.POINTER] = {
    type: {
      enum: CoreTypeType,
      id: CoreTypeType.POINTER
    },
    data: undefined
  }
  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.TYPE
      },
      data: typeData
    },
    length: 1
  }
}

export default parseIntegerType
