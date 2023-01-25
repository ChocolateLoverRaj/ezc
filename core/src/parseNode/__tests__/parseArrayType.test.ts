import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import coreTypeParsers from '../coreTypeParsers'
import parseArrayType from '../parseArrayType'
import testParseNode from '../testParseNode'

test('[13 x i8]', async () => {
  const integerTypeData: CoreNodesWithData[CoreNodeType.INTEGER_TYPE] = {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    },
    data: 8
  }
  await testParseNode(parseArrayType(coreTypeParsers), '[13 x i8]', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.ARRAY_TYPE
      },
      data: {
        itemsType: integerTypeData,
        length: 13
      }
    },
    length: 5
  })
})
