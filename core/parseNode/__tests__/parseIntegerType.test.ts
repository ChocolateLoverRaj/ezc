import CoreNodeType from '../CoreNodeType'
import parseIntegerType from '../parseIntegerType'
import testParseNode from '../testParseNode'

test('i64', async () => {
  await testParseNode(parseIntegerType, 'i64', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INTEGER_TYPE
      },
      data: 64
    },
    length: 1
  })
})
