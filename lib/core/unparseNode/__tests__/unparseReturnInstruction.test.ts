import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import coreUnparseNodeToStringInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseReturnInstruction from '../unparseReturnInstruction'
import parseReturnInstruction from '../../parseNode/parseReturnInstruction/parseReturnInstruction'
import coreParseReturnInstructionInput from '../../parseNode/parseReturnInstruction/coreInput'

test('ret i1 0', async () => {
  expect(unparsedNodeToString(coreUnparseNodeToStringInput)(
    unparseReturnInstruction((await parseReturnInstruction(coreParseReturnInstructionInput)(
      parseAllTokens(coreTryers)(
        arrayToAsyncIterable([
          'ret i1 0'
        ])) as any))?.node.data as any))).toMatchSnapshot()
})
