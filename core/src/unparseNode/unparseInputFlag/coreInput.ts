import CoreKeyWord from '../../CoreKeyWord'
import CoreInputFlag from '../../parseNode/CoreInputFlag'
import coreKeyWordsToCoreInputFlags from
  '../../parseNode/parseInputFlags/coreKeyWordsToCoreInputFlags'
import reverseMap from 'util/dist/reverseMap/reverseMap.js'
import Input from './Input'

const coreInputFlagsToCoreKeyWords = reverseMap(coreKeyWordsToCoreInputFlags)

const coreInput: Input = new Map([
  [CoreInputFlag, new Map([...coreInputFlagsToCoreKeyWords]
    .map(([coreInputFlagId, coreKeyWordId]) => [
      coreInputFlagId,
      {
        enum: CoreKeyWord,
        id: coreKeyWordId
      }
    ]))]
])

export default coreInput
