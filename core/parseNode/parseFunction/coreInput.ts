import coreTypeParsers from '../coreTypeParsers'
import coreInstructionParsers from '../parseBlock/coreInstructionParsers'
import parseBlock from '../parseBlock/parseBlock'
import coreKeyWordsToInputFlags from '../parseInputFlags/coreKeyWordsToInputFlags'
import Input from './Input'

const coreInput: Input = {
  typeParsers: coreTypeParsers,
  keyWordsToInputFlags: coreKeyWordsToInputFlags,
  parseBlock: parseBlock(coreInstructionParsers)
}

export default coreInput
