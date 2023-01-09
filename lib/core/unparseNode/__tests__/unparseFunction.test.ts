import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import parseFnCoreInput from '../../parseNode/parseFunction/coreInput'
import parseFunction from '../../parseNode/parseFunction/parseFunction'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import coreToStrInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseFunction from '../unparseFunction'

test('simple function', async () => {
  expect(unparsedNodeToString(coreToStrInput)(
    unparseFunction((await parseFunction(parseFnCoreInput)(parseAllTokens(coreTryers)(
      arrayToAsyncIterable([
    `define i1 @main() {
      0:
        ret i1 0
    }`
      ])) as any))?.node.data as any))).toMatchSnapshot()
})
