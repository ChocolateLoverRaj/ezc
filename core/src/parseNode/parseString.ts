import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import checkToken from './checkToken'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseString: TryParseNode<CoreNodesWithData[CoreNodeType.STRING]> = async stream => {
  const iterator = stream[Symbol.asyncIterator]()
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.STRING
  }
  const result = await checkToken(
    iterator,
    type,
    0,
    'Expected string literal',
    { enum: CoreTokenType, id: CoreTokenType.STRING_LITERAL }
  )
  if (!result.success) return result

  return {
    success: true,
    result: {
      node: {
        type,
        data: result.result as CoreTokenDatas[CoreTokenType.STRING_LITERAL]
      },
      length: 1
    }
  }
}

export default parseString
