import coreInput from 'ezc/dist/parseNode/parseFile/coreInput.js'
import parseFile from 'ezc/dist/parseNode/parseFile/parseFile.js'
import IteratorValue from 'ezc/dist/tryGetToken/parseAllTokens3/IteratorValue.js'
import TokenLength from '../getStrIndexFromTokenIndex/TokenLength'
import Output from './Output'

const parseFileWithUnknownTokens = async (
  tokensStream: AsyncIterable<IteratorValue>
): Promise<Output> => {
  let index = 0
  let parseTokenError = false
  const tokenLengths: TokenLength[] = []
  const parseFileResult = await parseFile(coreInput)({
    async * [Symbol.asyncIterator] () {
      for await (const { error, value } of tokensStream) {
        if (error) {
          parseTokenError = true
          return
        }
        if (value.token !== undefined) {
          tokenLengths.push({
            token: true,
            length: value.length
          })
          yield value.token
        } else {
          tokenLengths.push({
            token: false,
            length: value.length
          })
        }
        index += value.length
      }
    }
  })
  return {
    index,
    parseFileResult,
    parseTokenError,
    tokenLengths
  }
}

export default parseFileWithUnknownTokens
