import parseFnCoreInput from '../../parseNode/parseFunction/coreInput'
import parseFunction from '../../parseNode/parseFunction/parseFunction'
import testUnparseNode from '../testUnparseNode'

test('simple function', async () => {
  await testUnparseNode(parseFunction(parseFnCoreInput),
    `define i1 @main() {
      0:
        ret i1 0
    }`)
})
