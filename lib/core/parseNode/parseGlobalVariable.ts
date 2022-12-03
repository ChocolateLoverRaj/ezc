import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import KeyWord from '../KeyWord'
import skip from '../splitAsyncIterator/skip'
import splitAsyncIterator from '../splitAsyncIterator/splitAsyncIterator'
import ConstantOrGlobal from './ConstantOrGlobal'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import coreTypeParsers from './coreTypeParsers'
import coreValueParsers from './coreValueParsers'
import Linkage from './Linkage'
import parseIdentifier from './parseIdentifier'
import tryNodeParsers from './tryNodeParsers'
import TryParseNode from './TryParseNode'

const parseGlobalVariable: TryParseNode<CoreNodesWithData[CoreNodeType.GLOBAL_VARIABLE]> =
async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()
  const splittedAsyncIterator = splitAsyncIterator(asyncIterator)
  const identifier = await parseIdentifier(splittedAsyncIterator.asyncIterable)
  if (identifier === undefined) return
  skip(splittedAsyncIterator, identifier.length)

  {
    const { done, value } = await splittedAsyncIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const data = value.data as CoreTokenDatas[CoreTokenType.KEY_WORD]
    if (!(data.enum === KeyWord && data.id === KeyWord.EQUALS)) return
  }
  skip(splittedAsyncIterator, 1)

  const allowedKeyWords = [
    KeyWord.PRIVATE,
    KeyWord.CONSTANT,
    KeyWord.GLOBAL,
    KeyWord.UNNAMED_ADDR
  ]
  const keyWords: KeyWord[] = []
  for await (const value of splittedAsyncIterator.asyncIterable) {
    if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
      const data = value.data as CoreTokenDatas[CoreTokenType.KEY_WORD]
      if (!(data.enum === KeyWord && allowedKeyWords.includes(data.id))) return
      keyWords.push(data.id)
    } else {
      break
    }
  }
  skip(splittedAsyncIterator, keyWords.length)
  const isConstant = keyWords.includes(KeyWord.CONSTANT)
  const isGlobal = keyWords.includes(KeyWord.GLOBAL)
  // Must have exactly one of constant or global
  if (Number(isConstant) + Number(isGlobal) !== 1) {
    return
  }

  const type = await tryNodeParsers(
    coreTypeParsers)(splittedAsyncIterator.asyncIterable)
  if (type === undefined) return
  skip(splittedAsyncIterator, type.length)

  const value = await tryNodeParsers(coreValueParsers)(splittedAsyncIterator.asyncIterable)
  if (value === undefined) return
  skip(splittedAsyncIterator, value.length)

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.GLOBAL_VARIABLE
      },
      data: {
        // FIXME: No align logic
        align: undefined,
        constantOrGlobal: isConstant
          ? ConstantOrGlobal.CONSTANT
          : ConstantOrGlobal.GLOBAL,
        identifier: identifier.node,
        // FIXME: No other linkage types
        linkage: Linkage.PRIVATE,
        type: type.node,
        unnamed_addr: keyWords.includes(KeyWord.UNNAMED_ADDR),
        value: value.node
      }
    },
    length: identifier.length + 1 + keyWords.length + type.length + value.length
  }
}

export default parseGlobalVariable
