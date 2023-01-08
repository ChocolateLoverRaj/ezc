import coreTypeParsers from '../coreTypeParsers'
import coreKeyWordsToInputFlags from '../parseInputFlags/coreKeyWordsToInputFlags'
import Input from './Input'

const coreInput: Input = {
  typeParsers: coreTypeParsers,
  keyWordsToInputFlags: coreKeyWordsToInputFlags
}

export default coreInput
