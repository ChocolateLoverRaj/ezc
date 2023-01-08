import CoreInputFlag from '../../../parseNode/CoreInputFlag'
import CoreNodeType from '../../../parseNode/CoreNodeType'
import coreInput from '../coreInput'
import unparseDeclare from '../unparseDeclare'

test('declare void @someFn(ptr nofree, i1)', () => {
  expect(unparseDeclare(coreInput)({
    name: 'someFn',
    type: {
      inputTypes: [{
        type: {
          type: {
            enum: CoreNodeType,
            id: CoreNodeType.POINTER_TYPE
          },
          data: undefined
        },
        flags: [{
          enum: CoreInputFlag,
          id: CoreInputFlag.NO_FREE
        }]
      }, {
        type: {
          type: {
            enum: CoreNodeType,
            id: CoreNodeType.INTEGER_TYPE
          },
          data: 1
        },
        flags: []
      }],
      returnType: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.VOID_TYPE
        },
        data: undefined
      }
    }
  })).toMatchSnapshot()
})
