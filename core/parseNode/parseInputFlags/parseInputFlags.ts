import EnumItemWithData from '../../EnumItemWithData'
import skip from '../../../util/splitAsyncIterator/skip'
import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import parseInputFlag from '../parseInputFlag/parseInputFlag'
import Input from './Input'
import Output from './Output'
import ParsedNode from '../ParsedNode'

const parseInputFlags = (
  keyWordsToInputFlags: Input
) => async (stream: AsyncIterable<EnumItemWithData>): Output => {
  const flags: Array<ParsedNode<EnumItemWithData>> = []
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  while (true) {
    const parseFlagResult =
      await parseInputFlag(keyWordsToInputFlags)(splittedIterator.asyncIterable)
    if (!parseFlagResult.success) {
      return {
        flags: flags.map(({ node }) => node),
        length: flags.reduce((prev, { length }) => prev + length, 0),
        error: parseFlagResult.result
      }
    }
    flags.push(parseFlagResult.result)
    skip(splittedIterator, parseFlagResult.result.length)
  }
}

export default parseInputFlags
