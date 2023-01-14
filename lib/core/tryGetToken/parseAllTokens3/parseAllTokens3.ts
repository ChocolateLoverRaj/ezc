import measureWhitespace from '../../../measureWhitespace'
import EnumItemWithData from '../../EnumItemWithData'
import skip from '../../splitSplittableIterator/skip'
import SliceElement from '../../splitSplittableIterator/SliceElement'
import splitSplittableIterator from '../../splitSplittableIterator/splitSplittableIterator'
import parseToken3 from '../parseToken3'
import TryGetToken from '../TryGetToken'
import IteratorValue from './IteratorValue'

const parseAllTokens3 = (tryers: ReadonlyArray<TryGetToken<EnumItemWithData>>) => async function * (
  asyncIterable: AsyncIterable<string>
): AsyncGenerator<IteratorValue> {
  const splittedIterator = splitSplittableIterator(
    '', (str0, str1) => str0 + str1, asyncIterable[Symbol.asyncIterator]())
  while (true) {
    const whitespace = await measureWhitespace(splittedIterator.asyncIterable)
    const sliceStr: SliceElement<string> = (str, startIndex, length) =>
      str.slice(startIndex, startIndex + length)
    skip(
      splittedIterator,
      whitespace,
      sliceStr)
    yield {
      error: false,
      value: {
        length: whitespace,
        token: undefined
      }
    }
    const token = await parseToken3(tryers)(splittedIterator.asyncIterable)
    if (token === undefined) {
      // Check for end of file
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true || value === '') return

      yield {
        error: true,
        value: undefined
      }
      return
    }
    skip(splittedIterator, token.length, sliceStr)
    yield {
      error: false,
      value: token
    }
  }
}

export default parseAllTokens3
