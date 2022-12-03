import EnumItemWithData from '../EnumItemWithData'
import skip from '../splitAsyncIterator/skip'
import splitAsyncIterator from '../splitAsyncIterator/splitAsyncIterator'
import parseToken from './parseToken'
import TryGetToken from './TryGetToken'

const parseAllTokens = (tryers: ReadonlyArray<TryGetToken<EnumItemWithData>>) => async function * (
  asyncIterable: AsyncIterable<string>
): AsyncGenerator<EnumItemWithData | undefined> {
  const splittedIterator = splitAsyncIterator(asyncIterable[Symbol.asyncIterator]())
  let chunkBefore = ''
  while (true) {
    const token = await parseToken(tryers)({
      async * [Symbol.asyncIterator] () {
        yield chunkBefore
        for await (const chunk of splittedIterator.asyncIterable) {
          yield chunk
        }
      }
    })
    if (token === undefined) {
      yield undefined
      return
    }
    yield token.token
    let chunksProcessed = 0
    let charactersProcessed = 0
    if (token.length < chunkBefore.length) {
      chunkBefore = chunkBefore.slice(token.length - chunkBefore.length)
    } else {
      for await (const chunk of splittedIterator.asyncIterable) {
        chunksProcessed++
        charactersProcessed += chunk.length
        if (charactersProcessed >= token.length) {
          chunkBefore = charactersProcessed === token.length
            ? ''
            : chunk.slice(token.length - charactersProcessed)
          break
        }
      }
      if (chunksProcessed === 0) return
      skip(splittedIterator, chunksProcessed)
    }
  }
}

export default parseAllTokens
