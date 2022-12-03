import parseArrayType from './parseArrayType'
import parseIntegerType from './parseIntegerType'
import parsePointerType from './parsePointerType'
import TypeParser from './TypeParser'

const coreTypeParsers: TypeParser[] = [
  parseIntegerType,
  parsePointerType
]
coreTypeParsers.push(parseArrayType(coreTypeParsers))

export default coreTypeParsers as readonly TypeParser[]
