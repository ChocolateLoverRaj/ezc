import coreInput from '../../parseNode/parseGlobalVariable/coreInput'
import parseGlobalVariable from '../../parseNode/parseGlobalVariable/parseGlobalVariable'
import testUnparseNode from '../testUnparseNode'

test('@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"', async () => {
  await testUnparseNode(parseGlobalVariable(coreInput),
    '@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"')
})
