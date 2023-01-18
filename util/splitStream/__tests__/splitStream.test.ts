import { Readable } from 'stream'
import arrayFromAsync from '../../arrayFromAsync/arrayFromAsync'
import arrayToAsyncIterable from '../../arrayToAsyncIterable/arrayToAsyncIterable'
import splitStream from '../splitStream'

test('works', async () => {
  const s = Readable.from(arrayToAsyncIterable(['a', 'b', 'c']))
  const streams = [splitStream(s), splitStream(s), splitStream(s)]
  expect((await arrayFromAsync(streams[0][Symbol.asyncIterator]())).join('')).toBe('abc')
  expect((await arrayFromAsync(streams[1][Symbol.asyncIterator]())).join('')).toBe('abc')
  expect((await arrayFromAsync(streams[2][Symbol.asyncIterator]())).join('')).toBe('abc')
})
