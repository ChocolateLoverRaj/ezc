import TokenLength from './TokenLength'

const getStrIndexFromTokenIndex = (
  tokenLengths: readonly TokenLength[],
  tokenIndex: number
): number | undefined => {
  let currentStrIndex = 0
  let currentTokenIndex = 0
  for (const { token, length } of tokenLengths) {
    if (token) {
      currentTokenIndex++
      if (currentTokenIndex > tokenIndex) {
        return currentStrIndex
      }
    }
    currentStrIndex += length
  }
}

export default getStrIndexFromTokenIndex
