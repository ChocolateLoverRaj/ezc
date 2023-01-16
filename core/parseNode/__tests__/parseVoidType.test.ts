import CoreNodeType from '../CoreNodeType'
import parseVoidType from '../parseVoidType'
import testParseNode from '../testParseNode'

test('void', async () => {
  await testParseNode(parseVoidType, 'void', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.VOID_TYPE
      },
      data: undefined
    },
    length: 1
  })
})
