import IdentifierType from './IdentifierType'
import KeyWord from './KeyWord'
import OpenCloseType from './OpenCloseType'
import TokenType from './TokenType'

interface TokenDatas {
  [TokenType.IDENTIFIER]: {
    type: IdentifierType
    name: string
  }
  [TokenType.KEY_WORD]: KeyWord
  [TokenType.NUMBER_LITERAL]: number
  [TokenType.INTEGER_TYPE]: number
  [TokenType.STRING_LITERAL]: string
  [TokenType.OPEN_CLOSE]: {
    type: OpenCloseType
    close: boolean
  }
}

export default TokenDatas
