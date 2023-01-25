import coreInput from '../../../parseNode/parseFile/coreInput'
import parseFile from '../../../parseNode/parseFile/parseFile'
import testCheckNode from '../../testCheckNode'

test('1 duplicate identifier with 2 duplicates', async () => {
  await testCheckNode(parseFile(coreInput),
`declare void @someFn ()
declare void @someFn ()`)
})

test('1 duplicate identifier with 3 duplicates', async () => {
  await testCheckNode(parseFile(coreInput),
`declare void @doStuff ()
declare void @doStuff ()
declare void @doStuff ()`)
})

test('2 duplicate identifiers with 2 duplicates', async () => {
  await testCheckNode(parseFile(coreInput),
`declare void @a ()
declare void @b ()
declare void @a ()
declare void @b ()`)
})
