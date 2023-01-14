import EnumItemWithData from '../EnumItemWithData'
import parseArrayType from './parseArrayType'
import parseFloatType from './parseFloatType'
import parseIntegerType from './parseIntegerType'
import parsePointerType from './parsePointerType'
import parseStructType from './parseStructType/parseStructType'
import parseVoidType from './parseVoidType'
import TryParseNode from './TryParseNode'

const coreTypeParsers = ((): ReadonlyArray<TryParseNode<EnumItemWithData>> => {
  const coreTypeParsers: Array<TryParseNode<EnumItemWithData>> = [
    parseIntegerType,
    parsePointerType,
    parseVoidType,
    parseFloatType
  ]
  coreTypeParsers.push(
    parseArrayType(coreTypeParsers),
    parseStructType(coreTypeParsers)
  )
  return coreTypeParsers
})()

export default coreTypeParsers
