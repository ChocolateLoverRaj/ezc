import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import skipSplittedIterator from '../../../util/splitAsyncIterator/skip'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import parseIdentifier from '../parseIdentifier'
import EnumItemWithData from '../../EnumItemWithData'
import parseInput from '../parseInput/parseInput'
import checkKeyWord from '../checkKeyWord'

const parseFunction = (
  { typeParsers, keyWordsToInputFlags, parseBlock }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.FUNCTION]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.FUNCTION
  }

  let length = 0
  const skip = (numberOfElements: number): void => {
    skipSplittedIterator(splittedIterator, numberOfElements)
    length += numberOfElements
  }

  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected define',
      { enum: CoreKeyWord, id: CoreKeyWord.DEFINE }
    )
    if (error !== undefined) return error
    skip(1)
  }

  const parseReturnTypeResult = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
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
  skip(parseReturnTypeResult.result.length)

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

  // Parse (
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

  // Parse inputs
  const inputs: EnumItemWithData[] = []
  for (let firstInput = true; ; firstInput = false) {
    // Check for )
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) {
        return {
          success: false,
          result: {
            type,
            index: length,
            message: 'Expected closing parenthesis',
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
    }

    // Check for ,
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

    const parseInputInput = { typeParsers, keyWordsToInputFlags }
    const parseInputResult = await parseInput(parseInputInput)(splittedIterator.asyncIterable)
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
    skip(parseInputResult.result.length)
    inputs.push(parseInputResult.result.node)
  }

  // Parse {
  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected open curly bracket',
      { enum: CoreKeyWord, id: CoreKeyWord.OPEN_CURLY_BRACKET }
    )
    if (error !== undefined) return error
    skip(1)
  }

  // Parse blocks
  const blocks: EnumItemWithData[] = []
  const parseBlockError = await (async () => {
    while (true) {
      const parseBlockResult = await parseBlock(splittedIterator.asyncIterable)
      if (!parseBlockResult.success) return parseBlockResult.result
      skip(parseBlockResult.result.length)
      blocks.push(parseBlockResult.result.node)
    }
  })()

  // Parse }
  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected close curly bracket',
      { enum: CoreKeyWord, id: CoreKeyWord.CLOSE_CURLY_BRACKET }
    )
    if (error !== undefined) {
      return {
        success: false,
        result: {
          type,
          index: length,
          message: 'Error parsing blocks',
          subAttempts: [parseBlockError, error.result]
        }
      }
    }
    skip(1)
  }

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          name: parseIdentifierResult.result.node,
          inputs,
          returnType: parseReturnTypeResult.result.node,
          blocks
        }
      },
      length
    }
  }
}

export default parseFunction
