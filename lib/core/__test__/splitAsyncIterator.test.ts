import splitAsyncIterator from '../splitAsyncIterator'
import fromAsync from '../arrayFromAsync'

test('works', async () => {
  const asyncIterator = (
    async function * () {
      yield 'a'
      yield 'b'
      yield 'c'
      yield 'd'
    })()
  // Consume a and b
  await asyncIterator.next()
  await asyncIterator.next()

  const iterable = splitAsyncIterator(asyncIterator)
  await expect(fromAsync(iterable[Symbol.asyncIterator]())).resolves.toEqual(['c', 'd'])
  await expect(fromAsync(iterable[Symbol.asyncIterator]())).resolves.toEqual(['c', 'd'])
})
