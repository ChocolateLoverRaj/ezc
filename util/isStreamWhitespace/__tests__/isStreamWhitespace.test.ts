import arrayToAsyncIterable from '../../arrayToAsyncIterable/arrayToAsyncIterable'
import isStreamWhitespace from '../isStreamWhitespace'

test('[]', async () => {
  await expect(isStreamWhitespace(arrayToAsyncIterable([]))).resolves.toBe(true)
})

test("['']", async () => {
  await expect(isStreamWhitespace(arrayToAsyncIterable(['']))).resolves.toBe(true)
})

test("['', '']", async () => {
  await expect(isStreamWhitespace(arrayToAsyncIterable(['', '']))).resolves.toBe(true)
})

test("['', 'a']", async () => {
  await expect(isStreamWhitespace(arrayToAsyncIterable(['', 'a']))).resolves.toBe(false)
})

test("['\n', '']", async () => {
  await expect(isStreamWhitespace(arrayToAsyncIterable(['\n', '']))).resolves.toBe(true)
})
