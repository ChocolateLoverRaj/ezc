import splitAsyncIterator from 'util/dist/splitAsyncIterator/splitAsyncIterator.js'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import skipSplittedAsyncIterable from 'util/dist/splitAsyncIterator/skip.js'
import CoreTokenType from '../../CoreTokenType'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreKeyWord from '../../CoreKeyWord'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import parseIdentifier from '../parseIdentifier'
import CallAssignableInput from './CallAssignableInput'
import checkKeyWord from '../checkKeyWord'

const parseCallAssignable = (
  { typeParsers, valueParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.CALL_ASSIGNABLE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  let length = 0
  const skip = (count: number): void => {
    skipSplittedAsyncIterable(splittedIterator, count)
    length += count
  }
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.CALL_ASSIGNABLE

  }

  // Check for 'call'
  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected call',
      { enum: CoreKeyWord, id: CoreKeyWord.CALL }
    )
    if (error !== undefined) return error
    skip(1)
  }

  // Check for type
  const parseReturnTypeResult = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (!parseReturnTypeResult.success) {
    return {
      success: false,
      result: {
        type,
        index: length,
        message: 'Expected type',
        subAttempts: parseReturnTypeResult.result
      }
    }
  }
  skip(parseReturnTypeResult.result.length)

  // Check for identifier
  const parseIdentifierResult = await parseIdentifier(splittedIterator.asyncIterable)
  if (!parseIdentifierResult.success) {
    return {
      success: false,
      result: {
        type,
        index: length,
        message: 'Expected identifier',
        subAttempts: [parseIdentifierResult.result]
      }
    }
  }
  skip(parseIdentifierResult.result.length)

  // Check for (
  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected open parenthesis',
      { enum: CoreKeyWord, id: CoreKeyWord.OPEN_PARENTHESIS }
    )
    if (error !== undefined) return error
    skip(1)
  }

  // Parse all inputs
  const inputs: CallAssignableInput[] = []
  for (let firstInput = true; ;firstInput = false) {
    // Check for ) or ,
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) {
        return {
          success: false,
          result: {
            type,
            index: length,
            message: 'Expected close parenthesis',
            subAttempts: undefined
          }
        }
      }
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_PARENTHESIS) {
          skip(1)
          break
        }
      }
      if (!firstInput) {
        const error = await checkKeyWord(
          splittedIterator.asyncIterable[Symbol.asyncIterator](),
          type,
          length,
          'Expected comma after input',
          { enum: CoreKeyWord, id: CoreKeyWord.COMMA }
        )
        if (error !== undefined) return error
        skip(1)
      }
    }

    const parseInputTypeResult = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
    if (!parseInputTypeResult.success) {
      return {
        success: false,
        result: {
          type,
          index: length,
          message: 'Expected type',
          subAttempts: parseInputTypeResult.result
        }
      }
    }
    skip(parseInputTypeResult.result.length)

    const parseInputValueResult = await tryNodeParsers(valueParsers)(splittedIterator.asyncIterable)
    if (!parseInputValueResult.success) {
      return {
        success: false,
        result: {
          type,
          index: length,
          message: 'Expected value',
          subAttempts: parseInputValueResult.result
        }
      }
    }
    skip(parseInputValueResult.result.length)

    inputs.push({
      type: parseInputTypeResult.result.node,
      value: parseInputValueResult.result.node
    })
  }

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          name: parseIdentifierResult.result.node.data.name,
          inputs,
          returnType: parseReturnTypeResult.result.node
        }
      },
      length
    }
  }
}

export default parseCallAssignable
