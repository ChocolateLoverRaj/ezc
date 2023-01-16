import CoreKeyWord from '../../CoreKeyWord'
import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import checkKeyWord from '../checkKeyWord'

const parseReturnInstruction = (
  { typeParsers, valueParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.RETURN_INSTRUCTION]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.RETURN_INSTRUCTION
  }

  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      0,
      'Expected return',
      { enum: CoreKeyWord, id: CoreKeyWord.RETURN }
    )
    if (error !== undefined) return error
    skip(splittedIterator, 1)
  }

  const parseTypeResult = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (!parseTypeResult.success) {
    return {
      success: false,
      result: {
        type,
        index: 1,
        message: 'Expected type',
        subAttempts: parseTypeResult.result
      }
    }
  }
  skip(splittedIterator, parseTypeResult.result.length)

  const parseValueResult = await tryNodeParsers(valueParsers)(splittedIterator.asyncIterable)
  if (!parseValueResult.success) {
    return {
      success: false,
      result: {
        type,
        index: 1 + parseTypeResult.result.length,
        message: 'Expected value',
        subAttempts: parseValueResult.result
      }
    }
  }
  skip(splittedIterator, parseValueResult.result.length)

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          type: parseTypeResult.result.node,
          value: parseValueResult.result.node
        }
      },
      length: 1 + parseTypeResult.result.length + parseValueResult.result.length
    }
  }
}

export default parseReturnInstruction
