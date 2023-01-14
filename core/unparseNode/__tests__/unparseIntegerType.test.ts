import parseIntegerType from '../../parseNode/parseIntegerType'
import testUnparseNode from '../testUnparseNode'

test('i8', async () => {
  await testUnparseNode(parseIntegerType, 'i8')
})
