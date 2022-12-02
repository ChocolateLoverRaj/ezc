import ParsedNode from '../ParsedNode'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseType from '../parseType'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import KeyWord from '../../KeyWord'
import coreTypeParsers from '../coreTypeParsers'

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
  await expect(parseType(coreTypeParsers)({
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

test('i8', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.INTEGER_TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INTEGER_TYPE
      },
      data: 8
    },
    length: 1
  }
  await expect(parseType(coreTypeParsers)({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.INTEGER_TYPE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.INTEGER_TYPE
        },
        data: 8
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
