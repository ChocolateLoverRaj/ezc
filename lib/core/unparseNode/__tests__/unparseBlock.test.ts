import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import parseBlock from '../../parseNode/parseBlock/parseBlock'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import coreInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseBlock from '../unparseBlock'
import coreInstructionParsers from '../../parseNode/parseBlock/coreInstructionParsers'

test('simple function', async () => {
  expect(unparsedNodeToString(coreInput)(
    unparseBlock((await parseBlock(coreInstructionParsers)(parseAllTokens(coreTryers)(
      arrayToAsyncIterable([
        `0:
          ret i1 0
        }`
      ])) as any))?.node.data as any))).toMatchSnapshot()
})
