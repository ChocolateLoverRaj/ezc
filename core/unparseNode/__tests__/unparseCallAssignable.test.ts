import parseCallAssignable from '../../parseNode/parseCallAssignable/parseCallAssignable'
import coreParseCallAssignableInput from '../../parseNode/parseCallAssignable/coreInput'
import testUnparseNode from '../testUnparseNode'

test('call i32 @puts(ptr @0)', async () => {
  await testUnparseNode(parseCallAssignable(coreParseCallAssignableInput), 'call i32 @puts(ptr @0)')
})

test('call i32 @printf(ptr @0, i32 %n)', async () => {
  await testUnparseNode(parseCallAssignable(coreParseCallAssignableInput),
    'call i32 @printf(ptr @0, i32 %n)')
})
