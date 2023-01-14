import IdentifierType from './IdentifierType'
import OpenCloseType from './OpenCloseType'
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
  [CoreTokenType.OPEN_CLOSE]: {
    type: OpenCloseType
    close: boolean
  }
}

export default CoreTokenDatas
