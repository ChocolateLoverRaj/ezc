import parseFloatType from '../../parseNode/parseFloatType'
import testUnparseNode from '../testUnparseNode'

test('double', async () => {
  await testUnparseNode(parseFloatType, 'double')
})
