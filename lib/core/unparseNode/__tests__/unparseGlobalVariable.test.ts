import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import coreInput from '../../parseNode/parseGlobalVariable/coreInput'
import parseGlobalVariable from '../../parseNode/parseGlobalVariable/parseGlobalVariable'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import unparseGlobalVariable from '../unparseGlobalVariable'

test('@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"', async () => {
  expect(unparseGlobalVariable((await parseGlobalVariable(coreInput)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      '@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"'
    ])
  ) as any))?.node.data as any)).toMatchSnapshot()
})
