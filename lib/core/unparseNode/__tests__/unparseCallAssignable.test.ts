import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import coreUnparseNodeToStringInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseCallAssignable from '../unparseCallAssignable'
import parseCallAssignable from '../../parseNode/parseCallAssignable/parseCallAssignable'
import coreParseCallAssignableInput from '../../parseNode/parseCallAssignable/coreInput'

test('call i32 @puts(ptr @0)', async () => {
  expect(unparsedNodeToString(coreUnparseNodeToStringInput)(
    unparseCallAssignable((await parseCallAssignable(coreParseCallAssignableInput)(
      parseAllTokens(coreTryers)(
        arrayToAsyncIterable([
          'call i32 @puts(ptr @0)'
        ])) as any))?.node.data as any))).toMatchSnapshot()
})

test('call i32 @printf(ptr @0, i32 %n)', async () => {
  expect(unparsedNodeToString(coreUnparseNodeToStringInput)(
    unparseCallAssignable((await parseCallAssignable(coreParseCallAssignableInput)(
      parseAllTokens(coreTryers)(
        arrayToAsyncIterable([
          'call i32 @printf(ptr @0, i32 %n)'
        ])) as any))?.node.data as any))).toMatchSnapshot()
})
