import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import coreTypeParsers from '../coreTypeParsers'
import parseFunction from '../parseFunction/parseFunction'
import coreKeyWordsToInputFlags from '../parseInputFlags/coreKeyWordsToInputFlags'

test('simple main function', async () => {
  await expect(parseFunction({
    typeParsers: coreTypeParsers,
    keyWordsToInputFlags: coreKeyWordsToInputFlags
  })(parseAllTokens(coreTryers)(arrayToAsyncIterable([`
    define i1 @main() {
      EntryBlock:
        ret i1 0
    }
  `])) as any)).resolves.toMatchSnapshot()
})
