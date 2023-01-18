import arrayFromAsync from '../../arrayFromAsync/arrayFromAsync'
import arrayToAsyncIterable from '../../arrayToAsyncIterable/arrayToAsyncIterable'
import getLinesFromPositions from '../getLinesFromPositions'

test('works', async () => {
  await expect(arrayFromAsync(getLinesFromPositions(arrayToAsyncIterable([
`line0
line1
line2`
  ]), [0, 4, 8, 15]))).resolves.toEqual([{
    line: 0,
    characterInLine: 0
  }, {
    line: 0,
    characterInLine: 4
  }, {
    line: 1,
    characterInLine: 2
  }, {
    line: 2,
    characterInLine: 3
  }])
})
