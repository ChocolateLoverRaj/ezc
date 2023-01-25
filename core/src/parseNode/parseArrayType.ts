import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import CoreKeyWord from '../CoreKeyWord'
import splitAsyncIterator from 'util/dist/splitAsyncIterator/splitAsyncIterator.js'
import CoreNodeType from './CoreNodeType'
import tryNodeParsers from './tryNodeParsers/tryNodeParsers'
import TryParseNode from './TryParseNode'
import EnumItemWithData from '../EnumItemWithData'
import CoreNodesWithData from './CoreNodesWithData'
import checkKeyWord from './checkKeyWord'

const parseArrayType = (
  typeParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
): TryParseNode<CoreNodesWithData[CoreNodeType.ARRAY_TYPE]> => async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  const type = {
    enum: CoreNodeType,
    id: CoreNodeType.ARRAY_TYPE
  }

  {
    const error = await checkKeyWord(asyncIterator, type, 0, 'Expected open bracket', {
      enum: CoreKeyWord,
      id: CoreKeyWord.OPEN_BRACKET
    })
    if (error !== undefined) return error
  }

  const numberOfItems = await (async () => {
    const { value, done } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.NUMBER_LITERAL)) {
      return
    }
    const numberOfItems = value.data as CoreTokenDatas[CoreTokenType.NUMBER_LITERAL]
    return numberOfItems
  })()
  if (numberOfItems === undefined) {
    return {
      success: false,
      result: {
        type,
        index: 1,
        message: 'Expected number literal for number of elements',
        subAttempts: undefined
      }
    }
  }
  {
    const error = await checkKeyWord(asyncIterator, type, 2, 'Expected x', {
      enum: CoreKeyWord,
      id: CoreKeyWord.X
    })
    if (error !== undefined) return error
  }
  const { success, result } = await tryNodeParsers(
    typeParsers)(splitAsyncIterator(asyncIterator).asyncIterable)
  if (!success) {
    return {
      success: false,
      result: {
        type,
        index: 2 + result.length,
        message: 'Expected type',
        subAttempts: result
      }
    }
  }
  {
    const error = await checkKeyWord(
      asyncIterator,
      type, 3 + result.length,
      'Expected close bracket',
      {
        enum: CoreKeyWord,
        id: CoreKeyWord.CLOSE_BRACKET
      })
    if (error !== undefined) return error
  }

  return {
    success: true,
    result: {
      node: {
        type,
        data: {
          itemsType: result.node,
          length: numberOfItems
        }
      },
      length: 4 + result.length
    }
  }
}

export default parseArrayType
