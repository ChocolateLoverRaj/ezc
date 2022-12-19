import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreTypeParsers from '../../coreTypeParsers'
import parseFunction from '../parseFunction'
import coreKeyWordsToInputFlags from '../../parseInputFlags/coreKeyWordsToInputFlags'
import parseBlock from '../../parseBlock/parseBlock'
import coreInstructionParsers from '../../parseBlock/coreInstructionParsers'

test('simple main function', async () => {
  await expect(parseFunction({
    typeParsers: coreTypeParsers,
    keyWordsToInputFlags: coreKeyWordsToInputFlags,
    parseBlock: parseBlock(coreInstructionParsers)
  })(parseAllTokens(coreTryers)(arrayToAsyncIterable([`
    define i1 @main() {
      EntryBlock:
        ret i1 0
    }
  `])) as any)).resolves.toMatchSnapshot()
})
