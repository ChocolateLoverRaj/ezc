import InputController from './InputController'
import TokenWithData from './TokenWithData'

const getNextToken = async ({ get, free }: InputController): Promise<TokenWithData> => {
  for await (const char of get(1)) {

  }
}

export default getNextToken
