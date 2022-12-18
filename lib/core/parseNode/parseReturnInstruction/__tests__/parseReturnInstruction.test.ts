import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreTypeParsers from '../../coreTypeParsers'
import coreValueParsers from '../../coreValueParsers'
import parseReturnInstruction from '../parseReturnInstruction'

test('ret i1 0', async () => {
  await expect(parseReturnInstruction({
    typeParsers: coreTypeParsers,
    valueParsers: coreValueParsers
  })(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    'ret i1 0'
  ])) as any)).resolves.toMatchSnapshot()
})
