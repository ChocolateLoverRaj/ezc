import TokensWithData from './TokensWithData'

type TokenWithData = {
  [K in keyof TokensWithData]: {
    type: K
    data: TokensWithData[K]
  }
}[keyof TokensWithData]

export default TokenWithData
