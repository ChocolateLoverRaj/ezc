import CoreKeyWord from '../../CoreKeyWord'
import CoreInputFlag from '../CoreInputFlag'
import coreKeyWordsToCoreInputFlags from './coreKeyWordsToCoreInputFlags'
import Input from './Input'

const coreKeyWordsToInputFlags: Input = new Map([
  [CoreKeyWord, new Map([...coreKeyWordsToCoreInputFlags]
    .map(([coreKeyWordId, coreInputFlagId]) => [
      coreKeyWordId,
      {
        enum: CoreInputFlag,
        id: coreInputFlagId
      }
    ]))]
])

export default coreKeyWordsToInputFlags
