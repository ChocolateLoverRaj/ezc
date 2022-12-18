import CoreKeyWord from '../../CoreKeyWord'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import skip from '../../splitAsyncIterator/skip'
import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseBlock = (
  { typeParsers, valueParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.RETURN_INSTRUCTION]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())

  {
    const { value, done } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.RETURN)) return
    skip(splittedIterator, 1)
  }

  const parsedType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (parsedType === undefined) return
  skip(splittedIterator, parsedType.length)

  const parsedValue = await tryNodeParsers(valueParsers)(splittedIterator.asyncIterable)
  if (parsedValue === undefined) return
  skip(splittedIterator, parsedValue.length)

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.RETURN_INSTRUCTION
      },
      data: {
        type: parsedType.node,
        value: parsedValue.node
      }
    },
    length: 1 + parsedType.length + parsedValue.length
  }
}

export default parseBlock
