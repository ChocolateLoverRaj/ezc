import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import coreInput from '../../parseNode/parseFunction/coreInput'
import parseFunction from '../../parseNode/parseFunction/parseFunction'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import unparseFunction from '../unparseFunction'

test('simple function', async () => {
  expect(unparseFunction((await parseFunction(coreInput)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
    `define i1 @main() {
      0:
        ret i1 0
    }`
    ])) as any))?.node.data as any)).toMatchSnapshot()
})
