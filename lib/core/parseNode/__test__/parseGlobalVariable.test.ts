import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import IdentifierType from '../../IdentifierType'
import KeyWord from '../../KeyWord'
import OpenCloseType from '../../OpenCloseType'
import ConstantOrGlobal from '../ConstantOrGlobal'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import coreTypeParsers from '../coreTypeParsers'
import coreValueParsers from '../coreValueParsers'
import Linkage from '../Linkage'
import ParsedNode from '../ParsedNode'
import parseGlobalVariable from '../parseGlobalVariable/parseGlobalVariable'

test('@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.GLOBAL_VARIABLE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.GLOBAL_VARIABLE
      },
      data: {
        align: undefined,
        constantOrGlobal: ConstantOrGlobal.CONSTANT,
        linkage: Linkage.PRIVATE,
        unnamed_addr: true,
        identifier: {
          type: {
            enum: CoreNodeType,
            id: CoreNodeType.IDENTIFIER
          },
          data: {
            name: '0',
            type: IdentifierType.AT
          }
        },
        type: {
          type: {
            enum: CoreNodeType,
            id: CoreNodeType.ARRAY_TYPE
          },
          data: {
            itemsType: {
              type: {
                enum: CoreNodeType,
                id: CoreNodeType.INTEGER_TYPE
              },
              data: 8
            },
            length: 13
          }
        },
        value: {
          type: {
            enum: CoreNodeType,
            id: CoreNodeType.STRING
          },
          data: 'Hello World!\\00'
        }
      }
    },
    length: 11
  }
  await expect(parseGlobalVariable({
    typeParsers: coreTypeParsers,
    valueParsers: coreValueParsers
  })({
    async * [Symbol.asyncIterator] () {
      const identifier: CoreTokensWithData[CoreTokenType.IDENTIFIER] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.IDENTIFIER
        },
        data: {
          type: IdentifierType.AT,
          name: '0'
        }
      }
      yield identifier

      const equalsToken: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: KeyWord,
          id: KeyWord.EQUALS
        }
      }
      yield equalsToken

      const privateToken: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: KeyWord,
          id: KeyWord.PRIVATE
        }
      }
      yield privateToken

      const unnamedAddrToken: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: KeyWord,
          id: KeyWord.UNNAMED_ADDR
        }
      }
      yield unnamedAddrToken

      const constantToken: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: KeyWord,
          id: KeyWord.CONSTANT
        }
      }
      yield constantToken

      const openBracketToken: CoreTokensWithData[CoreTokenType.OPEN_CLOSE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.OPEN_CLOSE
        },
        data: {
          type: OpenCloseType.BRACKET,
          close: false
        }
      }
      yield openBracketToken

      const numberOfElementsToken: CoreTokensWithData[CoreTokenType.NUMBER_LITERAL] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.NUMBER_LITERAL
        },
        data: 13
      }
      yield numberOfElementsToken

      const xToken: CoreTokensWithData[CoreTokenType.KEY_WORD] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: KeyWord,
          id: KeyWord.X
        }
      }
      yield xToken

      const elementsTypeToken: CoreTokensWithData[CoreTokenType.INTEGER_TYPE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.INTEGER_TYPE
        },
        data: 8
      }
      yield elementsTypeToken

      const closeBracketToken: CoreTokensWithData[CoreTokenType.OPEN_CLOSE] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.OPEN_CLOSE
        },
        data: {
          type: OpenCloseType.BRACKET,
          close: true
        }
      }
      yield closeBracketToken

      const stringToken: CoreTokensWithData[CoreTokenType.STRING_LITERAL] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.STRING_LITERAL
        },
        data: 'Hello World!\\00'
      }
      yield stringToken
    }
  })).resolves.toEqual(expected)
})

test.todo('align')
