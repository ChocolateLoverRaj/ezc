import getNextToken from '../lib/getNextToken'
import TokenWithData from '../lib/TokenWithData'

const tokenFromString = (
  str: string,
  expectedTokenWithData: TokenWithData,
  expectedIndexAtEnd: number
) => {
  let index = 0
  const getCurrent = () => str.charAt(index)
  const next = () => index++
  expect(getNextToken({
    getCurrent,
    next
  })).toStrictEqual(expectedTokenWithData)
  expect(index).toBe(expectedIndexAtEnd)
}

export default tokenFromString
