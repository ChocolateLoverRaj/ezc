import getNextToken from '../lib/getNextToken'
import TokenWithData from '../lib/TokenWithData'

const tokenFromString = (
  str: string,
  expectedTokenWithData: TokenWithData,
  expectedIndexAtEnd: number
): void => {
  let index = 0
  expect(getNextToken({
    getCurrent: () => str.charAt(index),
    next: () => index++
  })).toStrictEqual(expectedTokenWithData)
  expect(index).toBe(expectedIndexAtEnd)
}

export default tokenFromString
