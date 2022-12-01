import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import KeyWord from '../../KeyWord'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import CoreTypesWithData from '../CoreTypesWithData'
import CoreTypeType from '../CoreTypeType'
import ParsedNode from '../ParsedNode'
import parsePointerType from '../parsePointerType'

test('i64', async () => {
  const pointerTypeData: CoreTypesWithData[CoreTypeType.POINTER] = {
    type: {
      enum: CoreTypeType,
      id: CoreTypeType.POINTER
    },
    data: undefined
  }
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.TYPE
      },
      data: pointerTypeData
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
          enum: KeyWord,
          id: KeyWord.PTR
        }
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
