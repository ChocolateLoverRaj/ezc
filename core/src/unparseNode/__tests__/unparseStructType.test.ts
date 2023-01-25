import coreInput from '../../parseNode/parseStructType/coreInput'
import parseStructType from '../../parseNode/parseStructType/parseStructType'
import testUnparseNode from '../testUnparseNode'

test('{ i64, ptr }', async () => {
  await testUnparseNode(parseStructType(coreInput), '{ i64, ptr }')
})

test('{ i32 }', async () => {
  await testUnparseNode(parseStructType(coreInput), '{ i32 }')
})

test('{ i1, i64, ptr }', async () => {
  await testUnparseNode(parseStructType(coreInput), '{ i1, i64, ptr }')
})
