import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import skipSplittedIterator from '../../splitAsyncIterator/skip'
import tryNodeParsers from '../tryNodeParsers'
import parseIdentifier from '../parseIdentifier'
import CoreTokenDatas from '../../CoreTokenDatas'
import OpenCloseType from '../../OpenCloseType'
import InputType from '../InputType'
import parseInputFlags from '../parseInputFlags/parseInputFlags'

const parseFunction = (
  { typeParsers, keyWordsToInputFlags }: Input
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

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE)) return
    const { type, close } = value.data as CoreTokenDatas[CoreTokenType.OPEN_CLOSE]
    if (!(type === OpenCloseType.PARENTHESIS && !close)) return
    skip(1)
  }

  // Parse inputs
  const inputTypes: InputType[] = []
  const inputNames: string[] = []
  while (true) {
    // Check for )
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE) {
        const { type, close } = value.data as CoreTokenDatas[CoreTokenType.OPEN_CLOSE]
        if (type === OpenCloseType.PARENTHESIS && close) {
          skip(1)
          break
        }
      }
    }

    const parsedType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
    if (parsedType === undefined) return
    skip(parsedType.length)

    const flags = await parseInputFlags(keyWordsToInputFlags)(splittedIterator.asyncIterable)
    skip(flags.length)

    inputTypes.push({
      flags: flags.flags,
      type: parsedType.node
    })

    const parsedIdentifier = await parseIdentifier(splittedIterator.asyncIterable)
    if (parsedIdentifier === undefined) return
    skip(parsedIdentifier.length)

    // FIXME: @identifiers should be allowed, but in this code they are
    inputNames.push(parsedIdentifier.node.data.name)

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

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE)) return
    const { type, close } = value.data as CoreTokenDatas[CoreTokenType.OPEN_CLOSE]
    if (!(type === OpenCloseType.CURLY_BRACKET && !close)) return
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
        inputNames,
        type: {
          inputTypes,
          returnType: parsedReturnType.node
        },
        blocks: []
      }
    },
    length
  }
}

export default parseFunction
