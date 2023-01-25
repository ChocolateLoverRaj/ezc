import parseReturnInstruction from '../../parseNode/parseReturnInstruction/parseReturnInstruction'
import coreParseReturnInstructionInput from '../../parseNode/parseReturnInstruction/coreInput'
import testUnparseNode from '../testUnparseNode'

test('ret i1 0', async () => {
  await testUnparseNode(parseReturnInstruction(coreParseReturnInstructionInput), 'ret i1 0')
})
