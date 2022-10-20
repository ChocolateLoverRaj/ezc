import InputController from './InputController'
import create from './matcher/create'
import TokensWithData from './TokensWithData'

const getNextToken = async (stream: AsyncIterable<string>): Promise<TokensWithData | undefined> => {
  return undefined
}

export default getNextToken
