import arrayFromAsync from '../../arrayFromAsync'
import coreTryers from '../coreTryers'
import parseAllTokens from '../parseAllTokens'

test('declare i32 @puts(ptr)', async () => {
  await expect(arrayFromAsync(parseAllTokens(coreTryers)({
    async * [Symbol.asyncIterator] () {
      yield 'declare i32 @puts(ptr)'
    }
  }))).resolves.toMatchSnapshot()
})
