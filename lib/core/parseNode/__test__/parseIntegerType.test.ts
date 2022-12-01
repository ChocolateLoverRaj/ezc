import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseIntegerType from '../parseIntegerType'
import CoreTypesWithData from '../CoreTypesWithData'
import CoreTypeType from '../CoreTypeType'
import ParsedNode from '../ParsedNode'

test('i64', async () => {
  const integerTypeData: CoreTypesWithData[CoreTypeType.INTEGER] = {
    type: {
      enum: CoreTypeType,
      id: CoreTypeType.INTEGER
    },
    data: 64
  }
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.TYPE
      },
      data: integerTypeData
    },
    length: 1
  }
  await expect(parseIntegerType({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.INTEGER_TYPE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.INTEGER_TYPE
        },
        data: 64
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
