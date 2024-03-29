import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import CoreKeyWord from '../CoreKeyWord'
import splitAsyncIterator from '../splitAsyncIterator/splitAsyncIterator'
import CoreNodeType from './CoreNodeType'
import tryNodeParsers from './tryNodeParsers'
import TryParseNode from './TryParseNode'
import EnumItemWithData from '../EnumItemWithData'
import CoreTokensWithData from '../CoreTokensWithData'

const parseArrayType = (
  typeParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
): TryParseNode<EnumItemWithData> => async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  {
    const { value, done } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.OPEN_BRACKET)) return
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
  if (numberOfItems === undefined) return
  {
    const { value, done } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const data = value.data as CoreTokenDatas[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.X)) return
  }
  const itemsType = await tryNodeParsers(
    typeParsers)(splitAsyncIterator(asyncIterator).asyncIterable)
  if (itemsType === undefined) return
  {
    const { value, done } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_BRACKET)) return
  }
  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.ARRAY_TYPE
      },
      data: {
        itemsType: itemsType.node,
        length: numberOfItems
      }
    },
    length: 4 + itemsType.length
  }
}

export default parseArrayType
