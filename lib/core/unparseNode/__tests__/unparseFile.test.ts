import IdentifierType from '../../IdentifierType'
import ConstantOrGlobal from '../../parseNode/ConstantOrGlobal'
import CoreNodesWithData from '../../parseNode/CoreNodesWithData'
import CoreNodeType from '../../parseNode/CoreNodeType'
import Linkage from '../../parseNode/Linkage'
import unparseFile from '../unparseFile'

test('just global variable', () => {
  const globalVariable: CoreNodesWithData[CoreNodeType.GLOBAL_VARIABLE] = {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.GLOBAL_VARIABLE
    },
    data: {
      align: undefined,
      constantOrGlobal: ConstantOrGlobal.CONSTANT,
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
      linkage: Linkage.PRIVATE,
      type: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.INTEGER_TYPE
        },
        data: 32
      },
      unnamed_addr: true,
      value: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.NUMBER
        },
        data: 69
      }
    }
  }
  expect(unparseFile([globalVariable])).toMatchSnapshot()
})
