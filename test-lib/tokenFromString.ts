import getNextToken from '../lib/getNextToken'
import TokenWithData from '../lib/TokenWithData'

const tokenFromString = (
  str: string,
  expectedTokenWithData: TokenWithData,
  expectedIndexAtEnd: number
) => {
  let index = 0
  const getNextChar = () => str.charAt(index)
  const doneWithCurrentChar = () => index++
  expect(getNextToken({
    getNextChar,
    doneWithCurrentChar
  })).toStrictEqual(expectedTokenWithData)
  expect(index).toBe(expectedIndexAtEnd)
}

export default tokenFromString
