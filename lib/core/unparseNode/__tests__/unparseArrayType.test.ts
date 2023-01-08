import CoreNodeType from '../../parseNode/CoreNodeType'
import unparseArrayType from '../unparseArrayType'

test('[0 x i8]', () => {
  expect(unparseArrayType({
    length: 0,
    itemsType: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INTEGER_TYPE
      },
      data: 8
    }
  })).toMatchSnapshot()
})
