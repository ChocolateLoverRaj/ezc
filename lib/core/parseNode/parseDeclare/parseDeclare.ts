import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import OpenCloseType from '../../OpenCloseType'
import skip from '../../splitAsyncIterator/skip'
import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import InputType from '../InputType'
import parseIdentifier from '../parseIdentifier'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'
import parseInputFlags from '../parseInputFlags/parseInputFlags'
import Input from './Input'

const parseDeclare = (
  { typeParsers, keyWordsToInputFlags }: Input
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

  const returnType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
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
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE)) {
      return
    }
    const { data: { type, close } } = value as CoreTokensWithData[CoreTokenType.OPEN_CLOSE]
    if (!(type === OpenCloseType.PARENTHESIS && !close)) return
    skip(splittedIterator, 1)
    parsedTokens++
  }

  // Parse all inputs, there could be 0 - Infinity
  const inputTypes: InputType[] = []
  while (true) {
    // We're done if it's )
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE) {
        const { data: { type, close } } = value as CoreTokensWithData[CoreTokenType.OPEN_CLOSE]
        if (type === OpenCloseType.PARENTHESIS && close) {
          skip(splittedIterator, 1)
          parsedTokens++
          break
        }
      }
    }

    const inputType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
    if (inputType === undefined) return
    skip(splittedIterator, inputType.length)
    parsedTokens += inputType.length

    // Parse all flags
    const parsedFlags = await parseInputFlags(keyWordsToInputFlags)(splittedIterator.asyncIterable)
    skip(splittedIterator, parsedFlags.length)
    parsedTokens += parsedFlags.length

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

    inputTypes.push({
      type: inputType.node,
      flags: parsedFlags.flags
    })
  }

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.DECLARE
      },
      data: {
        name: identifier.node.data.name,
        type: {
          returnType: returnType.node,
          inputTypes
        }
      }
    },
    length: parsedTokens
  }
}

export default parseDeclare
