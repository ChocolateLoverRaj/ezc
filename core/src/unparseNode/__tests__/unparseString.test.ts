import parseString from '../../parseNode/parseString'
import testUnparseNode from '../testUnparseNode'

test('hi', async () => {
  await testUnparseNode(parseString, 'c"hi"')
})
