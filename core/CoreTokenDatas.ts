import IdentifierType from './IdentifierType'
import CoreTokenType from './CoreTokenType'
import EnumItem from './EnumItem'

interface CoreTokenDatas {
  [CoreTokenType.IDENTIFIER]: {
    type: IdentifierType
    name: string
  }
  [CoreTokenType.KEY_WORD]: EnumItem
  [CoreTokenType.NUMBER_LITERAL]: number
  [CoreTokenType.INTEGER_TYPE]: number
  [CoreTokenType.STRING_LITERAL]: string
}

export default CoreTokenDatas
