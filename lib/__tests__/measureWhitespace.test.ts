import arrayToAsyncIterable from '../core/arrayToAsyncIterable'
import measureWhitespace from '../measureWhitespace'

test('1 chunk', async () => {
  await expect(measureWhitespace(arrayToAsyncIterable([
    '   hi'
  ]))).resolves.toBe(3)
})

test('multiple chunks', async () => {
  await expect(measureWhitespace(arrayToAsyncIterable([
    ' ',
    '',
    ' \n',
    ' hi'
  ]))).resolves.toBe(4)
})
