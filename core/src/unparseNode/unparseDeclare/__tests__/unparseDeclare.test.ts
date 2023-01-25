import parseDeclare from '../../../parseNode/parseDeclare/parseDeclare'
import coreParseDeclareInput from '../../../parseNode/parseDeclare/coreInput'
import testUnparseNode from '../../testUnparseNode'

test('declare void @someFn(ptr nofree, i1)', async () => {
  await testUnparseNode(parseDeclare(coreParseDeclareInput), 'declare void @someFn(ptr nofree, i1)')
})
