import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import parseDeclare from '../../../parseNode/parseDeclare/parseDeclare'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import unparseDeclare from '../unparseDeclare'
import coreParseDeclareInput from '../../../parseNode/parseDeclare/coreInput'

test('declare void @someFn(ptr nofree, i1)', async () => {
  expect(unparseDeclare(coreInput)((await parseDeclare(coreParseDeclareInput)(
    parseAllTokens(coreTryers)(
      arrayToAsyncIterable([
        'declare void @someFn(ptr nofree, i1)'
      ])) as any))?.node.data as any)).toMatchSnapshot()
})
