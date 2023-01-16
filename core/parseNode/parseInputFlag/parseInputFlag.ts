import CoreTokenDatas from '../../CoreTokenDatas'
import CoreTokenType from '../../CoreTokenType'
import checkToken from '../checkToken'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseInputFlag = (
  keyWordsToInputFlags: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.INPUT_FLAG]> => async stream => {
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.INPUT_FLAG
  }
  const result = await checkToken(
    stream[Symbol.asyncIterator](),
    type,
    0,
    'Expected input flag key word',
    { enum: CoreTokenType, id: CoreTokenType.KEY_WORD }
  )
  if (!result.success) return result

  const data = result.result as CoreTokenDatas[CoreTokenType.KEY_WORD]
  const flag = keyWordsToInputFlags.get(data.enum)?.get(data.id)
  if (flag === undefined) {
    return {
      success: false,
      result: {
        type,
        index: 0,
        message: 'Key word is not a input flag',
        subAttempts: undefined
      }
    }
  }

  return {
    success: true,
    result: {
      node: {
        type,
        data: flag
      },
      length: 1
    }
  }
}

export default parseInputFlag
