import IdentifierType from '../../IdentifierType'
import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parseIdentifier from '../parseIdentifier'
import parseInputFlags from '../parseInputFlags/parseInputFlags'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseInput = (
  { keyWordsToInputFlags, typeParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.INPUT]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())

  const parsedType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (parsedType === undefined) return
  skip(splittedIterator, 1)

  const parsedFlags = await parseInputFlags(keyWordsToInputFlags)(splittedIterator.asyncIterable)
  skip(splittedIterator, parsedFlags.length)

  const parsedIdentifier = await (async ():
  Promise<ParsedNode<CoreNodesWithData[CoreNodeType.IDENTIFIER]> | undefined> => {
    const parsedIdentifier = await parseIdentifier(splittedIterator.asyncIterable)
    if (parsedIdentifier !== undefined) {
      if (parsedIdentifier.node.data.type === IdentifierType.PERCENT) {
        skip(splittedIterator, parsedIdentifier.length)
        return parsedIdentifier
      }
    }
  })()

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT
      },
      data: {
        type: parsedType.node,
        flags: parsedFlags.flags,
        identifier: parsedIdentifier?.node
      }
    },
    length: parsedType.length + parsedFlags.length + (parsedIdentifier?.length ?? 0)
  }
}

export default parseInput
