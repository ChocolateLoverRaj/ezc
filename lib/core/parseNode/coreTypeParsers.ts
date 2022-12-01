import parseIntegerType from './parseIntegerType'
import parsePointerType from './parsePointerType'
import TypeParser from './TypeParser'

const coreTypeParsers: readonly TypeParser[] = [
  parseIntegerType,
  parsePointerType
]

export default coreTypeParsers
