import coreTypeParsers from '../../parseNode/coreTypeParsers'
import parseArrayType from '../../parseNode/parseArrayType'
import testUnparseNode from '../testUnparseNode'

test('[0 x i8]', async () => {
  await testUnparseNode(parseArrayType(coreTypeParsers), '[0 x i8]')
})
