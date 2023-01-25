import parseBlock from '../../parseNode/parseBlock/parseBlock'
import coreInstructionParsers from '../../parseNode/parseBlock/coreInstructionParsers'
import testUnparseNode from '../testUnparseNode'

test('simple function', async () => {
  await testUnparseNode(parseBlock(coreInstructionParsers),
    `0:
      ret i1 0
    }`)
})
