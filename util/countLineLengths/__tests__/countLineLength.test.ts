import arrayFromAsync from '../../arrayFromAsync/arrayFromAsync'
import arrayToAsyncIterable from '../../arrayToAsyncIterable/arrayToAsyncIterable'
import countLineLengths from '../countLineLengths'

test('works', async () => {
  await expect(arrayFromAsync(countLineLengths(arrayToAsyncIterable([
`1234
123
12345
`
  ])))).resolves.toEqual([4, 3, 5, 0])
})
