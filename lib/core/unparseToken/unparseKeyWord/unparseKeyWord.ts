import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import UnparseToken from '../UnparseToken'
import Input from './Input'

const unparseKeyWord = (
  map: Input
): UnparseToken<CoreTokensWithData[CoreTokenType.KEY_WORD]> => ({ data }) => {
  return map.get(data.enum)?.get(data.id) as string
}

export default unparseKeyWord
