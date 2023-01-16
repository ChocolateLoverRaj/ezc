import CoreKeyWord from '../../CoreKeyWord'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import EnumItemWithData from '../../EnumItemWithData'
import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import checkKeyWord from '../checkKeyWord'

const parseStructType = (
  typeParsers: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.STRUCT_TYPE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.STRUCT_TYPE
  }
  let length = 0

  {
    const error = await checkKeyWord(
      splittedIterator.asyncIterable[Symbol.asyncIterator](),
      type,
      length,
      'Expected open curly bracket',
      { enum: CoreKeyWord, id: CoreKeyWord.OPEN_CURLY_BRACKET }
    )
    if (error !== undefined) return error
    skip(splittedIterator, 1)
    length++
  }

  const types: EnumItemWithData[] = []
  for (let isFirstType = true; true; isFirstType = false) {
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) {
        return {
          success: false,
          result: {
            type,
            index: length,
            message: 'Expected closing curly bracket',
            subAttempts: undefined
          }
        }
      }

      // Check for }
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_CURLY_BRACKET) {
          skip(splittedIterator, 1)
          length++
          break
        }
      }

      // Need a , after struct element
      if (!isFirstType) {
        const error = await checkKeyWord(
          splittedIterator.asyncIterable[Symbol.asyncIterator](),
          type,
          0,
          'Expected comma after struct element',
          { enum: CoreKeyWord, id: CoreKeyWord.COMMA }
        )
        if (error !== undefined) return error
        skip(splittedIterator, 1)
        length++
      }
    }

    const parseTypeResult = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
    if (!parseTypeResult.success) {
      return {
        success: false,
        result: {
          type,
          index: length,
          message: 'Expected type',
          subAttempts: parseTypeResult.result
        }
      }
    }
    skip(splittedIterator, parseTypeResult.result.length)
    length += parseTypeResult.result.length
    types.push(parseTypeResult.result.node)
  }

  return {
    success: true,
    result: {
      node: {
        type,
        data: types
      },
      length
    }
  }
}

export default parseStructType
