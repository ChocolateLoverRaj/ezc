import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseInputFlag = (
  keyWordsToInputFlags: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.INPUT_FLAG]> => async stream => {
  const { value, done } = await stream[Symbol.asyncIterator]().next()
  if (done === true) return
  if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
  const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
  const flag = keyWordsToInputFlags.get(data.enum)?.get(data.id)
  if (flag === undefined) return

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: flag
    },
    length: 1
  }
}

export default parseInputFlag
