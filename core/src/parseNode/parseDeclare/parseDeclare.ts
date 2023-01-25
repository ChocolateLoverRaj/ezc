import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import skip from 'util/dist/splitAsyncIterator/skip.js'
import splitAsyncIterator from 'util/dist/splitAsyncIterator/splitAsyncIterator.js'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseIdentifier from '../parseIdentifier'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import parseInput from '../parseInput/parseInput'
import EnumItemWithData from '../../EnumItemWithData'
import checkKeyWord from '../checkKeyWord'

const parseDeclare = (
  input: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.DECLARE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  let length = 0
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.DECLARE
  }

  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected declare',
      { enum: CoreKeyWord, id: CoreKeyWord.DECLARE }
    )
    if (error !== undefined) return error
    skip(splittedIterator, 1)
    length++
  }

  const parseReturnTypeResult =
    await tryNodeParsers(input.typeParsers)(splittedIterator.asyncIterable)
  if (!parseReturnTypeResult.success) {
    return {
      success: false,
      result: {
        type,
        index: length,
        message: 'Expected return type',
        subAttempts: parseReturnTypeResult.result
      }
    }
  }
  skip(splittedIterator, parseReturnTypeResult.result.length)
  length += parseReturnTypeResult.result.length

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
  skip(splittedIterator, parseIdentifierResult.result.length)
  length += parseIdentifierResult.result.length

  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected open parenthesis',
      { enum: CoreKeyWord, id: CoreKeyWord.OPEN_PARENTHESIS }
    )
    if (error !== undefined) return error
    skip(splittedIterator, 1)
    length++
  }

  // Parse all inputs, there could be 0 - Infinity
  const inputs: EnumItemWithData[] = []
  for (let firstInput = true; ; firstInput = false) {
    // We're done if it's )
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
          skip(splittedIterator, 1)
          length++
          break
        }
      }
    }

    // Skip past ,
    if (!firstInput) {
      const error = await checkKeyWord(
        splittedIterator.asyncIterable[Symbol.asyncIterator](),
        type,
        length,
        'Expected comma',
        { enum: CoreKeyWord, id: CoreKeyWord.COMMA }
      )
      if (error !== undefined) return error
      skip(splittedIterator, 1)
      length++
    }

    const parseInputResult = await parseInput(input)(splittedIterator.asyncIterable)
    if (!parseInputResult.success) {
      return {
        success: false,
        result: {
          type,
          index: length,
          message: 'Expected input',
          subAttempts: [parseInputResult.result]
        }
      }
    }
    skip(splittedIterator, parseInputResult.result.length)
    length += parseInputResult.result.length

    inputs.push(parseInputResult.result.node)
  }

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          name: parseIdentifierResult.result.node,
          inputs,
          returnType: parseReturnTypeResult.result.node
        }
      },
      length
    }
  }
}

export default parseDeclare
