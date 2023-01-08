import CoreTokenType from '../../CoreTokenType'
import EnumItem from '../../EnumItem'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'
import UnparsedPartType from '../UnparsedPartType'
import UnparseNode from '../UnparseNode'
import Input from './Input'

const unparseInputFlag = (
  inputFlagsToKeyWords: Input
): UnparseNode<CoreNodeDatas[CoreNodeType.INPUT_FLAG]> => inputFlag => [{
  type: UnparsedPartType.TOKEN,
  data: {
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.KEY_WORD
    },
    data: inputFlagsToKeyWords.get(inputFlag.enum)?.get(inputFlag.id) as EnumItem
  }
}]

export default unparseInputFlag
