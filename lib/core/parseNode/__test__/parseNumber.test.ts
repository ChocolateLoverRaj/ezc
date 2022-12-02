import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parseNumber from '../parseNumber'

test('0', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.NUMBER]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.NUMBER
      },
      data: 0
    },
    length: 1
  }
  await expect(parseNumber({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.NUMBER_LITERAL] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.NUMBER_LITERAL
        },
        data: 0
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
