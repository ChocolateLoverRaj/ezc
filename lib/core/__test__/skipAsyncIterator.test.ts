import arrayFromAsync from '../arrayFromAsync'
import skipAsyncIterator from '../skipAsyncIterator'

test('skip 2 elements', async () => {
  const asyncIterator = (async function * () {
    yield 'a'
    yield 'b'
    yield 'c'
    yield 'd'
    yield 'e'
  })()
  await skipAsyncIterator(asyncIterator, 2)
  await expect(arrayFromAsync(asyncIterator)).resolves.toEqual(['c', 'd', 'e'])
})
