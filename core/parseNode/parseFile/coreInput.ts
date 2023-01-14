import coreParseDeclareInput from '../parseDeclare/coreInput'
import parseDeclare from '../parseDeclare/parseDeclare'
import parseFunction from '../parseFunction/parseFunction'
import coreParseGlobalVariableInput from '../parseGlobalVariable/coreInput'
import parseGlobalVariable from '../parseGlobalVariable/parseGlobalVariable'
import tryNodeParsers from '../tryNodeParsers'
import Input from './Input'
import coreParseFunctionInput from '../parseFunction/coreInput'

const coreInput: Input = tryNodeParsers([
  parseDeclare(coreParseDeclareInput),
  parseGlobalVariable(coreParseGlobalVariableInput),
  parseFunction(coreParseFunctionInput)
])

export default coreInput
