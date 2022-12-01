import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parseString from '../parseString'

test('c"Hello World!\\00"', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.STRING]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.STRING
      },
      data: 'Hello World!\\00'
    },
    length: 1
  }
  await expect(parseString({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.STRING_LITERAL] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.STRING_LITERAL
        },
        data: 'Hello World!\\00'
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
