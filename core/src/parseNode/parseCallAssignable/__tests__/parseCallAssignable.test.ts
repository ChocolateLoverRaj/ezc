import arrayToAsyncIterable from 'util/dist/arrayToAsyncIterable/arrayToAsyncIterable.js'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import parseCallAssignable from '../parseCallAssignable'

test('call i32 @puts(ptr @0)', async () => {
  await expect(parseCallAssignable(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    'call i32 @puts(ptr @0)'
  ])) as any)).resolves.toMatchSnapshot()
})

test('call i32 @getchar()', async () => {
  await expect(parseCallAssignable(coreInput)(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    'call i32 @getchar()'
  ])) as any)).resolves.toMatchSnapshot()
})
