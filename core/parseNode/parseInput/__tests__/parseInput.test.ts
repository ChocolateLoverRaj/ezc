import arrayToAsyncIterable from '../../../../util/arrayToAsyncIterable/arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import parseInput from '../parseInput'

test('ptr nofree %pointer', async () => {
  await expect(parseInput(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    'ptr nofree %pointer'
  ])) as any)).resolves.toMatchSnapshot()
})
