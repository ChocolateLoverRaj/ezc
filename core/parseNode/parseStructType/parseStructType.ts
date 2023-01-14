import CoreKeyWord from '../../CoreKeyWord'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import EnumItemWithData from '../../EnumItemWithData'
import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseStructType = (
  typeParsers: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.STRUCT_TYPE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())

  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.OPEN_CURLY_BRACKET)) return
    skip(splittedIterator, 1)
  }

  const parsedTypes: Array<ParsedNode<EnumItemWithData>> = []
  for (let isFirstType = true; true; isFirstType = false) {
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return

      // Check for }
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_CURLY_BRACKET) {
          skip(splittedIterator, 1)
          break
        }
      }

      // Need a , after inputs
      if (!isFirstType) {
        if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.COMMA)) return
        skip(splittedIterator, 1)
      }
    }

    const parsedType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
    if (parsedType === undefined) return
    skip(splittedIterator, parsedType.length)
    parsedTypes.push(parsedType)
  }

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.STRUCT_TYPE
      },
      data: parsedTypes.map(({ node }) => node)
    },
    length:
      // {
      1 +
      // Parsed types
      parsedTypes.reduce((prevLength, { length }) => prevLength + length, 0) +
      // Commas
      (parsedTypes.length > 1 ? parsedTypes.length - 1 : 0) +
      // }
      1
  }
}

export default parseStructType
