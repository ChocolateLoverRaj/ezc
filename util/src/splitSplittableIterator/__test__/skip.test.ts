import fromAsync from '../../arrayFromAsync/arrayFromAsync'
import skip from '../skip'
import splitSplittableIterator from '../splitSplittableIterator'

test('skip 2 elements', async () => {
  const asyncIterator = (
    async function * () {
      yield 'a'
      yield 'b'
      yield 'c'
      yield 'd'
    })()

  const splittedAsyncIterator = splitSplittableIterator<string>(
    '', (str0, str1) => str0 + str1, asyncIterator)
  const iterable = splittedAsyncIterator.asyncIterable
  expect((await fromAsync(iterable[Symbol.asyncIterator]())).join('')).toEqual('abcd')
  skip(
    splittedAsyncIterator,
    2,
    (str, startIndex, length) => str.slice(startIndex, startIndex + length))
  expect((await fromAsync(iterable[Symbol.asyncIterator]())).join('')).toEqual('cd')
  expect((await fromAsync(iterable[Symbol.asyncIterator]())).join('')).toEqual('cd')
})
