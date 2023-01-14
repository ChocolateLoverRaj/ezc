import fromAsync from '../../arrayFromAsync'
import splitSplittableIterator from '../splitSplittableIterator'

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

  const iterable = splitSplittableIterator<string>(
    '', (str0, str1) => str0 + str1, asyncIterator).asyncIterable
  expect((await fromAsync(iterable[Symbol.asyncIterator]())).join('')).toEqual('cd')
  expect((await fromAsync(iterable[Symbol.asyncIterator]())).join('')).toEqual('cd')
})
