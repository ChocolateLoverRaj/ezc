import parsePointerType from '../../parseNode/parsePointerType'
import testUnparseNode from '../testUnparseNode'

test('ptr', async () => {
  await testUnparseNode(parsePointerType, 'ptr')
})
