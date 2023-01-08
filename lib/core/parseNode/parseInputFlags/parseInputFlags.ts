import EnumItemWithData from '../../EnumItemWithData'
import skip from '../../splitAsyncIterator/skip'
import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import parseInputFlag from '../parseInputFlag/parseInputFlag'
import Input from './Input'
import Output from './Output'

const parseInputFlags = (
  keyWordsToInputFlags: Input
) => async (stream: AsyncIterable<EnumItemWithData>): Output => {
  const flags: EnumItemWithData[] = []
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  while (true) {
    const parsedFlag = await parseInputFlag(keyWordsToInputFlags)(splittedIterator.asyncIterable)
    if (parsedFlag === undefined) break
    flags.push(parsedFlag.node)
    skip(splittedIterator, 1)
  }
  return {
    flags,
    length: flags.length
  }
}

export default parseInputFlags
