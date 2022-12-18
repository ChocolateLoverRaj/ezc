import CoreKeyWord from '../../CoreKeyWord'
import CoreInputFlag from '../CoreInputFlag'
import Input from './Input'

const coreKeyWordsToCoreInputFlags: Map<CoreKeyWord, CoreInputFlag> = new Map([
  [CoreKeyWord.NO_CAPTURE, CoreInputFlag.NO_CAPTURE],
  [CoreKeyWord.NO_ALIAS, CoreInputFlag.NO_ALIAS],
  [CoreKeyWord.NO_FREE, CoreInputFlag.NO_FREE]
])

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
