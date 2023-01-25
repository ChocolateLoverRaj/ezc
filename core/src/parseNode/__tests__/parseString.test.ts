import CoreNodeType from '../CoreNodeType'
import parseString from '../parseString'
import testParseNode from '../testParseNode'

test('c"Hello World!\\00"', async () => {
  await testParseNode(parseString, 'c"Hello World!\\00"', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.STRING
      },
      data: 'Hello World!\x00'
    },
    length: 1
  })
})
