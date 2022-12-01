import CoreTypeType from '../CoreTypeType'
import CoreTypesWithData from '../CoreTypesWithData'
import ParsedNode from '../ParsedNode'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseType from '../parseType'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import KeyWord from '../../KeyWord'
import coreTypeParsers from '../coreTypeParsers'

test('ptr', async () => {
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
  const integerTypeData: CoreTypesWithData[CoreTypeType.INTEGER] = {
    type: {
      enum: CoreTypeType,
      id: CoreTypeType.INTEGER
    },
    data: 8
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
