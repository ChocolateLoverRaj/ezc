import tryers from './tryers'
import TryGetToken from './TryGetToken'

const parseToken: TryGetToken = async stream => {
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
      console.log(tryer, parsedToken)
      return {
        token: parsedToken.token,
        length: parsedToken.length + skippedWhitespace
      }
    }
  }
}

export default parseToken
