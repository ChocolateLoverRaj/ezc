import arrayToAsyncIterable from 'util/dist/arrayToAsyncIterable/arrayToAsyncIterable.js'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import parseFunction from '../parseFunction'
import coreInput from '../coreInput'

test('simple main function', async () => {
  await expect(parseFunction(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([`
    define i1 @main() {
      EntryBlock:
        ret i1 0
    }
  `])) as any)).resolves.toMatchSnapshot()
})
