import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreKeyWord from '../../CoreKeyWord'
import checkKeyWord from '../checkKeyWord'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseIdentifier from '../parseIdentifier'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseAssignmentInstruction = (
  assignableParsers: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.ASSIGNMENT_INSTRUCTION]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.ASSIGNMENT_INSTRUCTION
  }

  const parseIdentifierResult = await parseIdentifier(splittedIterator.asyncIterable)
  if (!parseIdentifierResult.success) {
    return {
      success: false,
      result: {
        type,
        index: 0,
        message: 'Expected identifier',
        subAttempts: [parseIdentifierResult.result]
      }
    }
  }
  skip(splittedIterator, parseIdentifierResult.result.length)

  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      parseIdentifierResult.result.length,
      'Expected =',
      { enum: CoreKeyWord, id: CoreKeyWord.EQUALS }
    )
    if (error !== undefined) return error
    skip(splittedIterator, 1)
  }

  const parseAssignableResult =
    await tryNodeParsers(assignableParsers)(splittedIterator.asyncIterable)
  if (!parseAssignableResult.success) {
    return {
      success: false,
      result: {
        type,
        index: parseIdentifierResult.result.length + 1,
        message: 'Expected assignable',
        subAttempts: parseAssignableResult.result
      }
    }
  }
  skip(splittedIterator, parseAssignableResult.result.length)

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          identifier: parseIdentifierResult.result.node,
          assignable: parseAssignableResult.result.node
        }
      },
      length: parseIdentifierResult.result.length + 1 + parseAssignableResult.result.length
    }
  }
}

export default parseAssignmentInstruction
