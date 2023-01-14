import arrayFromAsync from '../../../util/arrayFromAsync/arrayFromAsync'
import coreTryers from '../coreTryers'
import parseAllTokens from '../parseAllTokens'
import arrayToAsyncIterable from '../../../util/arrayToAsyncIterable/arrayToAsyncIterable'

test('declare i32 @puts(ptr)', async () => {
  await expect(arrayFromAsync(parseAllTokens(coreTryers)({
    async * [Symbol.asyncIterator] () {
      yield 'declare i32 @puts(ptr)'
    }
  }))).resolves.toMatchSnapshot()
})

test('(', async () => {
  await expect(arrayFromAsync(parseAllTokens(coreTryers)(arrayToAsyncIterable(
    ['('])))).resolves.toMatchSnapshot()
})

test('(,', async () => {
  await expect(arrayFromAsync(parseAllTokens(coreTryers)(arrayToAsyncIterable(
    ['(,'])))).resolves.toMatchSnapshot()
})
