import IdentifierType from '../../IdentifierType'
import skip from 'util/dist/splitAsyncIterator/skip.js'
import splitAsyncIterator from 'util/dist/splitAsyncIterator/splitAsyncIterator.js'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parseIdentifier from '../parseIdentifier'
import parseInputFlags from '../parseInputFlags/parseInputFlags'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseInput = (
  { keyWordsToInputFlags, typeParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.INPUT]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.INPUT
  }

  const parseTypeResult = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (!parseTypeResult.success) {
    return {
      success: false,
      result: {
        type,
        index: 0,
        message: 'Expected type',
        subAttempts: parseTypeResult.result
      }
    }
  }
  skip(splittedIterator, parseTypeResult.result.length)

  const parsedFlags = await parseInputFlags(keyWordsToInputFlags)(splittedIterator.asyncIterable)
  skip(splittedIterator, parsedFlags.length)

  const parsedIdentifier = await (async ():
  Promise<ParsedNode<CoreNodesWithData[CoreNodeType.IDENTIFIER]> | undefined> => {
    const { success, result } = await parseIdentifier(splittedIterator.asyncIterable)
    if (success) {
      if (result.node.data.type === IdentifierType.PERCENT) {
        skip(splittedIterator, result.length)
        return result
      }
    }
  })()

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          type: parseTypeResult.result.node,
          flags: parsedFlags.flags,
          identifier: parsedIdentifier?.node
        }
      },
      length: parseTypeResult.result.length + parsedFlags.length + (parsedIdentifier?.length ?? 0)
    }
  }
}

export default parseInput
