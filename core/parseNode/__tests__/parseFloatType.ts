import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import FloatType from '../FloatType'
import CoreKeyWord from '../../CoreKeyWord'
import parseFloatType from '../parseFloatType'

test('float', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.INTEGER_TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.FLOAT_TYPE
      },
      data: FloatType.FLOAT
    },
    length: 1
  }
  await expect(parseFloatType({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: CoreKeyWord,
          id: CoreKeyWord.FLOAT
        }
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
