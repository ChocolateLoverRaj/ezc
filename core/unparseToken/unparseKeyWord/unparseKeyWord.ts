import CoreTokenDatas from '../../CoreTokenDatas'
import CoreTokenType from '../../CoreTokenType'
import UnparseToken from '../UnparseToken'
import Input from './Input'

const unparseKeyWord = (
  map: Input
): UnparseToken<CoreTokenDatas[CoreTokenType.KEY_WORD]> => keyWord => {
  return map.get(keyWord.enum)?.get(keyWord.id) as string
}

export default unparseKeyWord
