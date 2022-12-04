import parseArrayType from './parseArrayType'
import parseIntegerType from './parseIntegerType'
import parsePointerType from './parsePointerType'
import parseVoidType from './parseVoidType'
import TypeParser from './TypeParser'

const coreTypeParsers = ((): readonly TypeParser[] => {
  const coreTypeParsers: TypeParser[] = [
    parseIntegerType,
    parsePointerType,
    parseVoidType
  ]
  coreTypeParsers.push(parseArrayType(coreTypeParsers))
  return coreTypeParsers
})()

export default coreTypeParsers
