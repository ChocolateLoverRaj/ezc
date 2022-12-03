import fromAsync from '../../arrayFromAsync'
import skip from '../skip'
import splitAsyncIterator from '../splitAsyncIterator'

test('skip 2 elements', async () => {
  const asyncIterator = (
    async function * () {
      yield 'a'
      yield 'b'
      yield 'c'
      yield 'd'
    })()

  const splittedAsyncIterator = splitAsyncIterator(asyncIterator)
  const iterable = splittedAsyncIterator.asyncIterable
  await expect(fromAsync(iterable[Symbol.asyncIterator]())).resolves.toEqual(['a', 'b', 'c', 'd'])
  skip(splittedAsyncIterator, 2)
  await expect(fromAsync(iterable[Symbol.asyncIterator]())).resolves.toEqual(['c', 'd'])
  await expect(fromAsync(iterable[Symbol.asyncIterator]())).resolves.toEqual(['c', 'd'])
})
