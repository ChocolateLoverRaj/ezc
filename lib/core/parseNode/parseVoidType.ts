import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import KeyWord from '../KeyWord'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseVoidType: TryParseNode<CoreNodesWithData[CoreNodeType.VOID_TYPE]> = async stream => {
  const { done, value } = await stream[Symbol.asyncIterator]().next()
  if (done === true) return
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
  const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
  if (!(data.enum === KeyWord && data.id === KeyWord.VOID)) return
  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.VOID_TYPE
      },
      data: undefined
    },
    length: 1
  }
}

export default parseVoidType
