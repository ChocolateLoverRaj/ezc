import parseArrayType from './parseArrayType'
import parseIntegerType from './parseIntegerType'
import parsePointerType from './parsePointerType'
import TypeParser from './TypeParser'

const coreTypeParsers = ((): readonly TypeParser[] => {
  const coreTypeParsers: TypeParser[] = [
    parseIntegerType,
    parsePointerType
  ]
  coreTypeParsers.push(parseArrayType(coreTypeParsers))
  return coreTypeParsers
})()

export default coreTypeParsers
