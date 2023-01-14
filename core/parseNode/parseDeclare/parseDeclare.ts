import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseIdentifier from '../parseIdentifier'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import parseInput from '../parseInput/parseInput'
import EnumItemWithData from '../../EnumItemWithData'

const parseDeclare = (
  input: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.DECLARE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  let parsedTokens = 0

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.DECLARE)) return
    skip(splittedIterator, 1)
    parsedTokens++
  }

  const returnType = await tryNodeParsers(input.typeParsers)(splittedIterator.asyncIterable)
  if (returnType === undefined) return
  skip(splittedIterator, returnType.length)
  parsedTokens += returnType.length

  const identifier = await parseIdentifier(splittedIterator.asyncIterable)
  if (identifier === undefined) return
  skip(splittedIterator, identifier.length)
  parsedTokens += identifier.length

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) {
      return
    }
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.OPEN_PARENTHESIS)) return
    skip(splittedIterator, 1)
    parsedTokens++
  }

  // Parse all inputs, there could be 0 - Infinity
  const inputs: EnumItemWithData[] = []
  while (true) {
    // We're done if it's )
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_PARENTHESIS) {
          skip(splittedIterator, 1)
          parsedTokens++
          break
        }
      }
    }

    const parsedInput = await parseInput(input)(splittedIterator.asyncIterable)
    if (parsedInput === undefined) return
    skip(splittedIterator, parsedInput.length)
    parsedTokens += parsedInput.length

    // Skip past ,
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
      const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
      if (data.enum === CoreKeyWord && data.id === CoreKeyWord.COMMA) {
        skip(splittedIterator, 1)
        parsedTokens++
      }
    }

    inputs.push(parsedInput.node)
  }

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.DECLARE
      },
      data: {
        name: identifier.node.data.name,
        inputs,
        returnType: returnType.node
      }
    },
    length: parsedTokens
  }
}

export default parseDeclare
