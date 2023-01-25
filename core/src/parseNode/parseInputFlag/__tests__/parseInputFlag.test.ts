import CoreInputFlag from '../../CoreInputFlag'
import CoreNodeType from '../../CoreNodeType'
import testParseNode from '../../testParseNode'
import coreInput from '../coreInput'
import parseInputFlag from '../parseInputFlag'

test('nofree', async () => {
  await testParseNode(parseInputFlag(coreInput), 'nofree', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: {
        enum: CoreInputFlag,
        id: CoreInputFlag.NO_FREE
      }
    },
    length: 1
  })
})
