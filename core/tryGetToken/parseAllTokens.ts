import skip from '../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../util/splitAsyncIterator/splitAsyncIterator'
import EnumItemWithData from '../EnumItemWithData'
import isStreamWhitespace from '../../util/isStreamWhitespace/isStreamWhitespace'
import parseToken from './parseToken'
import TryGetToken from './TryGetToken'

const parseAllTokens = (tryers: ReadonlyArray<TryGetToken<EnumItemWithData>>) => async function * (
  asyncIterable: AsyncIterable<string>
): AsyncGenerator<EnumItemWithData | undefined> {
  const splittedIterator = splitAsyncIterator(asyncIterable[Symbol.asyncIterator]())
  let chunkBefore = ''
  while (true) {
    const asyncIterable: AsyncIterable<string> = {
      async * [Symbol.asyncIterator] () {
        yield chunkBefore
        for await (const chunk of splittedIterator.asyncIterable) {
          yield chunk
        }
      }
    }
    const token = await parseToken(tryers)(asyncIterable)
    if (token === undefined) {
      // If the string wasn't empty don't yield undefined because it means something couldn't be
      // parsed
      if (!await isStreamWhitespace(asyncIterable)) yield undefined
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
