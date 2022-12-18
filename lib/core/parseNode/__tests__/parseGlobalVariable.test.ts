import IdentifierType from '../../IdentifierType'
import ConstantOrGlobal from '../ConstantOrGlobal'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import coreTypeParsers from '../coreTypeParsers'
import coreValueParsers from '../coreValueParsers'
import Linkage from '../Linkage'
import ParsedNode from '../ParsedNode'
import parseGlobalVariable from '../parseGlobalVariable/parseGlobalVariable'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import coreTryers from '../../tryGetToken/coreTryers'
import arrayToAsyncIterable from '../../arrayToAsyncIterable'

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
  })(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    '@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"'
  ])) as any)).resolves.toEqual(expected)
})

test.todo('align')
