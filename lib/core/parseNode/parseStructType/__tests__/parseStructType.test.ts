import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import parseStructType from '../parseStructType'

test('{ i1, i2, i3 }', async () => {
  await expect(parseStructType(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    '{ i1, i2, i3 }'
  ])) as any)).resolves.toMatchSnapshot()
})

test('{ ptr }', async () => {
  await expect(parseStructType(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    '{ ptr }'
  ])) as any)).resolves.toMatchSnapshot()
})

test('{ { i8, i32 }, ptr }', async () => {
  await expect(parseStructType(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    '{ { i8, i32 }, ptr }'
  ])) as any)).resolves.toMatchSnapshot()
})
