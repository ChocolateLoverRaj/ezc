import CoreKeyWord from '../../CoreKeyWord'
import CoreInputFlag from '../CoreInputFlag'

const coreKeyWordsToCoreInputFlags: Map<CoreKeyWord, CoreInputFlag> = new Map([
  [CoreKeyWord.NO_CAPTURE, CoreInputFlag.NO_CAPTURE],
  [CoreKeyWord.NO_ALIAS, CoreInputFlag.NO_ALIAS],
  [CoreKeyWord.NO_FREE, CoreInputFlag.NO_FREE]
])

export default coreKeyWordsToCoreInputFlags
