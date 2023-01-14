import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import skipSplittedIterator from '../../../util/splitAsyncIterator/skip'
import tryNodeParsers from '../tryNodeParsers'
import parseIdentifier from '../parseIdentifier'
import EnumItemWithData from '../../EnumItemWithData'
import parseInput from '../parseInput/parseInput'

const parseFunction = (
  { typeParsers, keyWordsToInputFlags, parseBlock }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.FUNCTION]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())

  let length = 0
  const skip = (numberOfElements: number): void => {
    skipSplittedIterator(splittedIterator, numberOfElements)
    length += numberOfElements
  }

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.DEFINE)) return
    skip(1)
  }

  const parsedReturnType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (parsedReturnType === undefined) return
  skip(parsedReturnType.length)

  const parsedIdentifier = await parseIdentifier(splittedIterator.asyncIterable)
  if (parsedIdentifier === undefined) return
  skip(parsedIdentifier.length)

  // Parse (
  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.OPEN_PARENTHESIS)) return
    skip(1)
  }

  // Parse inputs
  const inputs: EnumItemWithData[] = []
  while (true) {
    // Check for )
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_PARENTHESIS) {
          skip(1)
          break
        }
      }
    }

    const parseInputInput = { typeParsers, keyWordsToInputFlags }
    const parsedInput = await parseInput(parseInputInput)(splittedIterator.asyncIterable)
    if (parsedInput === undefined) return
    skip(parsedInput.length)
    inputs.push(parsedInput.node)

    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (
        done !== true &&
        value.type.enum === CoreTokenType &&
        value.type.id === CoreTokenType.KEY_WORD
      ) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.COMMA) {
          skip(1)
        }
      }
    }
  }

  // Parse {
  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.OPEN_CURLY_BRACKET)) return
    skip(1)
  }

  // Parse blocks
  const blocks: EnumItemWithData[] = []
  while (true) {
    const parsedBlock = await parseBlock(splittedIterator.asyncIterable)
    if (parsedBlock === undefined) break
    skip(parsedBlock.length)
    blocks.push(parsedBlock.node)
  }

  // Parse }
  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_CURLY_BRACKET)) return
    skip(1)
  }

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.FUNCTION
      },
      data: {
        name: parsedIdentifier.node.data.name,
        inputs,
        returnType: parsedReturnType.node,
        blocks
      }
    },
    length
  }
}

export default parseFunction
