import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseIntegerType from '../parseIntegerType'
import ParsedNode from '../ParsedNode'

test('i64', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.INTEGER_TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INTEGER_TYPE
      },
      data: 64
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
