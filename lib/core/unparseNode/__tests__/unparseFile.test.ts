import coreInput from '../../parseNode/parseGlobalVariable/coreInput'
import parseGlobalVariable from '../../parseNode/parseGlobalVariable/parseGlobalVariable'
import testUnparseNode from '../testUnparseNode'

test('just global variable', async () => {
  await testUnparseNode(parseGlobalVariable(coreInput), '@0 = private constant unnamed_addr i32 69')
})
