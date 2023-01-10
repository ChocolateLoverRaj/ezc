import coreInput from '../../parseNode/parseAssignmentInstruction/coreInput'
import parseAssignmentInstruction from
  '../../parseNode/parseAssignmentInstruction/parseAssignmentInstruction'
import testUnparseNode from '../testUnparseNode'

test('%var = call i1 @someFn()', async () => {
  await testUnparseNode(parseAssignmentInstruction(coreInput), '%var = call i1 @someFn()')
})
