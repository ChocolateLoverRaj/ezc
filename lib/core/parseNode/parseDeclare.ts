import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import KeyWord from '../KeyWord'
import OpenCloseType from '../OpenCloseType'
import skip from '../splitAsyncIterator/skip'
import splitAsyncIterator from '../splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import InputFlag from './InputFlag'
import InputType from './InputType'
import parseIdentifier from './parseIdentifier'
import tryNodeParsers from './tryNodeParsers'
import TryParseNode from './TryParseNode'
import TypeParser from './TypeParser'

const parseDeclare = (
  typeParsers: readonly TypeParser[]
): TryParseNode<CoreNodesWithData[CoreNodeType.DECLARE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  let parsedTokens = 0

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === KeyWord && data.id === KeyWord.DECLARE)) return
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
  const keyWordsToInputFlags: Partial<Record<KeyWord, InputFlag>> = {
    [KeyWord.NO_CAPTURE]: InputFlag.NO_CAPTURE,
    [KeyWord.NO_ALIAS]: InputFlag.NO_ALIAS
  }
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
    const flags: InputFlag[] = []
    while (true) {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return
      if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) break
      const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]

      // We're done if it's ,
      if (data.enum === KeyWord && data.id === KeyWord.COMMA) {
        skip(splittedIterator, 1)
        parsedTokens++
        break
      }

      if (!(data.enum === KeyWord && Object.hasOwn(keyWordsToInputFlags, data.id))) break
      skip(splittedIterator, 1)
      parsedTokens++
      flags.push(keyWordsToInputFlags[data.id])
    }

    inputTypes.push({ type: inputType.node, flags })
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
