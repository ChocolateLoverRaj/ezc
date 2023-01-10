import parseNumber from '../../parseNode/parseNumber'
import testUnparseNode from '../testUnparseNode'

test('1.2', async () => {
  await testUnparseNode(parseNumber, '1.2')
})
