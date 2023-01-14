import arrayToAsyncIterable from '../../../../util/arrayToAsyncIterable/arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import parseReturnInstruction from '../parseReturnInstruction'

test('ret i1 0', async () => {
  await expect(parseReturnInstruction(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    'ret i1 0'
  ])) as any)).resolves.toMatchSnapshot()
})
