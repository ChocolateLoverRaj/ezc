import CoreKeyWord from '../CoreKeyWord'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'
import checkKeyWord from './checkKeyWord'

const parseVoidType: TryParseNode<CoreNodesWithData[CoreNodeType.VOID_TYPE]> = async stream => {
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.VOID_TYPE
  }
  const error = await checkKeyWord(
    stream[Symbol.asyncIterator](),
    type,
    0,
    'Expected void',
    { enum: CoreKeyWord, id: CoreKeyWord.VOID }
  )
  if (error !== undefined) return error

  return {
    success: true,
    result: {
      node: {
        type,
        data: undefined
      },
      length: 1
    }
  }
}

export default parseVoidType
