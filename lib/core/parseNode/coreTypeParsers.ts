import EnumItemWithData from '../EnumItemWithData'
import parseArrayType from './parseArrayType'
import parseIntegerType from './parseIntegerType'
import parsePointerType from './parsePointerType'
import parseVoidType from './parseVoidType'
import TryParseNode from './TryParseNode'

const coreTypeParsers = ((): ReadonlyArray<TryParseNode<EnumItemWithData>> => {
  const coreTypeParsers: Array<TryParseNode<EnumItemWithData>> = [
    parseIntegerType,
    parsePointerType,
    parseVoidType
  ]
  coreTypeParsers.push(parseArrayType(coreTypeParsers))
  return coreTypeParsers
})()

export default coreTypeParsers
