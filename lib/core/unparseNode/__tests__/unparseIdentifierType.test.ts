import parseIdentifier from '../../parseNode/parseIdentifier'
import testUnparseNode from '../testUnparseNode'

test('%magic', async () => {
  await testUnparseNode(parseIdentifier, '%magic')
})
