import IdentifierType from './IdentifierType'
import OpenCloseType from './OpenCloseType'
import TokenType from './TokenType'
import EnumItem from './tryGetToken/EnumItem'

interface TokenDatas {
  [TokenType.IDENTIFIER]: {
    type: IdentifierType
    name: string
  }
  [TokenType.KEY_WORD]: EnumItem
  [TokenType.NUMBER_LITERAL]: number
  [TokenType.INTEGER_TYPE]: number
  [TokenType.STRING_LITERAL]: string
  [TokenType.OPEN_CLOSE]: {
    type: OpenCloseType
    close: boolean
  }
}

export default TokenDatas
