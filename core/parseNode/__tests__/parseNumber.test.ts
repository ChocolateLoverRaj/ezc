import CoreNodeType from '../CoreNodeType'
import parseNumber from '../parseNumber'
import testParseNode from '../testParseNode'

test('0', async () => {
  await testParseNode(parseNumber, '0', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.NUMBER
      },
      data: 0
    },
    length: 1
  })
})
