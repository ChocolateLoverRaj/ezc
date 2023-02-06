import SimplifiedType from '../simplifiedTypes/SimplifiedType'
import SimplifiedTypeWithData from '../simplifiedTypes/SimplifiedTypeWithData'
import { isDeepStrictEqual } from 'util'
import never from 'never'

const checkIfTypeMatches = (
  simplifiedType: SimplifiedTypeWithData,
  matchingTypes: SimplifiedTypeWithData[]
): boolean => {
  if ([SimplifiedType.NUMBER, SimplifiedType.POINTER, SimplifiedType.VOID]
    .includes(simplifiedType.type)) {
    return matchingTypes.some(matchingType =>
      matchingType.type === SimplifiedType.NUMBER &&
      isDeepStrictEqual(simplifiedType.data, matchingType.data))
  } else if (simplifiedType.type === SimplifiedType.ARRAY) {
    return matchingTypes.some(({ type, data }) =>
      type === SimplifiedType.ARRAY &&
      data.numberOfElements === simplifiedType.data.numberOfElements &&
      checkIfTypeMatches(simplifiedType.data.type[0], data.type)
    )
  } else if (simplifiedType.type === SimplifiedType.STRUCT) {
    return matchingTypes.some(({ type, data }) =>
      type === SimplifiedType.STRUCT &&
      !data.some((matchingTypes, index) =>
        !checkIfTypeMatches(simplifiedType.data[index][0], matchingTypes))
    )
  }
  never(`Cannot check SimplifiedType: ${simplifiedType.type}`)
}

export default checkIfTypeMatches
