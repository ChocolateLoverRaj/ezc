import Token from './Token'

interface TokenDataMapping {
  [Token.NUMBER_LITERAL]: number
  [Token.STRING_LITERAL]: string
  [Token.IDENTIFIER]: string
}

type HiddenInterface = {
  [K in keyof TokenDataMapping]: {
    token: K
    data: TokenDataMapping[K]
  };
} &
{
  [K in Token]: {
    token: K
  };
}

type TokenWithData = HiddenInterface[keyof HiddenInterface]

export default TokenWithData
