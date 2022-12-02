import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import KeyWord from '../KeyWord'
import OpenCloseType from '../OpenCloseType'
import splitAsyncIterator from '../splitAsyncIterator'
import CoreNodeType from './CoreNodeType'
import parseType from './parseType'
import TypeParser from './TypeParser'

const parseArrayType = (typeParsers: readonly TypeParser[]): TypeParser => async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  {
    const { value, done } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE)) return
    const { type, close } = value.data as CoreTokenDatas[CoreTokenType.OPEN_CLOSE]
    if (!(type === OpenCloseType.BRACKET && !close)) return
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
    if (!(data.enum === KeyWord && data.id === KeyWord.X)) return
  }
  const itemsType = await parseType(typeParsers)(splitAsyncIterator(asyncIterator))
  if (itemsType === undefined) return
  {
    const { value, done } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.OPEN_CLOSE)) return
    const { type, close } = value.data as CoreTokenDatas[CoreTokenType.OPEN_CLOSE]
    if (!(type === OpenCloseType.BRACKET && close)) return
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
