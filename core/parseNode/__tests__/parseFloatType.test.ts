import CoreNodeType from '../CoreNodeType'
import FloatType from '../FloatType'
import parseFloatType from '../parseFloatType'
import testParseNode from '../testParseNode'

test('float', async () => {
  await testParseNode(parseFloatType, 'float', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.FLOAT_TYPE
      },
      data: FloatType.FLOAT
    },
    length: 1
  })
})
