import coreInput from '../../core/parseNode/parseFile/coreInput'
import parseFile from '../../core/parseNode/parseFile/parseFile'
import IteratorValue from '../../core/tryGetToken/parseAllTokens3/IteratorValue'
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
