import IdentifierType from '../../../IdentifierType'
import ConstantOrGlobal from '../../ConstantOrGlobal'
import CoreNodesWithData from '../../CoreNodesWithData'
import CoreNodeType from '../../CoreNodeType'
import Linkage from '../../Linkage'
import ParsedNode from '../../ParsedNode'
import parseGlobalVariable from '../parseGlobalVariable'
import coreInput from '../coreInput'
import testParseNode from '../../testParseNode'

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
          data: 'Hello World!' + String.fromCharCode(0)
        }
      }
    },
    length: 11
  }
  await testParseNode(
    parseGlobalVariable(coreInput),
    '@0 = private unnamed_addr constant [13 x i8] c"Hello World!\\00"',
    expected)
})

test.todo('align')
