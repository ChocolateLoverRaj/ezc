import CoreTokenDatas from '../../CoreTokenDatas'
import CoreTokenType from '../../CoreTokenType'
import EnumItemWithData from '../../EnumItemWithData'
import IdentifierType from '../../IdentifierType'
import skipSplittedIterator from '../../splitAsyncIterator/skip'
import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'

// TODO: Validate if block ends with a instruction that switches to a different block
const parseBlock = (
  instructionParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
): TryParseNode<CoreNodesWithData[CoreNodeType.BLOCK]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  let length = 0
  const skip = (count: number): void => {
    length += count
    skipSplittedIterator(splittedIterator, count)
  }

  const name = await (async () => {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.IDENTIFIER)) return
    const { name, type } = value.data as CoreTokenDatas[CoreTokenType.IDENTIFIER]
    if (type !== IdentifierType.BLOCK) return
    skip(1)
    return name
  })()
  if (name === undefined) return

  const instructions: EnumItemWithData[] = []
  while (true) {
    const parsedInstruction = await tryNodeParsers(instructionParsers)(
      splittedIterator.asyncIterable)
    if (parsedInstruction === undefined) break
    instructions.push(parsedInstruction.node)
    skip(parsedInstruction.length)
  }

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.BLOCK
      },
      data: {
        name,
        instructions
      }
    },
    length
  }
}

export default parseBlock
