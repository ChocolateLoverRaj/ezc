import TokenType from './TokenType'

interface TokenWithData extends Record<TokenType, any> {
  [TokenType.VARIABLE]: string
}

export default TokenWithData
