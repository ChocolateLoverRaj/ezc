import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parsePointerType from '../parsePointerType'

test('ptr', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.POINTER_TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.POINTER_TYPE
      },
      data: undefined
    },
    length: 1
  }
  await expect(parsePointerType({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: CoreKeyWord,
          id: CoreKeyWord.PTR
        }
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
