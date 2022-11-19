import TokenWithData from '../TokenWithData'
import TryGetToken from './TryGetToken'

const parseToken =
  <T extends TokenWithData[]>(
    tryers: ReadonlyArray<TryGetToken<T[number]>>
  ): TryGetToken<TokenWithData> => async stream => {
    for (const tryer of tryers) {
      let skippedWhitespace = 0
      const parsedToken = await tryer({
        async * [Symbol.asyncIterator] () {
          for await (const chunk of stream) {
            const trimmedChunk = chunk.trimStart()
            skippedWhitespace += chunk.length - trimmedChunk.length
            yield trimmedChunk
          }
        }
      })
      if (parsedToken !== undefined) {
        return {
          token: parsedToken.token,
          length: parsedToken.length + skippedWhitespace
        }
      }
    }
  }

export default parseToken
