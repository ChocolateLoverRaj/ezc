import arrayToAsyncIterable from '../../arrayToAsyncIterable/arrayToAsyncIterable'
import getLineFromPos from '../getLineFromPos'

test('works', async () => {
  await expect(getLineFromPos(arrayToAsyncIterable([
`line0
line1`
  ]), 8)).resolves.toEqual({
    line: 1,
    characterInLine: 2
  })
})
