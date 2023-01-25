import arrayFromAsync from '../../arrayFromAsync/arrayFromAsync'
import arrayToAsyncIterable from '../arrayToAsyncIterable'

test('[2, 3, 5, 7]', async () => {
  const array: readonly number[] = [2, 3, 5, 7]
  await expect(arrayFromAsync(
    arrayToAsyncIterable(array)[Symbol.asyncIterator]())).resolves.toEqual(array)
})
