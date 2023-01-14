import coreInput from '../../parseNode/parseInput/coreInput'
import parseInput from '../../parseNode/parseInput/parseInput'
import testUnparseNode from '../testUnparseNode'

test('ptr nofree %pointer', async () => {
  await testUnparseNode(parseInput(coreInput), 'ptr nofree %pointer')
})
