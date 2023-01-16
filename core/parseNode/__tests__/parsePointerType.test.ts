import CoreNodeType from '../CoreNodeType'
import parsePointerType from '../parsePointerType'
import testParseNode from '../testParseNode'

test('ptr', async () => {
  await testParseNode(parsePointerType, 'ptr', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.POINTER_TYPE
      },
      data: undefined
    },
    length: 1
  })
})
