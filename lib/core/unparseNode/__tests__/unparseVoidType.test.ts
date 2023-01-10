import parseVoidType from '../../parseNode/parseVoidType'
import testUnparseNode from '../testUnparseNode'

test('void', async () => {
  await testUnparseNode(parseVoidType, 'void')
})
