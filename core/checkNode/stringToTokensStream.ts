import arrayToAsyncIterable from '../../util/arrayToAsyncIterable/arrayToAsyncIterable'
import EnumItemWithData from '../EnumItemWithData'
import coreTryers from '../tryGetToken/coreTryers'
import parseAllTokens3 from '../tryGetToken/parseAllTokens3/parseAllTokens3'

const stringToTokensStream = (string: string): AsyncIterable<EnumItemWithData> => {
  return {
    async * [Symbol.asyncIterator] () {
      const tokensStream = parseAllTokens3(coreTryers)(arrayToAsyncIterable([string]))
      for await (const { error, value } of tokensStream) {
        if (error) return
        if (value.token !== undefined) yield value.token
      }
    }
  }
}

export default stringToTokensStream
