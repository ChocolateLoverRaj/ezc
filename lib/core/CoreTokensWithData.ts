import TokenDatas from './TokenDatas'
import TokenType from './TokenType'

type CoreTokensWithData = {
  [K in keyof TokenDatas]: {
    type: {
      enum: typeof TokenType
      id: TokenType
    }
    data: TokenDatas[K]
  }
}

export default CoreTokensWithData
