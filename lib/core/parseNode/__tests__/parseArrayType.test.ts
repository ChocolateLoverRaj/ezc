import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import OpenCloseType from '../../OpenCloseType'
import CoreKeyWord from '../../CoreKeyWord'
import parseArrayType from '../parseArrayType'
import coreTypeParsers from '../coreTypeParsers'

test('[13 x i8]', async () => {
  const integerTypeData: CoreNodesWithData[CoreNodeType.INTEGER_TYPE] = {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    },
    data: 8
  }
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.ARRAY_TYPE]> = {
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
  }
  await expect(parseArrayType(coreTypeParsers)({
    async * [Symbol.asyncIterator] () {
      const openingBracket: CoreTokensWithData[CoreTokenType.OPEN_CLOSE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.OPEN_CLOSE
        },
        data: {
          type: OpenCloseType.BRACKET,
          close: false
        }
      }
      yield openingBracket

      const numberOfItems: CoreTokensWithData[CoreTokenType.NUMBER_LITERAL] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.NUMBER_LITERAL
        },
        data: 13
      }
      yield numberOfItems

      const x: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: CoreKeyWord,
          id: CoreKeyWord.X
        }
      }
      yield x

      const i8: CoreTokensWithData[CoreTokenType.INTEGER_TYPE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.INTEGER_TYPE
        },
        data: 8
      }
      yield i8

      const closingBracket: CoreTokensWithData[CoreTokenType.OPEN_CLOSE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.OPEN_CLOSE
        },
        data: {
          type: OpenCloseType.BRACKET,
          close: true
        }
      }
      yield closingBracket
    }
  })).resolves.toEqual(expected)
})
